'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const shared = require('../skills/tools/lib/shared');
const runnerPath = path.join(root, 'skills/run_skill.js');
const runner = require(runnerPath);
const modulePath = path.join(root, 'skills/tools/verify-module/scripts/module_scanner.js');

function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'skills-cli-core-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function run(script, args, cwd, extraEnv = {}) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd, env: { ...process.env, ...extraEnv }, encoding: 'utf8', timeout: 10000,
  });
  assert.ifError(result.error);
  assert.equal(result.signal, null, result.stderr);
  return result;
}

function parse(...args) { return shared.parseCliArgs(['node', 'tool', ...args]); }
function lockPath(target) {
  const hash = crypto.createHash('md5').update(path.resolve(target)).digest('hex').slice(0, 12);
  return path.join(os.tmpdir(), `sage_skill_${hash}.lock`);
}

function completeModule(directory) {
  fs.mkdirSync(path.join(directory, 'src'));
  fs.mkdirSync(path.join(directory, 'tests'));
  fs.writeFileSync(path.join(directory, 'README.md'), '# Example\n\nUsage and installation instructions.\n' + 'Details. '.repeat(10));
  fs.writeFileSync(path.join(directory, 'DESIGN.md'), '# Design\n\nDecision: keep a small module and document tradeoffs.\n');
  fs.writeFileSync(path.join(directory, 'src/main.js'), 'const value = 42;\n');
}

test('shared parser preserves defaults and common options', () => {
  assert.deepEqual(parse(), { target: '.', verbose: false, json: false });
  assert.deepEqual(parse('some folder', '-v', '--json', '--mode', 'staged'), {
    target: 'some folder', verbose: true, json: true, mode: 'staged',
  });
  assert.deepEqual(parse('project', '--exclude', 'vendor', 'fixtures', '--exclude', 'cache').exclude,
    ['vendor', 'fixtures', 'cache']);
});

test('shared help takes precedence without touching cwd or filesystem', () => {
  const cwd = process.cwd;
  process.cwd = () => { throw new Error('HELP_TOUCHED_CWD'); };
  try {
    assert.equal(parse('--unknown', '--mode', '--help', '--json').help, true);
  } finally { process.cwd = cwd; }
});

for (const args of [
  ['--unknown'], ['--mode'], ['--mode', '--json'], ['--exclude'],
  ['--exclude', '--json'], ['first', 'second'], [''], ['--', ''],
  ['first', '--', 'second'], ['--', 'first', 'second'],
]) {
  test(`shared parser rejects invalid arguments: ${JSON.stringify(args)}`, () => {
    assert.throws(() => parse('--json', ...args), error =>
      error.code === 'INVALID_ARGUMENT' && error.json === true && error.message.length > 0);
  });
}

test('end-of-options preserves literal help/JSON target names', () => {
  const help = parse('--json', '--', '--help');
  assert.equal(help.help, undefined);
  assert.equal(help.target, '--help');
  assert.equal(help.json, true);
  assert.equal(parse('--', '--json').json, false);
  assert.equal(parse('--').target, '.');
  assert.equal(parse('target', '--').target, 'target');
});

test('directory validator rejects missing, file, and empty targets', t => {
  const directory = fixture(t);
  const file = path.join(directory, 'file');
  fs.writeFileSync(file, 'not a directory');
  assert.equal(shared.validateDirectory(directory), directory);
  assert.throws(() => shared.validateDirectory(file), { code: 'ENOTDIR' });
  assert.throws(() => shared.validateDirectory(path.join(directory, 'missing')), { code: 'ENOENT' });
  assert.throws(() => shared.validateDirectory(''), { code: 'INVALID_ARGUMENT' });
});

for (const help of ['--help', '-h']) {
  test(`module ${help} bypasses target validation in text and JSON modes`, t => {
    const directory = fixture(t);
    for (const args of [[path.join(directory, 'missing'), help], [help, '--json', '--unknown']]) {
      const output = run(modulePath, args, directory);
      assert.equal(output.status, 0, output.stderr);
      assert.equal(output.stderr, '');
      assert.match(output.stdout, /用法:.*module_scanner/);
    }
    assert.deepEqual(fs.readdirSync(directory), []);
  });
}

