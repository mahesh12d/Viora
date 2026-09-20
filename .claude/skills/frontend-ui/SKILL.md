---
name: frontend-ui
description: Use whenever building, styling, or reviewing any page/section of the memorial & wedding stationery website (Home, Services, Funeral Stationery, Wedding Stationery, Funeral Products, Product detail, About Us, Guide/Process, Blog, Cart/Login/Get a Quote). Applies the approved color palette, typography (Selmora + Parisine), and page-by-page asset map — matched against the approved Figma wireframes — so generated UI matches the approved brand, layout, and uses the correct source images.
---

# Frontend UI — Brand System & Page Asset Map

This project is a print-studio website selling **funeral stationery, memorial products, and wedding stationery** (plus cart/quote/checkout, about, guide, and blog pages). This skill defines the approved color palette, typography, the current page structure (per the Figma wireframes below), and exactly which source image lives in which page/section.

All paths below are relative to this skill's folder (`.claude/skills/frontend-ui/`), not the repo root. Quote paths in shell commands — several folder names have spaces.

Each page below has a matching Figma wireframe screenshot in `assets/wireframes/` — check the wireframe for exact layout/copy before building; this skill only pins which real image goes where.

Use Framer Motion for all animations. Apply scroll-triggered fades, staggered reveals, and smooth hover transitions on interactive elements

## 1. Color palette (approved — do not invent new colors)

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary accent | Green | `#2DBC9A` | CTA buttons, links/hover states, price highlights, active nav state, badges, icon accents |
| Secondary / dark | Blue | `#465862` | Headings on light backgrounds, body text alternative, dark UI elements, secondary buttons |
| Surface | Grey | `#F8F8F8` | Page background / section backgrounds, card backgrounds |
| Footer background | Footer | `#F8F8F8` | Footer background (same as surface grey) |
| Footer text | Grey footer text | `#A8AAAB` | Muted text inside footer (links, copyright, secondary labels) |

Source: `references/color_pallet.txt`.

Notes:
- Use white (`#FFFFFF`) for card surfaces sitting on top of the `#F8F8F8` page background, so cards read as distinct layers.
- Primary body text should default to `#465862` (not pure black) to stay on-brand — reserve near-black only for text overlaid on photography.
- Green `#2DBC9A` is the only saturated color in the palette — spend it sparingly (buttons, active states, small accents), never as a large fill, so it keeps its impact against the muted, photography-led layout.

## 2. Typography

Reference screenshots for these fonts are in `assets/fonts/`: `Selmora Regular.jpeg`, `Parisine Std Regular.jpeg`, and `Parisine Std Regular (2).jpeg`.

- **Display / heading font — Selmora Regular**: elegant serif, used for the logo wordmark, page titles, and section headings ("We are Here to Help You", "Our Popular Designs", "Where Craft Meets Care"). Use for `h1`–`h3`, the logo, and pull-quotes.
- **Body / UI font — Parisine Std Regular**: clean geometric sans-serif, bold/uppercase in the nav ("SERVICES", "ABOUT US", "GUIDE", "BLOG", "CONTACT US"). Use for nav, body copy, buttons, form labels, and small print.
- **Licensing note**: Both Parisine and Selmora are commercial fonts, not preloaded web fonts. Before shipping, confirm the user has a webfont license/files for them. Until then, build with close free fallbacks so layout/spacing work isn't wasted:
  - Selmora → fallback stack: `"Playfair Display", "Cormorant Garamond", Georgia, serif`
  - Parisine Std → fallback stack: `"Mulish", "Work Sans", Arial, sans-serif`
- Nav links and buttons are set in uppercase with letter-spacing in the reference screenshots — replicate that (`text-transform: uppercase; letter-spacing: 0.03em;`).

## 3. Site structure (per Figma wireframes)

The old separate **"Portfolio"** and **"Order of Service"** pages no longer exist as their own routes — they've been consolidated into a single **Services** hub with two dedicated gallery pages. Don't rebuild them as standalone pages; use the structure below instead.

