// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://weijie.blog',
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      shikiConfig: {
        theme: 'github-light',
        wrap: true,
      },
    },
  },
});
