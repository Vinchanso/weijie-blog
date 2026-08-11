---
title: "Complete Guide: Connecting Codex to DeepSeek — From Config to Daily Use"
description: "Step-by-step guide to connecting Codex CLI / desktop app to the DeepSeek API. Covers API Key setup, config.toml configuration, environment variables, connection verification, and common troubleshooting."
pubDate: 2026-08-07
tags: ["Codex", "DeepSeek", "AI", "tutorial"]
---

## Why Connect DeepSeek to Codex

Codex uses OpenAI models (GPT series) by default. In practice, many developers run into two issues:

- **High cost** — GPT series API calls add up quickly with heavy use
- **Unstable access** — Direct OpenAI API access requires a stable network environment

DeepSeek's advantages: the API is fully OpenAI-compatible, natively supports Chinese, costs far less than GPT, and is directly accessible in China without latency.

All configuration steps in this article have been verified on Codex CLI 0.147+ and the Codex desktop app. The `config.toml` field structure comes directly from a real running environment.

## What You Need

- Codex CLI or Codex desktop app (installed with the ChatGPT desktop version)
- A DeepSeek account
- A terminal (macOS Terminal / iTerm / VS Code terminal all work)

Verify Codex is installed correctly:

```bash
codex --version
```

If it outputs a version number, you're good.

## Step 1: Get Your DeepSeek API Key

