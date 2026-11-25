# 技能目录

共 180 份 `SKILL.md`。每个条目链接到对应源文件；同名的领域入口与独立技能分别保留。

[返回说明](README.md) · [来源与许可](NOTICE.md)

## 总入口（1）

| 技能 | 路径 | 说明 |
|---|---|---|
| `sage` | [skills/SKILL.md](skills/SKILL.md) | AI 技能库总入口。按任务类型选择专业技能。当用户需要任何开发、安全、架构、DevOps、AI 相关能力时，通过此入口路由到最匹配的专业技能。 |

## 领域与设计技能（14）

| 技能 | 路径 | 说明 |
|---|---|---|
| `ai` | [skills/domains/ai/SKILL.md](skills/domains/ai/SKILL.md) | AI/LLM 能力索引。Agent 开发、LLM 安全、RAG 系统。当用户提到 AI、LLM、Agent、RAG、Prompt 时路由到此。 |
| `architecture` | [skills/domains/architecture/SKILL.md](skills/domains/architecture/SKILL.md) | 架构设计能力索引。API设计、安全架构、云原生、数据安全。当用户提到架构、设计、API、云原生时路由到此。 |
| `data-engineering` | [skills/domains/data-engineering/SKILL.md](skills/domains/data-engineering/SKILL.md) | 数据工程。Airflow、Dagster、Kafka Streams、Flink、dbt、数据管道、流处理、数据质量。当用户提到数据管道、ETL、流处理、数据质量时路由到此。 |
| `development` | [skills/domains/development/SKILL.md](skills/domains/development/SKILL.md) | 开发语言能力索引。Python、Go、Rust、TypeScript、Java、C++、Shell。当用户提到编程、开发、代码、语言时路由到此。 |
| `devops` | [skills/domains/devops/SKILL.md](skills/domains/devops/SKILL.md) | DevOps 能力索引。Git、测试、DevSecOps、数据库。当用户提到 DevOps、CI/CD、Git、测试时路由到此。 |
| `frontend-design` | [skills/domains/frontend-design/SKILL.md](skills/domains/frontend-design/SKILL.md) | 前端设计指南。UI美学、组件模式、UX原则。当用户需要前端设计、UI/UX指导、组件设计时使用。 |
| `claymorphism` | [skills/domains/frontend-design/claymorphism/SKILL.md](skills/domains/frontend-design/claymorphism/SKILL.md) | Claymorphism design system skill. Use when building soft, puffy, clay-like UI components with large radii, dual inner shadows, and offset outer shadows. |
| `glassmorphism` | [skills/domains/frontend-design/glassmorphism/SKILL.md](skills/domains/frontend-design/glassmorphism/SKILL.md) | Glassmorphism design system skill. Use when building frosted-glass UI components with blur, transparency, and layered depth effects. |
| `liquid-glass` | [skills/domains/frontend-design/liquid-glass/SKILL.md](skills/domains/frontend-design/liquid-glass/SKILL.md) | Apple Liquid Glass design system. Use when building UI with translucent, depth-aware glass morphism following Apple's design language. Provides CSS tokens, component patterns, dark/light mode, and animation specs. |
| `neubrutalism` | [skills/domains/frontend-design/neubrutalism/SKILL.md](skills/domains/frontend-design/neubrutalism/SKILL.md) | Neubrutalism design system skill. Use when building bold UI with thick borders, offset solid shadows, high saturation colors, and minimal border radius. |
| `infrastructure` | [skills/domains/infrastructure/SKILL.md](skills/domains/infrastructure/SKILL.md) | 云原生基础设施。Kubernetes、Helm、Kustomize、Operator、CRD、GitOps、ArgoCD、Flux、IaC、Terraform、Pulumi、CDK。当用户提到 K8s、Helm、GitOps、IaC 时路由到此。 |
| `mobile` | [skills/domains/mobile/SKILL.md](skills/domains/mobile/SKILL.md) | 移动开发。iOS、Android、SwiftUI、Jetpack Compose、React Native、Flutter、跨平台。当用户提到移动开发、iOS、Android、跨平台时路由到此。 |
| `orchestration` | [skills/domains/orchestration/SKILL.md](skills/domains/orchestration/SKILL.md) | 协同编排知识域。多Agent协同、任务分解、并行执行、冲突解决。当用户需要多Agent协作、任务编排、并行处理时使用。 |
| `security` | [skills/domains/security/SKILL.md](skills/domains/security/SKILL.md) | 安全技能索引。渗透测试、代码审计、红队攻击、蓝队防御、威胁情报、漏洞研究。当用户提到安全、渗透、攻防、红队、蓝队、漏洞时路由到此。 |

## 命令行工具（5）

| 技能 | 路径 | 说明 |
|---|---|---|
| `gen-docs` | [skills/tools/gen-docs/SKILL.md](skills/tools/gen-docs/SKILL.md) | 文档生成器。自动分析模块结构，生成 README.md 和 DESIGN.md 骨架。当用户提到生成文档、创建README、创建DESIGN、文档骨架、文档模板时使用。在新建模块开始时自动触发。 |
| `verify-change` | [skills/tools/verify-change/SKILL.md](skills/tools/verify-change/SKILL.md) | 变更检查。分析代码变更，检测文档同步状态，评估变更影响范围。当用户提到变更检查、文档同步、代码审查、提交前检查、diff分析时使用。在设计级变更、重构完成时自动触发。 |
| `verify-module` | [skills/tools/verify-module/SKILL.md](skills/tools/verify-module/SKILL.md) | 模块完整性检查。扫描目录结构、检测缺失文档、验证代码与文档同步。当用户提到模块校验、文档检查、结构完整性、README检查、DESIGN检查时使用。在新建模块完成时自动触发。 |
| `verify-quality` | [skills/tools/verify-quality/SKILL.md](skills/tools/verify-quality/SKILL.md) | 代码质量检查。检测复杂度、重复代码、命名规范、函数长度等质量指标。当用户提到代码质量、复杂度检查、代码异味、重构建议、lint检查、代码规范时使用。在复杂模块、重构完成时自动触发。 |
| `verify-security` | [skills/tools/verify-security/SKILL.md](skills/tools/verify-security/SKILL.md) | 安全检查。自动扫描代码安全漏洞，检测危险模式，确保安全决策有文档记录。当用户提到安全扫描、漏洞检测、安全审计、代码安全、OWASP、注入检测、敏感信息泄露时使用。在新建模块、安全相关变更、攻防任务、重构完成时自动触发。 |

## 多 Agent 协作（1）

| 技能 | 路径 | 说明 |
|---|---|---|
| `multi-agent` | [skills/orchestration/multi-agent/SKILL.md](skills/orchestration/multi-agent/SKILL.md) | 多Agent协同。定义Agent角色、生命周期、任务元数据通信、任务分解、冲突解决。当需要多Agent并行协作时路由到此。 |

## 独立技能（159）

