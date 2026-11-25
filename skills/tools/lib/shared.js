'use strict';

/**
 * 验证工具共享库
 * 消灭 verify-* 脚本间的重复代码
 */

// --- CLI 参数解析 ---

function createCliError(code, message, json = false) {
  const error = new Error(message);
  error.code = code;
  error.json = json;
  return error;
}

function parseCliArgs(argv, extraFlags) {
  const args = argv.slice(2);
  const result = { target: '.', verbose: false, json: false, ...extraFlags };
  const separator = args.indexOf('--');
  const flags = separator < 0 ? args : args.slice(0, separator);
  const jsonRequested = flags.includes('--json');
  // Only options before -- can request help or JSON output.
  if (flags.includes('-h') || flags.includes('--help')) {
    return { ...result, help: true, json: jsonRequested };
  }
  const fail = message => { throw createCliError('INVALID_ARGUMENT', message, jsonRequested); };
  let targetSeen = false;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-v' || arg === '--verbose') result.verbose = true;
    else if (arg === '--json') result.json = true;
    else if (arg === '--mode') {
      if (!args[i + 1] || args[i + 1].startsWith('-')) fail('--mode 需要一个值');
      result.mode = args[++i];
    } else if (arg === '--exclude') {
      const values = [];
      while (i + 1 < args.length && !args[i + 1].startsWith('-')) values.push(args[++i]);
      if (!values.length) fail('--exclude 需要至少一个目录名');
      result.exclude = [...(result.exclude || []), ...values];
    } else if (arg === '--') {
      const remaining = args.slice(i + 1);
      if (remaining.length > 1 || (targetSeen && remaining.length)) fail('只能指定一个目标路径');
      if (remaining.length) {
        result.target = remaining[0];
        targetSeen = true;
      }
      break;
    } else if (arg.startsWith('-')) {
      fail(`未知参数: ${arg}`);
    } else {
      if (targetSeen) fail('只能指定一个目标路径');
      result.target = arg;
      targetSeen = true;
    }
  }
  if (typeof result.target !== 'string' || result.target.length === 0) fail('目标路径不能为空');
  return result;
}

function validateDirectory(target) {
  if (typeof target !== 'string' || target.length === 0) {
    throw createCliError('INVALID_ARGUMENT', '目标路径不能为空');
  }
  const fs = require('fs');
  const folder = require('path').resolve(target);
  let stat;
  try {
    stat = fs.statSync(folder);
  } catch (error) {
    if (error.code === 'ENOENT') throw createCliError('ENOENT', `路径不存在: ${folder}`);
    throw error;
  }
  if (!stat.isDirectory()) throw createCliError('ENOTDIR', `不是目录: ${folder}`);
  return folder;
}

function printCliError(error, json = false) {
  const detail = { code: error.code || 'CLI_ERROR', message: error.message || String(error) };
  if (json) console.log(JSON.stringify({ passed: false, error: detail }, null, 2));
  else console.error(`错误 [${detail.code}]: ${detail.message}`);
  process.exitCode = 1;
}

// --- 报告格式化 ---

const SEP = '='.repeat(60);
const DASH = '-'.repeat(40);
const ICONS = {
  error: '\u2717', warning: '\u26A0', info: '\u2139',
  critical: '\u{1F534}', high: '\u{1F7E0}', medium: '\u{1F7E1}', low: '\u{1F535}'
};

function reportHeader(title, fields) {
  const lines = [SEP, title, SEP];
  for (const [k, v] of Object.entries(fields)) {
    lines.push(`\n${k}: ${v}`);
  }
  return lines;
}

function reportIssues(issues, verbose, groupBy) {
  if (!issues.length) return [];
  const lines = ['\n' + DASH, '问题列表:', DASH];

  if (groupBy) {
    const groups = {};
    for (const i of issues) (groups[i[groupBy]] || (groups[i[groupBy]] = [])).push(i);
    for (const cat of Object.keys(groups).sort()) {
      const items = groups[cat];
      lines.push(`\n【${cat}】(${items.length} 个)`);
      for (const i of items.slice(0, 10)) {
        lines.push(`  ${ICONS[i.severity] || '\u2139'} ` +
          `${i.file_path || ''}${i.line_number ? ':' + i.line_number : ''}`);
        lines.push(`    ${i.message}`);
        if (verbose && i.suggestion) lines.push(`    \u{1F4A1} ${i.suggestion}`);
        if (verbose && i.recommendation) lines.push(`    \u{1F4A1} ${i.recommendation}`);
      }
      if (items.length > 10) lines.push(`  ... 及其他 ${items.length - 10} 个问题`);
    }
  } else {
    for (const i of issues) {
      const icon = ICONS[i.severity] || '\u2139';
      lines.push(`  ${icon} [${i.severity.toUpperCase()}] ${i.message}`);
      if (i.path && verbose) lines.push(`    路径: ${i.path}`);
    }
  }
  return lines;
}

function reportFooter() { return ['\n' + SEP]; }

function buildReport(title, fields, issues, verbose, groupBy) {
  return [...reportHeader(title, fields), ...reportIssues(issues, verbose, groupBy), ...reportFooter()].join('\n');
}

// --- 通用计数 ---

function countBySeverity(issues, field) {
  field = field || 'severity';
  const counts = {};
  for (const i of issues) counts[i[field]] = (counts[i[field]] || 0) + 1;
  return counts;
}

function hasFatal(issues, fatalLevels) {
  fatalLevels = fatalLevels || ['error'];
  return issues.some(i => fatalLevels.includes(i.severity));
}

module.exports = {
  parseCliArgs, validateDirectory, printCliError, createCliError, buildReport, reportHeader, reportIssues,
  reportFooter, countBySeverity, hasFatal, SEP, DASH, ICONS
};
