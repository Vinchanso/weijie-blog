import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared schema for posts in both languages
const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  heroImage: z.string().optional(),
  draft: z.boolean().default(false),
});

// Chinese posts collection
const zhPosts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/zh/posts' }),
  schema: postSchema,
});

// English posts collection
const enPosts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/en/posts' }),
  schema: postSchema,
});

export const collections = { zhPosts, enPosts };