for (const kind of ['missing', 'file']) {
  test(`module ${kind} target retains a non-passing report`, t => {
    const directory = fixture(t);
    const target = path.join(directory, kind);
    if (kind === 'file') fs.writeFileSync(target, 'file');
    const result = run(modulePath, [target, '--json'], directory);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');
    assert.equal(JSON.parse(result.stdout).passed, false);
  });
}

test('module valid and incomplete fixtures preserve the original report schema', t => {
  const directory = fixture(t);
  completeModule(directory);
  const good = run(modulePath, [directory, '--json'], directory);
  assert.equal(good.status, 0, good.stderr);
  const report = JSON.parse(good.stdout);
  assert.equal(report.module_path, directory);
  assert.equal(report.passed, true);
  assert.equal(report.error_count, 0);
  fs.unlinkSync(path.join(directory, 'DESIGN.md'));
  const bad = run(modulePath, [directory, '--json'], directory);
  assert.equal(bad.status, 1);
  assert.equal(JSON.parse(bad.stdout).error_count, 1);
});

test('module handles a literal --help directory after --', t => {
  const directory = fixture(t);
  const target = path.join(directory, '--help');
  fs.mkdirSync(target);
  completeModule(target);
  const result = run(modulePath, ['--json', '--', '--help'], directory);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).module_path, target);
});

test('module unknown options produce a parseable JSON operational error', t => {
  const directory = fixture(t);
  const result = run(modulePath, ['--unknown', '--json'], directory);
  assert.equal(result.status, 1);
  assert.equal(result.stderr, '');
  assert.equal(JSON.parse(result.stdout).error.code, 'INVALID_ARGUMENT');
});

for (const [args, expected] of [
  [[], '.'], [['--json'], '.'], [['--mode', 'staged'], '.'],
  [['--mode', 'working', 'project'], 'project'],
  [['--exclude', 'vendor', 'cache', '--json'], '.'],
  [['project', '--exclude', 'vendor'], 'project'],
  [['--readme-only', 'project'], 'project'], [['--', '--help'], '--help'],
]) {
  test(`runner locks the positional target: ${JSON.stringify(args)}`, () => {
    assert.equal(runner.lockTarget(args), expected);
  });
}

test('runner releases an acquired target lock', async t => {
  const target = fixture(t);
  const lock = await runner.acquireTargetLock([target, '--json']);
  assert.equal(fs.existsSync(lock.lockPath), true);
  runner.releaseLock(lock);
  assert.equal(fs.existsSync(lock.lockPath), false);
});

test('runner reports a lock timeout instead of running unlocked', async t => {
  const target = fixture(t);
  const first = await runner.acquireTargetLock([target, '--json']);
  try {
    await assert.rejects(runner.acquireTargetLock([target, '--json'], { timeoutMs: 10, retryMs: 5 }),
      { code: 'LOCK_TIMEOUT' });
    assert.equal(fs.existsSync(first.lockPath), true);
  } finally { runner.releaseLock(first); }
});

test('runner waits asynchronously without writing progress into JSON stdout', async t => {
  const target = fixture(t);
  const first = await runner.acquireTargetLock([target, '--json']);
  let released = false;
  const timer = setTimeout(() => { runner.releaseLock(first); released = true; }, 10);
  let second;
  try {
    second = await runner.acquireTargetLock([target, '--json'], { timeoutMs: 3000, retryMs: 5 });
    assert.equal(released, true);
  } finally {
    clearTimeout(timer);
    if (second) runner.releaseLock(second);
    else if (!released) runner.releaseLock(first);
  }
});