Source folder for real content images: `assets/New site Images seq/`. Wireframe screenshots: `assets/wireframes/`.

### Home / Landing page — wireframe `assets/wireframes/landing.png`
Assets from `assets/New site Images seq/1 Main First Landing Page/`:
- Hero banner ("Made for Every Moment"): `1 Hero Image for Front Page.jpg`
- "We are Here to Help You" intro section image: `2 We are here to help.jpg`
- "Our Popular Designs" card grid (funeral cover thumbnails, links out to a product/cover detail page) — `Our Popular Designs/`: only **5** covers currently exist here (`102-Modern Tribute Cover.jpg`, `108-Journey of Life Cover.jpg`, `113-Single Rose Remembrance Cover.jpg`, `175-Celtic Cross Cover.jpg`, `180-Blessed Mother Cover.jpg`) — do not assume 13, ask for more if the grid needs to look fuller.
- "From the Studio" 3-card section — `Our Studio Guide/`: `Design Tips.jpg`, `Funeral Advice.jpg`, `Wedding Guides.jpg`
- "Heard from Our Clients" testimonial banner: `Review Banner Clients.jpg`
- "Designed Here. Delivered Everywhere." (world map + delivery copy) section: no photographic asset needed — build the map graphic, no source image exists for this yet.

### Services page (hub) — wireframe `assets/wireframes/portfolio.png`
"A Collection of Our Work" hero with two pill filters — **Funeral Stationery** / **Wedding Stationery** — that lead into the two dedicated gallery pages below, plus a shared filter bar (Floral, Classic, Hobby, Landscape, Template No, Religion, Children), a cover grid, "Load More", and a "Haven't found the perfect design yet?" CTA.
- The small angled product-collage image top-right of the hero has no matching source asset yet — flag it for the client rather than substituting stock photography.
- Grid content: pull from the same cover pool used on the Funeral Stationery gallery page (below) until a distinct "mixed" set is provided.

### Funeral Stationery gallery page — wireframe `assets/wireframes/funeral_portfolio.png`
- Hero ("Design That Honours a Life"): `3 Funeral Order of service/1 hero pg funeral.jpg`
- Cover grid: pool `1 Main First Landing Page/Our Popular Designs/` (5 covers) together with `2 Service page/All Products Template/Funeral - 101 to 200/Order of Service Covers/` (17 covers: `Order of Service Cover.jpg`, `Cover2.jpg`, `Cover3.jpg`, `Cover8.jpg`, `Cover9.jpg`, `Cover13.jpg`, `Cover23.jpg`, `Cover27.jpg`, `Cover28.jpg`, `Cover30.jpg`, `Cover34.jpg`, `Cover39.jpg`, `Cover45.jpg`, `Cover48.jpg`, `Cover53.jpg`, `Cover75.jpg`, `Cover80.jpg`, `Cover99.jpg`) — 22 covers total. Paths are under `assets/New site Images seq/`.
- Note: an identical copy of that same 17-cover set also sits under `3 Funeral Order of service/Order of service/Funeral - 101 to 200/Order of Service Covers/` — it's a duplicate, not additional content; use either copy, don't double-count them.
- The category filter pills (Floral, Classic, Hobby, Landscape, etc.) are UI-only in the wireframe — none of the current filenames are tagged by category, so filtering logic needs real metadata before it can work.

### Wedding Stationery gallery page — wireframe `assets/wireframes/wedding_portfolio.png`
- Hero ("For the Moments You'll Remember Forever"): **no matching asset** — `6 Wedding/1 Wedding Stationary Home Page Image.jpg` is a couple walking through hills/orchard, which is a different photo than the bright green field with white folding chairs shown in the wireframe. Don't force this asset in; flag it as a new hero image the client needs to supply, or confirm before using the mismatched one.
- Cover grid: the wedding cover source (`Wedding cover/Wedding - 1001 to 1100/Wedding Cards Covers.zip`) referenced in earlier versions of this file **no longer exists in the folder** — there are currently zero extracted wedding cover images available. Ask the user to supply/re-add wedding covers before this page can be built with real content; use the funeral cover grid's layout as the structural reference only.

