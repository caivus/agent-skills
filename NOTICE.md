# 来源与修改说明

本仓库使用 [MIT License](LICENSE)。来源分为两部分，保留各自的版权与署名。

## 上游技能与工具

以下范围的原始文件来自 [telagod/code-abyss](https://github.com/telagod/code-abyss)：

- `skills/SKILL.md`
- `skills/run_skill.js`
- `skills/domains/` 全部文件
- `skills/tools/` 全部文件
- `skills/orchestration/` 全部文件

对应上游提交：[`b601b6c7a1959b5db17867b8853feee4fe2cea54`](https://github.com/telagod/code-abyss/tree/b601b6c7a1959b5db17867b8853feee4fe2cea54/skills)。导入前的 67 个文件与该提交对应路径的 Git blob 哈希一致。

原始版权声明：`Copyright (c) 2026 telagod`。原始 MIT 许可的版权、授权条款及全文已保留在本仓库的 `LICENSE` 中。

## 独立技能文档

`skills/` 下其余 159 个直属子目录中的 `SKILL.md` 由「是好正义呀」编写，以 MIT 许可发布。

## 本仓库的整理

- 将角色扮演式称呼改为普通技术表述，如用户、技能、开发指南、质量检查、协调者、执行者、审查者。
- 去除虚构角色栏目，保留任务流程、技术标识、命令、API、参数及目录路径。
- 保留 `sage`、`SAGE_SKILLS_DIR`、`pheromone` 等现有技术标识，避免破坏引用和兼容性。
- 43 份文档的正文或描述文字经过称呼整理；另为维护者提供的 159 份独立技能文档补充 `license: MIT` 元数据。
- 7 个 JavaScript 文件与 4 个 CSS 文件保持导入时的字节内容不变。
- 将 3 处文档示例中的硬编码密码替换为明确的示例占位值，不影响工具实现。
- 增加仓库说明、技能目录与许可说明。

本仓库不将上游内容声明为维护者原创。
