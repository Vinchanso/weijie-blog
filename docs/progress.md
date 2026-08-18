# 工作进度

## 当前状态
阶段一 MVP 基本完成 — dev server 和生产构建均通过验证

## 已完成
### 阶段一: 基础博客（MVP）
- [x] 1.1 项目初始化: Astro 7.2.0 + TypeScript
- [x] 1.2 内容结构设计: Markdown frontmatter 规范，中英文分目录 (src/content/zh/ + src/content/en/)
- [x] 1.3 双语路由: /zh/ 和 /en/ 语言路由，语言切换组件
- [x] 1.4 页面布局: 首页（文章列表）、文章详情页、关于页
- [x] 1.5 排版系统: Shiki 语法高亮、文章正文样式、响应式设计
- [x] 1.6 字体系统: Noto Serif SC + Newsreader + JetBrains Mono（OFL 授权）
- [x] 1.7 SEO 基础: meta 标签、Open Graph、Twitter Card、sitemap、robots.txt、hreflang
- [x] 1.8 RSS 订阅源（中英文合并）
- [x] 1.9 暗色模式（跟随系统 + Ctrl+` 手动切换）
- [ ] 1.10 部署上线: 待用户配置 Cloudflare Pages / Vercel

### 验证结果
- dev server: http://localhost:4321 正常运行
- 根路径 / → 302 重定向到 /zh/
- 中英文首页、文章详情页、关于页全部正常
- RSS 源包含中英文文章
- hreflang 标签正确
- 生产构建: 7 页面 + RSS + sitemap，1.75s 完成
- 暗色/亮色主题切换正常

## 进行中
- 等待用户预览确认后，进行部署配置

## 待办
- [ ] 用户预览并确认样式效果
- [ ] 1.10 部署到 Cloudflare Pages 或 Vercel
- [ ] 自定义域名绑定（如有）

## 更新: 标签系统 + 全文搜索 (2026-08-07)

### 新增功能
- [x] 标签索引页: /zh/tags/ 和 /en/tags/ (标签云展示，带文章计数)
- [x] 标签筛选页: /zh/tags/[tag] 和 /en/tags/[tag] (按标签过滤文章)
- [x] 标签可点击: 文章卡片和文章详情页的标签均可点击跳转
- [x] 导航入口: 页头新增「标签」链接
- [x] Pagefind 全文搜索: 支持中英文关键词搜索 (Ctrl+K 或 Cmd+K 唤起)
- [x] 搜索结果高亮: 匹配关键词高亮显示
- [x] 搜索防抖: 200ms 防抖，避免频繁搜索

### 构建验证
- astro build + pagefind 索引: 通过
- 6 篇文章被索引 (3 中 + 3 英)
- 2 种语言自动识别 (zh, en)
- 702 个词被索引
- 标签页全部正确生成 (中文 8 个标签, 英文 8 个标签)

## 视觉审查与修复 (2026-08-07)

### 审查方法
使用 Playwright 提取桌面端 (1280px) 和移动端 (375px) 所有关键元素的 computed styles，逐项对照 frontend-design、coding-standards、web-design-guidelines 规范审查。

### 发现并修复的问题
1. ✅ 导航搜索框文字过长（92px → 纯图标 16px），精简导航空间
2. ✅ 导航字体混用（Noto Serif SC + Newsreader → 统一 Noto Serif SC）
3. ✅ 首篇文章上间距过大（76px → 48px，移除 :first-child padding-top）
4. ✅ 代码块字体未生效（monospace → JetBrains Mono）
5. ✅ letter-spacing 不统一（title 0.02em → 全部 normal）
6. ✅ CSS 语法缩进错误（post-list__item padding 行）
7. ✅ 搜索按钮点击区域过小（增加 padding，移动端额外增大）

### 验证通过项
- 字体一致性：中文 Noto Serif SC，英文 Newsreader，代码 JetBrains Mono
- 左右对称：Header (960px) 和正文 (680px) 均以页面中心对称居中
- 字重层次：标题 700、列表标题 600、正文 400
- 行高：正文 1.85、标题 1.3-1.4、列表项 1.4
- 移动端导航：277px 宽，375px 视口下有 58px 余量
- 构建通过：7 页面 + Pagefind 索引正常

## 首篇技术文章 (2026-08-07)

### 新增内容
- [x] 文章: "Codex 接入 DeepSeek 完整教程：从配置到日常使用"
  - 位置: src/content/zh/posts/codex-deepseek-guide.md
  - 标签: Codex, DeepSeek, AI, 教程
  - 12 个章节, 16 个代码块, 2 个表格, 3 个引用块
  - 约 5100 字, 阅读时间 12 分钟
  - 内容基于用户机器上实际 Codex config.toml 配置格式验证

### 验证
- 首页正确显示（4 篇文章按日期排序）
- 文章详情页渲染正常（H2/表格/代码块/引用块全部正确）
- Pagefind 索引: 7 页面, 1113 词
- 生产构建通过

## 部署上线完成 (2026-08-07)

### 部署结果
- GitHub 仓库: https://github.com/VijayLam/vijaylab-blog
- Vercel 项目: vinc5/vijaylab-blog
- 线上地址: https://vijaylab-blog.vercel.app
- GitHub ↔ Vercel 自动部署: 已关联

### 线上验证
- [x] 根路径: 正常返回
- [x] 中文首页: 4 篇文章正确显示
- [x] 文章详情页: Codex DeepSeek 教程渲染正常
- [x] 英文首页: 语言标识和内容正确
- [x] RSS: 7 篇文章全部包含
- [x] Sitemap: 正确生成
- [x] hreflang: 中英文互链正确
- [x] 标签页: 可正常访问
- [x] 构建时间: <1 秒（Vercel 缓存加速）

### 部署前 review
- [x] 密钥扫描: 无泄露
- [x] .env 检查: 无敏感文件
- [x] 构建验证: 31 页面通过
- [x] Git 工作区: 干净
