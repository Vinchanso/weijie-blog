import { translations, type TranslationKey } from './ui';
import type { Lang } from '../consts';

// Translate a key for a given language
export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key];
}

// Get the alternate language path for a given path
export function getAlternateLangPath(path: string, currentLang: Lang): string {
  const otherLang: Lang = currentLang === 'zh' ? 'en' : 'zh';
  const pathWithoutLang = path.replace(/^\/(zh|en)/, '');
  return `/${otherLang}${pathWithoutLang || ''}`;
}

// Detect language from URL pathname
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'zh' || lang === 'en') return lang;
  return 'zh';
}

// Format date according to language
export function formatDate(date: Date, lang: Lang): string {
  const locale = lang === 'zh' ? 'zh-CN' : 'en-US';
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(locale, options);
}

// Estimate reading time from content
export function getReadingTime(content: string, lang: Lang): string {
  const chars = content.length;
  const minutes = Math.max(1, Math.ceil(chars / 500));
  return `${minutes} ${lang === 'zh' ? '分钟阅读' : 'min read'}`;
}

// Check if a slug exists in both language collections
import { getEntry } from 'astro:content';

export async function postExistsInLang(slug: string, lang: Lang): Promise<boolean> {
  try {
    const collection = lang === 'zh' ? 'zhPosts' : 'enPosts';
    const entry = await getEntry(collection, slug);
    return !!entry && !entry.data.draft;
  } catch {
    return false;
  }
}
