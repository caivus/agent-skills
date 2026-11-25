'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const repoRoot = path.resolve(__dirname, '..');
const qualityCli = path.join(repoRoot, 'skills/tools/verify-quality/scripts/quality_checker.js');
const securityCli = path.join(repoRoot, 'skills/tools/verify-security/scripts/security_scanner.js');
const temporaryRoots = [];

function fixtureRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-scanners-'));
  temporaryRoots.push(root);
  return root;
}

function writeFixture(root, relative, content) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
  return file;
}

function run(cli, args, options = {}) {
  return spawnSync(process.execPath, [...(options.preload ? ['--require', options.preload] : []), cli, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    timeout: 60000,
    env: { ...process.env, ...(options.env || {}) },
  });
}

function jsonResult(result) {
  assert.equal(result.error, undefined, result.error && result.error.message);
  return JSON.parse(result.stdout);
}

function assertOperationalFailure(result) {
  assert.notEqual(result.status, 0);
  const output = JSON.parse(result.stdout);
  assert.equal(output.passed, false);
  assert.equal(typeof output.error.code, 'string');
  assert.equal(typeof output.error.message, 'string');
  assert.equal(result.stderr, '');
}

test.after(() => {
  for (const root of temporaryRoots) fs.rmSync(root, { recursive: true, force: true });
});

test('both scanners reject missing and file targets in text and JSON modes', () => {
  const root = fixtureRoot();
  const missing = path.join(root, 'does-not-exist');
  const file = writeFixture(root, 'target.js', 'const safe = true;\n');

  for (const cli of [qualityCli, securityCli]) {
    for (const target of [missing, file]) {
      const text = run(cli, [target]);
      assert.notEqual(text.status, 0);
      assert.equal(text.stdout, '');
      assert.notEqual(text.stderr, '');

      const json = run(cli, [target, '--json']);
      assertOperationalFailure(json);
    }
  }
});

test('help has priority over invalid targets, including --json', () => {
  const missing = path.join(os.tmpdir(), 'scanner-help-target-does-not-exist');
  for (const cli of [qualityCli, securityCli]) {
    for (const flags of [['--help', '--json'], ['-h', '--json']]) {
      const result = run(cli, [...flags, missing]);
      assert.equal(result.status, 0);
      assert.match(result.stdout, /quality_checker|security_scanner|帮助|help/i);
      assert.equal(result.stderr, '');
    }
  }
});

test('valid empty directories pass with zero scanned files', () => {
  const root = fixtureRoot();
  for (const cli of [qualityCli, securityCli]) {
    const result = run(cli, [root, '--json']);
    assert.equal(result.status, 0);
    const output = jsonResult(result);
    assert.equal(output.passed, true);
    assert.equal(output.files_scanned, 0);
    assert.equal(output.error, undefined);
  }
});

test('both scanners scan a benign source fixture successfully', () => {
  const root = fixtureRoot();
  writeFixture(root, 'src/safe.js', 'function add(left, right) { return left + right; }\n');
  for (const cli of [qualityCli, securityCli]) {
    const result = run(cli, [root, '--json']);
    assert.equal(result.status, 0);
    const output = jsonResult(result);
    assert.equal(output.passed, true);
    assert.equal(output.files_scanned, 1);
  }
});

test('security keeps generic dangerous-input detection and finding metadata', () => {
  const root = fixtureRoot();
  writeFixture(root, 'src/unsafe.js', 'element.innerHTML = userInput;\n');
  const result = run(securityCli, [root, '--json']);
  assert.equal(result.status, 1);
  const output = jsonResult(result);
  assert.equal(output.passed, false);
  assert.equal(output.findings.length, 1);
  const finding = output.findings[0];
  assert.equal(finding.rule_id, 'XSS_INNERHTML');
  assert.equal(finding.line_number, 1);
  assert.equal(finding.severity, 'high');
  assert.equal(finding.line_content, '[redacted]');
  assert.equal(typeof finding.recommendation, 'string');
});

