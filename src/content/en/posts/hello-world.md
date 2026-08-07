---
title: "Hello, World"
description: "The first post on this blog, documenting the process and reasoning behind building it."
pubDate: 2026-08-07
tags: ["notes", "meta"]
---

## Why Blog

Working with AI technology means I need a home base. Social media feeds are too fragmented for in-depth content. A blog gives me a space to express ideas fully.

The tech stack for this blog:

- **Astro** as the framework, built for content, top-tier performance and SEO
- **Markdown** writing, `git push` to publish
- Bilingual (Chinese/English), one click to switch

## Code Display

For a tech blog, code block rendering quality matters. Here's a TypeScript example:

```typescript
interface Post {
  title: string;
  pubDate: Date;
  tags: string[];
}

function sortByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}
```

## What's Next

This blog will be updated regularly, focusing on AI tech practices, developer tooling, and my thoughts on industry trends. Subscribe via RSS if you're interested.

Feel free to reach out with any thoughts.
