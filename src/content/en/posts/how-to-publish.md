---
title: "How to Publish a Post (Complete Workflow with Images)"
description: "This post is itself a live example — it includes a cover image, inline images, and code blocks, demonstrating the complete workflow from writing to publishing."
pubDate: 2026-08-11
tags: ["tutorial", "meta"]
heroImage: "/images/demo/cover-example.svg"
---

This post is a living example. The cover image, the inline image below, the code blocks — all hand-written in Markdown. Let me walk through how step by step.

## Step 1: Place Your Images

Before publishing, put images in the `public/images/` directory. You can organize with subdirectories:

```
public/
└── images/
    ├── demo/
    │   └── cover-example.svg    ← cover image
    └── screenshots/
        └── config-screen.png    ← screenshots
```

Reference them in articles as `/images/path/filename`.

## Step 2: Write the Frontmatter

Every post starts with:

```yaml
---
title: "Post Title"
description: "One-line summary"
pubDate: 2026-08-11
tags: ["tag1", "tag2"]
heroImage: "/images/demo/cover-example.svg"
---
```

`heroImage` is optional. If included, the post shows a cover image when shared on social media.

## Step 3: Write the Body

Standard Markdown. Here are common formats.

### Images

![Example image description](/images/demo/cover-example.svg)

Syntax: exclamation mark + bracketed description + parenthesized path.

### Code Blocks

```typescript
function publishPost(title: string) {
  console.log(`Publishing post: ${title}`);
}
```

### Blockquote

> This is a quote, good for highlighting key points.

### Lists

- First item
- Second item
- Third item

## Step 4: Publish

```bash
cd /Users/vinc/product/blog
git add -A
git commit -m "new post: how to publish"
git push
```

Wait 30 seconds, then visit `https://vijaylab-blog.vercel.app/zh/` to see it.

## Image Guidelines

- Cover image ratio: 1200x630px (social media standard)
- Inline image width: no wider than 1200px
- Format priority: WebP > PNG > JPG
- Filenames in English, no spaces or Chinese characters
