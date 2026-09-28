// Defines the posts collection and what every post must have at the top
// (its "frontmatter"). If a post is missing a field or has the wrong type,
// the build stops and tells you which file and which field.
import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const schema = ({ image }: SchemaContext) =>
  z.object({
    // Which section the post is in: notes = Field Notes, bench = Off the Bench.
    // Change it to move the post (its web address changes with it).
    section: z.enum(['notes', 'bench']),
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
    // Which 2:1 part of the cover to show, set with the editor's crop tool:
    // "x y w" = left edge, top edge (% of the photo's width / height) and width (% of its width).
    // Without it, the largest 2:1 part from the centre is used.
    coverCrop: z.string().regex(/^\s*[\d.]+\s+[\d.]+\s+[\d.]+\s*$/, 'coverCrop must be "x y w" in %').optional(),
    // Optional: posts with the same series name are grouped together, e.g.
    //   series: Building a tuneable load
    //   part: 2
    // `part` sets the order; without it, parts are ordered by date (oldest first).
    series: z.string().trim().min(1).optional(),
    part: z.number().int().positive().optional(),
    // Drafts show up in `npm run dev` but are left out of the live site.
    draft: z.boolean().default(false),
  });

// Every post, from both sections, lives in src/content/posts/: a .md or .mdx file
// (or a folder with index.md/mdx plus its images). The file or folder name becomes
// the end of the URL: posts/tuneable-load.mdx with `section: notes` -> /notes/tuneable-load/
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema,
});

export const collections = { posts };
