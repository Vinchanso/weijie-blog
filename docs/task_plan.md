# 维杰博客 — 项目规划

## 项目概述
- **名称**: 维杰（Weijie）个人博客
- **目标**: 以 AI 技术内容为主的高质量双语博客，面向流量增长，未来支持评论、订阅、变现
- **技术栈**: Astro + TypeScript + Markdown + Cloudflare Pages / Vercel
- **定位**: 个人技术品牌 + 自媒体内容平台
- **项目目录**: /Users/vinc/product/blog

## 核心需求
1. 技术文章为主，代码块多，需要优秀的语法高亮和排版
2. 中英文双语（语言切换模式，非堆叠模式）
3. SEO 优先，页面加载快，搜索引擎友好
4. 写作流程简单: 写 Markdown -> push -> 自动发布
5. 极简素雅的视觉风格
6. 架构可扩展，未来能加评论、搜索、订阅、变现功能

## 技术选型

### 前端框架: Astro
- 内容优先设计，零 JS 默认输出，SEO 性能顶级
- 内置 Shiki 语法高亮
- Islands 架构支持后续局部交互
- 语言: TypeScript + HTML + CSS

### 内容管理: Markdown 文件
- 文章以 .md / .mdx 文件存储，Git 版本管理
- Frontmatter 管理元数据（标题、日期、标签、封面图、语言等）
- 中英文分目录: src/content/zh/ 和 src/content/en/

### 字体方案（全部 OFL 授权，免费商用）
- 中文正文: Noto Serif SC（思源宋体）— 子集化处理
- 英文正文: Newsreader（衬线体，屏幕阅读优化）
- 代码块: JetBrains Mono

### 部署: Cloudflare Pages（首选）/ Vercel
- 免费托管，自动 HTTPS，全球 CDN
- Git 推送自动构建部署
- 后续接 EdgeOne 免费 CDN 优化国内访问

### 双语方案: 语言切换
- URL 结构: /zh/posts/xxx 和 /en/posts/xxx
- 页面右上角语言切换按钮
- hreflang 标签区分语言版本
- 写作灵活: 可先写中文，后续补充英文翻译

### 后续功能扩展方案
- 评论: Giscus 或 Waline
- 全文搜索: Pagefind
- 订阅: RSS + 邮件订阅
- 统计: Umami

## 任务分解

### 阶段一: 基础博客（MVP）
目标: 能写文章、能上线、能被搜到

- [ ] 1.1 项目初始化: Astro 项目搭建，基础配置
- [ ] 1.2 内容结构设计: Markdown frontmatter 规范，中英文目录结构
- [ ] 1.3 双语路由: /zh/ 和 /en/ 语言路由，语言切换组件
- [ ] 1.4 页面布局: 首页（文章列表）、文章详情页、关于页
- [ ] 1.5 排版系统: 代码块高亮、文章正文样式、响应式设计
- [ ] 1.6 字体系统: Noto Serif SC 子集化、Newsreader、JetBrains Mono 集成
- [ ] 1.7 SEO 基础: meta 标签、Open Graph、sitemap、robots.txt、hreflang
- [ ] 1.8 RSS 订阅源（中英文各一个）
- [ ] 1.9 部署上线: Cloudflare Pages / Vercel 配置
- [ ] 1.10 验收: 首页能看、文章能读、中英切换正常、移动端正常、Lighthouse 跑分

### 阶段二: 内容完善 + 基础功能
- [ ] 2.1 文章标签和分类系统（双语）
- [ ] 2.2 标签页 / 分类页
- [ ] 2.3 文章归档页（按时间线）
- [ ] 2.4 代码块增强: 复制按钮、语言标签、行号
- [ ] 2.5 图片优化: 自动压缩、懒加载、WebP
- [ ] 2.6 暗色 / 亮色主题切换
- [ ] 2.7 访问统计接入（Umami）

### 阶段三: 互动 + 增长
- [ ] 3.1 评论系统（Giscus / Waline）
- [ ] 3.2 全文搜索（Pagefind，跨语言）
- [ ] 3.3 邮件订阅入口
- [ ] 3.4 文章目录（TOC）自动生成
- [ ] 3.5 上一篇 / 下一篇导航
- [ ] 3.6 相关文章推荐
- [ ] 3.7 双语对照阅读模式（可选）

### 阶段四: 品牌 + 变现
- [ ] 4.1 自定义域名绑定
- [ ] 4.2 关于页 / 联系页完善
- [ ] 4.3 社交媒体链接和分享按钮
- [ ] 4.4 广告位 / 赞助位
- [ ] 4.5 付费文章机制（可能需要后端）

## 设计原则
- 简洁至上: 内容是主角，UI 不抢戏
- 性能优先: 每个功能加上去前先想"值不值那点加载时间"
- 渐进增强: 先有能用的基础版，再迭代加功能
- SEO 贯穿: 从第一天就考虑搜索引擎抓取
- 双语优先: 架构从一开始就支持中英文，不留技术债

## 参考 Skills
- coding-standards: TypeScript 规范、KISS/YAGNI 原则
- frontend-design: 避免 AI 通用审美，极简风格执行
- web-design-guidelines: Web Interface Guidelines 合规
- performance-optimization: LCP < 2.5s，字体子集化
- planning-with-files: 项目管理三件套（task_plan / findings / progress）
