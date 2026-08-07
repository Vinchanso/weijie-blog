// Site-wide constants

export const SITE_TITLE = '维杰';
export const SITE_TITLE_EN = 'Weijie';
export const SITE_DESCRIPTION = '关于 AI、技术与开发的深度思考';
export const SITE_DESCRIPTION_EN = 'Deep thoughts on AI, technology, and development';
export const SITE_URL = 'https://weijie.blog';
export const AUTHOR = '维杰';

export const LANGUAGES = {
  zh: '中文',
  en: 'English',
} as const;

export const DEFAULT_LANG = 'zh' as const;

export type Lang = keyof typeof LANGUAGES;
