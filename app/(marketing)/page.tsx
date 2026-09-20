import HomeHero from '@/components/home/HomeHero';
import HelpSection from '@/components/home/HelpSection';
import PopularDesigns from '@/components/home/PopularDesigns';
import FromTheStudio from '@/components/home/FromTheStudio';
import ClientsBanner from '@/components/home/ClientsBanner';
import DeliveryNetwork from '@/components/home/DeliveryNetwork';
import { getFeaturedPortfolioItems } from '@/lib/data/portfolio';
import { getStudioPosts } from '@/lib/data/posts';

/* ═══════════════════════════════════════════════════════════════════════════
   HOME PAGE — Server Component

   Section order follows the approved wireframe
   (.claude/skills/frontend-ui/assets/wireframes/landing.png):
     Hero → We are Here to Help You → Our Popular Designs →
     From the Studio → Heard from Our Clients → Delivery Network.

   Nav and Footer are not rendered here — they belong to the (marketing)
   layout, which is shared with every other public page.
   ═══════════════════════════════════════════════════════════════════════════ */

// ISR rather than always-dynamic or fully-static: this page reads live
// portfolio and post data, so with no revalidate window it would be cached
// until the next deploy and miss admin edits. 60s matches the nav's product
// cache in app/(marketing)/layout.tsx.
export const revalidate = 60;

export default async function Home() {
  // Independent queries — run them together rather than making the second
  // wait on the first.
  const [featured, studioPosts] = await Promise.all([
    getFeaturedPortfolioItems(),
    getStudioPosts(),
  ]);

  return (
    <>
      <HomeHero />
      <HelpSection />
      <PopularDesigns items={featured} />
      <FromTheStudio posts={studioPosts} />
      <ClientsBanner />
      <DeliveryNetwork />
    </>
  );
}
