'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const analyzer = path.resolve(__dirname, '../skills/tools/verify-change/scripts/change_analyzer.js');
const shared = path.resolve(__dirname, '../skills/tools/lib/shared.js');
const env = { ...process.env, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: os.devNull, GIT_TERMINAL_PROMPT: '0' };
for (const name of Object.keys(env)) {
  if (/^GIT_(DIR|WORK_TREE|INDEX_FILE|COMMON_DIR|OBJECT_DIRECTORY|ALTERNATE_OBJECT_DIRECTORIES|CONFIG_COUNT|CONFIG_KEY_\d+|CONFIG_VALUE_\d+|CONFIG_PARAMETERS|CEILING_DIRECTORIES)$/.test(name)) delete env[name];
}

function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-change-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function git(cwd, ...args) {
  const result = spawnSync('git', ['-c', 'user.name=Regression', '-c', 'user.email=regression@example.invalid', ...args], {
    cwd, env, encoding: 'utf8',
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

function repository(t, bare = false) {
  const directory = fixture(t);
  git(directory, 'init', ...(bare ? ['--bare'] : []));
  return directory;
}

function run(cwd, args = [], preload) {
  const result = spawnSync(process.execPath, [...(preload ? ['--require', preload] : []), analyzer, ...args], {
    cwd, env, encoding: 'utf8',
  });
  assert.ifError(result.error);
  return result;
}

function report(result) {
  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.equal(result.stderr, '');
  const output = JSON.parse(result.stdout);
  assert.equal(output.passed, true);
  return output;
}

function errorReport(result) {
  assert.equal(result.status, 1, result.stderr || result.stdout);
  assert.equal(result.stderr, '');
  const output = JSON.parse(result.stdout);
  assert.equal(output.passed, false);
  assert.equal(typeof output.error.code, 'string');
  assert.ok(output.error.code);
  assert.equal(typeof output.error.message, 'string');
  assert.ok(output.error.message);
  assert.equal(output.changes, undefined);
  return output.error;
}

for (const mode of ['working', 'staged', 'committed']) {
  test(`non-repository ${mode} fails in text and JSON instead of passing`, t => {
    const directory = fixture(t);
    const text = run(directory, ['--mode', mode]);
    assert.equal(text.status, 1);
    assert.equal(text.stdout, '');
    assert.match(text.stderr, /git|repository|working tree/i);
    const error = errorReport(run(directory, ['--mode', mode, '--json']));
    assert.match(error.message, /git|repository|working tree/i);
  });
}

for (const mode of ['working', 'staged']) {
  test(`clean initial repository supports ${mode} without HEAD`, t => {
    const directory = repository(t);
    const output = report(run(directory, ['--mode', mode, '--json']));
    assert.deepEqual(output.changes, []);
    assert.equal(output.total_additions, 0);
    assert.equal(output.total_deletions, 0);
    assert.deepEqual(output.affected_modules, []);
    assert.equal(run(directory, ['--mode', mode]).status, 0);
  });
}

test('default mode is working, including untracked and newly staged paths', t => {
  const directory = repository(t);
  fs.writeFileSync(path.join(directory, 'staged.js'), 'staged\n');
  git(directory, 'add', 'staged.js');
  fs.writeFileSync(path.join(directory, 'untracked.js'), 'untracked\n');
  const output = report(run(directory, ['--json']));
  assert.deepEqual(output.changes.map(c => [c.path, c.type]), [
    ['staged.js', 'added'], ['untracked.js', 'added'],
  ]);
  const staged = report(run(directory, ['--mode', 'staged', '--json']));
  assert.deepEqual(staged.changes.map(c => c.path), ['staged.js']);
});

test('working and staged preserve their existing file selection and zero line statistics', t => {
  const directory = repository(t);
  fs.writeFileSync(path.join(directory, 'modified.js'), 'before\n');
  fs.writeFileSync(path.join(directory, 'deleted.js'), 'gone\n');
  fs.writeFileSync(path.join(directory, 'unstaged.js'), 'before\n');
  git(directory, 'add', '.');
  git(directory, 'commit', '-m', 'baseline');
  fs.writeFileSync(path.join(directory, 'modified.js'), 'after\nextra\n');
  fs.rmSync(path.join(directory, 'deleted.js'));
  fs.writeFileSync(path.join(directory, 'added.js'), 'new\n');
  git(directory, 'add', '.');
  fs.writeFileSync(path.join(directory, 'unstaged.js'), 'after\n');
  fs.writeFileSync(path.join(directory, 'untracked.js'), 'untracked\n');
  const expected = [['added.js', 'added'], ['deleted.js', 'deleted'], ['modified.js', 'modified']];
  const staged = report(run(directory, ['--mode', 'staged', '--json']));
  assert.deepEqual(staged.changes.map(c => [c.path, c.type]), expected);
  const working = report(run(directory, ['--mode', 'working', '--json']));
  assert.deepEqual(working.changes.map(c => [c.path, c.type]), [
    ...expected, ['unstaged.js', 'modified'], ['untracked.js', 'added'],
  ]);
  for (const output of [staged, working]) {
    assert.equal(output.total_additions, 0);
    assert.equal(output.total_deletions, 0);
    assert.ok(output.changes.every(c => c.additions === 0 && c.deletions === 0));
  }
});

test('committed compares HEAD~1 to HEAD and retains numstat counts', t => {
  const directory = repository(t);
  fs.writeFileSync(path.join(directory, 'modified.js'), 'before\n');
  fs.writeFileSync(path.join(directory, 'deleted.js'), 'gone\n');
  git(directory, 'add', '.');
  git(directory, 'commit', '-m', 'baseline');
  fs.writeFileSync(path.join(directory, 'modified.js'), 'after\nextra\n');
  fs.rmSync(path.join(directory, 'deleted.js'));
  fs.writeFileSync(path.join(directory, 'added.js'), 'new\n');
  git(directory, 'add', '.');
  git(directory, 'commit', '-m', 'changes');
  fs.writeFileSync(path.join(directory, 'untracked.js'), 'excluded\n');
  const output = report(run(directory, ['--mode', 'committed', '--json']));
  assert.deepEqual(output.changes.map(c => [c.path, c.type, c.additions, c.deletions]), [
    ['added.js', 'added', 1, 0], ['deleted.js', 'deleted', 0, 1], ['modified.js', 'modified', 2, 1],
  ]);
  assert.equal(output.total_additions, 3);
  assert.equal(output.total_deletions, 2);
});

for (const commits of [0, 1]) {
  test(`committed reports missing history with ${commits} commits`, t => {
    const directory = repository(t);
    if (commits) git(directory, 'commit', '--allow-empty', '-m', 'initial');
    const text = run(directory, ['--mode', 'committed']);
    assert.equal(text.status, 1);
    assert.equal(text.stdout, '');
    assert.match(text.stderr, /HEAD~1/);
    const error = errorReport(run(directory, ['--mode', 'committed', '--json']));
    assert.equal(error.code, 'GIT_ERROR');
    assert.match(error.message, /HEAD~1/);
  });
}

for (const mode of ['commit', 'invalid', 'WORKING']) {
  test(`unsupported mode ${mode} fails with supported choices`, t => {
    const directory = repository(t);
    const text = run(directory, ['--mode', mode]);
    assert.equal(text.status, 1);
    assert.equal(text.stdout, '');
    assert.match(text.stderr, /working.*staged.*committed/);
    const error = errorReport(run(directory, ['--mode', mode, '--json']));
    assert.equal(error.code, 'INVALID_MODE');
    assert.match(error.message, /working.*staged.*committed/);
  });
}

test('missing option values and unknown options remain JSON operational errors', t => {
  const directory = repository(t);
  for (const args of [['--json', '--mode'], ['--mode', '--json'], ['--unknown', '--json']]) {
    const error = errorReport(run(directory, args));
    assert.match(error.message, /mode|unknown|option|argument|value|参数|选项|值/i);
  }
});

test('missing target is rejected even when cwd is a valid repository', t => {
  const directory = repository(t);
  const missing = path.join(directory, 'does-not-exist');
  const text = run(directory, [missing]);
  assert.equal(text.status, 1);
  assert.equal(text.stdout, '');
  assert.ok(text.stderr.trim());
  const error = errorReport(run(directory, [missing, '--json']));
  assert.match(error.message, /does-not-exist/);
});

test('file target is not silently treated as the current repository', t => {
  const directory = repository(t);
  const file = path.join(directory, 'file.txt');
  fs.writeFileSync(file, 'not a directory\n');
  errorReport(run(directory, [file, '--json']));
});

test('bare repository is not a valid Git working tree', t => {
  const directory = repository(t, true);
  const error = errorReport(run(directory, ['--json']));
  assert.equal(error.code, 'NOT_GIT_WORK_TREE');
  assert.match(error.message, /working tree|non-bare/);
});

test('explicit relative and absolute targets are honored from a non-repository cwd', t => {
  const cwd = fixture(t);
  const directory = path.join(cwd, 'repository with spaces');
  fs.mkdirSync(directory);
  git(directory, 'init');
  fs.writeFileSync(path.join(directory, 'target.js'), 'new\n');
  git(directory, 'add', 'target.js');
  for (const target of [directory, path.relative(cwd, directory)]) {
    for (const mode of ['working', 'staged']) {
      const output = report(run(cwd, [target, '--mode', mode, '--json']));
      assert.deepEqual(output.changes.map(c => [c.path, c.type]), [['target.js', 'added']]);
    }
  }
});

test('module discovery uses the target directory, not the caller cwd', t => {
  const directory = repository(t);
  const cwd = fixture(t);
  const module = path.join(directory, 'packages', 'nested');
  fs.mkdirSync(module, { recursive: true });
  fs.writeFileSync(path.join(module, 'README.md'), 'module\n');
  git(directory, 'add', '.');
  git(directory, 'commit', '-m', 'module baseline');
  fs.writeFileSync(path.join(module, 'code.js'), 'new\n');
  git(directory, 'add', '.');
  const output = report(run(cwd, [directory, '--mode', 'staged', '--json']));
  assert.deepEqual(output.affected_modules, ['packages/nested']);
});

test('help exits before cwd, target validation, filesystem inspection, or Git', t => {
  const directory = fixture(t);
  const preload = path.join(directory, 'block-analysis.cjs');
  fs.writeFileSync(preload, `
    const fs = require('fs');
    const childProcess = require('child_process');
    const shared = require(${JSON.stringify(shared)});
    const forbidden = () => { throw new Error('HELP_INVOKED_ANALYSIS'); };
    shared.validateDirectory = forbidden;
    childProcess.execFileSync = forbidden;
    process.cwd = forbidden;
    for (const method of ['existsSync', 'statSync', 'lstatSync', 'readdirSync', 'accessSync']) fs[method] = forbidden;
  `);
  for (const args of [
    ['--help'], ['-h'], ['--help', '--json'], ['--json', '-h'],
    [path.join(directory, 'missing'), '--mode', 'invalid', '--help', '--json'],
  ]) {
    const result = run(directory, args, preload);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');
    assert.match(result.stdout, /Usage:/);
    assert.match(result.stdout, /working\|staged\|committed/);
    assert.doesNotMatch(result.stdout, /HELP_INVOKED_ANALYSIS/);
  }
});

test('Git executable failures produce parseable JSON instead of an empty passing report', t => {
  const directory = repository(t);
  const preload = path.join(fixture(t), 'missing-git.cjs');
  fs.writeFileSync(preload, `
    require('child_process').execFileSync = () => {
      const error = new Error('git executable unavailable; install Git and retry');
      error.code = 'ENOENT';
      throw error;
    };
  `);
  const error = errorReport(run(directory, ['--json'], preload));
  assert.equal(error.code, 'GIT_NOT_FOUND');
  assert.match(error.message, /install Git/);
});

test('failure after worktree validation is not swallowed', t => {
  const directory = repository(t);
  const preload = path.join(fixture(t), 'failed-status.cjs');
  fs.writeFileSync(preload, `
    const childProcess = require('child_process');
    const original = childProcess.execFileSync;
    childProcess.execFileSync = (command, args, options) => {
      if (args.includes('status') || args.includes('diff')) {
        const error = new Error('command failed');
        error.stderr = 'fatal: regression Git failure';
        error.status = 128;
        throw error;
      }
      return original(command, args, options);
    };
  `);
  for (const mode of ['working', 'staged', 'committed']) {
    const error = errorReport(run(directory, ['--mode', mode, '--json'], preload));
    assert.equal(error.code, 'GIT_ERROR');
    assert.match(error.message, /regression Git failure/);
  }
});
