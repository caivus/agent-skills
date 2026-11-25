#!/usr/bin/env node
/**
 * Skills 运行入口
 * 跨平台统一调用各 skill 脚本
 *
 * 用法:
 *     node run_skill.js <skill_name> [args...]
 *
 * 示例:
 *     node run_skill.js verify-module ./my-project -v
 *     node run_skill.js verify-security ./src --json
 *     node run_skill.js verify-change --mode staged
 *     node run_skill.js verify-quality ./src
 *     node run_skill.js gen-docs ./new-module --force
 */

const { spawn } = require('child_process');
const { readdirSync, unlinkSync, closeSync, openSync } = require('fs');
const { join, resolve } = require('path');
const { createHash } = require('crypto');
const { tmpdir, constants } = require('os');
const { setTimeout: wait } = require('timers/promises');
const { createCliError, printCliError } = require('./tools/lib/shared.js');

function getSkillsDir() {
  const override = process.env.SAGE_SKILLS_DIR;
  if (override) return resolve(override);
  return __dirname;
}

function discoverSkills(skillsDir) {
  const found = Object.create(null);
  const toolsDir = join(skillsDir, 'tools');
  let entries;
  try { entries = readdirSync(toolsDir).sort(); } catch { return found; }

  for (const name of entries) {
    const scriptsDir = join(toolsDir, name, 'scripts');
    let scripts;
    try { scripts = readdirSync(scriptsDir).sort(); } catch { continue; }
    const jsFile = scripts.find(f => f.endsWith('.js'));
    if (jsFile) found[name] = join(scriptsDir, jsFile);
  }
  return found;
}

function getScriptPath(skillName) {
  const available = discoverSkills(getSkillsDir());
  if (!Object.hasOwn(available, skillName)) {
    const names = Object.keys(available).join(', ') || '(无)';
    throw createCliError('UNKNOWN_SKILL', `未知的 skill '${skillName}'；可用的 skills: ${names}`);
  }
  return available[skillName];
}

function optionFlags(args) {
  const separator = args.indexOf('--');
  return separator < 0 ? args : args.slice(0, separator);
}

// Resolve the positional target, never an option's mode/exclusion value.
function lockTarget(args) {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--') return args[i + 1] || '.';
    if (arg === '--mode') { i++; continue; }
    if (arg === '--exclude') {
      while (i + 1 < args.length && !args[i + 1].startsWith('-')) i++;
      continue;
    }
    if (!arg.startsWith('-')) return arg || '.';
  }
  return '.';
}

async function acquireTargetLock(args, { timeoutMs = 30000, retryMs = 200 } = {}) {
  const target = lockTarget(args);
  const json = optionFlags(args).includes('--json');
  const hash = createHash('md5').update(resolve(target)).digest('hex').slice(0, 12);
  const lockPath = join(tmpdir(), `sage_skill_${hash}.lock`);
  const deadline = Date.now() + timeoutMs;
  let first = true;
  while (true) {
    try {
      const fd = openSync(lockPath, 'wx');
      return { fd, lockPath };
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      if (Date.now() >= deadline) throw createCliError('LOCK_TIMEOUT', `等待锁超时: ${target}`);
      if (first && !json) console.error(`等待锁释放: ${target}`);
      first = false;
      await wait(retryMs);
    }
  }
}

function releaseLock({ fd, lockPath }) {
  if (fd !== null) {
    try { closeSync(fd); } catch {}
  }
  if (lockPath) {
    try { unlinkSync(lockPath); } catch {}
  }
}

function runChild(scriptPath, args) {
  return new Promise((resolveChild, rejectChild) => {
    const child = spawn(process.execPath, [scriptPath, ...args], { stdio: 'inherit' });
    const interrupt = () => child.kill('SIGINT');
    const terminate = () => child.kill('SIGTERM');
    process.on('SIGINT', interrupt);
    process.on('SIGTERM', terminate);
    const cleanup = () => {
      process.removeListener('SIGINT', interrupt);
      process.removeListener('SIGTERM', terminate);
    };
    child.once('error', error => { cleanup(); rejectChild(error); });
    child.once('close', (code, signal) => {
      cleanup();
      // A child terminated by a signal must never be reported as successful.
      resolveChild(code === null ? 128 + (constants.signals[signal] || 1) : code);
    });
  });
}

async function main(argv = process.argv) {
  const args = argv.slice(2);
  if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
    console.log(__filename.split(/[\\/]/).pop() + ' <skill_name> [args...]');
    process.exitCode = args.length === 0 ? 1 : 0;
    return;
  }

  const scriptArgs = args.slice(1);
  const flags = optionFlags(scriptArgs);
  let lock;
  try {
    const scriptPath = getScriptPath(args[0]);
    // Help must not wait for or create a target lock.
    if (!flags.includes('--help') && !flags.includes('-h')) {
      lock = await acquireTargetLock(scriptArgs);
    }
    process.exitCode = await runChild(scriptPath, scriptArgs);
  } catch (error) {
    printCliError(error, flags.includes('--json'));
  } finally {
    if (lock) releaseLock(lock);
  }
}

if (require.main === module) main();
module.exports = { discoverSkills, getScriptPath, lockTarget, acquireTargetLock, releaseLock, main };
