# jumari.com.au

Personal writing website for Adam Jumari Burgess. Electrical & electronic engineering + computer science student at Curtin University, Perth. Honours research at the Curtin Institute of Radio Astronomy (a wirelessly tuneable load for characterising 2.45 GHz antenna arrays).

## How to work with Adam
- Build step by step and explain each change as you make it. He wants to understand the project well enough to extend it himself.
- Be succinct: no preamble, no closing summary, answer only what's asked.
- No opinions or recommendations unless he asks.
- He's on Windows, using VS Code and its integrated PowerShell terminal.

## Purpose
A place to write. Three kinds of content: technical guides, interactive "lab" pieces, and non-technical writing (books, opinion pieces, personal productivity).

Influences: hkk.fyi (subject site: one thesis, a Lab of interactive browser instruments) and harrys.monster (person site: timeline, case studies, CV).

## Locked decisions
- Homepage: thesis statement (tagline) first, then everything below it.
- Homepage is about Adam as a person, NOT RF-first. It doubles as the About page (no separate /about/, removed 2026-09-24). A version that led with a live antenna array-factor plot was rejected as too specialist.
- Two named collections, not one tagged stream: **Off the Bench** (renamed from Essays, 2026-09-24) and **Field Notes**.
- Field Notes = technical writing AND interactive lab pieces merged. If interactivity needs its own signal later, add a filter inside Field Notes, not a fourth section.
- Bottom doors on homepage: Field Notes (left) / Off the Bench (right), two equal full-width columns. (Resume page removed 2026-09-24.)
- Full name, including "Jumari", appears in the tagline.
- Off the Bench pieces are formatted like Substack.
- Hosting: **GitHub Pages**, deployed by GitHub Actions. Chosen over Cloudflare Pages because Cloudflare Pages requires moving nameservers to Cloudflare for an apex domain; GitHub Pages accepts apex A records at the existing DNS host.
- Stack: **Astro** (v7, needs Node ≥ 22.12). Content collections for typed Markdown with build-time validation; islands so interactive components load JS only on their own page. Rejected: Next.js, Jekyll.

