// Everything to do with posts: the two sections, and helpers for listing posts,
// finding a series, building links, reading time and dates.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Section = Post['data']['section'];

// The two writing sections. Everything about a section lives here: its name,
// its web address, and the label and description shown on its page and the home page.
// The key (notes / bench) is what a post's `section:` line says.
export const SECTIONS = {
  notes: {
    name: 'Field Notes',
    single: 'Field note',
    slug: 'notes',
    path: '/notes/',
    eyebrow: 'Engineering',
    blurb: 'You can find here writing on engineering concepts and projects I’m working on. I’ll try to keep this section more technical, a vehicle for me to share with you my technical learnings and mistakes',
  },
  bench: {
    name: 'Off the Bench',
    single: 'Off the bench',
    slug: 'off-the-bench',
    path: '/off-the-bench/',
    eyebrow: 'Everything else',
    blurb: 'You can find here my thoughts on topics that aren’t necessarily enigneering related, updates on my life, thoughts on the world, ideas. Anything that captivates me enough to sit down and write',
  },
} as const;

// Both sections as a list, e.g. for making one page per section.
export const SECTION_LIST = Object.entries(SECTIONS).map(([key, info]) => ({ key: key as Section, ...info }));

// Both sections, newest first. Drafts are included in `npm run dev` and left out of the live build.
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// One section's posts, newest first.
export async function getPosts(section: Section): Promise<Post[]> {
  return (await getAllPosts()).filter((post) => post.data.section === section);
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

export const postUrl = (post: Post) => `${SECTIONS[post.data.section].path}${post.id}/`;

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
