---
title: "用 CC Switch 把 Claude Code 和 Codex 接到 DeepSeek、智谱——踩完所有坑后的完整记录"
description: "从零配置 CC Switch 接入国内模型，涵盖协议差异、本地路由、502/401 报错排查、切换模型的正确姿势。照着做就能跑起来。"
pubDate: 2026-08-07
tags: ["CC Switch", "Claude Code", "Codex", "DeepSeek", "智谱", "教程"]
---

最近很多朋友问我：

想用 Claude Code 和 Codex，但又觉得官方模型太贵，或者网络不稳定，能不能接到 DeepSeek、智谱这些国内模型上？

可以，而且现在已经相对成熟了。工具就是 CC Switch。

但必须说实话——这事没表面看起来那么丝滑。配置过程中你会遇到 502、401、一直转圈、切换模型后必须开新会话等各种问题。我自己从零配到能稳定用，前后踩了不少坑，今天把完整过程和解决方法都写清楚，尽量写到你照着做就能跑起来的程度。

## 一、先搞清楚 CC Switch 是干什么的

简单说，CC Switch 是一个本地管理工具。它能帮你：

- 统一管理 Claude Code、Codex 等工具的模型供应商
- 在不同模型之间快速切换（DeepSeek、智谱、Kimi 等）
- 对不支持原生协议的模型，做本地协议转换（这点很关键）

Claude Code 主要认 Anthropic 的协议，Codex 认 OpenAI 的 Responses 协议，而 DeepSeek、智谱多数是 Chat Completions 协议。CC Switch 的本地路由就是在中间做翻译的。

没有它，直接改配置文件会非常折腾，而且容易改乱。

## 二、准备工作

安装 CC Switch（去 GitHub 搜索 `farion1231/cc-switch` 或者访问 [ccswitch.io](https://ccswitch.io/zh/)，下载对应系统的版本）。

准备好 API Key：

- 智谱：https://open.bigmodel.cn
- DeepSeek：https://platform.deepseek.com

已经安装好 Claude Code 和 Codex（命令行能跑起来）。

建议先关掉系统代理的「系统代理」模式，改用 TUN 模式（非常关键的步骤）。

## 三、配置 Claude Code（以智谱 / DeepSeek 为例）

1. 打开 CC Switch，切到 Claude 标签页
2. 点击右上角「+」添加供应商
3. 选择对应的预设（智谱 GLM 或 DeepSeek）
4. 填入你的 API Key
5. 保存并启用

重点检查：

- 设置 → 路由 → 打开「路由总开关」
- 同时打开 Claude 的接管开关

打开接管后，CC Switch 会自动修改 `~/.claude/settings.json`，把请求指向本地代理（默认 `http://127.0.0.1:15721`）。

配置完后，完全退出 Claude Code 再重新打开，新建对话测试。

## 四、配置 Codex（重点，坑比较多）

Codex 对协议要求更严，DeepSeek 和智谱基本都需要走本地路由。

1. 在 CC Switch 切到 Codex 标签页
2. 添加供应商，选择 DeepSeek 或智谱预设
3. 关键：确保 Chat Completions 是打开的
4. 填好 API Key，保存并启用
5. 设置 → 路由 → 打开路由总开关 + 打开 Codex 接管

之后重启 Codex 再测试。

模型名建议用官方比较稳的：

- DeepSeek：`deepseek-chat`、`deepseek-reasoner` 等（以官网最新为准）
- 智谱：`glm-4-plus`、`glm-4-flash`、`glm-5.2` 等（以官网最新为准）

## 五、常见问题排查

### 问题 1：502 Bad Gateway

**原因**：本地路由在做协议转换时出错，通常是模型 API 端点不对或者网络问题。

**解决方法**：

- 确认 base_url 填对了（DeepSeek 是 `https://api.deepseek.com/v1`，智谱是 `https://open.bigmodel.cn/api/paas/v4/`）
- 关掉系统代理，改用 TUN 模式
- 重启 CC Switch 的本地路由
- 检查模型名是否正确（拼写、大小写）

### 问题 2：401 Unauthorized

**原因**：CC Switch 里存的 Key 不对，或者本地路由没有正确把真实 Key 注入给 Claude Code / Codex。

**解决方法**：

- 回到 CC Switch，重新检查并粘贴完整的 API Key（注意不要有空格）
- 确认路由总开关和对应应用的接管开关都是开着的
- 重新启用一次供应商
- 完全退出客户端再打开

### 问题 3：一直转圈，没有响应

**原因**：本地路由在做协议转换时卡住了，或者流式响应没有正常结束。

**解决方法**：

- 先按 Esc 停止当前请求
- 重启 CC Switch 的本地路由（关掉再开）
- 确认系统代理没有干扰
- 新建一个会话再试
- 先发简单的「你好」测试，排除是模型响应过慢的问题

### 问题 4：切换模型后必须开新会话

这不是 bug，是设计如此。

不同模型的上下文窗口、行为习惯都不一样，强行接着聊容易混乱。工具主动要求开新会话，是为了保证质量。

实用应对：

- 切换前让旧模型帮你总结当前进度
- 复制总结到新会话开头，再继续
- 重要信息可以写到项目里的笔记文件，让新模型先读

## 六、一些使用建议

1. 同一个任务尽量用同一个模型做完，少切换，体验会顺很多。
2. 切换模型后，养成「完全退出再打开」的习惯，配置更容易生效。
3. 本地路由开关尽量保持开启状态，尤其是用 DeepSeek 和智谱的时候。
4. 如果某天突然全部 502，优先检查系统代理，十有八九是它。
5. 智谱和 DeepSeek 的模型名会更新，遇到 model not found，去官网确认最新名称。

## 七、写在最后

CC Switch 确实让国内模型接入 Claude Code 和 Codex 变得可行，但过程并不「零门槛」。协议差异、本地代理、系统代理三者搅在一起，很容易出各种奇怪的问题。

我把这些坑都走了一遍，写成这篇，是希望后来的人少花点时间在排查上。

如果你按照上面的步骤配置后还有问题，可以把具体的报错信息发出来，我看到会尽量帮你看看。

也欢迎补充你自己踩过的坑，大家一起把这套玩法完善起来。
