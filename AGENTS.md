## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## 项目强制规则

### 品牌名
- **中文**: 维杰
- **英文**: Vijay
- 禁止使用 Weijie（已废弃）

### 双语完整性（最高优先级）
- 每篇中文文章必须有对应英文版本，反之亦然
- 提交前必须运行 `bash scripts/verify-bilingual.sh` 检查双语对齐
- 语言切换必须双向可用，不允许出现 404
- 详细规则见 `~/AI_Roland/记忆库/强制规则/强制规则_交付质量与零返工.md`

### 部署流程
1. `npm run build` 构建成功
2. `bash scripts/verify-bilingual.sh` 双语检查通过
3. `git add -A && git commit && git push`
4. 等 Vercel 部署完成后，线上验证核心路径
