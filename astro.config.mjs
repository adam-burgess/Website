// Astro's main config file. Read once when you run dev or build.
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { visit } from 'unist-util-visit';

// Photo captions: an image on its own line with text in quotes after it,
//   ![A VNA on the bench](./vna.jpg "Calibrating before every sweep.")
// becomes a <figure> with that text as its <figcaption>. Images without quotes are left alone.
function figureCaptions() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || index === undefined) return;

      // Ignore whitespace-only text around the image.
      const kids = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
      if (kids.length !== 1 || kids[0].tagName !== 'img') return;

      const img = kids[0];
      const caption = img.properties?.title;
      if (!caption) return;
      delete img.properties.title;

      parent.children[index] = {
        type: 'element',
        tagName: 'figure',
        properties: {},
        children: [
          img,
          { type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: String(caption) }] },
        ],
      };
    });
  };
}

// The writing editor lives at public/admin/index.html. GitHub Pages serves it at /admin/,
// but `npm run dev` doesn't serve a folder's index.html, so point /admin there in dev only.
function adminInDev() {
  return {
    name: 'admin-in-dev',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/admin' || req.url === '/admin/') {
            res.writeHead(302, { Location: '/admin/index.html' });
            return res.end();
          }
          next();
        });
      },
    },
  };
}

export default defineConfig({
  // The live URL. Used to build absolute links (RSS, canonical tags, sitemap).
  site: 'https://jumari.com.au',

  // MDX = Markdown that can also use components. Plain .md files still work.
  integrations: [mdx(), adminInDev()],

  // These settings apply to both .md and .mdx posts.
  markdown: {
    // Astro 7's default Markdown engine doesn't run remark/rehype plugins, so use
    // the unified (remark/rehype) engine, which the maths plugins are written for.
    processor: unified({
      // $inline$ and $$display$$ maths, rendered to HTML at build time by KaTeX.
      remarkPlugins: [remarkMath],
      // figureCaptions (above) turns ![alt](./photo.jpg "Caption") into a captioned photo.
      rehypePlugins: [rehypeKatex, figureCaptions],
    }),
    // Code blocks: coloured at build time, one theme for light mode and one for dark.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
