# jumari.com.au

The personal website of Adam Jumari Burgess: a home page about me, and two places to write.

- **Field Notes**: engineering write-ups, guides and projects.
- **Off the Bench**: everything else: books, productivity, opinions.

The live site is **https://jumari.com.au**. It updates by itself about a minute after
any change is saved to GitHub.

---

## Writing a post

There are two ways. Both do the same thing.

**In the browser (easiest):** go to **https://jumari.com.au/admin/**, sign in with your
GitHub access token, pick a section, and click **New**. Press **Save** to publish.
Leave **Draft** switched on while you're still writing; drafts are saved but hidden.

**In VS Code:** copy `_template.md` from `src/content/notes/` or `src/content/bench/`,
fill in the details at the top, and write underneath. Commit and push to publish.

Want to see it before it goes live? Run `npm run dev` in the terminal and open
http://localhost:4321. Drafts show up there too.

---

## Where everything is

Only the folders marked ✏️ are ones you'd normally touch.

```
Website/
│
├── src/                    ← the website itself
│   ├── content/          ✏️ YOUR POSTS
│   │   ├── notes/            Field Notes: one folder per post (index.md + its photos)
│   │   └── bench/            Off the Bench: same layout
│   │
│   ├── pages/            ✏️ one file per kind of page
│   │   ├── index.astro       the home page (intro, "Currently", recent writing)
│   │   ├── [section]/        the section pages and post pages, shared by both sections
│   │   └── admin/            a stylesheet for the writing editor's preview
│   │
│   ├── components/           building blocks used by the pages
│   │   ├── Base.astro        the frame around every page (tab title, header, footer)
│   │   ├── Masthead.astro    the header: jumari.com.au + menu
│   │   ├── Footer.astro      the footer: © line, LinkedIn, AI note
│   │   ├── Post.astro        the layout of a single post
│   │   ├── PostList.astro    the list of posts on a section page
│   │   └── SeriesBox.astro   the "Part 2 of 4" box on posts in a series
│   │
│   ├── images/               photos used by the site itself (your portrait)
│   ├── site.css          ✏️ colours, fonts, and how post text looks
│   ├── posts.ts              section names and descriptions, and post helpers
│   └── content.config.ts     the list of details every post needs at the top
│
├── public/                 ← files served exactly as they are
│   ├── favicon.svg           the browser-tab icon
│   └── admin/                the writing editor (Sveltia CMS) and its settings
│
├── astro.config.mjs        site settings: maths, code colours, photo captions
├── .github/workflows/      the instructions GitHub follows to publish the site
├── package.json            the list of tools the site needs
└── README.md               this file
```

Folders you might see but can ignore: `node_modules/` (downloaded tools),
`dist/` (the built site), `.astro/` (Astro's scratch space). They're rebuilt
automatically and aren't saved to GitHub.

---

## Common changes

| I want to… | Change this |
|---|---|
| Edit the home page text or "Currently" | `src/pages/index.astro` |
| Rename a section or change its description | `SECTIONS` in `src/posts.ts` |
| Change a colour or font | the top of `src/site.css` |
| Change how posts look | `src/site.css` (parts 2 and 3) |
| Change the header or footer | `src/components/Masthead.astro` / `Footer.astro` |
| Change the portrait | replace `src/images/portrait.jpg` |
| Change the tab icon | replace `public/favicon.svg` |

---

## The details at the top of a post

```yaml
title: The first board
description: One or two sentences, shown under the title and on cards.
date: 2026-08-31
tags: [RF, PCB]
series: Building a tuneable load   # optional: groups posts together
part: 2                            # optional: order within the series
cover: ./cover.jpg                 # optional: shown at the top of the post, on its card and in lists
coverAlt: What the picture shows
draft: true                        # hidden from the live site until false
```

In the text: `$…$` for maths, three backticks for code, `![what it shows](./photo.jpg "Caption")`
for a captioned photo, and `***` for a section break. The post
`src/content/notes/how-to-write-a-post/` shows every feature.