test('runner top-level usage and unknown skill errors have correct exit codes', t => {
  const directory = fixture(t);
  assert.equal(run(runnerPath, ['--help'], directory).status, 0);
  assert.equal(run(runnerPath, [], directory).status, 1);
  for (const name of ['no-such-skill', '__proto__', 'constructor']) {
    const result = run(runnerPath, [name, '--json'], directory, { SAGE_SKILLS_DIR: path.join(root, 'skills') });
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');
    assert.equal(JSON.parse(result.stdout).error.code, 'UNKNOWN_SKILL');
  }
});

const tools = ['verify-module', 'verify-quality', 'verify-security', 'verify-change', 'gen-docs'];
for (const name of tools) {
  test(`runner ${name} help bypasses an existing target lock`, t => {
    const directory = fixture(t);
    const file = lockPath(directory);
    fs.writeFileSync(file, 'held');
    try {
      const result = run(runnerPath, [name, directory, '--help', '--json'], directory,
        { SAGE_SKILLS_DIR: path.join(root, 'skills') });
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /Usage:|用法:/);
      assert.equal(fs.readFileSync(file, 'utf8'), 'held');
    } finally { fs.unlinkSync(file); }
  });

  test(`runner ${name} propagates missing-target JSON failure and cleans its lock`, t => {
    const directory = fixture(t);
    const target = path.join(directory, 'missing');
    const result = run(runnerPath, [name, target, '--json'], directory,
      { SAGE_SKILLS_DIR: path.join(root, 'skills') });
    assert.equal(result.status, 1, result.stdout);
    assert.equal(result.stderr, '');
    assert.equal(JSON.parse(result.stdout).passed, false);
    assert.equal(fs.existsSync(lockPath(target)), false);
    assert.deepEqual(fs.readdirSync(directory), []);
  });
}

function fakeTool(t, source) {
  const directory = fixture(t);
  const scripts = path.join(directory, 'tools', 'fixture', 'scripts');
  fs.mkdirSync(scripts, { recursive: true });
  fs.writeFileSync(path.join(scripts, 'fixture.js'), source);
  return directory;
}

test('runner supports a trusted SAGE_SKILLS_DIR override and preserves child exit status', t => {
  const directory = fakeTool(t, 'console.log(JSON.stringify({ fixture: true })); process.exitCode = 7;\n');
  const result = run(runnerPath, ['fixture', directory, '--json'], directory, { SAGE_SKILLS_DIR: directory });
  assert.equal(result.status, 7);
  assert.equal(JSON.parse(result.stdout).fixture, true);
  assert.equal(fs.existsSync(lockPath(directory)), false);
});

test('runner does not turn a signal-terminated child into exit zero', {
  skip: process.platform === 'win32',
}, t => {
  const directory = fakeTool(t, 'process.kill(process.pid, "SIGTERM");\n');
  const result = run(runnerPath, ['fixture', directory, '--json'], directory, { SAGE_SKILLS_DIR: directory });
  assert.equal(result.status, 143, result.stderr);
  assert.equal(fs.existsSync(lockPath(directory)), false);
});

test('runner surfaces lock creation errors and never dispatches the child', t => {
  const directory = fakeTool(t, 'console.log("SHOULD_NOT_EXECUTE");\n');
  const preload = path.join(directory, 'lock-error.cjs');
  fs.writeFileSync(preload, `
    const fs = require('fs');
    const original = fs.openSync;
    fs.openSync = (file, ...args) => {
      if (String(file).endsWith('.lock')) {
        const error = new Error('fixture lock denied');
        error.code = 'EACCES';
        throw error;
      }
      return original(file, ...args);
    };
  `);
  const output = run(runnerPath, ['fixture', directory, '--json'], directory, {
    SAGE_SKILLS_DIR: directory, NODE_OPTIONS: `--require=${preload}`,
  });
  assert.equal(output.status, 1);
  assert.equal(output.stderr, '');
  assert.equal(JSON.parse(output.stdout).error.code, 'EACCES');
  assert.doesNotMatch(output.stdout, /SHOULD_NOT_EXECUTE/);
});
