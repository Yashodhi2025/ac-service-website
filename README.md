# A/C Service Website

A custom Next.js App Router foundation for a premium air conditioning service company. A responsive navigation header is integrated in the root layout. The homepage and navigation destinations are minimal placeholders; the hero and footer have not been built. No website templates are used.

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
- `src/config/site.ts`: temporary company identity, contacts, booking destination, navigation, and services.

Empty component folders are tracked with `.gitkeep` until components are added.

## Header

`SiteHeader` combines a contact bar, temporary logo, desktop navigation, Services disclosure, booking link, and animated mobile navigation. Header components and scoped styles live in `src/components/layout`. Navigation is sticky, and menus support keyboard navigation, Escape, outside clicks, focus leaving the navigation, and reduced motion. The mobile panel scrolls within the available viewport.

Replace the temporary Aeris Air identity, placeholder phone, `.example` email, and hours in `src/config/site.ts` before launch. The booking button currently opens the Contact placeholder; no booking form is implemented. Simple destination pages keep all navigation and service anchor links usable during development. Replace these placeholders with full routes as the site grows.

## Design foundation

`src/app/globals.css` defines Tailwind v4 theme tokens, also available as CSS custom properties:

| Token | Value |
| --- | --- |
| `midnight-navy` | `#091B30` |
| `ocean-blue` | `#123B5D` |
| `electric-cyan` | `#00C7E8` |
| `ice-white` | `#EAF8FC` |
| `pure-white` | `#FFFFFF` |

Use these in utilities such as `bg-midnight-navy`, `text-ocean-blue`, and `border-electric-cyan`. The default surface is ice white with midnight navy text.

Manrope is the heading font (`font-heading`); Inter is the body font (`font-sans`). Both are bundled variable fonts loaded with `next/font/local` and swap display, so builds and page loads do not need Google Fonts access. Font files and their SIL Open Font Licenses are stored in `src/app/fonts` and sourced from the official Google Fonts repository.

Typography uses fluid `clamp()` values from `text-body` through `text-h1` to `text-h6`. Heading elements receive Manrope and their corresponding sizes automatically.

Spacing follows a 4px scale (for example, `gap-4` is 1rem). Use `px-gutter` for responsive horizontal padding, `py-section` for responsive section spacing, and `page-container` for a centered container with an 80rem maximum width and responsive gutters.

## Available libraries

GSAP, Motion (`motion/react`), Lucide React, React Hook Form, Zod, and `@hookform/resolvers` are installed for future work. Add interactive components behind a `"use client"` boundary as needed. Animation code should respect reduced motion preferences and clean up on unmount.
