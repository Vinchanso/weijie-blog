# 博客写作速查卡

## 一分钟发布流程

```bash
# 1. 创建文章文件
# 中文: src/content/zh/posts/文件名.md
# 英文: src/content/en/posts/文件名.md

# 2. 写文章（照下面的模板抄）

# 3. 如果有图片，放到 public/images/ 目录

# 4. 提交发布
cd /Users/vinc/product/blog
git add -A
git commit -m "新文章：你的标题"
git push

# 5. 等 30 秒，线上自动更新
```

## 文章模板（直接复制改内容）

```markdown
---
title: "你的文章标题"
description: "一句话描述文章内容，会显示在文章列表和搜索结果中"
pubDate: 2026-08-11
tags: ["标签1", "标签2"]
---

正文从这里开始...
```

## 字段说明

| 字段 | 必填 | 格式 | 说明 |
|---|---|---|---|
| title | 是 | 文字 | 文章标题，用引号包起来 |
| description | 是 | 文字 | 一句话摘要，不超过 100 字 |
| pubDate | 是 | YYYY-MM-DD | 发布日期 |
| tags | 是 | 数组 | 标签用英文逗号分隔，每个用引号包起来 |
| heroImage | 否 | 路径 | 封面图路径，如 /images/cover.png |
| updatedDate | 否 | YYYY-MM-DD | 更新日期 |
| draft | 否 | true/false | true 时不发布，默认 false |

## Markdown 常用语法

### 标题
```markdown
## 二级标题（文章内用这个）
### 三级标题
```
注意：不要用 `#` 一级标题，文章标题已经自动是一级了。

### 粗体和斜体
```markdown
**粗体文字**
*斜体文字*
```

### 代码

行内代码用反引号包起来：
```markdown
这是 `code` 行内代码
```

代码块用三个反引号，写语言名可以高亮：
````markdown
```typescript
const x: number = 1;
```
````

支持的语言：typescript, javascript, python, bash, toml, json, html, css, yaml, sql, go, rust 等。

### 列表
```markdown
- 无序列表项
- 第二项

1. 有序列表项
2. 第二项
```

### 引用
```markdown
> 这是一段引用文字
```

### 分割线
```markdown
---
```

### 链接
```markdown
[文字](https://链接地址)
```

### 图片
```markdown
![图片描述](/images/文件名.png)
```

## 图片怎么放

1. 把图片文件复制到 `public/images/` 目录
2. 文章中引用路径为 `/images/文件名.png`
3. 建议图片宽度不超过 1200px，格式用 WebP 或 PNG
4. 图片名用英文，不要用中文和空格

## 文件命名规则

- 用英文，全小写，单词之间用连字符 `-`
- 好的例子：`cc-switch-guide.md`、`ai-dev-workflow.md`
- 不好的例子：`我的文章.md`、`My Article.md`

## 中英文文章的对应关系

如果写了中文文章 `src/content/zh/posts/example.md`，
英文版放在 `src/content/en/posts/example.md`（文件名相同）。
不需要同时写，可以先写中文，以后补英文。

## 发完文章怎么确认

1. 等 30 秒（Vercel 自动构建部署）
2. 打开 https://vijaylab-blog.vercel.app/zh/
3. 首页应该出现你的新文章
4. 点进去确认排版正常

如果没出现：
- 检查 frontmatter 格式对不对（有没有少引号、少横线）
- 检查 pubDate 有没有写错
- 检查 draft 是不是写成了 true

## 常见问题

**Q: 文章发布后日期不对？**
A: pubDate 格式必须是 YYYY-MM-DD，比如 2026-08-11。不能写 2026/8/11。

**Q: 标签点进去没有其他文章？**
A: 标签名要统一，比如 "AI" 和 "ai" 是两个不同的标签。建议首字母大写。

**Q: 代码块没有高亮？**
A: 代码块开头写了语言名才会高亮（```typescript 而不是 ```）。

**Q: 图片不显示？**
A: 检查图片路径。/images/xxx.png 对应 public/images/xxx.png 文件。