### Funeral Products page — wireframe `assets/wireframes/products.png`
Renamed from the old "Funeral — Other Memorial Products" page; this is the memorial-*products* catalogue (memory cards, photo prints), separate from the stationery cover galleries above.
- Hero collage ("Our Products"): `4 Funeral other Memorial Products/1 Hero Banner Cover All Products.jpg`
- Product grid (Small Memory Card / Large Memory Card / Photo Print, each with price + "View more"): the old `Products Image For Service pg/Product Images.zip` **no longer exists in the folder**, and the memorial-portrait style-picker folder (`portraits/`) referenced in earlier versions of this file has also been removed. There is currently no source imagery for individual products — ask the user for product photography before building this grid with real assets.
- "Don't See What You're Looking For?" CTA band: solid color background, no image needed.

### Product detail page — wireframe `assets/wireframes/product_detail_page.png`
Single cover/product view: large cover preview, title, price, quantity selector, "Add to Cart", and a "Related products" row (Thank you card, Bookmark, Seed cards).
- No dedicated source asset — build from scratch using any one cover from the Funeral Stationery pool above as placeholder content, the same way `113-Single Rose Remembrance Cover.jpg` (see §4) is used as a content reference for what fields a cover needs.
- The "Related products" thumbnails (Thank you card, Bookmark, Seed cards) are new product types with no matching images anywhere in the asset folder — flag as needing new photography, don't substitute stationery covers for them.

### About Us page — wireframe `assets/wireframes/about_us.png`
Assets from `assets/New site Images seq/5 About Us/`:
- Hero ("Designed with Intention"): `1 About us hero banner.png`
- "Where Craft Meets Care" section image: `2 Craft Meets Care.jpeg`
- "A Note from the Founder" section: no matching image asset — text-only until supplied.
- "What We Stand For" 3-card row: icon/text cards, no photo needed.
- Full-width image banner directly below that row (book, pink flowers, candle): `3 What we stand for.jpg` — despite the filename, in the wireframe this asset is the standalone banner image, not a photo inside the "What We Stand For" cards themselves.
- "History / Our Journey" and "Flow chart" sections: both are still placeholder text in the wireframe (no content or image supplied yet) — leave as TBD, don't invent a diagram.
- "Print Products for your Business & for the Families You Serve" CTA band: solid dark-blue background, no image needed.

### Guide / Process page — wireframe `assets/wireframes/process.png`
- Hero ("Simple from Start to Delivery" — blue sky, yellow flowers): **no matching asset**. `Guide/Guide.jpg` (two people reviewing paperwork at a desk) does not visually match this hero — don't use it here without checking with the user first; it may belong elsewhere or need replacing.
- "Guide" placeholder section directly under the hero: no content defined yet.
- "How does it work?" 4-step row and "Process & Production FAQs" accordion: icons/text only, no photography needed.
- "Ready to Start?" CTA band: solid background, no image needed.

### Blog page — wireframe `assets/wireframes/blog.png`
Currently an empty placeholder frame (nav + footer only, no populated content). No images are mapped to this page yet — treat it as not-yet-designed rather than guessing a layout.

### Cart, Login, Get a Quote — no new wireframe yet
No Figma wireframe has been provided for these flows, so the previous mapping still stands — build from `assets/New site Images seq/Cart, login, Get a quote/`:
- Cart page banner: `Cart banner.jpg`
- Get a Quote page banner (soft foliage, works well as a light background with a form overlay): `Get a quote banner.png`
- Payment / checkout page banner: `Payment-checkout..jpeg`
- Order confirmation ("Thank You") page background: `Thank you Background img.jpeg`

## 4. Sample cover asset (content reference)

