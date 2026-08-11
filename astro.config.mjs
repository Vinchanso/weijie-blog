// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import sentryAstro from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog-ochre-six-20.vercel.app',
  integrations: [
    sitemap(),
    sentryAstro(),
  ],
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
