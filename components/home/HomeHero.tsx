'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '@/components/ui/Button';

// Full-bleed banner, copy in a centred box with left-aligned text — the
// layout in assets/wireframes/landing.png, where the heading, paragraph and
// single CTA all share one left edge sitting just right of centre.
//
// This is the only section that animates on load rather than on scroll: it's
// above the fold, so a scroll trigger would never fire for it.
export default function HomeHero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    // pt-20 clears the fixed nav (h-20 in components/ui/Nav.tsx) so the
    // banner starts below it, the way the wireframe shows it. The nav is
    // shared with every other page and is deliberately translucent until
    // scrolled, so the fix belongs here: leaving this strip as plain white
    // page background is what gives the logo and links something readable to
    // sit on, instead of the bright top edge of the photo.
    <section id="hero" className="relative bg-bg-primary pt-20">
      <div className="relative flex h-[clamp(26rem,52vw,38rem)] items-end overflow-hidden">
        <Image
          src="/images/home/hero.jpg"
          alt=""
          fill
          priority
          // The one image guaranteed to be the LCP element, so it is the one
          // image worth fetching at high priority and full quality.
          quality={82}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '50% 45%' }}
        />

        {/* Scrim — the banner is a bright, high-detail garden photo, so the
            copy needs its own gradient behind it to clear 4.5:1 rather than
            relying on any particular part of the image staying dark. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(28,36,41,0.72) 0%, rgba(28,36,41,0.45) 38%, rgba(28,36,41,0.12) 70%, rgba(28,36,41,0) 100%)',
          }}
        />

        <div className="container-wide relative z-10 w-full pb-[clamp(2.5rem,5vw,4rem)]">
          {/* Wide enough to keep the headline on one line at desktop, as the
              wireframe has it; the paragraph is capped narrower below so it
              still wraps into a readable measure rather than one long line. */}
          <div className="mx-auto max-w-[57rem]">
            <motion.h1
              {...rise(0.05)}
              className="font-display text-display-lg text-white text-balance"
            >
              Made for Every Moment
            </motion.h1>

            <motion.p
              {...rise(0.15)}
              className="font-body text-body-base text-white/90 mt-5 max-w-[34rem]"
            >
              Funerals and Weddings.
              <br />
              Beautiful design and printing for life&rsquo;s important moments — from funeral
              stationery and keepsakes to wedding invitations.
              <br />
              Created with care to reflect your story and the people who matter most.
            </motion.p>

            <motion.div {...rise(0.25)} className="mt-8">
              <Button variant="primary" size="lg" href="/portfolio">
                View Our Work
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
