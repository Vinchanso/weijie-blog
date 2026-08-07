---
title: "Codex 接入 DeepSeek 完整教程：从配置到日常使用"
description: "手把手教你把 Codex CLI / 桌面应用接入 DeepSeek API，覆盖 API Key 获取、config.toml 配置、环境变量设置、连接验证和常见问题排查。"
pubDate: 2026-08-07
tags: ["Codex", "DeepSeek", "AI", "教程"]
---

## 为什么要用 DeepSeek 接入 Codex

Codex 默认使用 OpenAI 的模型（GPT 系列）。但在实际开发中，很多人会遇到两个问题：

- **成本高** — GPT 系列模型的 API 调用费用，在密集使用时相当可观
- **国内访问不稳定** — 直连 OpenAI API 需要稳定的网络环境

DeepSeek 的优势在于：API 完全兼容 OpenAI 格式、原生支持中文、价格远低于 GPT 系列、国内直连无延迟。把它接入 Codex，就等于用极低的成本获得了一个能力不错的 AI 编程助手。

本文所有配置步骤均基于 Codex CLI 0.147+ 和 Codex 桌面应用实测验证。文中的 `config.toml` 字段结构直接来自实际运行环境。

## 你需要准备什么

- Codex CLI 或 Codex 桌面应用（随 ChatGPT 桌面版安装）
- 一个 DeepSeek 账号
- 终端（macOS Terminal / iTerm / VS Code 终端均可）

如果你不确定 Codex 是否正确安装，可以运行：

```bash
codex --version
```

正常输出版本号即可。

## 第一步：获取 DeepSeek API Key

