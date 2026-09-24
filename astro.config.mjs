// Astro's main config file. Read once when you run dev or build.
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeFigure from './src/lib/rehype-figure.mjs';

export default defineConfig({
  // The live URL. Used to build absolute links (RSS, canonical tags, sitemap).
  site: 'https://jumari.com.au',

  // MDX = Markdown that can also use components. Plain .md files still work.
  integrations: [mdx()],

  // These settings apply to both .md and .mdx posts.
  markdown: {
    // Astro 7's default Markdown engine doesn't run remark/rehype plugins, so use
    // the unified (remark/rehype) engine, which the maths plugins are written for.
    processor: unified({
      // $inline$ and $$display$$ maths, rendered to HTML at build time by KaTeX.
      remarkPlugins: [remarkMath],
      // rehypeFigure turns ![alt](./photo.jpg "Caption") into a captioned figure.
      rehypePlugins: [rehypeKatex, rehypeFigure],
    }),
    // Code blocks: coloured at build time, one theme for light mode and one for dark.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
