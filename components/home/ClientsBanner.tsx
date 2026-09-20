import Image from 'next/image';
import TestimonialSlider from '@/components/ui/TestimonialSlider';

// "Heard from Our Clients" — full-bleed photo banner with the rotating
// quote centred over it.
export default function ClientsBanner() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-[clamp(4rem,8vw,7rem)]">
      <Image
        src="/images/home/testimonials.jpg"
        alt=""
        fill
        quality={78}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* The banner is a mid-tone spring border with bright highlights, so a
          flat tint isn't enough on its own — this is what puts the white
          heading and quote above 4.5:1 across the whole width. */}
      <div aria-hidden className="absolute inset-0 bg-[rgba(28,36,41,0.55)]" />

      <div className="container-wide relative z-10 max-w-4xl text-center">
        <h2 className="font-display text-display-md text-white text-balance">
          Heard from Our Clients
        </h2>

        <div className="mt-8">
          <TestimonialSlider dark />
        </div>
      </div>
    </section>
  );
}
