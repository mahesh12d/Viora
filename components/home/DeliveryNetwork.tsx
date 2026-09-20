import Image from 'next/image';
import SectionReveal from '@/components/ui/SectionReveal';

// "Designed Here. Delivered Everywhere." — map left, copy right.
// frontend-ui §3 notes there's no photographic asset for this section and the
// map is to be built rather than sourced; public/world_map.png is that graphic.
export default function DeliveryNetwork() {
  return (
    <section id="global" className="bg-bg-primary py-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-wide">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionReveal>
            <Image
              src="/world_map.png"
              alt="World map with North America, the United Kingdom and Europe highlighted as delivery regions"
              width={1200}
              height={655}
              sizes="(min-width: 1024px) 48vw, 92vw"
              className="h-auto w-full object-contain"
            />
          </SectionReveal>

          <SectionReveal delay={1}>
            <span className="font-body text-label uppercase tracking-wider text-text-muted">
              Delivery Network
            </span>

            <h2 className="font-display text-display-md text-text-heading mt-3 text-balance">
              Designed Here. Delivered Everywhere.
            </h2>

            <p className="font-body text-body-base text-text-body mt-5 leading-relaxed">
              We create custom print for families, planners, brands, and clubs across North
              America, United Kingdom, and Europe. Each order ships tracked, with digital delivery
              available for clients who print locally.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
