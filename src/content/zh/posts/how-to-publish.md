---
title: "怎么发布一篇文章（带图片的完整流程）"
description: "这篇文章本身就是一个示例——它包含了封面图、正文图片、代码块，演示从写文章到发布的完整流程。"
pubDate: 2026-08-11
tags: ["教程", "建站"]
heroImage: "/images/demo/cover-example.svg"
---

这篇文章本身就是一个活示例。你现在看到的封面图、下面的正文图片、代码块，全部是手写 Markdown 放上去的。我一步步说明怎么做。

## 第一步：放图片

发布文章前，先把图片放到 `public/images/` 目录下。你可以建子目录来组织，比如：

```
public/
└── images/
    ├── demo/
    │   └── cover-example.svg    ← 封面图
    └── screenshots/
        └── config-screen.png    ← 截图
```

放好之后，在文章里用 `/images/路径/文件名` 来引用。

## 第二步：写 frontmatter

每篇文章开头都有这个：

```yaml
---
title: "文章标题"
description: "一句话摘要"
pubDate: 2026-08-11
tags: ["标签1", "标签2"]
heroImage: "/images/demo/cover-example.svg"
---
```

`heroImage` 是可选的。填了的话，这篇文章会在分享到社交媒体时显示封面图。

## 第三步：写正文

正文就是标准 Markdown，下面演示几种常用格式。

### 图片

在正文中插入图片：

![示例图片描述](/images/demo/cover-example.svg)

写法是感叹号 + 方括号描述 + 圆括号路径。

### 代码块

```typescript
function publishPost(title: string) {
  console.log(`发布文章: ${title}`);
}
```

### 引用

> 这是一段引用，适合放读者需要注意的重点。

### 列表

- 第一项
- 第二项
- 第三项

## 第四步：发布

```bash
cd /Users/vinc/product/blog
git add -A
git commit -m "新文章：怎么发布一篇文章"
git push
```

等 30 秒，打开 `https://blog-ochre-six-20.vercel.app/zh/` 就能看到。

## 图片规格建议

- 封面图宽高比：1200x630px（社交媒体分享标准）
- 正文图片宽度：不超过 1200px
- 格式优先级：WebP > PNG > JPG
- 文件名用英文，不要有空格和中文
