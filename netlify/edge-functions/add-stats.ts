import type { Context } from 'https://edge.netlify.com';
import type { Element } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

export default async function (_request: Request, context: Context) {
  const response = await context.next();

  console.log(Deno.env.get('URL') || 'http://localhost:8888');

  const apiUrl = new URL(Deno.env.get('URL') || 'http://localhost:8888');
  apiUrl.pathname = '/.netlify/functions/get-twitch-stats';
  const stats = await fetch(apiUrl.toString());
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
