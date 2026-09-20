// ─── Blog posts ─────────────────────────────────────────────────────────
// Part of the lib/data boundary: this is the surface pages and route
// handlers import, instead of reaching into lib/db directly. Keeping the
// public surface domain-scoped (rather than one 2,000-line module) means
// the UI can be rewritten against a stable contract, and the queries behind
// it can later move out of lib/db without touching a single caller.
import 'server-only';

export {
  getBlogPosts,
  getBlogPostBySlug,
} from '@/lib/db';

import { getBlogPosts as queryBlogPosts } from '@/lib/db';
import type { Post } from '@/types/database';

/**
 * The three categories the homepage's "From the Studio" row is designed
 * around, in the order the wireframe shows them. They're also the only three
 * with artwork in the brand asset set, which is why this row is category-led
 * rather than just "the three newest posts".
 */
export const STUDIO_CATEGORIES = ['Funeral Advice', 'Wedding Guides', 'Design Tips'] as const;

/**
 * Newest published post per studio category, for the homepage row.
 *
 * Taking the three most recent posts outright would let one busy category
 * fill the whole row and leave the other two unrepresented — the row is
 * meant to show the breadth of the studio's writing, not its recency.
 * Categories with nothing published are simply dropped, so the row shrinks
 * to two or one rather than showing an empty card.
 *
 * Lives here rather than in the page for the same reason
 * getFeaturedPortfolioItems does: it's a data-shaping rule, so it should
 * survive the page being rewritten.
 */
export async function getStudioPosts(): Promise<Post[]> {
  // One pull, filtered in memory: the posts table is small and already
  // ordered by published_at desc, so this avoids three round trips.
  const posts = await queryBlogPosts(100);

  return STUDIO_CATEGORIES.map((category) =>
    posts.find((post) => post.category === category)
  ).filter((post): post is Post => post !== undefined);
}
