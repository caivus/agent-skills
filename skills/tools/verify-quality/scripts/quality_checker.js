#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { parseCliArgs, buildReport, hasFatal, validateDirectory, printCliError } = require(path.join(__dirname, '..', '..', 'lib', 'shared.js'));

// 质量规则配置
const MAX_LINE_LENGTH = 120;
const MAX_FUNCTION_LENGTH = 50;
const MAX_FILE_LENGTH = 500;
const MAX_COMPLEXITY = 10;
const MAX_PARAMETERS = 5;
const MIN_FUNCTION_NAME_LENGTH = 2;

const EXCLUDE_DIRS = new Set(['.git', 'node_modules', '__pycache__', '.venv', 'venv', 'dist', 'build', '.tox']);
const CODE_EXTENSIONS = new Set(['.py', '.js', '.ts', '.go', '.java', '.rs', '.c', '.cpp']);

const COMMENT_PREFIXES = {
  '.js': '//', '.ts': '//', '.go': '//', '.java': '//',
  '.c': '//', '.cpp': '//', '.rs': '//',
};

// --- Analysis ---

function throwScanError(action, target, cause) {
  const detail = cause && cause.message ? `: ${cause.message}` : '';
  const error = new Error(`${action}: ${target}${detail}`);
  error.code = (cause && cause.code) || 'SCAN_ERROR';
  error.cause = cause;
  throw error;
}

function readSourceFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    throwScanError('无法读取文件', filePath, error);
  }
}

function readDirectoryEntries(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch (error) {
    throwScanError('无法遍历目录', dir, error);
  }
}

function analyzeGenericFile(filePath) {
  const metrics = {
    path: filePath, lines: 0, code_lines: 0, comment_lines: 0,
    blank_lines: 0, functions: 0, classes: 0,
    max_complexity: 0, avg_function_length: 0,
  };
  const issues = [];
  const content = readSourceFile(filePath);

  const lines = content.split('\n');
  metrics.lines = lines.length;
  const prefix = COMMENT_PREFIXES[
    path.extname(filePath).toLowerCase()
  ] || '//';

  for (let i = 0; i < lines.length; i++) {
    const stripped = lines[i].trim();
    if (!stripped) metrics.blank_lines++;
    else if (
      stripped.startsWith(prefix) ||
      stripped.startsWith('/*') ||
      stripped.startsWith('*')
    ) metrics.comment_lines++;
    else metrics.code_lines++;

    if (lines[i].length > MAX_LINE_LENGTH) {
      issues.push({
        severity: 'info', category: '格式',
        message: `行过长 (${lines[i].length} > ${MAX_LINE_LENGTH})`,
        file_path: filePath, line_number: i + 1,
        suggestion: null,
      });
    }
  }

  if (metrics.code_lines > MAX_FILE_LENGTH) {
    issues.push({
      severity: 'warning', category: '复杂度',
      message: `文件过长 (${metrics.code_lines} 行代码 > ${MAX_FILE_LENGTH})`,
      file_path: filePath, suggestion: '考虑拆分为多个模块',
      line_number: null,
    });
  }

  return { metrics, issues };
}

