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
```
astro.config.mjs          site: 'https://jumari.com.au' (no base needed with custom domain)
.github/workflows/deploy.yml   build (withastro/action@v6) + deploy (actions/deploy-pages@v5) on push to main
public/favicon.svg        teal square with "j"
src/styles/global.css     design tokens (light + dark via prefers-color-scheme), font vars, .wrap, .eyebrow
src/layouts/Base.astro    <head> (title, description, canonical, favicon, Google Fonts) + Masthead + <slot/> + Footer
src/components/Masthead.astro   wordmark + nav (Home, Off the Bench, Field Notes), aria-current on active section
src/components/Footer.astro     © line + LinkedIn (placeholder) + AI disclaimer line
src/pages/index.astro     homepage: hero, Currently, Recent writing (carousel), doors (data arrays in frontmatter)
src/pages/notes/, off-the-bench/   index.astro (dated list via PostList) + [...slug].astro (one page per post, Piece layout)
src/layouts/Piece.astro   post page: eyebrow, title, subtitle, byline (date, reading time); Off the Bench 680px column, Field Notes figures/code up to 880px
src/styles/prose.css      post body styles
src/lib/posts.ts          getPosts / getAllPosts / postUrl / readingTime / SECTIONS
src/lib/rehype-figure.mjs image with a title -> <figure> + <figcaption>
src/content.config.ts     collections + frontmatter schema
```

## Writing posts
- Posts live in `src/content/notes/` (Field Notes, URL /notes/<name>/) and `src/content/bench/` (Off the Bench, URL /off-the-bench/<name>/). Copy `_template.md` in either folder; files starting with `_` are ignored.
- A single file (`name.md`) or a folder (`name/index.md` + its images). Use the folder form when the post has photos.
- Frontmatter: title, description, date, updated?, tags[], cover? (image next to the post, used on the home-page card), coverAlt, draft (drafts show in `npm run dev` only).
- `.md` or `.mdx` (MDX when a post needs components).
- Features: GFM (tables, footnotes, autolinks), KaTeX maths (`$…$`, `$$…$$`), Shiki code (github-light/dark, follows OS theme), images optimised by Astro, `![alt](./x.jpg "Caption")` -> captioned figure, `***` -> centred section break.
- Astro 7's default Markdown engine (Sätteri) doesn't run remark/rehype plugins, so astro.config.mjs sets `markdown.processor: unified({...})` from `@astrojs/markdown-remark`.
- Demo of every feature: `src/content/notes/how-to-write-a-post/` (draft). Placeholder: `src/content/bench/first-draft.md` (draft).
- Home-page Recent writing = newest 6 posts across both collections.
- Restart `npm run dev` after changing astro.config.mjs or content.config.ts.
- **Browser editor (added 2026-09-24):** Sveltia CMS at https://jumari.com.au/admin/ (`public/admin/index.html` + `config.yml`). Commits straight to `adam-burgess/Website` main, which triggers the deploy. Sign in with "Sign In Using Access Token" (fine-grained GitHub token, this repo only, Contents: read and write); "Sign In with GitHub" would need an OAuth server, not set up. Each post is a folder (`{{slug}}/index.md`) with its images beside it. Fields in config.yml must match src/content.config.ts. A "Maths block" editor component writes `$$…$$`; inline maths is safest in the editor's Markdown mode. Validate config changes against Sveltia's JSON schema (package `@sveltia/cms`, `schema/sveltia-cms.json`). Because the editor commits on GitHub, pull before editing locally.

## Planned layout
- `src/content/bench/`, `src/content/notes/` (+ content config with schemas)
- `src/components/`: Masthead, Footer, Currently, RecentList, PieceMeta
- `src/layouts/`: Base.astro, Piece.astro (Off the Bench + field note templates)
- `src/pages/`: index, off-the-bench/, notes/, rss.xml.js
- `public/`: favicon, admin/ (editor); portrait lives in `src/assets/` so Astro optimises it

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
- Real footer link (LinkedIn)

## Next steps
1. Finish first commit + Publish Branch; set repo Settings → Pages → Source = GitHub Actions; confirm the workflow deploys.
2. Domain: verify, add custom domain, DNS at VentraIP, enforce HTTPS.
3. Add content collections (bench, notes) with schemas; Piece layout.
4. Write the three launch pieces.
