# Earth Coolman Engineers (ECME)

A standalone custom Next.js website with Manrope/Inter typography and midnight navy, cyan, ice-white and solar-orange branding. No editable website template is used.

## Run and verify

```sh
npm ci
npm run dev
npm run lint
npm run build
npx tsc --noEmit
npm start
```

The homepage preserves the original hero, Our Expertise grid, A/C problem finder and How We Work timeline. It adds Why Choose ECME, an honest projects preview, customer reviews, FAQs and a final booking CTA. The global header, footer and floating WhatsApp control are shared across pages.

## Routes

- `/services`: catalogue and category navigation.
- `/services/[slug]`: nine individual service guides with scope, symptoms, process, benefits, FAQs and specific booking/inquiry links.
- `/about`: company overview, mission, vision, values, technical approach and permission-aware team presentation.
- `/projects`: category filters, empty state, project lightbox and reusable before/after comparison.
- `/faq`: search, category filters and animated accessible accordions.
- `/contact`: verified contacts, address-search link and validated WhatsApp inquiry form.
- `/book-service`: five-step validated service request. A `?service=slug` query preselects a service.

## Central content

- `src/config/site.ts`: owner-supplied company identity and contacts. No email or hours are invented.
- `src/data/services.ts`: nine configurable services. `enabled` controls publication; `confirmScope` flags additional work to discuss with the company.
- `src/data/faqs.ts`: shared FAQ answers, categories and service associations.
- `src/data/company-content.ts`: benefits and the genuine projects, reviews and team profiles to publish.
- `src/config/expertise.ts` and `ac-problems.ts`: existing homepage editorial content and suggestions.

Projects, reviews and employee profiles are intentionally empty until genuine, permission-cleared material is supplied. The UI supports populated data, including gallery filters, modal viewing, image comparison and carousel controls. Generated photos are labelled as illustrations and never used as completed ECME projects or employee portraits.

## Forms and privacy

React Hook Form and Zod validate both forms. The booking flow collects service, unit details, customer contacts/location, a preferred date and acknowledgement. Dates use Asia/Colombo time and must be today or later.

Forms prepare an encoded WhatsApp draft for the centralized number. Users review it and explicitly open WhatsApp to send it. Nothing is automatically sent, no backend is present, no form information is persisted, and no appointment is represented as confirmed. Preferred dates, availability and scope require direct company confirmation.

## Media and motion

`CoolingAtmosphere` reuses the local mist texture at selected dark section transitions, subpage headers and the footer, leaving the hero's Canvas airflow unchanged. Three slow transform/opacity wisps and six edge glints are reduced to two wisps and three glints on mobile. Each mist/particle layer pauses independently outside the viewport and in hidden tabs; reduced motion uses a static, faint decoration. Decorations sit behind content, are clipped to their section and never intercept input. Service tiles add a frosted photographic overlay on hover/focus, with a small backdrop blur only for desktop fine pointers. Shared button shadows provide the cyan freezing highlight without continuous animation.

The hero uses `FreezingAirflow`, a decorative Canvas field anchored to the unchanged A/C photograph's vent lip. A local 40KB transparent mist sprite supplies photographic vapor detail; layered advection adds downward/outward expansion, slow turbulence, fading and a few tiny icy highlights. Desktop rendering is capped at 30fps, 32 mist layers and 1.5 device pixel ratio; mobile uses 24fps, 20 layers and 1.25 ratio. Illumination and a diffuse mist variant are cached once, avoiding per-frame blur filters and particle-array allocations. The GSAP ticker callback is removed offscreen, in hidden tabs and on unmount. Reduced motion renders one quiet static frame without ice movement. The other sections retain their existing decorative SVG airflow. Texture provenance is in `docs/assets/freezing-mist.txt`.

Images are local WebP assets, except the preserved transparent ECME logo and original hero cutout. The original logo and exact pixel cleanup script remain in `public/images/brand` and `scripts/prepare-brand-assets.mjs`. Photo prompts/provenance are in `docs/assets`.

GSAP/ScrollTrigger handle scoped scroll reveals, the process timeline, airflow and restrained photo parallax. Motion supplies selection, accordion, carousel and filter transitions. Native radio controls, labelled forms, native modal focus behaviour, keyboard controls and reduced-motion preferences are supported. The skip link appears only on focus.

## SEO and deployment configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real deployed public origin before the production build. That enables canonical URLs and populated sitemap entries without inventing a company domain. Page titles/descriptions, FAQ structured data, verified LocalBusiness details, robots, icons and image alt text are included.

This repository is prepared locally; no hosting or deployment is implied.

## Content still needed from the owner

- Genuine project photos, categories, descriptions and publishing permission; before/after pairs if available.
- Genuine customer reviews with source details and permission.
- Approved employee names, roles, biographies and photo consent, if profiles are wanted.
- Approval of mission/vision wording and additional service scope/availability.
- The real production domain for canonical URLs and the sitemap.
