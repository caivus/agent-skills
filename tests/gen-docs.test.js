'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');

const cli = path.resolve(__dirname, '../skills/tools/gen-docs/scripts/doc_generator.js');

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gen-docs-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const target = path.join(root, 'sample module');
  fs.mkdirSync(target);
  fs.writeFileSync(path.join(target, 'main.js'), 'function example() { return 42; }\n');
  return { root, target };
}

function run(cwd, ...args) {
  const child = spawnSync(process.execPath, [cli, ...args], {
    cwd, encoding: 'utf8', timeout: 15000,
  });
  assert.ifError(child.error);
  assert.equal(child.signal, null, child.stderr);
  return child;
}

function json(child) {
  assert.equal(child.stderr, '', child.stderr);
  return JSON.parse(child.stdout);
}

function digest(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function assertFailure(child) {
  assert.notEqual(child.status, 0, child.stdout);
  const report = json(child);
  assert.equal(report.passed, false);
  assert.equal(typeof report.error.code, 'string');
  assert.ok(report.error.code.length > 0);
  assert.equal(typeof report.error.message, 'string');
  assert.ok(report.error.message.length > 0);
  return report;
}

for (const [flag, expected] of [
  [null, ['DESIGN.md', 'README.md']],
  ['--readme-only', ['README.md']],
  ['--design-only', ['DESIGN.md']],
]) {
  test(`generation selection: ${flag || 'default both'}`, t => {
    const { root, target } = fixture(t);
    const child = run(root, target, '--json', ...(flag ? [flag] : []));
    assert.equal(child.status, 0, child.stderr);
    const report = json(child);
    assert.equal(report.status, 'success');
    for (const [key, name] of [['readme', 'README.md'], ['design', 'DESIGN.md']]) {
      const wanted = expected.includes(name);
      assert.equal(fs.existsSync(path.join(target, name)), wanted);
      assert.equal(report[key], wanted ? path.join(target, name) : null);
      if (wanted) assert.match(fs.readFileSync(path.join(target, name), 'utf8'), /^# sample module/);
    }
    assert.deepEqual(fs.readdirSync(target).sort(), [...expected, 'main.js'].sort());
    assert.deepEqual(fs.readdirSync(root), ['sample module']);
  });
}

test('no target defaults to the isolated working directory', t => {
  const { target } = fixture(t);
  const child = run(target, '--readme-only', '--json');
  assert.equal(child.status, 0, child.stderr);
  assert.equal(json(child).readme, path.join(target, 'README.md'));
  assert.equal(fs.existsSync(path.join(target, 'DESIGN.md')), false);
});

test('conflicting single-document flags fail before writing', t => {
  const { root, target } = fixture(t);
  assertFailure(run(root, target, '--readme-only', '--design-only', '--json'));
  assert.deepEqual(fs.readdirSync(target), ['main.js']);
  assert.deepEqual(fs.readdirSync(root), ['sample module']);
});

for (const flag of [null, '--readme-only', '--design-only']) {
  test(`existing documents remain byte-for-byte unchanged: ${flag || 'default'}`, t => {
    const { root, target } = fixture(t);
    const originals = new Map([
      ['README.md', Buffer.from('Custom README\r\nDo not replace.\n')],
      ['DESIGN.md', Buffer.from('Custom DESIGN\r\nDo not replace.\n')],
    ]);
    const hashes = new Map();
    for (const [name, content] of originals) {
      fs.writeFileSync(path.join(target, name), content);
      hashes.set(name, digest(path.join(target, name)));
    }
    const child = run(root, target, '--json', ...(flag ? [flag] : []));
    assert.equal(child.status, 0, child.stderr);
    const report = json(child);
    assert.equal(report.readme, null);
    assert.equal(report.design, null);
    for (const [name, content] of originals) {
      assert.deepEqual(fs.readFileSync(path.join(target, name)), content);
      assert.equal(digest(path.join(target, name)), hashes.get(name));
    }
  });
}

for (const [flag, selected] of [
  [null, ['README.md', 'DESIGN.md']],
  ['--readme-only', ['README.md']],
  ['--design-only', ['DESIGN.md']],
]) {
  test(`force replaces only selected documents: ${flag || 'default both'}`, t => {
    const { root, target } = fixture(t);
    const original = Buffer.from('Operator-authored content\r\n');
    const before = {};
    for (const name of ['README.md', 'DESIGN.md']) {
      fs.writeFileSync(path.join(target, name), original);
      before[name] = digest(path.join(target, name));
    }
    const child = run(root, target, '--json', '--force', ...(flag ? [flag] : []));
    assert.equal(child.status, 0, child.stderr);
    const report = json(child);
    for (const [key, name] of [['readme', 'README.md'], ['design', 'DESIGN.md']]) {
      const file = path.join(target, name);
      if (selected.includes(name)) {
        assert.notEqual(digest(file), before[name]);
        assert.match(fs.readFileSync(file, 'utf8'), /^# sample module/);
        assert.equal(report[key], file);
      } else {
        assert.equal(digest(file), before[name]);
        assert.deepEqual(fs.readFileSync(file), original);
        assert.equal(report[key], null);
      }
    }
  });
}

for (const kind of ['missing', 'file']) {
  test(`${kind} target fails without creating documents anywhere`, t => {
    const { root } = fixture(t);
    const target = path.join(root, kind === 'missing' ? 'missing/nested' : 'plain-file');
    if (kind === 'file') fs.writeFileSync(target, 'unchanged target\n');
    const before = fs.readdirSync(root).sort();
    const report = assertFailure(run(root, target, '--json'));
    assert.equal(report.error.code, kind === 'missing' ? 'ENOENT' : 'ENOTDIR');
    assert.deepEqual(fs.readdirSync(root).sort(), before);
    assert.equal(fs.existsSync(path.join(root, 'README.md')), false);
    assert.equal(fs.existsSync(path.join(root, 'DESIGN.md')), false);
    if (kind === 'file') assert.equal(fs.readFileSync(target, 'utf8'), 'unchanged target\n');
    else assert.equal(fs.existsSync(path.join(root, 'missing')), false);
  });
}

for (const help of ['--help', '-h']) {
  for (const kind of ['missing', 'file']) {
    test(`${help} bypasses a ${kind} target, including JSON mode`, t => {
      const { root } = fixture(t);
      const target = path.join(root, kind);
      if (kind === 'file') fs.writeFileSync(target, 'unchanged target\n');
      const before = fs.readdirSync(root).sort();
      for (const args of [[target, help], [help, '--json', target], [target, '--json', help]]) {
        const child = run(root, ...args);
        assert.equal(child.status, 0, child.stderr);
        assert.equal(child.stderr, '');
        assert.match(child.stdout, /Usage:.*doc_generator\.js/);
      }
      assert.deepEqual(fs.readdirSync(root).sort(), before);
      if (kind === 'file') assert.equal(fs.readFileSync(target, 'utf8'), 'unchanged target\n');
    });
  }
}

for (const args of [
  ['--unknown'], ['-x'], ['--force=true'], ['--json=true'],
  ['--readme-only=true'], ['--design-only=false'], ['-ff'],
  ['extra-target'], [''], ['--', 'extra-target'],
]) {
  test(`invalid arguments fail without writes: ${JSON.stringify(args)}`, t => {
    const { root, target } = fixture(t);
    assertFailure(run(root, '--json', target, ...args));
    assert.deepEqual(fs.readdirSync(target), ['main.js']);
    assert.deepEqual(fs.readdirSync(root), ['sample module']);
  });
}

test('human-readable argument errors go to stderr and fail', t => {
  const { root, target } = fixture(t);
  const child = run(root, target, '--unknown');
  assert.notEqual(child.status, 0);
  assert.equal(child.stdout, '');
  assert.ok(child.stderr.trim());
  assert.deepEqual(fs.readdirSync(target), ['main.js']);
});

test('end-of-options allows a directory name beginning with a dash', t => {
  const { root } = fixture(t);
  const target = path.join(root, '--readme-only');
  fs.mkdirSync(target);
  const child = run(root, '--json', '--', '--readme-only');
  assert.equal(child.status, 0, child.stderr);
  const report = json(child);
  assert.equal(report.readme, path.join(target, 'README.md'));
  assert.equal(report.design, path.join(target, 'DESIGN.md'));
});

for (const existing of ['README.md', 'DESIGN.md']) {
  test(`default creates the missing document without overwriting ${existing}`, t => {
    const { root, target } = fixture(t);
    const original = Buffer.from('Keep existing content\r\n');
    const existingPath = path.join(target, existing);
    fs.writeFileSync(existingPath, original);
    const before = digest(existingPath);
    const child = run(root, target, '--json');
    assert.equal(child.status, 0, child.stderr);
    const report = json(child);
    const missing = existing === 'README.md' ? 'DESIGN.md' : 'README.md';
    assert.equal(report[existing === 'README.md' ? 'readme' : 'design'], null);
    assert.equal(report[missing === 'README.md' ? 'readme' : 'design'], path.join(target, missing));
    assert.equal(digest(existingPath), before);
    assert.deepEqual(fs.readFileSync(existingPath), original);
    assert.match(fs.readFileSync(path.join(target, missing), 'utf8'), /^# sample module/);
  });
}

test('short force alias remains supported with a single-document selection', t => {
  const { root, target } = fixture(t);
  const readme = path.join(target, 'README.md');
  fs.writeFileSync(readme, 'Replace me\n');
  const before = digest(readme);
  const child = run(root, '-f', '--readme-only', target, '--json');
  assert.equal(child.status, 0, child.stderr);
  assert.equal(json(child).readme, readme);
  assert.notEqual(digest(readme), before);
  assert.equal(fs.existsSync(path.join(target, 'DESIGN.md')), false);
});

test('an unknown flag without a target cannot generate into cwd', t => {
  const { root } = fixture(t);
  assertFailure(run(root, '--unknown', '--json'));
  assert.deepEqual(fs.readdirSync(root), ['sample module']);
});