test('synthetic credentials never appear in JSON or verbose reports', () => {
  const root = fixtureRoot();
  const synthetic = `SYNTHETIC_DO_NOT_USE_${Date.now()}_CREDENTIAL`;
  writeFixture(root, 'src/credential.js', `const api_key = "${synthetic}";\n`);

  for (const args of [['--json', '-v'], ['-v']]) {
    const result = run(securityCli, [root, ...args]);
    assert.equal(result.status, 1);
    assert.equal(result.stdout.includes(synthetic), false);
    assert.equal(result.stderr.includes(synthetic), false);
    if (args.includes('--json')) {
      const output = jsonResult(result);
      assert.equal(output.findings[0].line_content, '[redacted]');
    }
  }
});

test('default excluded directories are not scanned', () => {
  const root = fixtureRoot();
  writeFixture(root, 'safe.js', 'const safe = true;\n');
  writeFixture(root, 'node_modules/unsafe.js', 'element.innerHTML = userInput;\n');
  writeFixture(root, 'tests/unsafe.js', 'element.innerHTML = userInput;\n');
  const result = run(securityCli, [root, '--json']);
  assert.equal(result.status, 0);
  const output = jsonResult(result);
  assert.equal(output.passed, true);
  assert.equal(output.files_scanned, 1);
  assert.equal(output.findings.length, 0);
});

test('unknown flags and missing option values are operational JSON errors', () => {
  const root = fixtureRoot();
  for (const cli of [qualityCli, securityCli]) {
    for (const args of [['--json', '--unknown'], [root, '--json', '--exclude'], [root, '--json', '--mode']]) {
      const result = run(cli, args);
      assertOperationalFailure(result);
    }
  }
});

test('read failures are not converted into passing scans', () => {
  const root = fixtureRoot();
  const blocked = writeFixture(root, 'blocked.js', 'const safe = true;\n');
  const preload = writeFixture(root, 'read-failure-preload.js', `
    const fs = require('node:fs');
    const original = fs.readFileSync;
    fs.readFileSync = function (file, ...args) {
      if (String(file) === ${JSON.stringify(blocked)}) {
        const error = new Error('synthetic read failure');
        error.code = 'EIO';
        throw error;
      }
      return original.call(this, file, ...args);
    };
  `);
  for (const cli of [qualityCli, securityCli]) {
    const result = run(cli, [root, '--json'], { preload });
    assertOperationalFailure(result);
    assert.equal(result.stdout.includes('passed": true'), false);
  }
});

test('traversal failures are not converted into passing scans', () => {
  const root = fixtureRoot();
  const preload = writeFixture(root, 'walk-failure-preload.js', `
    const fs = require('node:fs');
    const original = fs.readdirSync;
    fs.readdirSync = function (directory, ...args) {
      if (String(directory) === ${JSON.stringify(root)}) {
        const error = new Error('synthetic traversal failure');
        error.code = 'EACCES';
        throw error;
      }
      return original.call(this, directory, ...args);
    };
  `);
  for (const cli of [qualityCli, securityCli]) {
    const result = run(cli, [root, '--json'], { preload });
    assertOperationalFailure(result);
  }
});

test('additional exclusions extend rather than replace defaults in both scanners', () => {
  const root = fixtureRoot();
  writeFixture(root, 'safe.js', 'const safe = true;\n');
  writeFixture(root, 'node_modules/dependency.js', 'element.innerHTML = userInput;\n');
  writeFixture(root, 'vendor/ignored.js', 'element.innerHTML = userInput;\n');
  for (const cli of [qualityCli, securityCli]) {
    const result = run(cli, [root, '--exclude', 'vendor', '--json']);
    assert.equal(result.status, 0, result.stderr);
    const output = jsonResult(result);
    assert.equal(output.passed, true);
    assert.equal(output.files_scanned, 1);
  }
});

test('quality warnings preserve their original passing exit status and metadata', () => {
  const root = fixtureRoot();
  writeFixture(root, 'src/naming.py', 'def x(a, b, c, d, e, f):\n    return a\n');
  const result = run(qualityCli, [root, '--json']);
  assert.equal(result.status, 0, result.stderr);
  const output = jsonResult(result);
  assert.equal(output.passed, true);
  assert.equal(output.files_scanned, 1);
  assert.ok(output.warning_count >= 2);
  assert.ok(output.issues.some(issue => issue.severity === 'warning' && issue.line_number === 1));
});
