# Earth Coolman Engineers (ECME)

A custom Next.js App Router website for a premium air conditioning service company. A responsive navigation header is integrated in the root layout, and the homepage has a custom animated hero followed by an Our Expertise services grid. Navigation destinations remain minimal placeholders; no other homepage sections or footer have been built. No website templates are used.

## Development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run build` to validate a production build, and `npm start` to serve it.

## Structure

- `src/app`: routes, metadata, font loading, and global styles.
- `src/components/layout`: shared page layout components.
- `src/components/home`: homepage components.
- `src/components/services`: service components.
- `src/components/animations`: reusable animation components.
- `src/components/ui`: shared interface primitives.
- `src/config/site.ts`: company identity, verified contacts, booking destination, navigation, and services.

Empty component folders are tracked with `.gitkeep` until components are added.

## Header

`SiteHeader` combines a contact bar, the supplied ECME logo, desktop navigation, Services disclosure, booking link, and animated mobile navigation. Header components and scoped styles live in `src/components/layout`. Navigation is sticky, and menus support keyboard navigation, Escape, outside clicks, focus leaving the navigation, and reduced motion. The mobile panel scrolls within the available viewport.

Company details supplied by the owner are centralized in `src/config/site.ts`: Earth Coolman Engineers, phone/WhatsApp `0719701510`, address `No.121/11, Siyabalagoada, Polgasowita`, and the supplied Facebook link. Telephone links use `+94719701510`; WhatsApp links use `https://wa.me/94719701510`. No email or opening hours are published. The booking button opens the existing Contact page with functional phone, WhatsApp, and Facebook links; no booking form is implemented. Other destination pages remain placeholders. A floating WhatsApp link is available throughout the site.

The original supplied logo is saved in `public/images/brand/ecme-logo-original.jpeg`. The transparent navbar asset and favicon variants are derived from the original pixels using `scripts/prepare-brand-assets.mjs`, following the owner's explicit approval of pixel-based cleanup. No redrawn AI alternative is used. Asset paths and preparation details are recorded in `docs/assets/ecme-logo.txt`.

## Homepage hero

The custom hero lives in `src/components/home`, with a 580px minimum desktop height and a stacked mobile layout. GSAP handles entrance effects and the SVG airflow in `src/components/animations`; Motion supplies the floating A/C unit and button interactions. Continuous motion pauses offscreen and in hidden tabs. Reduced motion preferences disable the entrance, floating, and moving airflow effects. The temperature badge is an illustrative comfort setting, not live telemetry.

The transparent A/C product image is bundled at `public/images/ac-unit.png` and served through `next/image` with responsive sizing and preload. It was generated with the built-in image generation tool; the final prompt is in `docs/assets/ac-unit.txt`. No remote image service is needed. The booking CTA uses the shared company configuration; Explore Services opens the existing Services placeholder.

## Our Expertise

`src/components/services` contains the asymmetric photo bento and reusable `ServiceTile`. Installation and repair are the larger featured tiles; routine and full servicing use compact horizontal treatments, and relocation and PCB repair complete the grid. The layout changes to two columns on tablets and one on phones, preserving its visual and keyboard reading order.

Service names, descriptions, image paths, and destination anchors are in `src/config/expertise.ts`. The six illustrative generated photographs are local WebP files in `public/images/services`, lazy-loaded with responsive `next/image` sizing. The built-in image generation prompts are recorded in `docs/assets/expertise-images.txt`. The photos illustrate services and are not company project records.

`ScrollReveal` in `src/components/animations` runs each entrance once using scoped GSAP ScrollTriggers, with cleanup on unmount and reduced motion support. Image zoom and arrow transitions also work on keyboard focus and respect reduced motion. Tile links and View All Services lead to the existing Services destination, including an added PCB repair anchor. Header and hero components are preserved.

## Design foundation

`src/app/globals.css` defines Tailwind v4 theme tokens, also available as CSS custom properties:

| Token | Value |
| --- | --- |
| `midnight-navy` | `#091B30` |
| `ocean-blue` | `#123B5D` |
| `electric-cyan` | `#00C7E8` |
| `solar-orange` | `#FF8C24` |
| `ice-white` | `#EAF8FC` |
| `pure-white` | `#FFFFFF` |

Use these in utilities such as `bg-midnight-navy`, `text-ocean-blue`, and `border-electric-cyan`. Cyan remains the dominant accent; solar orange adds restrained hover borders, highlights, and a faint hero gradient. The default surface is ice white with midnight navy text.

Manrope is the heading font (`font-heading`); Inter is the body font (`font-sans`). Both are bundled variable fonts loaded with `next/font/local` and swap display, so builds and page loads do not need Google Fonts access. Font files and their SIL Open Font Licenses are stored in `src/app/fonts` and sourced from the official Google Fonts repository.

Typography uses fluid `clamp()` values from `text-body` through `text-h1` to `text-h6`. Heading elements receive Manrope and their corresponding sizes automatically.

Spacing follows a 4px scale (for example, `gap-4` is 1rem). Use `px-gutter` for responsive horizontal padding, `py-section` for responsive section spacing, and `page-container` for a centered container with an 80rem maximum width and responsive gutters.

## Available libraries

GSAP, Motion (`motion/react`), Lucide React, React Hook Form, Zod, and `@hookform/resolvers` are installed for future work. Add interactive components behind a `"use client"` boundary as needed. Animation code should respect reduced motion preferences and clean up on unmount.