1. 打开 [DeepSeek 开放平台](https://platform.deepseek.com/)，注册并登录
2. 在左侧导航找到「API keys」页面
3. 点击「创建 API key」，给它一个名字（比如 `codex`）
4. **复制生成的 API Key 并妥善保存** — 页面关闭后无法再次查看完整 key
5. 在「费用」页面充值。新用户通常有免费额度可以先体验

> DeepSeek 的 API Key 格式为 `sk-` 开头的字符串。请像保管密码一样保管它，不要提交到 Git 或粘贴到公开场合。

## 第二步：理解 Codex 的配置文件

Codex 的所有配置都在一个文件里：`~/.codex/config.toml`。

如果你之前没有自定义过配置，这个文件可能不存在或者内容很少。用以下命令查看：

```bash
cat ~/.codex/config.toml
```

配置文件的核心结构是这样的：

```toml
# 顶层：指定用哪个 provider 和哪个模型
model_provider = "deepseek"
model = "deepseek-chat"

# Provider 定义：告诉 Codex 怎么连这个 API
[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com/v1"
wire_api = "chat"
env_key = "DEEPSEEK_API_KEY"
```

每个字段的含义：

| 字段 | 作用 | 说明 |
|---|---|---|
| `model_provider` | 选择哪个 provider | 顶层配置，必须和 `[model_providers.xxx]` 的名字对应 |
| `model` | 用哪个模型 | 填 provider 支持的模型 ID |
| `name` | 显示名称 | 纯展示用，随便填 |
| `base_url` | API 端点 | DeepSeek 的地址 |
| `wire_api` | API 协议格式 | `"chat"` = OpenAI Chat Completions 格式 |
| `env_key` | API Key 的环境变量名 | Codex 会从这个环境变量读取密钥 |

## 第三步：写入配置

打开配置文件进行编辑：

```bash
# 如果文件不存在，先创建
touch ~/.codex/config.toml

# 用你喜欢的编辑器打开
nano ~/.codex/config.toml
```

写入以下内容（如果你已有其他配置，只需修改对应字段）：

```toml
model_provider = "deepseek"
model = "deepseek-chat"
model_reasoning_effort = "medium"

[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com/v1"
wire_api = "chat"
env_key = "DEEPSEEK_API_KEY"
```

保存退出。如果你用的是 nano，按 `Ctrl+O` 保存，`Ctrl+X` 退出。

> **桌面应用用户注意**：如果你使用的是 Codex 桌面应用（随 ChatGPT 桌面版安装），它同样读取 `~/.codex/config.toml`。但桌面应用对 `wire_api` 的兼容性可能与 CLI 有差异。如果 `"chat"` 格式在桌面应用中不生效，你需要通过本地代理转换格式（方案见文末「常见问题」部分）。

## 第四步：设置环境变量

Codex 通过环境变量读取 API Key，而不是直接写在配置文件里。这样做是为了安全——配置文件可能会被分享或提交到 Git，但环境变量不会。

### macOS / Linux

```bash
# 添加到你的 shell 配置文件（zsh 用户用 .zshrc，bash 用户用 .bashrc）
echo 'export DEEPSEEK_API_KEY="sk-你的密钥"' >> ~/.zshrc

# 让配置立即生效
source ~/.zshrc
```

### 验证环境变量

```bash
echo $DEEPSEEK_API_KEY
```

如果输出你的 API Key（以 `sk-` 开头），说明设置成功。

> **安全提醒**：永远不要把 API Key 写进项目代码、`.env` 文件提交到 Git、或粘贴到聊天工具中。如果 Key 泄露，立即在 DeepSeek 平台删除并重新创建。

## 第五步：验证连接

启动 Codex，发一条简单消息测试：

```bash
codex "说一句你好"
```

如果 DeepSeek 连接正常，你会收到回复。如果报错，参考下面的排查指南。

你也可以用 Codex 内置的诊断工具检查配置：

```bash
codex doctor
```

这个命令会检查配置文件、认证状态和运行时环境是否正常。

## 模型选择建议

DeepSeek 目前提供两个主要模型（以官网最新公告为准）：

| 模型 ID | 对应产品 | 适合场景 |
|---|---|---|
| `deepseek-chat` | DeepSeek-V3 系列 | 日常编程、代码补全、快速问答 |
| `deepseek-reasoner` | DeepSeek-R1 系列 | 复杂推理、架构设计、疑难 bug 分析 |

切换模型只需修改 `config.toml` 中的 `model` 字段：

```toml
model = "deepseek-reasoner"  # 改成推理模型
```

或者在命令行临时指定，不改配置文件：

```bash
codex -m deepseek-reasoner "分析这段代码的性能瓶颈"
```

我的建议是：日常用 `deepseek-chat`（快且便宜），遇到复杂问题临时切到 `deepseek-reasoner`。

## 常见问题排查

### 问题 1：连接报错 / 超时

**现象**：Codex 启动后报连接错误或长时间无响应。

**排查步骤**：

```bash
# 1. 检查 API Key 是否设置
echo $DEEPSEEK_API_KEY

# 2. 检查网络是否能访问 DeepSeek API
curl -s https://api.deepseek.com/v1/models -H "Authorization: Bearer $DEEPSEEK_API_KEY" | head -5

# 3. 运行诊断
codex doctor
```

如果 curl 返回了模型列表 JSON，说明网络和 Key 都没问题，问题出在 Codex 配置。

### 问题 2：桌面应用不兼容 chat 格式

**现象**：Codex 桌面应用（ChatGPT.app）中使用 `wire_api = "chat"` 时报错或行为异常。

**原因**：桌面应用可能要求 `wire_api = "responses"` 格式（OpenAI Responses API），而 DeepSeek 原生只支持 Chat Completions 格式。

**解决方案**：通过本地代理转换格式。社区中有多个开源代理工具可以做 Chat → Responses 格式转换。核心思路是：

1. 本地启动一个代理服务，监听某个端口（如 `127.0.0.1:8080`）
2. 代理接收 Codex 的 Responses API 请求，转换成 Chat Completions 格式发给 DeepSeek
3. 把 DeepSeek 的响应转换回 Responses 格式返回给 Codex

配置文件改成：

```toml
model_provider = "deepseek-proxy"
model = "deepseek-chat"

[model_providers.deepseek-proxy]
name = "DeepSeek (via proxy)"
base_url = "http://127.0.0.1:8080/v1"
wire_api = "responses"
env_key = "DEEPSEEK_API_KEY"
```

具体代理工具的选择和搭建，建议在 GitHub 搜索 "codex proxy" 或 "openai responses to chat completions" 获取最新方案。

### 问题 3：function calling 不工作

DeepSeek API 支持 function calling（工具调用），Codex 依赖这个功能来执行命令和读写文件。如果你发现 Codex 只能聊天但不能执行操作：

- 确认模型 ID 没拼错（`deepseek-chat` 不是 `deepseek-v3`）
- 确认 `wire_api = "chat"`（不是其他值）
- 运行 `codex doctor` 检查工具链完整性

### 问题 4：修改配置后不生效

Codex 在每次启动时读取 `config.toml`。如果你修改了配置但没看到变化：

```bash
# 完全退出 Codex 后重新启动
# 如果用 CLI：
codex "测试一下"

# 如果用桌面应用：完全退出（Cmd+Q）后重新打开
```

## 成本对比

以下对比基于公开信息，**具体价格以 [DeepSeek 官网](https://platform.deepseek.com/) 实时为准**。

DeepSeek 的定价策略是按 token 计费，远低于同级别的国际模型。对于每天使用 Codex 几小时的开发者来说，月费通常在个位数到几十元人民币（取决于使用强度和模型选择）。相比之下，使用 GPT 系列模型的月费可能是这个数字的 5-10 倍。

我的实践建议：

- 日常编码用 `deepseek-chat`，保持低成本
- `model_reasoning_effort` 设为 `medium`，平衡质量和速度
- 遇到硬骨头临时切 `deepseek-reasoner`
- 定期在 DeepSeek 平台查看用量，做到心中有数

## 配置文件完整示例

以下是完整可用的 `config.toml` 示例，可以直接复制修改：

```toml
# ===== DeepSeek 接入 Codex 完整配置 =====

# 顶层：模型选择
model_provider = "deepseek"
model = "deepseek-chat"
model_reasoning_effort = "medium"

# Provider 定义
[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com/v1"
wire_api = "chat"
env_key = "DEEPSEEK_API_KEY"

# 项目信任级别（按需配置）
[projects."/your/project/path"]
trust_level = "trusted"
```

对应的 shell 配置（`~/.zshrc` 或 `~/.bashrc`）：

```bash
export DEEPSEEK_API_KEY="sk-你的实际密钥"
```

## 小结

Codex 接入 DeepSeek 的核心就三步：

1. 获取 DeepSeek API Key
2. 在 `~/.codex/config.toml` 配置 provider
3. 设置 `DEEPSEEK_API_KEY` 环境变量

CLI 版本基本可以直接用 `wire_api = "chat"` 接入。桌面应用如果遇到格式不兼容，需要通过代理转换。

选择 DeepSeek 的核心收益是：低成本、中文友好、国内直连。对于个人开发者和内容创作者来说，这是一个性价比极高的 AI 编程方案。

如果你在配置过程中遇到问题，欢迎在评论区交流。
