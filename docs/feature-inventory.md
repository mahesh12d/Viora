# Feature Inventory

**What this is for.** When rebuilding the UI from scratch, reading the existing
components tends to reproduce them — you end up restating the old design
instead of replacing it. This document describes **what the site does**, not
what it looks like, so a new UI can be built from capabilities rather than
from existing markup.

**How to use it:** build from this file and the `frontend-ui` skill's
wireframes. Do not open the old component files for layout inspiration. Open
them only to port working logic (see §8).

Everything here is derived from the code as of the `(marketing)` / `(app)`
route-group refactor.

---

## 1. What this product is

A print studio that designs and sells **funeral stationery, memorial products,
and wedding stationery**. It is part marketing site, part storefront, and part
production workflow tool for the studio's own staff.

Three distinct audiences share one codebase:

| Audience | Area | Purpose |
|---|---|---|
| Public visitor | marketing pages | browse work, understand the service, request a quote |
| Customer | `/account` | track orders, review design proofs, pay |
| Studio staff | `/staff`, `/admin` | produce designs, proofread, manage catalogue and pricing |

## 2. Roles

`user` · `employee` · `designer` · `proofreader` · `admin`

- **user** — a customer. Sees `/account` only.
- **designer** — sees only orders routed to them; uploads design proofs.
- **proofreader** — reviews designers' proofs, routes work, can assign designers.
- **employee** / **admin** — full studio access.

Route protection lives in `proxy.ts` and is **independent of the UI**. A new UI
does not need to re-implement access control.

---

## 3. Features by audience

### 3.1 Public visitor

- **Browse portfolio/gallery** — filter designs by category (wedding, funeral,
  sports, branding, events). Category selection drives a per-category colour
  palette across the page.
- **Browse products** — grouped by product type; each product has sizes and
  per-size pricing.
- **Product detail** — gallery, size/quantity selection, add to cart.
- **Cart** — client-side, persisted in browser storage. Survives navigation.
- **Request a quote** — long form (project type, dates, quantities, details,
  file attachments) and a short "quick quote" variant.
- **Blog** — list and article pages.
- **Static content** — about, process/guide, FAQ, pricing, legal pages
  (terms, privacy, cookies).
- **Newsletter signup.**

### 3.2 Customer (`/account`)

- **Sign up / log in / verify email / reset password / change password.**
- **Order list** with live status and payment state.
- **Quote history** — submitted enquiries, with the ability to cancel one.
- **Saved items.**
- **Spend summary.**
- **Profile** — name, phone, country, address.
- **Security** — change password, revoke other sessions.
- **Notification bell** — surfaces design proofs waiting on the customer.
- **Review a design proof** — the core interaction: open a proof, click
  anywhere on the image to place a positioned comment, then either approve or
  request changes.
- **Pay for an order** — via PayPal or Razorpay.

### 3.3 Studio staff (`/staff`)

- **Dashboard** — counts for proofs awaiting proofreading, awaiting the
  customer, needing work, returned to designer, approved this month.
- **Work queue** — sorted so whatever *this viewer* should act on next is
  first, oldest-waiting first within that group.
- **Upload a design proof** against an order (new version each time).
- **Proofreader actions** — approve a proof and send it to the customer, or
  return it to the designer with notes.
- **Assign an order to a designer** (proofreader/admin only).
- **Designer workload panel** — open orders per designer.
- **Activity feed** — recent proof/assignment events.
- **Turnaround sparkline** — weekly average approval time.
- **Order form** — fill in production details for an order.

### 3.4 Admin (`/admin`)

- **Separate password login**, independent of customer auth.
- **Dashboard** with business metrics.
- **Enquiries** — view quote requests, convert one into an order.
- **Orders** — full list, set price, update status, view design revisions.
- **Portfolio CRUD** — create/edit/delete portfolio items.
- **Products CRUD** — create/edit/delete products and their sizes.
- **Users** — list accounts, change roles.
- **Pricing** (four independent layers, see §6).

---

## 4. Route map

URLs are unchanged by the route-group refactor.

**Marketing** — `app/(marketing)/`
```
/                      home
/about  /process  /faq  /pricing
/terms  /privacy  /cookies
/portfolio            gallery (filterable)
/portfolio/[id]       single piece
/products             catalogue
/products/[slug]      product detail
/blog  /blog/[slug]
/contact              quote request
/order-form/[enquiryId]   customer fills production details (no login)
/login  /signup  /forgot-password  /reset-password
/account  + /profile /quote /saved /spend /completed
/account/orders/[id]/pay
/account/orders/[id]/review
```