## Current state (2026-09-24)
- Scaffold built and running locally (`npm run dev` → http://localhost:4321). `astro build` produces 3 pages.
- Folder: `C:\Users\adamb\Documents\Website` (deliberately outside OneDrive).
- Git initialised in VS Code on branch `main`; first commit and "Publish Branch" to GitHub in progress. Repo name `jumari`. Public vs private not yet decided (private requires GitHub Pro, free via GitHub Student Developer Pack).
- `.github/workflows/deploy.yml` was first created as a single file named `.github` by mistake; being fixed by renaming. Confirm it lives at `.github/workflows/deploy.yml` before the first push.
- PowerShell execution policy was fixed with `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- Content collections added 2026-09-24 (see Writing posts). Homepage ported from prototype v3; Recent writing is filled from the collections.

## File map
Simplified 2026-09-27; README.md explains the layout in plain English for anyone.
```
astro.config.mjs          site URL, MDX, maths (remark-math + KaTeX), Shiki themes, figureCaptions plugin (inline), /admin dev redirect
.github/workflows/deploy.yml   build (withastro/action@v6) + deploy (actions/deploy-pages@v5) on push to main
README.md                 plain-English guide to the project
public/favicon.svg        logo: "Beam", light tile; browser-tab icon only
public/admin/             Sveltia CMS (index.html: editor + preview template; config.yml: fields)
src/site.css              ALL shared CSS: 1 tokens/fonts/basics, 2 post frame (+ series nav), 3 post text (.prose)
src/posts.ts              SECTIONS (name, single, slug, path, eyebrow, blurb) + SECTION_LIST; getPosts/getAllPosts/getSeries/postUrl/readingTime/dates
src/content.config.ts     collections + frontmatter schema
src/images/portrait.jpg   hero photo (Astro-optimised)
src/components/Base.astro      <head> + Masthead + slot + Footer; imports site.css
src/components/Masthead.astro  wordmark jumari.com.au + nav (Home, Field Notes, Off the Bench)
src/components/Footer.astro    © line + LinkedIn + AI disclaimer
src/components/Post.astro      post page (was layouts/Piece.astro); imports KaTeX CSS; shows `cover` 2:1 at the very top, above the title, measure+160px wide (.piece .cover in site.css); editor preview shows it too
src/components/PostList.astro  section list rows: 120px 2:1 cover thumbnail (blank tile if none) · title, series (teal) + tags (grey), description · date; phones: no thumbnail, date under text
src/components/SeriesBox.astro
src/components/Cover.astro     2:1 cover frame used by Post, PostList and the home-page cards; applies `coverCrop`
src/pages/index.astro          home page; doors built from SECTION_LIST
src/pages/[section]/index.astro        both section list pages (/notes/, /off-the-bench/) via getStaticPaths over SECTION_LIST
src/pages/[section]/[...slug].astro    every post page in both sections
src/pages/admin/preview.css.ts         /admin/preview.css = site.css + editor-only rules
```

## Writing posts
- Posts live in `src/content/notes/` (Field Notes, URL /notes/<name>/) and `src/content/bench/` (Off the Bench, URL /off-the-bench/<name>/). Copy `_template.md` in either folder; files starting with `_` are ignored.
- A single file (`name.md`) or a folder (`name/index.md` + its images). Use the folder form when the post has photos.
- Frontmatter: title, description, date, updated?, tags[], series?, part?, cover? (image next to the post, used on the home-page card), coverAlt, coverCrop? ("x y w" in %: the 2:1 part of the cover to show, set with the editor's crop tool; default = largest centred 2:1), draft (drafts show in `npm run dev` only).
- `.md` or `.mdx` (MDX when a post needs components).
- Features: GFM (tables, footnotes, autolinks), KaTeX maths (`$…$`, `$$…$$`), Shiki code (github-light/dark, follows OS theme), images optimised by Astro, `![alt](./x.jpg "Caption")` -> captioned figure, `***` -> centred section break.
- Astro 7's default Markdown engine (Sätteri) doesn't run remark/rehype plugins, so astro.config.mjs sets `markdown.processor: unified({...})` from `@astrojs/markdown-remark`.
- Demo of every feature: `src/content/notes/how-to-write-a-post/` (draft). Placeholder: `src/content/bench/first-draft.md` (draft).
- Home-page Recent writing = newest 6 posts across both collections.
- **Series (2026-09-27):** optional frontmatter `series` (name; exact match groups posts, across both sections) and `part` (int, order; else by date oldest first). `getSeries()` in posts.ts. Post page shows SeriesBox (src/components/SeriesBox.astro: "Part n of N · name" + numbered list) under the byline, and previous/next cards at the bottom (styles in site.css). PostList shows a "Series · name · Part n" line. Editor has Series + Part number fields; its preview shows the series label only.
- Restart `npm run dev` after changing astro.config.mjs or content.config.ts.
- **Browser editor (added 2026-09-24):** Sveltia CMS at https://jumari.com.au/admin/ (`public/admin/index.html` + `config.yml`). Commits straight to `adam-burgess/Website` main, which triggers the deploy. Sign in with "Sign In Using Access Token" (fine-grained GitHub token, this repo only, Contents: read and write); "Sign In with GitHub" would need an OAuth server, not set up. Each post is a folder (`{{slug}}/index.md`) with its images beside it. Fields in config.yml must match src/content.config.ts. A "Maths block" editor component writes `$$…$$`; inline maths is safest in the editor's Markdown mode. **Sveltia is self-hosted and patched (2026-09-28):** `public/admin/sveltia-cms.js` is Sveltia 0.221.8 with one change, `replace:()=>void 0` → `replace:()=>!1` in the multiline editor-component transformer (source: src/lib/services/contents/fields/rich-text/components/transformers.js). Without it, any multi-line editor component (the Maths block) becomes a Lexical Markdown shortcut with start pattern `/^./`, so typing one character + space at the start of a line deleted it. `public/admin/chunks/react-dom.js` is the matching lazy-loaded chunk (falls back to unpkg if missing). To upgrade Sveltia: download the new dist/sveltia-cms.js + chunks, reapply the patch (check the bug is still unfixed upstream first), strip sourceMappingURL lines. Validate config changes against Sveltia's JSON schema (package `@sveltia/cms`, `schema/sveltia-cms.json`). Because the editor commits on GitHub, pull before editing locally.
- **Details / Body switch (2026-09-28):** `public/admin/index.html` adds a two-button switch next to "Edit" in the editor pane header (a MutationObserver re-inserts it when Sveltia re-renders). "Body" adds `html.body-view`, which hides every `.field[data-key-path]` except `body` (fields with a validation error, `:has([id$="-error"])`, stay visible) and stretches Body to the pane height via flex (`.content` → `.field` → `.field-wrapper`/`.text-editor` → `.lexical-root` or `.text-area`). Choice saved in localStorage `editor-view` (default body). Relies on Sveltia's DOM classes; recheck after a Sveltia upgrade.
- **Spellcheck (2026-09-28):** `public/admin/index.html` has a MutationObserver that sets `spellcheck` + `lang="en-AU"` on every text input, textarea and contenteditable in the edit pane that has no `spellcheck` attribute yet (Sveltia sets `<html lang>` to its UI locale "en", overriding en-AU). Boxes inside `[data-key-path="latex"]` (Maths block) get spellcheck off. Uses the browser's own dictionary; Chrome/Edge ignore `lang` and use the languages enabled in browser settings.
- **Cover crop (2026-09-28):** `coverCrop: "x y w"` = left, top (% of photo width/height) and width (% of photo width) of a 2:1 box. `Cover.astro` clamps it to the photo using the image's metadata, sets `--x/--y/--w` on the img, and scales requested widths/sizes by 1/w so zoomed crops stay sharp. CSS `.cover-frame` in site.css: 2:1 overflow-hidden frame; img width = 100%/w, `translate(-x*100%, -y*100%)` (translate % is of the img itself, so no height needed). Editor: custom field type `cover-crop` (CMS.registerWidget in public/admin/index.html) shows the picture from the Card picture field's thumbnail `<img>` with a draggable/resizable 2:1 box; "Use centre" clears it. Custom widgets make Sveltia lazy-load Immutable from unpkg. The preview template renders the same frame. Body view also removes the 768px max-width on the Body field and 800px on the pane header, so Body spans the pane.
- **Editor preview (2026-09-27):** `public/admin/index.html` registers a preview template for both collections that copies Post.astro (masthead wordmark, eyebrow, title, subtitle, byline, body, back link) and renders the body with marked + KaTeX (CDN, KaTeX pinned to the site's version) plus the image-caption rule. Styles come from `/admin/preview.css`, an endpoint (`src/pages/admin/preview.css.ts`) that serves site.css plus a few editor-only rules, so the preview tracks the site automatically. Post-page styles live in `src/site.css` (parts 2 and 3), shared with the editor preview. Known gaps vs the live page: code blocks aren't syntax-coloured, footnotes show as plain text. If Post.astro's markup changes, update the template in index.html to match.

## Planned layout
- Still to add: `src/pages/rss.xml.js` (RSS feed).

## Homepage (prototype v3, approved)
Prototype: https://claude.ai/artifact/MXZv6D1XsuEQKD7gMgdHHZ
1. Masthead: wordmark `jumari.com.au` (".com.au" in ink-3) + nav
2. Hero: headline "Hi! / I'm Adam *Jumari* Burgess." (Spectral; name kept on one line beside the photo, font scales to fit, max 52px; Jumari italic in accent) + two first-person paragraphs + 4:5 portrait slot on the right (grid: 1fr / 300px)
3. "Currently": 3-row definition list — Research / Next / Reading (Teaching removed 2026-09-24) (mono uppercase dt, hairline rules)
4. "Recent writing" (modelled on hkk.fyi's Lab): bold Plex Sans heading + rule to the right edge; intro line with ←/→ arrow buttons; sideways-scrolling, snap-aligned track showing 2 cards at a time (85% width, one at a time, on phones). Card = 2:1 preview (image or placeholder), bold title, accent mono tags, blurb, solid accent "Read →" button; tinted background, 1.5px border. Ends with a dashed "Next up" slot. Data in the `recent` array in index.astro; small inline script drives the arrows.
5. Doors: Field Notes / Off the Bench, two equal full-width columns, open layout (no boxes: cards were tried and rejected 2026-09-24). 30x2px accent rule, accent mono label (same as Recent writing tags), bold Plex Sans title with arrow, short description.
6. Footer: LinkedIn + disclaimer "This website was built with the help of AI. All words are written, edited and finalised by me."

Prototype copy:
- Tagline: "I'm Adam Jumari Burgess. / I build things, teach them, / and *write it down.*" (draft, unconfirmed). Alternatives: "Nothing is understood until it's measured." / "I build instruments and publish what they tell me."
- Para 1: "Engineering student in Perth, currently building radio hardware for a research group that points antennas at the sky. Before that I spent a year in oil and gas safety engineering, which taught me more about writing clearly than any unit did."
- Para 2: "I demonstrate first-year laboratories, run rural volunteer trips, and keep an unreasonable number of notes. This is where the better ones end up."
- Currently — Research: Honours project at the Curtin Institute of Radio Astronomy — a wirelessly tuneable load for characterising 2.45 GHz antenna arrays. Next: Exchange semester at Università di Bologna, early 2027. Reading: Ippolito, *Satellite Communications Systems Engineering* — slowly. (All four unverified; Reading was inferred.)
- Door blurbs — Off the Bench (eyebrow "Everything else"): "Books I’m reading, opinion pieces, and the systems I use to get things done." Field Notes: "Write-ups, guides and browser instruments from the bench — measurement, RF hardware, and the parts that went wrong first."

## Design tokens
Light: ground #f5f7f7, surface #ffffff, ink #11171a, ink-2 #4d585e, ink-3 #79868c, hairline #d7dedf, accent #0f6e76 (deep teal, VNA trace colour)
Dark: ground #0d1113, surface #141a1c, ink #eaeff0, ink-2 #a3b0b4, ink-3 #77858a, hairline #242f33, accent #5fd3db

Type: Spectral (headlines, essay body, long-form) · IBM Plex Sans (interface) · IBM Plex Mono (labels, dates, metadata, eyebrows). Loaded from Google Fonts in Base.astro.

## Templates
**Off the Bench piece (Substack-like):** ~680px centred column; serif body ~20px, line-height ~1.7; space between paragraphs, no indents; large tight headline with lighter subtitle; thin byline row with date and reading time; images slightly wider than the text column with small captions; blockquote with left rule, not italics; centred mark for section breaks.

**Field note:** shares the base layout; wider figure track, monospace code blocks, equation support.

## Domain / DNS
jumari.com.au is registered at VentraIP; DNS stays at VentraIP.
Order: (1) verify the domain in GitHub account settings → Pages, (2) add custom domain in repo Settings → Pages, (3) then add DNS records, (4) tick Enforce HTTPS.
- Apex A: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- Apex AAAA: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153
- www: CNAME → `<github-username>.github.io`
No `CNAME` file needed when deploying via Actions.

## Launch content
1. Field note — the tuneable load project: problem, approach, current state
2. Field note — Altium net ties and RF clearance rules
3. Off the Bench piece — Adam chooses the subject; this one sets the voice of the site
Not at launch: array factor explorer (interactive; maths exists in the prototype history).

## Open items
- Confirm or rewrite tagline
- Portrait: in place (src/assets/portrait.jpg, head-and-shoulders photo, replaced NTU photo 2026-09-25)
- Verify the four "Currently" lines
- GitHub username; public vs private repo
- Footer LinkedIn link: done 2026-09-25

## Next steps
1. Finish first commit + Publish Branch; set repo Settings → Pages → Source = GitHub Actions; confirm the workflow deploys.
2. Domain: verify, add custom domain, DNS at VentraIP, enforce HTTPS.
3. Add content collections (bench, notes) with schemas; Post layout. (done)
4. Write the three launch pieces.
