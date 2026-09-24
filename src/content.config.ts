// Defines the two writing collections and what every post must have at the top
// (its "frontmatter"). If a post is missing a field or has the wrong type,
// the build stops and tells you which file and which field.
import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Both collections share one schema.
const schema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    // One or two sentences. Used as the subtitle, on cards, and in search results.
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // Short topic labels, e.g. ['RF', 'Altium']. Shown on cards.
    tags: z.array(z.string()).default([]),
    // Optional picture for the Recent writing card (a file next to the post).
    cover: image().optional(),
    coverAlt: z.string().default(''),
    // Drafts show up in `npm run dev` but are left out of the live site.
    draft: z.boolean().default(false),
  });

// Each post is a .md or .mdx file (or a folder with index.md/mdx plus its images).
// The file or folder name becomes the URL: notes/tuneable-load.mdx -> /notes/tuneable-load/
const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/notes' }),
  schema,
});

const bench = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/bench' }),
  schema,
});

export const collections = { notes, bench };
