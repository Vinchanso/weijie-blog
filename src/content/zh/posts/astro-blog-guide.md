---
title: "用 Astro 搭建高性能博客的完整指南"
description: "从零开始用 Astro 搭建一个极简、高性能、SEO 友好的双语博客，涵盖技术选型、核心配置和部署方案。"
pubDate: 2026-08-06
tags: ["Astro", "前端", "建站", "教程"]
---

## 为什么选 Astro

Astro 是专为内容型网站设计的框架。它的核心理念是"默认零 JavaScript"——除非你主动引入，否则页面输出的是纯 HTML 和 CSS。

对于博客来说，这意味着：

- **极快的首屏加载** — 没有 hydration 开销
- **SEO 天然友好** — 纯 HTML 对搜索引擎爬虫完全可读
- **低维护成本** — 没有复杂的运行时状态管理

## 核心配置

Astro 的内容集合（Content Collections）用 Zod 做 schema 校验，保证每篇文章的 frontmatter 格式正确：

```typescript
import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
});
```

## Markdown 写作流程

写一篇文章就是创建一个 `.md` 文件：

1. 在 `src/content/zh/posts/` 下新建文件
2. 写好 frontmatter（标题、描述、日期、标签）
3. 写正文
4. `git push` 自动部署

就这么简单。没有后台管理系统，没有数据库，没有服务器要维护。

## 部署方案

推荐 Cloudflare Pages 或 Vercel，都免费，都支持 Git 推送自动部署。构建命令是 `astro build`，输出目录是 `dist`。
