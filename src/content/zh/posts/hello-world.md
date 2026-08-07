---
title: "你好，世界"
description: "这是维杰博客的第一篇文章，记录我创建这个博客的过程和思考。"
pubDate: 2026-08-07
tags: ["随笔", "建站"]
---

## 为什么写博客

做 AI 技术内容，需要一个属于自己的阵地。社交媒体的信息流太碎片化，沉淀不下来深度内容。博客给了我一个可以完整表达想法的空间。

这个博客的技术选型是这样的：

- **Astro** 作为框架，为内容而生，性能和 SEO 顶级
- **Markdown** 写作，`git push` 即发布
- 中英文双语，右上角一键切换

## 代码展示

作为技术博客，代码块的展示效果至关重要。下面是一段 TypeScript 示例：

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

## 接下来

这个博客会持续更新，主要方向是 AI 技术实践、开发工具链、以及我对行业趋势的思考。欢迎通过 RSS 订阅。

如果你有任何想法，欢迎交流。
