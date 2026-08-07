import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, AUTHOR } from '../consts';

export async function GET(context: { site: URL }) {
  const zhPosts = await getCollection('zhPosts', ({ data }) => !data.draft);
  const enPosts = await getCollection('enPosts', ({ data }) => !data.draft);

  const allPosts = [
    ...zhPosts.map((p) => ({ ...p, lang: 'zh' as const })),
    ...enPosts.map((p) => ({ ...p, lang: 'en' as const })),
  ].sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site || SITE_URL,
    items: allPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/${post.lang}/posts/${post.id}`,
      categories: post.data.tags,
      author: AUTHOR,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
