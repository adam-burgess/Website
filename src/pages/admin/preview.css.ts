// Stylesheet for the writing editor's preview pane, served at /admin/preview.css.
// It's stitched together from the site's own style files at build time, so the
// preview always matches the real post page with nothing to keep in sync by hand.
import globalCss from '../../styles/global.css?raw';
import pieceCss from '../../styles/piece.css?raw';
import proseCss from '../../styles/prose.css?raw';

// A copy of the site header (wordmark only; the nav isn't clickable in the preview).
const mastheadCss = `
.masthead { max-width: var(--wrap); margin: 0 auto; padding: 26px 24px 0; }
.masthead .wordmark { font-family: var(--mono); font-size: 13px; letter-spacing: 0.02em; color: var(--ink); }
.masthead .wordmark span { color: var(--ink-3); }
.series-preview {
  max-width: var(--measure); margin: 28px auto 0; padding: 12px 20px;
  border-left: 3px solid var(--accent); border-radius: 0 6px 6px 0;
  background: color-mix(in srgb, var(--ground) 94%, var(--ink));
  font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent);
}
`;

export function GET() {
  return new Response([globalCss, pieceCss, proseCss, mastheadCss].join('\n'), {
    headers: { 'Content-Type': 'text/css; charset=utf-8' },
  });
}
