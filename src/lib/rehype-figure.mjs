// Turns an image that sits alone in its own paragraph and has a title,
//   ![A VNA on the bench](./vna.jpg "Calibrating before every sweep.")
// into
//   <figure><img …><figcaption>Calibrating before every sweep.</figcaption></figure>
// Images without a title are left alone.
import { visit } from 'unist-util-visit';

export default function rehypeFigure() {
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
