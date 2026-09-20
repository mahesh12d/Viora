import Link from 'next/link';
import SectionReveal from '@/components/ui/SectionReveal';
import ImageRevealCard from '@/components/ui/ImageRevealCard';
import type { Post } from '@/types/database';

// Artwork per studio category, from the brand asset set (frontend-ui §3,
// "Our Studio Guide/"), which is what the wireframe maps into this row.
//
// These take precedence over the post's own image_url, which is the reverse
// of what you'd normally want. The reason: every published post points at a
// /images/blog/*.jpg that was never committed, so all three 404 and the row
// renders as empty grey boxes. Preferring the mapped artwork gives the row
// the images the design actually calls for; a post only overrides it by
// pointing somewhere that exists.
const CATEGORY_IMAGES: Record<string, string> = {
  'Funeral Advice': '/images/home/studio/funeral-advice.jpg',
  'Wedding Guides': '/images/home/studio/wedding-guides.jpg',
  'Design Tips': '/images/home/studio/design-tips.jpg',
};

export default function FromTheStudio({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="bg-bg-primary py-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-wide">
        <SectionReveal>
          <h2 className="font-display text-display-md text-text-heading text-balance">
            From the Studio
          </h2>
          <p className="font-body text-body-base text-text-body mt-3">
            Articles and resources to guide you with confidence
          </p>
        </SectionReveal>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <SectionReveal key={post.id} delay={i + 1}>
              <article>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <ImageRevealCard
                    src={CATEGORY_IMAGES[post.category ?? ''] || post.image_url || null}
                    alt=""
                    className="aspect-[16/10] w-full rounded-xl"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  />

                  {post.category && (
                    <h3 className="font-body font-medium text-body-base text-text-heading mt-4">
                      {post.category}
                    </h3>
                  )}

                  <p className="font-body text-base text-text-body mt-1 leading-relaxed">
                    {post.title}
                  </p>

                  {/* Not a nested <a> — the whole card is the link, so this is
                      just the affordance that says so. */}
                  <span className="font-body text-base text-accent-gold mt-3 inline-block transition-colors duration-300 group-hover:text-accent-gold-hover">
                    Read more →
                  </span>
                </Link>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
