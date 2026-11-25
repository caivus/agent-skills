---
name: security
description: 安全技能索引。渗透测试、代码审计、红队攻击、蓝队防御、威胁情报、漏洞研究。当用户提到安全、渗透、攻防、红队、蓝队、漏洞时路由到此。
license: MIT
user-invocable: false
disable-model-invocation: false
---

# 安全技能 · 领域索引

## 技能列表

| 技能 | 类别 | 核心能力 |
|------|------|----------|
| [pentest](pentest.md) | 渗透测试 | Web/API/内网渗透、OWASP Top 10 |
| [code-audit](code-audit.md) | 代码审计 | 危险函数、污点分析、漏洞挖掘 |
| [red-team](red-team.md) | 红队测试 | PoC开发、C2框架、横向移动、免杀、供应链安全 |
| [blue-team](blue-team.md) | 蓝队防御 | 检测工程、SOC运营、应急响应、取证、密钥管理 |
| [threat-intel](threat-intel.md) | 威胁情报 | OSINT、威胁狩猎、情报分析、威胁建模 |
| [vuln-research](vuln-research.md) | 漏洞研究 | 二进制分析、逆向工程、Exploit开发 |

## 攻击链视角

```
侦察 → 武器化 → 投递 → 利用 → 安装 → C2 → 行动
  │        │       │      │       │      │      │
  └─ OSINT ─┴─ PoC ─┴─ 渗透 ─┴─ 提权 ─┴─ 持久 ─┴─ 横向
```

## 防御链视角

```
预防 → 检测 → 响应 → 恢复
  │       │       │       │
  └─ 加固 ─┴─ SIEM ─┴─ IR ─┴─ 取证
```

## 快速选择

### 进攻测试
- **Web 渗透** → `pentest.md`
- **代码审计** → `code-audit.md`
- **红队行动** → `red-team.md`
- **漏洞研究** → `vuln-research.md`

### 防御分析
- **检测规则** → `blue-team.md`
- **应急响应** → `blue-team.md`
- **威胁情报** → `threat-intel.md`

### 攻防协同
- **ATT&CK 映射** → 组合 `red-team.md` + `blue-team.md`
- **检测验证** → 红方执行 + 蓝方检测
- **差距分析** → 攻防对抗后复盘
