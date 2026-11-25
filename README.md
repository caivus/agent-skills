# Agent Skills

面向 AI 编程助手的中文技能集合，覆盖软件开发、UI/UX、架构、AI 应用、安全分析、工程运维和多 Agent 协作。

**180 份技能说明 · 5 个命令行工具 · MIT License**

本仓库直接提供目录和源文件，不以压缩包作为主要内容。角色化称呼已整理为普通技术表述，保留原有技术流程和代码资源。

- [完整技能目录](CATALOG.md)
- [领域总入口](skills/SKILL.md)
- [来源与修改说明](NOTICE.md)
- [MIT 许可证](LICENSE)

## 这是什么

每份 `SKILL.md` 描述一类任务的适用场景、工作流程、检查项和输出要求，供 AI 助手按需读取。它们是可复用的任务指导，不是模型权重，也不代表助手已经安装了文档中提及的全部工具。

技能资源共 226 个文件：215 份 Markdown、7 个 JavaScript 文件、4 个 CSS 文件。其中有 180 份 `SKILL.md`，包含 159 个独立技能及 21 份入口、领域和工具技能说明。

## 内容概览

| 方向 | 示例 |
|---|---|
| 软件开发 | Swift/iOS、Python、Go、Rust、C/C++、Java、TypeScript、前端框架 |
| 界面设计 | UI 美学、组件模式、UX、无障碍、软陶、毛玻璃、新粗野主义、液态玻璃 |
| 架构与数据 | API、缓存、消息队列、数据库、数据工程、基础设施 |
| AI 应用 | Agent、RAG、提示词、评估、LLM 安全 |
| 工程运维 | Git、测试、CI/CD、可观测性、性能和成本优化 |
| 安全分析 | 代码审计、漏洞研究、红蓝队、威胁情报、取证 |
| 协作流程 | 任务拆分、多 Agent 调度、文件分工、变更和质量检查 |

## 使用方式

先克隆仓库：

```bash
git clone https://github.com/caivus/agent-skills.git
cd agent-skills
```

### 1. 按需读取技能

从 [技能目录](CATALOG.md) 选择相关条目，让 AI 助手读取对应 `SKILL.md`；如文档引用 `references/` 或 `scripts/`，保留这些相对路径。

例如：

```text
请先读取 skills/swift-ios-dev/SKILL.md，再检查当前 iOS 工程。

请读取 skills/domains/frontend-design/glassmorphism/SKILL.md，
结合 references 中的样式变量设计页面。
```

支持技能导入的编程助手，可按其自身规范导入所需技能目录。不建议把全部文档同时塞进一个系统提示词。

### 2. 运行附带工具

需要 **Node.js 18 或更新版本**。工具仅使用 Node.js 内置模块，无须安装 npm 依赖；变更分析另需 Git。

在仓库根目录执行：

```bash
# 生成目标模块的 README.md 和 DESIGN.md 骨架
node skills/run_skill.js gen-docs /path/to/module

# 检查模块结构与文档
node skills/run_skill.js verify-module /path/to/module --json

# 启发式代码质量检查
node skills/run_skill.js verify-quality /path/to/source --json

# 按规则匹配可疑安全模式
node skills/run_skill.js verify-security /path/to/source --json
```

变更分析需要在待分析的 Git 仓库中运行：

```bash
cd /path/to/your-project
node /path/to/agent-skills/skills/run_skill.js verify-change --mode staged --json
```

`gen-docs` 默认保留已存在的文档；`--force` 会覆盖目标文档，使用前确认目标路径。

## 目录结构

```text
agent-skills/
├── skills/
│   ├── <skill-name>/SKILL.md    # 159 个独立技能
│   ├── domains/                # 领域入口、参考文档和设计资源
│   ├── tools/                  # 5 个工具及共享库
│   ├── orchestration/          # 多 Agent 协作说明
│   ├── run_skill.js            # 工具运行入口
│   └── SKILL.md                # 领域总入口
├── CATALOG.md
├── NOTICE.md
├── LICENSE
└── README.md
```

## 兼容性与检查边界

- 文档中部分工具名和协作 API 面向 Claude Code 或 Codex，使用时应映射到当前助手真实支持的工具；文档本身不会创建这些能力。
- 附带检查工具主要基于规则和启发式分析，不等同于编译器、类型检查器、完整测试套件或完整漏洞分析引擎。
- 目录与技术标识保持稳定；本次整理不重写工具实现，也不承诺所有参考示例已在每种宿主环境运行验证。

## 已验证行为与已知问题

7 个 JavaScript 文件均通过 `node --check`。在独立的小型测试目录中，文档生成、已有文档保留、模块检查、质量检查、安全检查、工具调度，以及有效 Git 仓库的工作区和暂存区分析均完成了基础运行测试；这不包含全面的检测准确率评估。

以下原有行为已复现，此次称呼整理未修改工具实现：

| 工具／场景 | 当前行为 |
|---|---|
| `gen-docs --readme-only` / `--design-only` | 参数未实际生效，仍生成两份文档。 |
| `verify-quality` / `verify-security` 的目标路径不存在 | 可能返回退出码 0、`passed: true`，但扫描文件数为 0。 |
| `verify-change` 在非 Git 仓库中运行 | Git 错误被转为空结果，可能报告通过。 |
| 模块检查、质量检查、变更分析的 `--help` | 未正常转入帮助输出；与 `--json` 组合时仍执行分析。 |
| 安全扫描的 JSON 报告 | `line_content` 含匹配的源码原文；若源码中有凭据，报告也会包含相应片段。 |

解释检查结果时应同时核对目标路径、Git 仓库状态和扫描文件数，不能只依据退出码或 `passed` 字段。

## 许可与来源

本仓库按 [MIT](LICENSE) 发布，允许使用、修改、再分发和商用，需保留版权与许可声明。

上游 `telagod/code-abyss` 的内容保留原作者版权；独立技能文档由本仓库维护者提供并按 MIT 发布。具体范围见 [NOTICE.md](NOTICE.md)。
