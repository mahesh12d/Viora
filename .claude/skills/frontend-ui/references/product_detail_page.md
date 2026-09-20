> DECIDED AGAINST — do not act on this prompt. Viora already has its own complete custom commerce backend (Drizzle schema + Next.js API routes: products, orders, order-form/quote, payments, portfolio — see SKILL.md §3.5). Replacing it with Spree (a separate Ruby on Rails app) was considered and explicitly rejected because it would mean standing up a second backend in a different language and losing bespoke features Spree has no equivalent for (per-customer pricing overrides, design-revision/comment workflow, staff activity, the quote-based order-form flow). Kept here only as a record of the option that was evaluated.

Build a new web app using spree as the starting point.

Product goal: Open Source eCommerce Platform for B2B, Marketplace, and Enterprise. REST API, TypeScript SDK, and production-ready Next.js storefront. Self-host it. Own your stack. No vendor lock-in. Zero platform fees.
Product details: Open-source headless eCommerce platform with REST API, TypeScript SDK, Admin Dashboard, and Next.js storefront template. Supports B2B wholesale, multi-vendor marketplace, multi-currency markets, promotions, gift cards, and payment provider integrations (Stripe, Adyen, PayPal). BSD-3-Clause licensed core; Enterprise Edition offers additional modules and SLA support.
Category: commerce
Original stack: Ruby
Relevant tags: b2b-commerce, e-commerce, ecommerce, ecommerce-api, ecommerce-framework, ecommerce-platform, headless, headless-commerce, headless-ecommerce, marketplace, multi-tenant, multi-vendor, multi-vendor-ecommerce, open-source, spree-commerce

References:
- Product preview: https://21st.dev/community/apps/spree
- Preview image: https://cdn.21st.dev/oss-apps/3314/3e25db31933e5e1299b51b93436864e9d18421f9/poster-ebeab966335df741929e01e70ff3a7e044b3d92468cc204c1387e8cf80d3e599.jpg
- Open-source repository: https://github.com/spree/spree
- Reviewed commit: 3e25db31933e5e1299b51b93436864e9d18421f9
- License: BSD-3-Clause

If your environment supports Git, start from the reviewed source by running:
```sh
git -c core.hooksPath=/dev/null clone --no-checkout -- 'https://github.com/spree/spree' 'spree' && git -C 'spree' -c core.hooksPath=/dev/null checkout --detach '3e25db31933e5e1299b51b93436864e9d18421f9'
```
Work from spree.

If your environment cannot import an existing repository, recreate the product from the brief and visual references instead. Keep the useful interaction patterns, but use original branding and content.

Before installing dependencies or running scripts, inspect the README, package scripts, environment requirements, and license obligations.