import SectionReveal from '@/components/ui/SectionReveal';
import ImageRevealCard from '@/components/ui/ImageRevealCard';
import Button from '@/components/ui/Button';

// "We are Here to Help You" — copy left, studio photo right.
export default function HelpSection() {
  return (
    <section id="about" className="bg-bg-primary py-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-wide">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionReveal>
              <span className="font-body text-label uppercase tracking-wider text-text-muted">
                Who we are
              </span>
            </SectionReveal>

            <SectionReveal delay={1}>
              <h2 className="font-display text-display-md text-text-heading mt-3 text-balance">
                We are Here to Help You
              </h2>
            </SectionReveal>

            <SectionReveal delay={2}>
              <p className="font-body text-body-base text-text-body mt-5 leading-relaxed">
                Memories in Prints is a full-service design and print studio serving a global
                client base. We create digital and printed materials for life&rsquo;s most
                meaningful occasions, as well as brands and organisations that shape communities.
              </p>

              <p className="font-body text-body-base text-text-body mt-4 leading-relaxed">
                With roots in funeral print, we bring precision, sensitivity and a commitment to
                quality to every project. From funeral stationery and weddings to events and
                organisations, every brief receives the same level of care.
              </p>
            </SectionReveal>

            <SectionReveal delay={3}>
              <Button variant="ghost" href="/about" className="mt-8">
                Our Story →
              </Button>
            </SectionReveal>
          </div>

          <SectionReveal delay={2}>
            <ImageRevealCard
              src="/images/home/help.jpg"
              alt="Two people reviewing a printed order of service together at a table"
              className="aspect-[5/4] w-full rounded-2xl"
              sizes="(min-width: 1024px) 45vw, 92vw"
            />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