An individual cover example (portrait format, white background, circular photo, serif headline "Forever in Our Hearts", script name, event details, rose motif) is at `assets/New site Images seq/1 Main First Landing Page/Our Popular Designs/113-Single Rose Remembrance Cover.jpg` — useful as a content/copy reference (what fields a cover needs: headline, photo, name, dates, venue/time) when building the product detail page (§3). UI/layout for that page is designed from scratch, not copied from this asset.

## 5. Component integration workflow

`references/` holds ready-made component-integration prompts — reach for the matching one instead of building that component from scratch:
- `references/auth.md` — a full login/signup/password-reset auth form (`premium-auth.tsx`), for the Login page.
- `references/auto_image_slider.md` — an infinite auto-scrolling image carousel (`image-auto-slider.tsx`), useful for the testimonial/review banner or a gallery strip.
- `references/product_detail_page.md` — **decided against, do not act on this.** Despite the filename, it's a prompt to bootstrap the storefront's commerce backend from the open-source Spree platform. Viora already has its own complete, custom-built commerce backend (see §3.5 below) — it is not being replaced. Keep the file only as a historical note of the option that was considered and rejected.

For any of these, follow the same general workflow: confirm the project has shadcn's structure, Tailwind, and TypeScript set up (or explain how to add them); place components under the project's components path; verify required dependencies, props/state, and responsive behavior before wiring the component into a page. For a component with no matching prompt in `references/`, apply that same workflow from scratch.

## 3.5. Existing commerce backend — build on this, don't replace it

Viora already has a complete, custom, B2B/quote-driven commerce backend in Drizzle + Next.js API routes. Every wireframed page in §3 that touches products, pricing, cart, checkout, or quotes must be wired to this existing system, not a new one:

- **Schema** (`db/schema.ts`): `products`, `productPrices`, `customerProductPrices`, `customerItemPrices` (per-customer negotiated pricing), `orders`, `orderStatusHistory`, `orderForms` (the quote flow), `portfolioItems`, `portfolioItemPrices`, `designRevisions`, `designComments` (design-proofing workflow), `staffActivity`, `enquiries`, `subscribers`, `posts`.
- **API routes** (`app/api/`): `products`, `orders`, `order-form`, `quote`, `payments`, `portfolio`, `admin`, `staff`, `account`, `auth`, `enquiries`.
- **Components already built**: `CheckoutView`, `OrderFormClient`, `ProductGallery`, `ProductOrderPanel`, `QuoteForm`/`QuickQuoteForm`, `PayPalButton`, `RazorpayButton`, plus the full staff/admin dashboard (`components/dashboard/`, `components/admin/`) for order management, per-customer pricing overrides, and design-revision review.

When building the Product detail page (`product_detail_page.png`), the Funeral Products page (`products.png`), or the Cart/Quote flows: use `ProductGallery`/`ProductOrderPanel`/`QuoteForm`/`CheckoutView` and the existing `products`/`orders`/`quote` API routes as the data layer. Don't design a new cart/checkout data model — the quote-based `orderForms` flow is the equivalent of a cart for this business.

## 6. How to use this skill

UI/layout is designed from scratch for every page — this skill only supplies brand content and the current asset inventory, not layout patterns to copy. When asked to build or style any page of this site:
1. Open the matching wireframe screenshot from §3 first and build to that layout.
2. Pull the hero/section images for that page from the map in §3 — don't substitute stock imagery when a matching asset already exists, and don't force a mismatched asset into a slot just because a filename looks close (see the Wedding hero and Guide hero call-outs above).
3. Where §3 says an asset is missing or removed, stop and ask the user for it rather than inventing or reusing an unrelated photo — several source folders (wedding covers, memorial-product photography, the portrait style-picker, thank-you-card/bookmark/seed-card imagery) have been removed from `assets/New site Images seq/` since an earlier version of this file and haven't been replaced yet.
4. Apply the palette from §1 exactly (hex values, not approximations).
5. Set headings in the Selmora fallback stack and body/nav/buttons in the Parisine fallback stack per §2, flagging the licensing note if the user asks to finalize fonts.
6. Follow §5 when integrating new components.
