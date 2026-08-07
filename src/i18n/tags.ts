import { getCollection } from 'astro:content';
import type { Lang } from '../consts';

export interface TagInfo {
  tag: string;
  count: number;
}

// Get all unique tags with post counts for a language
export async function getAllTags(lang: Lang): Promise<TagInfo[]> {
  const collection = lang === 'zh' ? 'zhPosts' : 'enPosts';
  const posts = await getCollection(collection, ({ data }) => !data.draft);

  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

 return [...tagMap.entries()]
   .map(([tag, count]) => ({ tag, count }))
   .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

// Get posts that have a specific tag
export async function getPostsByTag(tag: string, lang: Lang) {
 const collection = lang === 'zh' ? 'zhPosts' : 'enPosts';
 const posts = await getCollection(collection, ({ data }) => !data.draft);
 return posts
   .filter((post) => post.data.tags.includes(tag))
   .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

// URL-encode a tag for use in URLs
export function encodeTag(tag: string): string {
  return encodeURIComponent(tag);
}

// Decode a tag from URL
export function decodeTag(encoded: string): string {
  return decodeURIComponent(encoded);
}
