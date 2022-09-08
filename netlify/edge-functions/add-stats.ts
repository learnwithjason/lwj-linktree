import type { Context } from 'https://edge.netlify.com';
import type { Element } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

export default async function (_request: Request, context: Context) {
  const response = await context.next();
  const stats = await fetch(
    'https://lwj-linktree.netlify.app/.netlify/functions/get-twitch-stats',
  );
  const twitch = await stats.json();

  const formatted = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(twitch.stats.followers);

  return new HTMLRewriter()
    .on('[data-site="twitch"]', {
      element(element: Element) {
        element.append(
          `
          <span class="stats">${formatted} followers</span>
        `,
          {
            html: true,
          },
        );
      },
    })
    .transform(response);
}