| 技能 | 路径 | 说明 |
|---|---|---|
| `STM32外设驱动开发` | [skills/STM32外设驱动开发/SKILL.md](skills/STM32%E5%A4%96%E8%AE%BE%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91/SKILL.md) | USART串口通信、TIM定时器与PWM、DMA直接内存访问、SPI/I2C总线、ADC/DAC模拟转换、EXTI外部中断。覆盖F103和F407，标准库与HAL库双版本示例。 |
| `STM32嵌入式核心开发` | [skills/STM32嵌入式核心开发/SKILL.md](skills/STM32%E5%B5%8C%E5%85%A5%E5%BC%8F%E6%A0%B8%E5%BF%83%E5%BC%80%E5%8F%91/SKILL.md) | 芯片架构、时钟系统、GPIO编程、中断管理、启动流程、开发环境搭建与调试技巧。覆盖F103(Cortex-M3)和F407(Cortex-M4F)，支持标准库和HAL库。 |
| `STM32进阶开发` | [skills/STM32进阶开发/SKILL.md](skills/STM32%E8%BF%9B%E9%98%B6%E5%BC%80%E5%8F%91/SKILL.md) | USB设备/主机、CAN总线通信、RTC实时时钟、看门狗、低功耗模式、Flash编程、SDIO/SD卡、FSMC/FMC外部存储器、以太网、摄像头DCMI。覆盖F103和F407。 |
| `accessibility` | [skills/accessibility/SKILL.md](skills/accessibility/SKILL.md) | Web 无障碍工程引擎。覆盖 WCAG 2.2、WAI-ARIA、屏幕阅读器适配、键盘导航、色彩对比度、语义化 HTML、自动化无障碍测试。当用户提到无障碍、Accessibility、a11y、WCAG、WAI-ARIA、屏幕阅读器、Screen Reader、键盘导航时使用。 |
| `ad-pentest` | [skills/ad-pentest/SKILL.md](skills/ad-pentest/SKILL.md) | Active Directory域渗透、Kerberos攻击、BloodHound分析、域控提权。当用户提到AD渗透、域渗透、Kerberos、BloodHound、DCSync、域控、Active Directory、NTLM时使用。 |
| `ai-agent-dev` | [skills/ai-agent-dev/SKILL.md](skills/ai-agent-dev/SKILL.md) | AI Agent开发、LLM应用、RAG系统、Prompt工程。当用户提到 Agent、LangChain、AutoGen、RAG、向量数据库、Prompt、LLM、大模型、embedding时使用。 |
| `ai-orchestrator` | [skills/ai-orchestrator/SKILL.md](skills/ai-orchestrator/SKILL.md) | 智能AI协作编排、多AI协同工作、自动调用Gemini/Codex/iFlow。当用户提到多AI协作、智能调度、AI编排、Gemini、Codex、工作流编排时使用。 |
| `android-reversing` | [skills/android-reversing/SKILL.md](skills/android-reversing/SKILL.md) | Android逆向分析：APK反编译、DEX脱壳、SO库逆向、Frida Hook、SSL Pinning绕过、重打包。当用户提到Android逆向、APK分析、DEX、Smali、Frida、jadx、apktool、SO逆向、JNI、加固脱壳时使用。 |
| `angular-dev` | [skills/angular-dev/SKILL.md](skills/angular-dev/SKILL.md) | Angular 全栈开发引擎。覆盖 Angular 19+ Standalone Components、Signals、Zoneless、新控制流、NgRx SignalStore、SSR Hydration、Angular Material、RxJS。当用户提到Angular、Angular19、Standalone Components、Signals、signal、computed、effect、Zoneless时使用。 |
| `api-design` | [skills/api-design/SKILL.md](skills/api-design/SKILL.md) | API设计、RESTful、GraphQL、OpenAPI、gRPC、接口规范。当用户提到 API、REST、GraphQL、接口设计、OpenAPI、Swagger、gRPC、protobuf时使用。 |
| `api-discovery` | [skills/api-discovery/SKILL.md](skills/api-discovery/SKILL.md) | API端点自动发现、接口枚举、API路由提取。当用户提到API发现、端点枚举、接口发现、API路由、隐藏API、API枚举时使用。 |
| `api-security-test` | [skills/api-security-test/SKILL.md](skills/api-security-test/SKILL.md) | API安全测试、REST/GraphQL安全、认证绕过、BOLA/BFLA、API滥用。当用户提到API安全、REST安全、GraphQL安全、BOLA、BFLA、API渗透、接口测试时使用。 |
| `attack-chain-orchestrator` | [skills/attack-chain-orchestrator/SKILL.md](skills/attack-chain-orchestrator/SKILL.md) | 攻击链编排引擎。基于 MCP redteam 工具链，从目标分析到完整攻击路径的智能编排。核心能力：攻击链规划、路径发现、多阶段利用编排、自动重试与失败恢复。当用户提到攻击链、attack chain、攻击路径、kill chain、编排攻击、exploit chain、多阶段攻击、链式利用时使用。 |
| `autoredteam-orchestrator` | [skills/autoredteam-orchestrator/SKILL.md](skills/autoredteam-orchestrator/SKILL.md) | AutoRedTeam-Orchestrator 仓库开发专用。当用户提到 AutoRedTeam、MCP 工具开发、mcp_stdio_server、auto_recon、MCP 注册时使用。 |
| `backdoor-detector` | [skills/backdoor-detector/SKILL.md](skills/backdoor-detector/SKILL.md) | 后门检测、Webshell检测、内存马检测、源代码泄露检测、恶意代码分析。当用户提到后门、Webshell、内存马、源代码泄露、恶意代码、木马检测、.map文件、webpack泄露时使用。 |
| `binary-exploit` | [skills/binary-exploit/SKILL.md](skills/binary-exploit/SKILL.md) | 二进制漏洞利用、栈溢出、堆利用、ROP、Shellcode。当用户提到 PWN、二进制、栈溢出、堆溢出、ROP、shellcode、格式化字符串时使用。 |
| `blockchain-security` | [skills/blockchain-security/SKILL.md](skills/blockchain-security/SKILL.md) | 区块链安全、智能合约审计、DeFi安全、Web3安全。当用户提到区块链、智能合约、Solidity、DeFi、Web3、以太坊安全、合约审计时使用。 |
| `browser-security` | [skills/browser-security/SKILL.md](skills/browser-security/SKILL.md) | 浏览器安全、DOM XSS、CSP绕过、SOP绕过、Cookie安全、浏览器扩展安全。当用户提到浏览器安全、DOM XSS、CSP、SOP、Cookie安全、浏览器扩展、Chrome安全时使用。 |
| `bug-bounty` | [skills/bug-bounty/SKILL.md](skills/bug-bounty/SKILL.md) | 漏洞赏金、SRC挖洞、漏洞报告编写、赏金猎人技巧。当用户提到漏洞赏金、bug bounty、SRC、漏洞挖掘、赏金猎人、漏洞报告、HackerOne时使用。 |
| `c-cpp-dev` | [skills/c-cpp-dev/SKILL.md](skills/c-cpp-dev/SKILL.md) | C/C++开发、内存管理、CMake、GDB调试、现代C++。当用户提到 C语言、C++、指针、内存、CMake、Makefile、GDB、valgrind、智能指针时使用。 |
| `c2-framework` | [skills/c2-framework/SKILL.md](skills/c2-framework/SKILL.md) | C2 框架选型、基础设施搭建与后渗透操作指导。当用户提到 C2框架、command and control、beacon、implant、远控基础设施 时使用。 |
| `cdn-bypass` | [skills/cdn-bypass/SKILL.md](skills/cdn-bypass/SKILL.md) | CDN/WAF绕过技术、真实IP发现、源站探测、Cloudflare绕过。当用户提到CDN绕过、WAF绕过、真实IP、源站IP、Cloudflare绕过、找真实IP时使用。 |
| `chaos-engineering` | [skills/chaos-engineering/SKILL.md](skills/chaos-engineering/SKILL.md) | 混沌工程与韧性测试引擎。覆盖 LitmusChaos、Chaos Mesh、Gremlin、AWS FIS、Chaos Monkey、Toxiproxy、GameDay。当用户提到混沌工程、Chaos Engineering、Litmus、Chaos Mesh、Gremlin、Chaos Monkey、故障注入、Fault Injection时使用。 |
| `cloud-security` | [skills/cloud-security/SKILL.md](skills/cloud-security/SKILL.md) | 云安全评估与攻击面审计执行引擎。集成 MCP redteam 工具链，覆盖 AWS/Azure/GCP 三大云平台。当用户提到云安全、Cloud Security、AWS 安全、Azure 安全、GCP 安全、IAM 提权、IMDS、元数据服务时使用。 |
| `cms-headless` | [skills/cms-headless/SKILL.md](skills/cms-headless/SKILL.md) | Headless CMS 与内容管理引擎。覆盖 Strapi、Directus、Sanity、Contentful、Payload CMS、Ghost、KeystoneJS 的内容建模、API 设计、媒体管理、多语言、发布流程、Webhook、前端对接、RBAC 权限、插件开发、SEO 优化。当用户提到 Headless CMS、Strapi、Directus、Sanity、Contentful、Payload、Ghost、KeystoneJS、内容建模、Content Type、Schema 设计、CMS 集成、ISR、SSG、内容 API 时使用。触发命令：/cms-headless |
| `code-audit` | [skills/code-audit/SKILL.md](skills/code-audit/SKILL.md) | 代码安全审计、漏洞挖掘、SAST、CWE 分类。当用户提到代码审计、安全审计、漏洞挖掘、危险函数、sink/source、污点分析、SAST、CWE 时使用。 |
| `code-migration` | [skills/code-migration/SKILL.md](skills/code-migration/SKILL.md) | 代码迁移与系统现代化引擎。覆盖 Strangler Fig、单体拆微服务、语言/框架升级、数据库迁移、云迁移、零停机迁移。当用户提到代码迁移、Migration、现代化、Modernization、重构、Strangler Fig、单体拆微服务、Monolith时使用。 |
| `code-simplifier` | [skills/code-simplifier/SKILL.md](skills/code-simplifier/SKILL.md) | 代码简化与重构专家。在不改变功能的前提下提升代码清晰度、一致性和可维护性。当用户提到代码简化、重构、整理代码、统一风格、代码优化时使用。 |
| `commit` | [skills/commit/SKILL.md](skills/commit/SKILL.md) | 生成规范的 Conventional Commits 消息并提交。当用户提到 git commit、提交代码、commit message、提交消息时使用。 |
| `compliance-audit` | [skills/compliance-audit/SKILL.md](skills/compliance-audit/SKILL.md) | 合规审计、等保测评、PCI-DSS、GDPR、安全基线检查。当用户提到合规审计、等保、PCI-DSS、GDPR、安全基线、合规检查、安全评估时使用。 |
| `container-security` | [skills/container-security/SKILL.md](skills/container-security/SKILL.md) | 容器安全评估与攻击面审计执行引擎。集成 MCP redteam 工具链，覆盖 Docker/Kubernetes/容器逃逸全链路。当用户提到容器安全、Docker安全、K8s审计、容器逃逸、镜像安全、RBAC审计、Pod安全、NetworkPolicy时使用。 |
| `context7` | [skills/context7/SKILL.md](skills/context7/SKILL.md) | 查询最新的编程库文档和代码示例。当用户提到查文档、API 参考、库文档、代码示例、最新文档时使用。 |
| `credential-access` | [skills/credential-access/SKILL.md](skills/credential-access/SKILL.md) | 凭证获取与密码攻击——集成 MCP redteam 工具链。当用户提到 凭证获取、credential access、密码破解、hash dump、Kerberos、抓密码、password spray 时使用。 |
| `crypto-security` | [skills/crypto-security/SKILL.md](skills/crypto-security/SKILL.md) | 密码学安全、加密算法、密钥管理、PKI、哈希碰撞。当用户提到密码学、加密、解密、RSA、AES、哈希、证书、PKI、密钥时使用。 |
| `csharp-dotnet-dev` | [skills/csharp-dotnet-dev/SKILL.md](skills/csharp-dotnet-dev/SKILL.md) | C#/.NET 开发引擎。覆盖 .NET 8/9、ASP.NET Core、Entity Framework Core、Blazor、MAUI、Minimal API、依赖注入、中间件、性能优化。当用户提到C#、CSharp、.NET、dotnet、ASP.NET、Entity Framework、EF Core、Blazor时使用。 |
| `ctf` | [skills/ctf/SKILL.md](skills/ctf/SKILL.md) | CTF竞赛全栈技能、Pwn/Web/Crypto/Reverse/Forensics/Misc。当用户提到CTF、夺旗赛、Pwn题、Web题、密码学、逆向、取证、MISC、Writeup时使用。 |
| `data-engineering` | [skills/data-engineering/SKILL.md](skills/data-engineering/SKILL.md) | 数据工程与数据管道引擎。覆盖 ETL/ELT、数据仓库、数据湖、Apache Spark、Airflow、dbt、Kafka、Flink、数据质量、数据治理。当用户提到数据工程、Data Engineering、ETL、ELT、数据管道、Data Pipeline、数据仓库、Data Warehouse时使用。 |
| `data-exfiltration` | [skills/data-exfiltration/SKILL.md](skills/data-exfiltration/SKILL.md) | 数据外泄测试、隐蔽通道、DLP绕过、流量伪装。当用户提到数据外泄、exfiltration、数据窃取、隐蔽通道、DNS隧道时使用。 |
| `data-security` | [skills/data-security/SKILL.md](skills/data-security/SKILL.md) | 数据安全、DLP数据防泄露、数据分类、加密策略。当用户提到数据安全、DLP、数据分类、数据加密、数据脱敏、敏感数据保护时使用。 |
| `data-visualization` | [skills/data-visualization/SKILL.md](skills/data-visualization/SKILL.md) | 数据可视化工程引擎。覆盖 D3.js、ECharts、Chart.js、Plotly、Matplotlib、Grafana Dashboard、地理可视化、大屏设计、无障碍可视化。当用户提到数据可视化、Data Visualization、D3.js、ECharts、Chart.js、Plotly、Matplotlib、Seaborn时使用。 |
| `database` | [skills/database/SKILL.md](skills/database/SKILL.md) | 数据库操作、SQL优化、MySQL、PostgreSQL、Redis、MongoDB。当用户提到数据库、SQL、MySQL、PostgreSQL、Redis、MongoDB、查询优化、索引时使用。 |
| `deep-thinking` | [skills/deep-thinking/SKILL.md](skills/deep-thinking/SKILL.md) | 深度思考与结构化推理。当用户提到深度思考、分步推理、多角度分析、根因定位、结构化推理时使用。 |
| `detection-engineering` | [skills/detection-engineering/SKILL.md](skills/detection-engineering/SKILL.md) | 检测工程、Sigma规则、YARA规则、SIEM用例、告警质量。当用户提到检测规则、Sigma、YARA、SIEM、告警、检测工程、威胁检测时使用。 |
| `devex-tooling` | [skills/devex-tooling/SKILL.md](skills/devex-tooling/SKILL.md) | 开发者体验与工具链工程引擎。覆盖 CLI 工具、代码生成器、Monorepo、包管理、Linter/Formatter、LSP、IDE 插件、开发环境容器化。当用户提到开发者体验、DevEx、DX、CLI 工具、代码生成、Monorepo、Turborepo、Nx时使用。 |
| `devsecops` | [skills/devsecops/SKILL.md](skills/devsecops/SKILL.md) | DevSecOps安全、CI/CD安全、SAST/DAST集成、安全左移、流水线安全。当用户提到DevSecOps、CI/CD安全、安全左移、SAST、DAST、流水线安全、GitOps安全时使用。 |
| `disaster-recovery` | [skills/disaster-recovery/SKILL.md](skills/disaster-recovery/SKILL.md) | 灾备与业务连续性工程引擎。覆盖 RTO/RPO 设计、备份策略、故障切换、多活架构、DR 演练、数据复制、勒索软件防护。当用户提到灾备、Disaster Recovery、DR、业务连续性、BCP、RTO、RPO、备份时使用。 |
| `django-dev` | [skills/django-dev/SKILL.md](skills/django-dev/SKILL.md) | Django 全栈开发引擎。覆盖 Django 5.x、DRF、Celery、Django ORM、信号、中间件、模板、Admin、部署。当用户提到Django、DRF、Django REST Framework、Django ORM、Celery、Django Admin、Django 模板、Django 中间件时使用。 |
| `doc-office` | [skills/doc-office/SKILL.md](skills/doc-office/SKILL.md) | 文档与办公自动化引擎。覆盖 Markdown、PDF 生成、Excel/CSV 处理、Word 文档、PPT 生成、文档转换、模板引擎、报告自动化。当用户提到文档、Document、Markdown、PDF、Excel、CSV、Word、DOCX时使用。 |
| `docker-k8s` | [skills/docker-k8s/SKILL.md](skills/docker-k8s/SKILL.md) | Docker容器、Kubernetes编排、镜像构建、Helm、容器安全。当用户提到 Docker、容器、K8s、Kubernetes、镜像、docker-compose、Pod、Helm时使用。 |
| `dotnet-reversing` | [skills/dotnet-reversing/SKILL.md](skills/dotnet-reversing/SKILL.md) | .NET逆向分析：壳检测、脱壳、反混淆、反编译、dnlib编程分析。当用户提到.NET逆向、C#逆向、dnSpy、ILSpy、de4dot、ConfuserEx、.NET Reactor、脱壳、反混淆、CLR、IL、MSIL时使用。 |
| `edge-computing` | [skills/edge-computing/SKILL.md](skills/edge-computing/SKILL.md) | 边缘计算工程引擎。覆盖 Cloudflare Workers、Deno Deploy、Vercel Edge Functions、AWS Lambda@Edge、Fastly Compute、边缘数据库、边缘缓存、边缘 AI 推理。当用户提到边缘计算、Edge Computing、Edge Functions、Cloudflare Workers、Deno Deploy、Vercel Edge、Lambda@Edge、Fastly Compute时使用。 |
| `edr-endpoint` | [skills/edr-endpoint/SKILL.md](skills/edr-endpoint/SKILL.md) | EDR 与端点安全检测引擎。覆盖 Velociraptor、osquery、Wazuh、YARA、Sysmon、端点取证、威胁狩猎、实时响应。当用户提到EDR、Endpoint Detection、端点安全、Velociraptor、VQL、osquery、Wazuh、YARA时使用。 |
| `email-security` | [skills/email-security/SKILL.md](skills/email-security/SKILL.md) | 邮件安全、SPF/DKIM/DMARC配置、邮件头分析、SMTP安全、钓鱼邮件检测。当用户提到邮件安全、SPF、DKIM、DMARC、邮件头、SMTP、钓鱼邮件、邮件伪造时使用。 |
| `evasion-toolkit` | [skills/evasion-toolkit/SKILL.md](skills/evasion-toolkit/SKILL.md) | 免杀与防御绕过执行引擎。集成 MCP redteam 工具链，覆盖 AV/EDR/AMSI/ETW/WAF 全栈绕过。当用户提到免杀、绕过、evasion、bypass、AMSI bypass、ETW patch、shellcode 混淆、EDR 绕过时使用。 |
| `event-driven` | [skills/event-driven/SKILL.md](skills/event-driven/SKILL.md) | 事件驱动架构工程引擎。覆盖 Apache Kafka、RabbitMQ、Pulsar、NATS、Redis Streams、Event Sourcing、CQRS、流处理、Schema Registry、CloudEvents。当用户提到事件驱动、Event-Driven、EDA、Kafka、RabbitMQ、Pulsar、NATS、Redis Streams时使用。 |
| `fastapi-dev` | [skills/fastapi-dev/SKILL.md](skills/fastapi-dev/SKILL.md) | FastAPI 全栈开发引擎。覆盖 FastAPI 0.110+、Pydantic v2、SQLAlchemy 2.0、async/await、Dependency Injection、OAuth2/JWT、Background Tasks、WebSocket、部署。当用户提到FastAPI、Pydantic、SQLAlchemy、Alembic、Uvicorn、Gunicorn、async Python、ASGI时使用。 |
| `fingerprint-engine` | [skills/fingerprint-engine/SKILL.md](skills/fingerprint-engine/SKILL.md) | Web 指纹识别与技术栈分析引擎。集成 MCP redteam 工具链，执行深度指纹采集、技术栈推断、WAF/CDN 识别、安全配置审计。当用户提到指纹识别、fingerprint、技术栈识别、Web 指纹、服务识别、CMS 识别、框架识别、WAF 识别时使用。 |
| `finops` | [skills/finops/SKILL.md](skills/finops/SKILL.md) | 云成本优化与 FinOps 工程引擎。覆盖 AWS/Azure/GCP 成本管理、Reserved Instances、Savings Plans、Spot/Preemptible、资源右sizing、Kubecost、OpenCost、成本分摊。当用户提到FinOps、云成本、Cost Optimization、成本优化、Reserved Instance、Savings Plan、Spot Instance、资源优化时使用。 |
| `flutter-dart-dev` | [skills/flutter-dart-dev/SKILL.md](skills/flutter-dart-dev/SKILL.md) | Flutter/Dart 跨平台开发引擎。覆盖 Dart 3.x 新特性、Flutter 3.x、状态管理、路由、网络、存储、平台通道、测试与 CI/CD。当用户提到 Flutter、Dart、widget、Riverpod、BLoC 时使用。 |
| `forensics-analysis` | [skills/forensics-analysis/SKILL.md](skills/forensics-analysis/SKILL.md) | 数字取证、内存取证、磁盘取证、日志分析、恶意软件分析。当用户提到取证、forensics、内存分析、Volatility、磁盘镜像、日志分析、溯源时使用。 |
| `frontend-dev` | [skills/frontend-dev/SKILL.md](skills/frontend-dev/SKILL.md) | 前端工程与现代 Web 开发引擎。覆盖 React、Vue、Angular、Next.js、Nuxt、Vite、状态管理、SSR/SSG、Web 性能优化、无障碍。当用户提到前端、Frontend、React、Vue、Angular、Next.js、Nuxt、Vite时使用。 |
| `full-pentest` | [skills/full-pentest/SKILL.md](skills/full-pentest/SKILL.md) | 全自动渗透测试编排引擎。整合 MCP redteam 全工具链，覆盖侦察、指纹、漏洞扫描、利用、后渗透、报告六阶段。当用户提到全量渗透、渗透测试、自动渗透、auto pentest、pentest、内网渗透、域渗透时使用。 |
| `game-dev` | [skills/game-dev/SKILL.md](skills/game-dev/SKILL.md) | 游戏开发工程引擎，覆盖架构设计、渲染、物理、网络同步、性能优化、Shader、音频、UI、资源管线、热更新。当用户提到 Unity、Unreal、Godot、Cocos、Bevy、ECS、Shader、HLSL、GLSL、AssetBundle、Addressables、帧同步、状态同步、Rollback、Draw Call、LOD、PBR、热更新时使用。触发命令：/game-dev |
| `git-workflow` | [skills/git-workflow/SKILL.md](skills/git-workflow/SKILL.md) | Git版本控制、分支管理、合并策略、GitHub工作流。当用户提到 Git、分支、merge、rebase、PR、GitHub、版本控制、cherry-pick时使用。 |
| `go-dev` | [skills/go-dev/SKILL.md](skills/go-dev/SKILL.md) | Go语言开发、并发编程、goroutine、channel、Go模块。当用户提到 Go、Golang、goroutine、channel、go mod、cobra、gin、泛型时使用。 |
| `graphics-rendering` | [skills/graphics-rendering/SKILL.md](skills/graphics-rendering/SKILL.md) | 图形渲染与可视化工程引擎。覆盖 WebGL、WebGPU、OpenGL、Vulkan、Three.js、Babylon.js、PixiJS、Canvas 2D、SVG、D3.js、Shader 编程。当用户提到图形渲染、Graphics、Rendering、WebGL、WebGPU、OpenGL、Vulkan、Three.js时使用。 |
| `graphql-dev` | [skills/graphql-dev/SKILL.md](skills/graphql-dev/SKILL.md) | GraphQL API 开发引擎。覆盖 Schema 设计、Resolver、Apollo Server/Client、Relay、Federation、Subscription、DataLoader、代码生成。当用户提到GraphQL、Schema、Resolver、Apollo、Relay、Federation、Subscription、Mutation时使用。 |
| `graphql-pentest` | [skills/graphql-pentest/SKILL.md](skills/graphql-pentest/SKILL.md) | GraphQL安全测试、内省查询、批量查询攻击、嵌套DoS。当用户提到GraphQL安全、GraphQL渗透、内省查询、批量查询、GraphQL注入、GraphQL DoS时使用。 |
| `honeypot` | [skills/honeypot/SKILL.md](skills/honeypot/SKILL.md) | 蜜罐技术、欺骗防御、诱饵系统、攻击诱捕。当用户提到蜜罐、honeypot、欺骗防御、诱饵、蜜网、攻击诱捕时使用。 |
| `i18n-l10n` | [skills/i18n-l10n/SKILL.md](skills/i18n-l10n/SKILL.md) | 国际化与本地化工程引擎。覆盖 i18next、react-intl、vue-i18n、ICU MessageFormat、CLDR、Crowdin、Lokalise、Pseudo-localization。当用户提到国际化、本地化、i18n、l10n、多语言、翻译、i18next、react-intl时使用。 |
| `iac-devops` | [skills/iac-devops/SKILL.md](skills/iac-devops/SKILL.md) | 基础设施即代码安全审计与 DevOps 安全引擎。覆盖 Terraform、Ansible、CloudFormation、Pulumi、Dockerfile、Helm、CI/CD Pipeline 安全。当用户提到IaC 安全、Infrastructure as Code、Terraform 安全、Ansible 安全、CloudFormation、Pulumi、Checkov、tfsec时使用。 |
| `ics-scada` | [skills/ics-scada/SKILL.md](skills/ics-scada/SKILL.md) | 工控安全、SCADA系统、PLC安全、工业协议、OT安全。当用户提到工控、SCADA、PLC、ICS、OT安全、Modbus、工业协议、HMI时使用。 |
| `identity-security` | [skills/identity-security/SKILL.md](skills/identity-security/SKILL.md) | 身份安全、IAM、MFA绕过、SSO安全、身份治理。当用户提到身份安全、IAM、MFA、SSO、身份认证、访问管理、特权账户时使用。 |
| `incident-response` | [skills/incident-response/SKILL.md](skills/incident-response/SKILL.md) | 应急响应、日志分析、取证、恶意软件分析、入侵排查。当用户提到应急响应、入侵排查、日志分析、取证、恶意软件、后门排查、安全事件时使用。 |
| `iot-security` | [skills/iot-security/SKILL.md](skills/iot-security/SKILL.md) | 物联网安全、嵌入式设备安全、固件分析、硬件安全。当用户提到IoT安全、物联网、嵌入式安全、固件提取、硬件调试、UART、JTAG、智能设备安全时使用。 |
| `java-dev` | [skills/java-dev/SKILL.md](skills/java-dev/SKILL.md) | Java开发、Spring Boot、Maven、Gradle、JVM调优。当用户提到 Java、Spring、Maven、Gradle、JVM、Tomcat、MyBatis、JPA时使用。 |
| `js-ts-dev` | [skills/js-ts-dev/SKILL.md](skills/js-ts-dev/SKILL.md) | JavaScript/TypeScript开发、Node.js、React、Vue、Bun、Deno、npm/pnpm。当用户提到 JavaScript、TypeScript、Node、React、Vue、npm、pnpm、Bun、Express、Next.js、Hono时使用。 |
| `kernel-security` | [skills/kernel-security/SKILL.md](skills/kernel-security/SKILL.md) | 内核安全、内核漏洞利用、驱动安全、系统调用Hook、内核提权。当用户提到内核安全、kernel exploit、驱动漏洞、syscall、内核提权、rootkit检测时使用。 |
| `kotlin-android-dev` | [skills/kotlin-android-dev/SKILL.md](skills/kotlin-android-dev/SKILL.md) | Kotlin/Android 工程开发专家。当用户提到 Kotlin、Android、Jetpack Compose、Coroutines、Hilt、Room、Gradle KTS、KMP 时使用。 |
| `laravel-dev` | [skills/laravel-dev/SKILL.md](skills/laravel-dev/SKILL.md) | Laravel 全栈开发引擎。覆盖 Laravel 11+、Eloquent ORM、Blade/Livewire/Inertia、队列、事件、中间件、Sanctum/Passport 认证、Pest 测试。当用户提到Laravel、Eloquent、Blade、Livewire、Inertia、Artisan、Migration、Sanctum时使用。 |
| `lateral-movement` | [skills/lateral-movement/SKILL.md](skills/lateral-movement/SKILL.md) | 内网横向移动技术、Pass-the-Hash、Kerberos攻击、远程执行、内网穿透。当用户提到横向移动、PTH、PTT、内网渗透、域渗透、pivoting时使用。 |
| `linux-hardening` | [skills/linux-hardening/SKILL.md](skills/linux-hardening/SKILL.md) | Linux 系统加固与安全基线审计引擎。覆盖 CIS Benchmark、DISA STIG、内核参数、审计日志、PAM、SSH、文件系统权限。当用户提到Linux 加固、Linux Hardening、CIS Benchmark、STIG、sysctl、auditd、PAM、SSH 加固时使用。 |
| `llm-red-teaming` | [skills/llm-red-teaming/SKILL.md](skills/llm-red-teaming/SKILL.md) | LLM安全测试、Prompt注入、AI越狱、模型对抗、AI安全评估。当用户提到LLM安全、Prompt注入、AI越狱、模型安全、jailbreak、大模型攻击、AI红队时使用。 |
| `low-code` | [skills/low-code/SKILL.md](skills/low-code/SKILL.md) | 低代码/无代码平台开发引擎。覆盖可视化编排、拖拽组件、数据源连接、工作流自动化、表单引擎、权限模型、自定义扩展、多租户架构。当用户提到低代码、无代码、Low-Code、No-Code、Retool、Appsmith、Budibase、n8n时使用。 |
| `malware-analysis` | [skills/malware-analysis/SKILL.md](skills/malware-analysis/SKILL.md) | 恶意软件分析、静态分析、动态分析、沙箱分析、IOC提取、样本行为分析。当用户提到恶意软件、malware、病毒分析、样本分析、沙箱、IOC提取、行为分析时使用。 |
| `mcp-builder` | [skills/mcp-builder/SKILL.md](skills/mcp-builder/SKILL.md) | MCP Server 开发与集成引擎。覆盖 Model Context Protocol、MCP Tool/Resource/Prompt 开发、Transport 配置、SDK 集成、安全设计。当用户提到MCP、Model Context Protocol、MCP Server、MCP Tool、MCP Resource、MCP Prompt、MCP Transport、stdio时使用。 |
| `memory` | [skills/memory/SKILL.md](skills/memory/SKILL.md) | 持久化记忆存储，跨会话保存和检索知识。当用户提到记住、保存笔记、记忆、跨会话检索时使用。 |
| `microservices` | [skills/microservices/SKILL.md](skills/microservices/SKILL.md) | 微服务架构工程引擎——DDD 设计、服务拆分、通信模式、分布式事务、可靠性治理全流程。当用户提到 微服务、microservices、DDD、领域驱动、服务拆分、saga、CQRS、service mesh 时使用。 |
| `mlops` | [skills/mlops/SKILL.md](skills/mlops/SKILL.md) | MLOps 与机器学习工程引擎。覆盖实验追踪、模型服务、特征存储、漂移检测、分布式训练、模型注册。当用户提到 MLOps、模型训练、模型部署、MLflow、Kubeflow、特征存储、模型服务、漂移检测时使用。 |
| `mobile-security` | [skills/mobile-security/SKILL.md](skills/mobile-security/SKILL.md) | 移动安全、Android/iOS逆向、APK分析、Frida Hook、移动渗透。当用户提到移动安全、Android安全、iOS安全、APK、Frida、Hook、移动渗透、APP安全时使用。 |
| `monitoring-observability` | [skills/monitoring-observability/SKILL.md](skills/monitoring-observability/SKILL.md) | 监控与可观测性工程引擎。覆盖 Prometheus、Grafana、OpenTelemetry、ELK/Elasticsearch、Loki、Jaeger、Alertmanager。当用户提到监控、Monitoring、Observability、可观测性、Prometheus、Grafana、OpenTelemetry、OTel时使用。 |
| `nestjs-dev` | [skills/nestjs-dev/SKILL.md](skills/nestjs-dev/SKILL.md) | NestJS 全栈开发引擎。覆盖 NestJS 10+、模块化架构、Guards/Pipes/Interceptors、TypeORM/Prisma/Drizzle、GraphQL、WebSocket、微服务、Swagger、Bull 队列。当用户提到NestJS、Nest、NestJS 模块、Guard、Pipe、Interceptor、TypeORM、Prisma时使用。 |
| `network-monitoring` | [skills/network-monitoring/SKILL.md](skills/network-monitoring/SKILL.md) | 网络安全监控与入侵检测引擎。覆盖 NSM、Suricata、Snort、Zeek、NIDS/NIPS、流量分析、PCAP、NetFlow、威胁情报集成。当用户提到网络监控、NSM、Network Security Monitoring、IDS、IPS、入侵检测、入侵防御、Suricata时使用。 |
| `network-protocol` | [skills/network-protocol/SKILL.md](skills/network-protocol/SKILL.md) | 网络协议安全、TCP/IP安全、DNS安全、TLS/SSL测试、协议分析。当用户提到网络协议、TCP安全、DNS安全、TLS测试、协议漏洞、中间人攻击、协议分析时使用。 |
| `nextjs-dev` | [skills/nextjs-dev/SKILL.md](skills/nextjs-dev/SKILL.md) | Next.js 全栈开发引擎。覆盖 App Router、React Server Components、Server Actions、Streaming SSR、PPR、Turbopack、Middleware、Edge Runtime、Vercel 部署。当用户提到Next.js、NextJS、App Router、RSC、Server Components、Server Actions、PPR、Turbopack时使用。 |
| `oauth-security` | [skills/oauth-security/SKILL.md](skills/oauth-security/SKILL.md) | OAuth2/OIDC/SAML认证安全测试、授权码劫持、Token泄露检测。当用户提到OAuth安全、OIDC测试、SAML安全、授权码、Token泄露、SSO安全、第三方登录安全时使用。 |
| `osint` | [skills/osint/SKILL.md](skills/osint/SKILL.md) | 开源情报收集、域名侦察、社交媒体分析、数据泄露检查。当用户提到OSINT、情报收集、信息搜集、侦察、recon、被动信息收集时使用。 |
| `payment-fintech` | [skills/payment-fintech/SKILL.md](skills/payment-fintech/SKILL.md) | 支付与金融科技工程引擎。覆盖 Stripe、支付宝/微信支付、PayPal、Adyen、支付网关、风控引擎、对账系统、PCI-DSS 合规。当用户提到支付、Payment、Fintech、金融科技、Stripe、支付宝、微信支付、PayPal时使用。 |
| `pentest-report` | [skills/pentest-report/SKILL.md](skills/pentest-report/SKILL.md) | 渗透测试报告生成、安全评估报告、漏洞报告模板。当用户提到生成报告、渗透报告、安全报告、漏洞报告、测试报告、报告模板时使用。 |
| `performance-testing` | [skills/performance-testing/SKILL.md](skills/performance-testing/SKILL.md) | 性能测试与负载压测引擎。覆盖 k6、Locust、JMeter、Gatling、Artillery、基准测试、容量规划、性能剖析。当用户提到性能测试、Performance Testing、负载测试、Load Testing、压力测试、Stress Test、k6、Locust时使用。 |
| `phishing-simulation` | [skills/phishing-simulation/SKILL.md](skills/phishing-simulation/SKILL.md) | 钓鱼模拟与安全意识测试：GoPhish部署、邮件模板、钓鱼页面克隆、指标追踪、培训方案。 |
| `php-dev` | [skills/php-dev/SKILL.md](skills/php-dev/SKILL.md) | PHP工程开发专家技能。当用户提到PHP、Laravel、Symfony、Composer、PHPStan、PHPUnit、Pest、PHP-FPM时使用。 |
| `playwright-e2e` | [skills/playwright-e2e/SKILL.md](skills/playwright-e2e/SKILL.md) | Playwright E2E 测试与浏览器自动化引擎。覆盖 Playwright Test、Page Object Model、API Testing、Visual Regression、Component Testing、CI 集成、多浏览器测试。当用户提到Playwright、E2E、端到端测试、浏览器自动化、Page Object、Visual Regression、截图对比、Component Testing时使用。 |
| `post-exploitation` | [skills/post-exploitation/SKILL.md](skills/post-exploitation/SKILL.md) | 后渗透操作——提权、持久化、横向移动、数据窃取。当用户提到 后渗透、post exploitation、提权、privesc、横向移动、lateral movement、权限维持 时使用。 |
| `privacy-engineering` | [skills/privacy-engineering/SKILL.md](skills/privacy-engineering/SKILL.md) | 隐私工程与数据保护引擎。覆盖 GDPR、CCPA、个人信息保护法、隐私设计、数据脱敏、DPIA、同意管理、数据主体权利、隐私增强技术(PETs)。当用户提到隐私工程、Privacy Engineering、GDPR、CCPA、个人信息保护法、PIPL、数据保护、Data Protection时使用。 |
| `privilege-escalation` | [skills/privilege-escalation/SKILL.md](skills/privilege-escalation/SKILL.md) | Linux/Windows权限提升技术、内核漏洞、配置错误利用、sudo滥用。当用户提到提权、privilege escalation、root、SYSTEM、sudo、SUID、GTFOBins时使用。 |
| `prompt-engineering` | [skills/prompt-engineering/SKILL.md](skills/prompt-engineering/SKILL.md) | Prompt Engineering 与 LLM 应用优化引擎。覆盖 System Prompt 设计、Few-shot/CoT/ToT/ReAct、结构化输出、Token 优化、评估框架、多模态 Prompt。当用户提到Prompt Engineering、提示工程、System Prompt、Few-shot、Chain of Thought、CoT、Tree of Thought、ReAct时使用。 |
| `proxy-pool-manager` | [skills/proxy-pool-manager/SKILL.md](skills/proxy-pool-manager/SKILL.md) | 代理池管理、IP轮换、代理验证、匿名化配置。当用户提到代理池、IP池、代理轮换、代理验证、匿名代理、SOCKS代理、HTTP代理时使用。 |
| `purple-team` | [skills/purple-team/SKILL.md](skills/purple-team/SKILL.md) | 紫队演练、ATT&CK模拟、红蓝对抗、攻防演练、威胁模拟。当用户提到紫队、purple team、ATT&CK模拟、红蓝对抗、攻防演练、威胁模拟、对抗演练时使用。 |
| `python-dev` | [skills/python-dev/SKILL.md](skills/python-dev/SKILL.md) | Python项目开发、异步编程、类型注解、打包发布、虚拟环境。当用户提到 Python 项目、async、typing、pyproject、poetry、pip、pytest、uv、ruff时使用。 |
| `quantum-security` | [skills/quantum-security/SKILL.md](skills/quantum-security/SKILL.md) | 量子安全与后量子密码学工程引擎。覆盖 NIST PQC 标准（ML-KEM/ML-DSA/SLH-DSA）、Lattice-based Crypto、QKD、Crypto Agility、Hybrid Key Exchange、量子风险评估。当用户提到量子安全、Quantum Security、后量子密码、Post-Quantum Cryptography、PQC、ML-KEM、ML-DSA、CRYSTALS-Kyber时使用。 |
| `quick-translate` | [skills/quick-translate/SKILL.md](skills/quick-translate/SKILL.md) | 快捷翻译、安全文档翻译、漏洞报告翻译、技术术语翻译。当用户提到翻译、translate、中英互译、文档翻译、报告翻译时使用。 |
| `rag-engineering` | [skills/rag-engineering/SKILL.md](skills/rag-engineering/SKILL.md) | RAG 检索增强生成工程引擎。覆盖向量数据库、Embedding 模型、Chunking 策略、Hybrid Search、Reranker、Query Transformation、评估框架。当用户提到RAG、检索增强生成、Retrieval Augmented Generation、向量数据库、Embedding、Chunking、分块、Hybrid Search时使用。 |
| `rails-dev` | [skills/rails-dev/SKILL.md](skills/rails-dev/SKILL.md) | Ruby on Rails 全栈开发引擎。覆盖 Rails 7.1+/8.0、Hotwire (Turbo/Stimulus)、Active Record、Action Cable、Solid Queue/Cache/Cable、Kamal 部署。当用户提到Rails、Ruby on Rails、Active Record、Hotwire、Turbo、Stimulus、Action Cable、Kamal时使用。 |
| `react-native-dev` | [skills/react-native-dev/SKILL.md](skills/react-native-dev/SKILL.md) | React Native 跨平台移动开发引擎。覆盖 React Native New Architecture、Expo、Hermes、Metro、Reanimated、React Navigation、Fabric、TurboModules。当用户提到React Native、RN、Expo、Hermes、Metro、Reanimated、React Navigation、Fabric时使用。 |
| `realtime-communication` | [skills/realtime-communication/SKILL.md](skills/realtime-communication/SKILL.md) | 实时通信工程引擎。覆盖 WebSocket、WebRTC、SSE、Socket.IO、MQTT、信令服务、媒体服务器、实时协作、直播推流。当用户提到实时通信、Realtime、WebSocket、WebRTC、SSE、Server-Sent Events、Socket.IO、MQTT时使用。 |
| `recon-workflow` | [skills/recon-workflow/SKILL.md](skills/recon-workflow/SKILL.md) | 自动化信息收集工作流。根据目标类型（域名/IP/URL）执行完整侦察，整合 MCP redteam 工具链，输出结构化报告。当用户提到信息收集、侦察、recon、资产发现、子域名枚举、端口扫描时使用。 |
| `red-team-infra` | [skills/red-team-infra/SKILL.md](skills/red-team-infra/SKILL.md) | 红队基础设施、C2架构搭建、重定向器、域前置、OPSEC、攻击基础设施管理。当用户提到红队基础设施、C2搭建、重定向、域前置、OPSEC、攻击架构时使用。 |
| `red-team-poc` | [skills/red-team-poc/SKILL.md](skills/red-team-poc/SKILL.md) | 编写漏洞验证脚本(PoC)、漏洞利用代码、Bypass技巧。当用户提到 PoC、漏洞验证、exploit、CVE、payload、bypass、WAF绕过、漏洞复现时使用。 |
| `research-paper-writing` | [skills/research-paper-writing/SKILL.md](skills/research-paper-writing/SKILL.md) | AI辅助学术论文写作最佳实践：工作流架构、分章节Prompt工程、学术写作风格指南、常见陷阱与缓解策略、Prompt模板库 |
| `research-scientific-research` | [skills/research-scientific-research/SKILL.md](skills/research-scientific-research/SKILL.md) | AI辅助科研最佳实践调研报告：GitHub项目调研、学术论文方法论、工具生态、多Agent科研架构、文献综述自动化 |
| `reverse-analysis` | [skills/reverse-analysis/SKILL.md](skills/reverse-analysis/SKILL.md) | 通用逆向分析：ELF/PE/Mach-O多平台二进制逆向、脱壳、反混淆、协议逆向、符号执行。当用户提到逆向分析、二进制分析、反汇编、反编译、脱壳、协议逆向、固件逆向时使用。 |
| `reverse-engineering` | [skills/reverse-engineering/SKILL.md](skills/reverse-engineering/SKILL.md) | 逆向工程、Ghidra、IDA Pro、动态调试、反汇编、固件分析。当用户提到逆向、RE、IDA、Ghidra、反汇编、脱壳、调试、x64dbg、Frida、固件逆向时使用。 |
| `ruby-dev` | [skills/ruby-dev/SKILL.md](skills/ruby-dev/SKILL.md) | Ruby 工程开发引擎。覆盖 Ruby 3.3+、Rails 7.1+、RSpec、Minitest、Bundler、Sidekiq、Hotwire/Turbo、RuboCop、Sorbet。当用户提到Ruby、Rails、RSpec、Bundler、Sidekiq、Hotwire、Turbo、Stimulus时使用。 |
| `rust-dev` | [skills/rust-dev/SKILL.md](skills/rust-dev/SKILL.md) | Rust开发、所有权、生命周期、Cargo、异步编程。当用户提到 Rust、Cargo、所有权、借用、生命周期、tokio、async rust、wasm时使用。 |
| `search-engine` | [skills/search-engine/SKILL.md](skills/search-engine/SKILL.md) | 搜索引擎技术与全文检索引擎。覆盖 Elasticsearch、OpenSearch、Solr、Meilisearch、Typesense、Tantivy、Lucene。当用户提到搜索引擎、全文检索、Elasticsearch、ES、OpenSearch、Solr、Meilisearch、Typesense时使用。 |
| `secrets-management` | [skills/secrets-management/SKILL.md](skills/secrets-management/SKILL.md) | 密钥管理、Vault、密钥轮换、凭证存储、密钥扫描、敏感信息管理。当用户提到密钥管理、Vault、密钥轮换、凭证存储、secret scanning、敏感信息泄露时使用。 |
| `security-architecture` | [skills/security-architecture/SKILL.md](skills/security-architecture/SKILL.md) | 安全架构设计、威胁建模、安全评审、架构评估。当用户提到安全架构、威胁建模、STRIDE、安全设计、架构评审、安全评估时使用。 |
| `security-tool-dev` | [skills/security-tool-dev/SKILL.md](skills/security-tool-dev/SKILL.md) | 安全工具开发、扫描器、爬虫、自动化脚本。当用户提到开发工具、扫描器、爬虫、批量检测、自动化、CLI工具、并发扫描时使用。 |
| `serverless-security` | [skills/serverless-security/SKILL.md](skills/serverless-security/SKILL.md) | 无服务器安全、Lambda安全、Functions安全、FaaS安全。当用户提到Serverless安全、Lambda安全、云函数安全、FaaS、无服务器架构安全时使用。 |
| `service-mesh` | [skills/service-mesh/SKILL.md](skills/service-mesh/SKILL.md) | 服务网格工程引擎。覆盖 Istio、Linkerd、Envoy、Ambient Mesh、Consul Connect、Flagger、流量管理、mTLS。当用户提到服务网格、Service Mesh、Istio、Linkerd、Envoy、Sidecar、Ambient Mesh、mTLS时使用。 |
| `shell-scripting` | [skills/shell-scripting/SKILL.md](skills/shell-scripting/SKILL.md) | Shell脚本开发、Bash、PowerShell、自动化脚本。当用户提到 Shell、Bash、PowerShell、脚本、sh、自动化脚本、bat时使用。 |
| `skill-creator` | [skills/skill-creator/SKILL.md](skills/skill-creator/SKILL.md) | 创建新的 Claude Code Skill。当用户提到创建Skill、写Skill、新建Skill、生成Skill、优化Skill时使用。 |
| `soc-operations` | [skills/soc-operations/SKILL.md](skills/soc-operations/SKILL.md) | SOC安全运营、SIEM管理、SOAR自动化、告警分析。当用户提到SOC、安全运营、SIEM、SOAR、告警分析、安全监控、事件分析时使用。 |
| `social-engineering` | [skills/social-engineering/SKILL.md](skills/social-engineering/SKILL.md) | 社会工程评估、钓鱼模拟、邮件安全检测、安全意识测试。当用户提到钓鱼、社工、phishing、邮件伪造、GoPhish、安全意识时使用。 |
| `spa-pentest` | [skills/spa-pentest/SKILL.md](skills/spa-pentest/SKILL.md) | SPA单页应用渗透测试、Vue/React/Angular安全测试。当用户提到SPA测试、前端安全、Vue安全、React安全、JS Bundle分析、前端渗透时使用。 |
| `spec` | [skills/spec/SKILL.md](skills/spec/SKILL.md) | Spec 驱动开发入口 — 创建、恢复、升级、废弃或列出需求规格。自动评估复杂度（L1 Patch / L2 Feature / L3 Epic），生成对应级别的 spec 文档。包含 SCHEMA 共享契约和全部模板。 |
| `spec-check` | [skills/spec-check/SKILL.md](skills/spec-check/SKILL.md) | Spec 检查器 — 对 spec 进行状态检查、结构 lint 和质量 review。三合一命令，按需使用，非强制门禁。 |
| `spec-do` | [skills/spec-do/SKILL.md](skills/spec-do/SKILL.md) | Spec 执行器 — 从 spec 中选取下一个未完成任务，实现代码，验证结果，并将证据写回 spec。唯一负责写代码的 skill。 |
| `spring-boot-dev` | [skills/spring-boot-dev/SKILL.md](skills/spring-boot-dev/SKILL.md) | Spring Boot 全栈开发引擎。覆盖 Spring Boot 3.x、Spring Security 6、Spring Data JPA/R2DBC、WebFlux、Spring Cloud、Actuator、GraalVM Native Image。当用户提到Spring Boot、Spring、Spring Security、Spring Data、JPA、WebFlux、Spring Cloud、Actuator时使用。 |
| `sql-optimization` | [skills/sql-optimization/SKILL.md](skills/sql-optimization/SKILL.md) | SQL 性能优化与数据库调优引擎。覆盖查询优化、执行计划分析、索引设计、分区策略、慢查询诊断、MySQL/PostgreSQL/SQL Server 调优。当用户提到SQL 优化、查询优化、慢查询、执行计划、EXPLAIN、索引优化、Index、分区时使用。 |
| `sre-practices` | [skills/sre-practices/SKILL.md](skills/sre-practices/SKILL.md) | SRE 工程实践引擎。覆盖 SLO/Error Budget、Toil 消除、容量规划、变更管理、On-call、Postmortem、生产就绪审查。当用户提到SRE、Site Reliability、可靠性工程、SLO、Error Budget、Toil、容量规划、变更管理时使用。 |
| `supply-chain-security` | [skills/supply-chain-security/SKILL.md](skills/supply-chain-security/SKILL.md) | 供应链安全、依赖检查、SCA软件成分分析、第三方库漏洞。当用户提到供应链安全、依赖漏洞、SCA、npm audit、pip安全、Maven漏洞、第三方库安全时使用。 |
| `svelte-dev` | [skills/svelte-dev/SKILL.md](skills/svelte-dev/SKILL.md) | Svelte 5 与 SvelteKit 全栈开发引擎。覆盖 Runes、Snippets、SvelteKit 路由、SSR/SSG、Form Actions、Load Functions、Svelte Store。当用户提到Svelte、SvelteKit、Runes、$state、$derived、$effect、Svelte 5、Svelte Store时使用。 |
| `swift-ios-dev` | [skills/swift-ios-dev/SKILL.md](skills/swift-ios-dev/SKILL.md) | Swift/iOS 工程开发专家。当用户提到 Swift、iOS、Xcode、SwiftUI、UIKit、Combine、SwiftData、SPM、TestFlight 时使用。 |
| `system-design` | [skills/system-design/SKILL.md](skills/system-design/SKILL.md) | 系统设计与架构引擎。覆盖分布式系统、CAP 定理、负载均衡、缓存策略、数据库模式、消息队列、微服务、服务发现、CDN、API Gateway。当用户提到系统设计、System Design、架构设计、分布式系统、CAP、负载均衡、Load Balancing、缓存时使用。 |
| `technical-writing` | [skills/technical-writing/SKILL.md](skills/technical-writing/SKILL.md) | 技术文档工程引擎。覆盖 API 文档、架构文档、用户指南、Changelog、ADR、Docs-as-Code、Markdown/AsciiDoc/reStructuredText。当用户提到技术文档、Technical Writing、API 文档、架构文档、用户指南、Changelog、ADR、Architecture Decision Record时使用。 |
| `testing` | [skills/testing/SKILL.md](skills/testing/SKILL.md) | 软件测试、单元测试、集成测试、pytest、Vitest、测试覆盖率。当用户提到测试、单元测试、pytest、Jest、Vitest、mock、覆盖率、TDD时使用。 |
| `threat-hunting` | [skills/threat-hunting/SKILL.md](skills/threat-hunting/SKILL.md) | 威胁狩猎、IOC分析、ATT&CK映射、SIEM规则、异常检测。当用户提到威胁狩猎、threat hunting、IOC、ATT&CK、SIEM、检测规则、Sigma、Yara时使用。 |
| `threat-intelligence` | [skills/threat-intelligence/SKILL.md](skills/threat-intelligence/SKILL.md) | 威胁情报、IOC管理、TI平台、情报分析。当用户提到威胁情报、TI、IOC、情报分析、APT追踪、威胁狩猎情报、STIX/TAXII时使用。 |
| `vue-dev` | [skills/vue-dev/SKILL.md](skills/vue-dev/SKILL.md) | Vue.js 全栈开发引擎。覆盖 Vue 3.5+ Composition API、Pinia、Vue Router 4、Nuxt 3、VueUse、Vite、TypeScript 集成、Element Plus/Naive UI。当用户提到Vue、Vue3、Composition API、Pinia、Vue Router、Nuxt、Nuxt3、VueUse时使用。 |
| `vuln-research` | [skills/vuln-research/SKILL.md](skills/vuln-research/SKILL.md) | 漏洞分析、CVE研究、漏洞原理解析、补丁分析。当用户提到 CVE、漏洞分析、漏洞原理、补丁分析、1day分析、nday时使用。 |
| `vulnerability-management` | [skills/vulnerability-management/SKILL.md](skills/vulnerability-management/SKILL.md) | 漏洞管理、补丁管理、漏洞优先级、风险评估。当用户提到漏洞管理、补丁管理、漏洞优先级、CVSS、漏洞修复、风险评估时使用。 |
| `web-fetch` | [skills/web-fetch/SKILL.md](skills/web-fetch/SKILL.md) | 抓取网页并提取可读文本。当用户提到抓取网页、获取 URL、读取网页、网页内容时使用。 |
| `web-pentest` | [skills/web-pentest/SKILL.md](skills/web-pentest/SKILL.md) | Web 应用渗透测试全流程执行引擎。集成 MCP redteam 工具链，覆盖 OWASP 2025 Top 10。当用户提到Web 渗透、渗透测试、Web 安全测试、XSS、SQLi、SSRF、CSRF、IDOR时使用。 |
| `web3-dapp` | [skills/web3-dapp/SKILL.md](skills/web3-dapp/SKILL.md) | Web3 DApp 全栈开发、智能合约、DeFi 集成、链上数据索引。当用户提到 Web3、DApp、Solidity、Hardhat、Foundry、ethers.js、viem、wagmi、RainbowKit、ConnectKit、IPFS、The Graph、ERC-20、ERC-721、ERC-1155、ERC-4337、Ethereum、Solana、Polygon、跨链桥、DeFi 协议时使用。触发命令：/web3-dapp |
| `windows-hardening` | [skills/windows-hardening/SKILL.md](skills/windows-hardening/SKILL.md) | Windows 系统加固与安全基线审计引擎。覆盖 Microsoft Security Baselines、CIS Benchmark、GPO、AppLocker/WDAC、BitLocker、Credential Guard、LAPS、PowerShell 安全。当用户提到Windows 加固、Windows Hardening、GPO 加固、组策略、AppLocker、WDAC、BitLocker、Credential Guard时使用。 |
| `wireless-security` | [skills/wireless-security/SKILL.md](skills/wireless-security/SKILL.md) | 无线安全、WiFi渗透、WPA破解、蓝牙安全、RF安全、无线协议分析。当用户提到无线安全、WiFi渗透、WPA、蓝牙安全、RF、无线协议、aircrack时使用。 |
| `zero-trust` | [skills/zero-trust/SKILL.md](skills/zero-trust/SKILL.md) | 零信任架构、微隔离、持续验证、最小权限。当用户提到零信任、Zero Trust、微隔离、持续验证、BeyondCorp、ZTNA时使用。 |
