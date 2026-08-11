---
title: "Connecting Claude Code and Codex to DeepSeek & Zhipu with CC Switch: A Complete Guide After Hitting Every Pitfall"
description: "From zero to stable: configuring CC Switch to route Claude Code and Codex through domestic Chinese models. Covers protocol differences, local routing, 502/401 troubleshooting, and model-switching best practices."
pubDate: 2026-08-07
tags: ["CC Switch", "Claude Code", "Codex", "DeepSeek", "Zhipu", "tutorial"]
---

A lot of people have been asking me lately:

Can I use Claude Code and Codex but connect them to domestic models like DeepSeek or Zhipu, instead of paying for the official models or dealing with unstable network?

Yes, you can. And it's relatively mature now. The tool is CC Switch.

But I have to be honest — it's not as smooth as it looks. During setup you'll hit 502 errors, 401 errors, infinite loading, forced new sessions after switching models, and more. I went through all of it from zero to stable, and I'm writing down the complete process and solutions so you can follow along and get it running.

## 1. What CC Switch Actually Does

Simply put, CC Switch is a local management tool. It helps you:

- Manage model providers for Claude Code, Codex, and other tools in one place
- Switch between models quickly (DeepSeek, Zhipu, Kimi, etc.)
- Do local protocol conversion for models that don't support native protocols (this is critical)

Claude Code mainly uses Anthropic's protocol. Codex uses OpenAI's Responses protocol. But DeepSeek and Zhipu mostly use Chat Completions protocol. CC Switch's local routing acts as a translator in between.

Without it, editing config files directly is painful and easy to mess up.

## 2. Preparation

Install CC Switch (search `farion1231/cc-switch` on GitHub, or visit [ccswitch.io](https://ccswitch.io/zh/), download the version for your system).

Get your API Keys ready:

- Zhipu: https://open.bigmodel.cn
- DeepSeek: https://platform.deepseek.com

Make sure Claude Code and Codex are installed and runnable from the command line.

Recommendation: turn off "System Proxy" mode in your proxy tool and switch to TUN mode (a very important step).

## 3. Configuring Claude Code (Zhipu / DeepSeek example)

1. Open CC Switch, switch to the Claude tab
2. Click "+" in the top right to add a provider
3. Select the preset (Zhipu GLM or DeepSeek)
4. Enter your API Key
5. Save and enable

Key checks:

- Settings → Routing → Turn on the master routing switch
- Also turn on the Claude takeover switch

After enabling takeover, CC Switch automatically modifies `~/.claude/settings.json` to point requests to the local proxy (default `http://127.0.0.1:15721`).

After configuration, fully quit Claude Code and reopen it, then start a new conversation to test.

## 4. Configuring Codex (More Pitfalls Here)

Codex has stricter protocol requirements. DeepSeek and Zhipu basically need local routing.

1. In CC Switch, go to the Codex tab
2. Add a provider, select DeepSeek or Zhipu preset
3. Critical: make sure Chat Completions is enabled
4. Enter your API Key, save and enable
5. Settings → Routing → Turn on master routing + Codex takeover

Then restart Codex and test.

Recommended stable model names:

- DeepSeek: `deepseek-chat`, `deepseek-reasoner`, etc. (check official docs for latest)
- Zhipu: `glm-4-plus`, `glm-4-flash`, `glm-5.2`, etc. (check official docs for latest)

## 5. Common Problem Troubleshooting

### Problem 1: 502 Bad Gateway

**Cause**: Local routing failed during protocol conversion. Usually wrong API endpoint or network issue.

**Solution**:

- Verify the base_url is correct (DeepSeek: `https://api.deepseek.com/v1`, Zhipu: `https://open.bigmodel.cn/api/paas/v4/`)
- Turn off system proxy, switch to TUN mode
- Restart CC Switch's local routing
- Check model name spelling and case

### Problem 2: 401 Unauthorized

**Cause**: Wrong API Key stored in CC Switch, or local routing didn't inject the real Key into Claude Code / Codex correctly.

**Solution**:

- Go back to CC Switch, re-check and paste the complete API Key (no spaces)
- Confirm both the master routing switch and the app takeover switch are on
- Re-enable the provider once
- Fully quit and reopen the client

### Problem 3: Infinite Loading, No Response

**Cause**: Local routing stalled during protocol conversion, or streaming response didn't terminate properly.

**Solution**:

- Press Esc to stop the current request
- Restart CC Switch's local routing (turn off and on)
- Confirm system proxy isn't interfering
- Start a new conversation and retry
- Send a simple "hello" first to rule out slow model response

### Problem 4: Must Start New Session After Switching Models

This isn't a bug — it's by design.

Different models have different context windows and behavioral patterns. Forcing a continuation would cause confusion. The tool proactively requires a new session to maintain quality.

Practical tips:

- Before switching, ask the old model to summarize current progress
- Copy the summary to the new session's beginning, then continue
- Write important info to a notes file in the project for the new model to read first

## 6. Usage Tips

1. Try to complete a task with the same model — switching less means smoother experience.
2. After switching models, make it a habit to fully quit and reopen — config takes effect more reliably.
3. Keep the local routing switch on, especially with DeepSeek and Zhipu.
4. If everything suddenly returns 502 one day, check your system proxy first — nine times out of ten, that's it.
5. Model names for Zhipu and DeepSeek get updated. If you get "model not found", verify the latest name on the official site.

## 7. Closing Thoughts

CC Switch does make it feasible to connect domestic models to Claude Code and Codex, but the process isn't "zero-friction." Protocol differences, local proxy, and system proxy tangled together easily cause all sorts of weird issues.

I walked through all these pitfalls and wrote this guide so others can spend less time troubleshooting.

If you still have issues after following these steps, share the specific error message and I'll try to help.

Also welcome to add your own pitfalls — let's build this workflow together.
