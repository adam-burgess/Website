// Everything to do with posts: the two sections, and helpers for listing posts,
// finding a series, building links, reading time and dates.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Section = 'notes' | 'bench';
export type Post = CollectionEntry<'notes'> | CollectionEntry<'bench'>;

// The two writing sections. Everything about a section lives here: its name,
// its web address, and the label and description shown on its page and the home page.
// The key (notes / bench) is the folder name inside src/content/.
export const SECTIONS = {
  notes: {
    name: 'Field Notes',
    single: 'Field note',
    slug: 'notes',
    path: '/notes/',
    eyebrow: 'Engineering',
    blurb: 'Write ups, thoughts, guides. Find here whatever I feel to write on a technical topic or project I’m working on.',
  },
  bench: {
    name: 'Off the Bench',
    single: 'Off the bench',
    slug: 'off-the-bench',
    path: '/off-the-bench/',
    eyebrow: 'Everything else',
    blurb: 'Find here my thoughts on topics that aren’t enigneering related, books, productivity or life in general.',
  },
} as const;

// Both sections as a list, e.g. for making one page per section.
export const SECTION_LIST = Object.entries(SECTIONS).map(([key, info]) => ({ key: key as Section, ...info }));

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

// Every post in the same series as `post`, in reading order (by `part`, then by date).
// Returns an empty list if the post isn't in a series. Can mix both sections.
export async function getSeries(post: Post): Promise<Post[]> {
  const name = post.data.series;
  if (!name) return [];
  const all = await getAllPosts();
  return all
    .filter((p) => p.data.series === name)
    .sort((a, b) =>
      (a.data.part ?? Infinity) - (b.data.part ?? Infinity) ||
      a.data.date.valueOf() - b.data.date.valueOf());
}

export const postUrl =(post: Post) => `${SECTIONS[post.collection].path}${post.id}/`;

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