1. Go to [DeepSeek Platform](https://platform.deepseek.com/), register and log in
2. Find "API keys" in the left navigation
3. Click "Create API key", give it a name (e.g. `codex`)
4. **Copy the generated API Key and save it securely** — you can't view the full key again after closing the page
5. Top up in the "Billing" page. New users usually get free credits to try

> DeepSeek API Keys start with `sk-`. Guard it like a password — never commit it to Git or paste it publicly.

## Step 2: Understand Codex's Config File

All Codex configuration lives in one file: `~/.codex/config.toml`.

View it:

```bash
cat ~/.codex/config.toml
```

The core structure:

```toml
# Top-level: which provider and model to use
model_provider = "deepseek"
model = "deepseek-chat"

# Provider definition: how to connect to the API
[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com/v1"
wire_api = "chat"
env_key = "DEEPSEEK_API_KEY"
```

Field meanings:

| Field | Purpose | Notes |
|---|---|---|
| `model_provider` | Which provider | Must match `[model_providers.xxx]` name |
| `model` | Which model | Fill in a model ID the provider supports |
| `name` | Display name | Cosmetic, fill in anything |
| `base_url` | API endpoint | DeepSeek's address |
| `wire_api` | API protocol format | `"chat"` = OpenAI Chat Completions format |
| `env_key` | Environment variable name | Codex reads the key from this env var |

## Step 3: Write the Config

```bash
# Create if doesn't exist
touch ~/.codex/config.toml

# Edit
nano ~/.codex/config.toml
```

Write (or merge with existing config):

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

Save and exit. In nano: `Ctrl+O` to save, `Ctrl+X` to exit.

> **Desktop app note**: The Codex desktop app reads the same `~/.codex/config.toml`, but its `wire_api` compatibility may differ from CLI. If `"chat"` format doesn't work in the desktop app, you'll need a local proxy to convert formats (see "Common Problems" below).

## Step 4: Set the Environment Variable

Codex reads the API Key from an environment variable, not the config file. This is for security — config files may be shared or committed to Git, but env vars won't be.

### macOS / Linux

```bash
# Add to your shell config (zsh users: .zshrc, bash users: .bashrc)
echo 'export DEEPSEEK_API_KEY="sk-your-key"' >> ~/.zshrc

# Apply immediately
source ~/.zshrc
```

### Verify

```bash
echo $DEEPSEEK_API_KEY
```

If it outputs your key (starting with `sk-`), it's set correctly.

> **Security**: Never put API Keys in project code, commit `.env` to Git, or paste them in chat tools. If leaked, immediately delete and recreate on the DeepSeek platform.

## Step 5: Verify the Connection

Start Codex and send a simple message:

```bash
codex "say hello"
```

If DeepSeek is connected, you'll get a reply. If it errors, check the troubleshooting below.

You can also run the built-in diagnostic:

```bash
codex doctor
```

This checks config, auth, and runtime health.

## Model Selection

DeepSeek currently offers two main models (check official announcements for latest):

| Model ID | Product | Best For |
|---|---|---|
| `deepseek-chat` | DeepSeek-V3 series | Daily coding, code completion, quick Q&A |
| `deepseek-reasoner` | DeepSeek-R1 series | Complex reasoning, architecture design, tricky bugs |

Switch by editing the `model` field in `config.toml`:

```toml
model = "deepseek-reasoner"
```

Or override per-run without changing config:

```bash
codex -m deepseek-reasoner "analyze this code's performance bottleneck"
```

My recommendation: use `deepseek-chat` daily (fast and cheap), switch to `deepseek-reasoner` for complex problems.

## Common Problems

### Problem 1: Connection Error / Timeout

```bash
# 1. Check API Key
echo $DEEPSEEK_API_KEY

# 2. Check network access to DeepSeek API
curl -s https://api.deepseek.com/v1/models -H "Authorization: Bearer $DEEPSEEK_API_KEY" | head -5

# 3. Run diagnostic
codex doctor
```

If curl returns a model list JSON, network and Key are fine — the issue is in Codex config.

### Problem 2: Desktop App Incompatible with Chat Format

**Symptom**: Using `wire_api = "chat"` in the Codex desktop app causes errors or abnormal behavior.

**Cause**: The desktop app may require `wire_api = "responses"` (OpenAI Responses API), while DeepSeek natively only supports Chat Completions.

**Solution**: Use a local proxy for format conversion. Community tools on GitHub can do Chat → Responses conversion. The idea:

1. Run a proxy locally on a port (e.g. `127.0.0.1:8080`)
2. Proxy receives Codex's Responses API request, converts to Chat Completions, sends to DeepSeek
3. Converts DeepSeek's response back to Responses format for Codex

Config becomes:

```toml
model_provider = "deepseek-proxy"
model = "deepseek-chat"

[model_providers.deepseek-proxy]
name = "DeepSeek (via proxy)"
base_url = "http://127.0.0.1:8080/v1"
wire_api = "responses"
env_key = "DEEPSEEK_API_KEY"
```

Search GitHub for "codex proxy" or "openai responses to chat completions" for latest tools.

### Problem 3: Function Calling Not Working

DeepSeek supports function calling, which Codex needs to execute commands and read/write files. If Codex can chat but can't take actions:

- Confirm model ID is correct (`deepseek-chat`, not `deepseek-v3`)
- Confirm `wire_api = "chat"`
- Run `codex doctor`

### Problem 4: Config Changes Not Taking Effect

Codex reads `config.toml` on every launch:

```bash
# Fully quit Codex and restart
# CLI:
codex "test"

# Desktop: Cmd+Q to fully quit, then reopen
```

## Cost Comparison

Based on public info — **check [DeepSeek's site](https://platform.deepseek.com/) for real-time pricing**.

DeepSeek charges per token, far less than comparable international models. For a developer using Codex several hours daily, monthly costs are typically single digits to tens of RMB (depending on intensity and model). GPT series costs might be 5-10x that.

Practical tips:

- Use `deepseek-chat` for daily coding to keep costs low
- Set `model_reasoning_effort` to `medium` for balanced quality and speed
- Switch to `deepseek-reasoner` temporarily for tough problems
- Check usage regularly on the DeepSeek dashboard

## Complete Config Example

```toml
# ===== DeepSeek + Codex Complete Config =====

# Top-level: model selection
model_provider = "deepseek"
model = "deepseek-chat"
model_reasoning_effort = "medium"

# Provider definition
[model_providers.deepseek]
name = "DeepSeek"
base_url = "https://api.deepseek.com/v1"
wire_api = "chat"
env_key = "DEEPSEEK_API_KEY"

# Project trust (as needed)
[projects."/your/project/path"]
trust_level = "trusted"
```

Shell config (`~/.zshrc` or `~/.bashrc`):

```bash
export DEEPSEEK_API_KEY="sk-your-actual-key"
```

## Summary

Three steps to connect Codex to DeepSeek:

1. Get a DeepSeek API Key
2. Configure the provider in `~/.codex/config.toml`
3. Set the `DEEPSEEK_API_KEY` environment variable

CLI works directly with `wire_api = "chat"`. Desktop app may need a proxy if the format is incompatible.

The core benefits: low cost, Chinese-friendly, direct domestic access. For individual developers and content creators, this is an extremely cost-effective AI coding solution.
