// Shared helpers for reading posts out of the two collections.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Section = 'notes' | 'bench';
export type Post = CollectionEntry<'notes'> | CollectionEntry<'bench'>;

// Names and URLs for each section, in one place.
export const SECTIONS = {
  notes: { name: 'Field Notes', single: 'Field note', path: '/notes/' },
  bench: { name: 'Off the Bench', single: 'Off the bench', path: '/off-the-bench/' },
} as const;

// Newest first. Drafts are included in `npm run dev` and left out of the live build.
export async function getPosts(section: Section): Promise<Post[]> {
  const posts = await getCollection(section, ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Both sections merged, newest first.
export async function getAllPosts(): Promise<Post[]> {
  const all = [...(await getPosts('notes')), ...(await getPosts('bench'))];
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (post: Post) => `${SECTIONS[post.collection].path}${post.id}/`;

// ~230 words a minute, ignoring code blocks and maths.
export function readingTime(body = ''): string {
  const text = body.replace(/```[\s\S]*?```/g, '').replace(/\$\$[\s\S]*?\$\$/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 230))} min read`;
}

// "24 Sep 2026" for bylines, "Sep 2026" for lists.
export const longDate = (d: Date) =>
  d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
export const shortDate = (d: Date) =>
  d.toLocaleDateString('en-AU', { month: 'short', year: 'numeric', timeZone: 'UTC' });