**App** — `app/(app)/`
```
/staff  /staff/orders/[id]  /staff/order-form/[enquiryId]
/admin  /admin/login  /admin/enquiries  /admin/orders
/admin/orders/[id]/designs  /admin/portfolio  /admin/products
/admin/pricing  /admin/users  /admin/order-form/[enquiryId]
```

> Note: the `frontend-ui` skill replaces `/portfolio` and `/products` with a
> **Services hub** plus separate funeral and wedding gallery pages. That is an
> information-architecture change, not just a restyle.

---

## 5. Data model

14 application tables plus better-auth's own (`user`, `session`, `account`,
`verification`).

| Table | Holds |
|---|---|
| `enquiries` | quote requests |
| `order_forms` | production details attached to an enquiry |
| `orders` | confirmed work, payment state, assigned designer |
| `order_status_history` | audit trail of status changes |
| `design_revisions` | proof versions per order |
| `design_comments` | positioned comments on a proof (x, y, image index) |
| `staff_activity` | events for the activity feed |
| `portfolio_items` | showcase pieces |
| `products` | catalogue items with sizes |
| `posts` | blog |
| `subscribers` | newsletter |
| `portfolio_item_prices` | base price per piece |
| `customer_item_prices` | negotiated price per customer per piece |
| `product_prices` | base price per (product, size) |
| `customer_product_prices` | negotiated price per customer per (product, size) |

## 6. Pricing rules

Four layers, resolved by precedence — a negotiated customer price always wins
over the catalogue price:

```
customer_item_prices     >  portfolio_item_prices      (portfolio pieces)
customer_product_prices  >  product_prices             (catalogue products)
```

Order prices re-sync from the catalogue on every view, so a catalogue change
propagates without anyone re-entering figures. **Paid orders are never
repriced.** This logic lives in `lib/data/pricing.ts` and is covered by tests
in `tests/unit/pricing-batch.test.ts` — it is backend, and a UI rebuild must
not reimplement it.

## 7. Key workflows

### Quote → order
```
visitor submits enquiry
  → admin reviews it
  → admin converts it to an order
  → customer fills the order form (no login needed)
  → admin sets the price
  → customer pays
```

### Design proof loop
This is the most intricate part of the product.

```
proofreader assigns order to a designer
  → designer uploads proof            (pending_proofreader_review)
  → proofreader approves              → sent to customer (pending_review)
        or returns to designer        (returned_to_designer)
  → customer reviews
        approves                      (approved)
        or requests changes           (changes_requested)
  → designer uploads a new version — repeat
```

Revision states: `draft`, `pending_proofreader_review`, `pending_review`,
`changes_requested`, `returned_to_designer`, `approved`.

One subtlety worth preserving: `pending_proofreader_review` is split by
version number when shown to a proofreader — v1 is a brand-new proof, v2+ is
work coming back after being returned. Same database value, very different
meaning to the person reading it. See `lib/staff-workflow-labels.ts`.

### Order lifecycle
Status: `pending` → `in_progress` → `completed`.
Payment: `unpaid` → `paid` / `failed`, via `paypal` or `razorpay`.

---

## 8. What must be ported, not rewritten

Most components are presentation and can be deleted freely. These are not —
they contain integration behaviour that exists nowhere else in the codebase:

| Component | Why |
|---|---|
| `PayPalButton`, `RazorpayButton`, `CheckoutView`, `OrderPaymentSection` | payment SDK lifecycle, capture/verify round-trips, failure handling. Real money. |
| `FileUpload` | presigned-PUT upload direct from browser to Cloudflare R2 |
| `DesignReviewCanvas` | click-to-place positioned comments on a proof image |
| `QuoteForm`, `QuickQuoteForm` | multi-step validation and submission |
| `Nav` | cart sync, focus trap, scroll-hide, session — *visuals* can be rebuilt, behaviour should be kept |
| admin managers | optimistic updates around CRUD |

Everything else — heroes, cards, grids, sliders, accordions, badges, shells,
section wrappers — is styling and should be rebuilt from the wireframes.

## 9. Backend contract (does not change)

A new UI reaches data through exactly two doors:

- **Server components** → `lib/data/*` — typed, domain-scoped, `server-only`
  guarded. Importing these from a client component fails the build.
- **Client components** → **38 REST endpoints** under `/api/*`.

Endpoint groups: `auth/*`, `account/*`, `orders/*`, `payments/*` (paypal +
razorpay), `portfolio/*`, `products/*`, `posts`, `quote`, `enquiries`,
`order-form/*`, `staff/*`, `admin/*`, `upload`, `subscribe`.

Nothing in `app/api/`, `lib/db.ts`, or `db/` should be modified by UI work.

## 10. Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4 ·
Drizzle ORM on Neon Postgres · better-auth · Cloudflare R2 · PayPal +
Razorpay · Resend · Sentry · Framer Motion · GSAP · SWR · Vercel.
