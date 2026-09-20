import Link from 'next/link';
import SectionReveal from '@/components/ui/SectionReveal';
import ImageRevealCard from '@/components/ui/ImageRevealCard';
import Button from '@/components/ui/Button';
import type { PortfolioItem } from '@/types/database';

// "Our Popular Designs" — the three-up cover grid from the wireframe, each
// card being cover / title / description, which is exactly the shape a
// portfolio row already has. Covers come from the live portfolio rather than
// the five static files in the skill's asset folder: those five are the
// fallback for when there's no real work to show, and there is.
export default function PopularDesigns({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="popular-designs" className="bg-bg-alternate py-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-wide">
        <SectionReveal>
          <h2 className="font-display text-display-md text-text-heading text-balance">
            Our Popular Designs
          </h2>
          <p className="font-body text-body-base text-text-body mt-4 max-w-2xl leading-relaxed">
            We offer a wide range of personalised services and printed materials to help you
            honour, remember and celebrate meaningful moments.
          </p>
        </SectionReveal>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <SectionReveal key={item.id} delay={i + 1}>
              <Link href={`/portfolio/${item.id}`} className="group block">
                <ImageRevealCard
                  src={item.image_url}
                  alt={item.title}
                  className="aspect-[3/4] w-full rounded-xl bg-bg-primary"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                />

                <h3 className="font-display text-2xl text-text-heading mt-5 transition-colors duration-300 group-hover:text-accent-gold">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="font-body text-base text-text-body mt-2 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                )}
              </Link>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={2}>
          <Button variant="ghost" href="/portfolio" className="mt-12">
            View More →
          </Button>
        </SectionReveal>
      </div>
    </section>
  );
}