function analyzePythonFile(filePath) {
  const metrics = {
    path: filePath, lines: 0, code_lines: 0, comment_lines: 0,
    blank_lines: 0, functions: 0, classes: 0,
    max_complexity: 0, avg_function_length: 0,
  };
  const issues = [];
  const content = readSourceFile(filePath);

  const lines = content.split('\n');
  metrics.lines = lines.length;
  let inMultiline = false;

  for (let i = 0; i < lines.length; i++) {
    const stripped = lines[i].trim();
    if (!stripped) { metrics.blank_lines++; }
    else if (stripped.startsWith('#')) { metrics.comment_lines++; }
    else if (stripped.includes('"""') || stripped.includes("'''")) {
      const dq = (stripped.match(/"""/g) || []).length;
      const sq = (stripped.match(/'''/g) || []).length;
      if (dq === 2 || sq === 2) { metrics.comment_lines++; }
      else { inMultiline = !inMultiline; metrics.comment_lines++; }
    } else if (inMultiline) { metrics.comment_lines++; }
    else { metrics.code_lines++; }

    if (lines[i].length > MAX_LINE_LENGTH) {
      issues.push({
        severity: 'info', category: '格式',
        message: `行过长 (${lines[i].length} > ${MAX_LINE_LENGTH})`,
        file_path: filePath, line_number: i + 1,
        suggestion: null,
      });
    }
  }

  if (metrics.code_lines > MAX_FILE_LENGTH) {
    issues.push({
      severity: 'warning', category: '复杂度',
      message: `文件过长 (${metrics.code_lines} 行代码 > ${MAX_FILE_LENGTH})`,
      file_path: filePath, suggestion: '考虑拆分为多个模块',
      line_number: null,
    });
  }

  // Regex-based Python analysis (no AST available in Node)
  const funcRegex = /^( *)(?:async\s+)?def\s+(\w+)\s*\(([^)]*)\)/gm;
  const classRegex = /^( *)class\s+(\w+)/gm;
  const functions = [];
  let match;

  while ((match = funcRegex.exec(content)) !== null) {
    const lineNum = content.substring(0, match.index).split('\n').length;
    const name = match[2];
    const indent = match[1].length;
    const params = match[3].trim()
      ? match[3].split(',').map(p => p.trim())
        .filter(p => p && p !== 'self' && p !== 'cls')
      : [];

    // Calculate function length by finding next line at same or lesser indent
    const funcLines = lines.slice(lineNum); // lines after def
    let length = 1;
    for (let j = 1; j < funcLines.length; j++) {
      const l = funcLines[j];
      if (l.trim() === '') { length++; continue; }
      const curIndent = l.match(/^(\s*)/)[1].length;
      if (curIndent <= indent && l.trim() !== '') break;
      length++;
    }

    // Estimate complexity from function body
    const bodyLines = lines.slice(lineNum, lineNum + length - 1);
    let complexity = 1;
    for (const bl of bodyLines) {
      const s = bl.trim();
      if (/^(if|elif|while|for)\s/.test(s) || /^(if|elif|while|for)\(/.test(s)) complexity++;
      if (/^except(\s|:)/.test(s)) complexity++;
      if (/\s(and|or)\s/.test(s)) complexity++;
      if (/\sfor\s/.test(s) && /\sin\s/.test(s) && (s.includes('[') || s.includes('('))) complexity++;
    }

    functions.push({ name, line: lineNum, length, complexity, parameters: params.length });
    metrics.max_complexity = Math.max(metrics.max_complexity, complexity);

    // Check function length
    if (length > MAX_FUNCTION_LENGTH) {
      issues.push({
        severity: 'warning', category: '复杂度',
        message: `函数 '${name}' 过长 (${length} 行 > ${MAX_FUNCTION_LENGTH})`,
        file_path: filePath, line_number: lineNum,
        suggestion: '考虑拆分为多个小函数',
      });
    }
    // Check complexity
    if (complexity > MAX_COMPLEXITY) {
      issues.push({
        severity: 'warning', category: '复杂度',
        message: `函数 '${name}' 圈复杂度过高 (${complexity} > ${MAX_COMPLEXITY})`,
        file_path: filePath, line_number: lineNum,
        suggestion: '减少嵌套层级，提取子函数',
      });
    }
    // Check parameter count
    if (params.length > MAX_PARAMETERS) {
      issues.push({
        severity: 'warning', category: '设计',
        message: `函数 '${name}' 参数过多 (${params.length} > ${MAX_PARAMETERS})`,
        file_path: filePath, line_number: lineNum,
        suggestion: '考虑使用配置对象或数据类封装参数',
      });
    }
    // Check naming
    const SPECIAL = new Set([
      'setUp', 'tearDown', 'setUpClass',
      'tearDownClass', 'setUpModule', 'tearDownModule',
    ]);
    if (!name.startsWith('_') && !SPECIAL.has(name) && !name.startsWith('visit_')) {
      if (!/^[a-z][a-z0-9_]*$/.test(name)) {
        issues.push({
          severity: 'info', category: '命名',
          message: `函数名 '${name}' 不符合 snake_case 规范`,
          file_path: filePath, line_number: lineNum,
          suggestion: '函数名应使用 snake_case',
        });
      }
    }
    if (name.length < MIN_FUNCTION_NAME_LENGTH) {
      issues.push({
        severity: 'warning', category: '命名',
        message: `函数名 '${name}' 过短`,
        file_path: filePath, line_number: lineNum,
        suggestion: '使用更具描述性的函数名',
      });
    }
  }

  while ((match = classRegex.exec(content)) !== null) {
    const lineNum = content.substring(0, match.index).split('\n').length;
    const name = match[2];
    metrics.classes++;
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
      issues.push({
        severity: 'warning', category: '命名',
        message: `类名 '${name}' 不符合 PascalCase 规范`,
        file_path: filePath, line_number: lineNum,
        suggestion: '类名应使用 PascalCase，如 MyClassName',
      });
    }
  }

  metrics.functions = functions.length;
  if (functions.length > 0) {
    metrics.avg_function_length = functions.reduce((s, f) => s + f.length, 0) / functions.length;
  }

  return { metrics, issues };
}

// --- Directory scan ---

function scanDirectory(scanPath, excludeDirs) {
  const resolved = validateDirectory(scanPath);
  const exclude = excludeDirs instanceof Set
    ? excludeDirs
    : new Set(excludeDirs || EXCLUDE_DIRS);
  const result = {
    scan_path: resolved, files_scanned: 0,
    total_lines: 0, total_code_lines: 0,
    issues: [], file_metrics: [],
  };

  function walk(dir) {
    const entries = readDirectoryEntries(dir);
    for (const entry of entries) {
      if (exclude.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { walk(full); continue; }
      const ext = path.extname(entry.name).toLowerCase();
      if (!CODE_EXTENSIONS.has(ext)) continue;

      result.files_scanned++;
      const { metrics, issues } = ext === '.py' ? analyzePythonFile(full) : analyzeGenericFile(full);
      result.file_metrics.push(metrics);
      result.issues.push(...issues);
      result.total_lines += metrics.lines;
      result.total_code_lines += metrics.code_lines;
    }
  }

  walk(resolved);
  return result;
}

// --- Reporting ---

function passed(result) { return !hasFatal(result.issues); }

function formatReport(result, verbose) {
  const errs = result.issues.filter(i => i.severity === 'error').length;
  const warns = result.issues.filter(i => i.severity === 'warning').length;
  const fields = {
    '扫描路径': result.scan_path,
    '扫描文件': result.files_scanned,
    '总行数': result.total_lines,
    '代码行数': result.total_code_lines,
    '检查结果': passed(result) ? '✓ 通过' : '✗ 需要关注',
    '统计': `错误: ${errs} | 警告: ${warns}`,
  };
  let report = buildReport(
    '代码质量检查报告', fields, result.issues, verbose, 'category'
  );

  if (verbose && result.file_metrics.length) {
    const complex = result.file_metrics
      .filter(m => m.max_complexity > 0)
      .sort((a, b) => b.max_complexity - a.max_complexity)
      .slice(0, 5);
    if (complex.length) {
      const lines = ['\n' + '-'.repeat(40), '复杂度最高的文件:', '-'.repeat(40)];
      for (const m of complex) lines.push(`  ${m.path}: 复杂度 ${m.max_complexity}, ${m.functions} 个函数`);
      report += '\n' + lines.join('\n');
    }
  }
  return report;
}

// --- CLI ---

function printHelp() {
  console.log([
    '用法: node quality_checker.js [path] [options]',
    '',
    '检查代码质量；path 默认为当前目录。',
    '  -v, --verbose       显示详细问题与复杂度信息',
    '  --json              输出 JSON 报告',
    '  --exclude dir1 dir2 排除指定目录（默认目录仍会排除）',
    '  -h, --help          显示帮助，不执行检查',
  ].join('\n'));
}

function main(argv = process.argv) {
  let opts;
  try {
    opts = parseCliArgs(argv);
    if (opts.help) {
      printHelp();
      return;
    }

    const excludeDirs = opts.exclude
      ? new Set([...EXCLUDE_DIRS, ...opts.exclude])
      : EXCLUDE_DIRS;
    const result = scanDirectory(opts.target, excludeDirs);

    if (opts.json) {
      const output = {
        scan_path: result.scan_path,
        files_scanned: result.files_scanned,
        total_lines: result.total_lines,
        total_code_lines: result.total_code_lines,
        passed: passed(result),
        error_count: result.issues.filter(i => i.severity === 'error').length,
        warning_count: result.issues.filter(i => i.severity === 'warning').length,
        issues: result.issues,
      };
      console.log(JSON.stringify(output, null, 2));
    } else {
      console.log(formatReport(result, opts.verbose));
    }

    process.exitCode = passed(result) ? 0 : 1;
  } catch (error) {
    printCliError(error, Boolean(opts?.json || error.json));
  }
}

if (require.main === module) main();

module.exports = {
  analyzeGenericFile,
  analyzePythonFile,
  scanDirectory,
  formatReport,
  main,
};
