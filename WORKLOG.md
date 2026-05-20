# Fishbulb Work Log — 2026-05-18

## SEO Audit & Fixes

**Audit findings:**
- No robots.txt or sitemap.xml
- No canonical tags (duplicate content risk vs Webflow origin)
- No JSON-LD structured data
- No OG images
- Missing metadataBase
- Hardcoded 2022 copyright year

**Implemented:**
1. Created `src/app/robots.ts` — allows all crawlers, points to sitemap
2. Created `src/app/sitemap.ts` — 12 pages with priorities and change frequencies
3. Updated `src/components/LiveMirror.tsx` — canonical URLs + og:url + og:site_name on all pages
4. Updated `src/app/layout.tsx` — metadataBase + JSON-LD ProfessionalService schema
5. Updated `src/components/Footer.tsx` — dynamic copyright year (note: mirrored pages still show Webflow's 2022)

## Contact Page — Missing Footer Fix

The Webflow source for `/contact` has no `<footer>` tag (other pages do). Updated `LiveMirror.tsx` to detect missing footers and inject a fallback with logo, phone number, and dynamic copyright year. Added bottom padding to the fallback footer.

## Tablet Nav Dropdown Overlap Fix

The Webflow nav dropdown used CSS grid with incorrect grid-area placements — the first 3 service items all shared grid area `1/1/2/2`, causing them to stack on top of each other at tablet widths. Added a CSS override in `globals.css` to switch the dropdown to flexbox column layout below 991px.

## Code Cleanup

**Removed 5 dead components** (never imported by any page):
- `ContactForm.tsx`, `CookieBanner.tsx`, `Footer.tsx`, `Header.tsx`, `LiveSections.tsx`
- All pages use `LiveMirror` exclusively — these were leftover from an earlier approach

**Removed unused assets:**
- 5 Next.js starter SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`)
- `.DS_Store` files

**Consolidated constants:**
- Merged duplicate `LIVE_ORIGIN`/`SITE_URL` into single `SITE_URL` in `LiveMirror.tsx`

**Removed unused images:**
- Entire `/public/images/` directory (2.4MB) — team photos, work samples, icons, logos all unreferenced; mirrored pages pull from Webflow CDN

**Other cleanup:**
- Removed `images` remote pattern from `next.config.ts` (no `<Image>` components use it)
- Removed empty `/public/` directory
- Removed generated `tsconfig.tsbuildinfo`

## Deep Copy & Layout QA

Audited all 13 pages. Renamed `rewriteLinks` → `rewriteContent` in `LiveMirror.tsx` and added content patches for Webflow source issues:

**Fixed (via content rewriting):**
- Typo: "incedible" → "incredible" (homepage)
- Missing space: "NickAmiradaki" → "Nick Amiradaki" (homepage testimonials)
- Grammar: "Designs that reflects" → "Designs that reflect" (nav dropdown, all pages)
- Grammar: "automations dramatically increases" → "automations dramatically increase" (homepage)
- Stale copyright: "2022" → dynamic year in Webflow footer (all pages)

**Noted but not fixable client-side (Webflow source issues):**
- Jock Germany testimonial repeated 6 times in homepage carousel
- Hidden "Button Button" text in nav (invisible to users, template cruft)
- About page intro has a comma splice

## Resilience & Performance

1. **Custom 404 page** (`src/app/not-found.tsx`) — branded "Page not found" with Fishbulb logo, friendly message, and "Back to Home" button. Uses inline styles so it works without Webflow CSS. `LiveMirror` now calls `notFound()` on 404 responses from Webflow.

2. **Error boundary** (`src/app/error.tsx`) — client component with "Try Again" (calls `unstable_retry()`) and "Back to Home" buttons. Catches runtime errors during page rendering without a full white screen.

3. **Eliminated double fetch** — `generateMetadata` and `LiveMirror` both called `fetchLiveHtml` independently. Created shared `getPageAssets()` wrapper; Next.js deduplicates identical `fetch()` calls within the same render cycle under ISR.

4. **Switched to ISR** — replaced `export const dynamic = "force-dynamic"` + `cache: "no-store"` with `next: { revalidate: 120 }` (2-minute ISR). Removed `force-dynamic` from all 13 page files. Pages are now statically cached and revalidated in the background, dramatically improving TTFB for repeat visitors.

## Service Page Creator Skill

Built a system for creating new native service/offering pages that aren't mirrored from Webflow but look identical to existing pages.

**Handoff verification (2026-05-20):**
- Confirmed the Claude Code command skill lives at `.claude/commands/create-service-page.md`
- Confirmed the project launch config lives at `.claude/launch.json`
- These files need to be added to Git before another machine can pull the skill

**Architecture:**

1. **`src/lib/webflow.ts`** — Extracted all shared Webflow fetch/parse utilities (`fetchLiveHtml`, `extractPageAssets`, `rewriteContent`, `buildRuntimeScript`, etc.) out of `LiveMirror.tsx` into a shared module. Both `LiveMirror` and the new `WebflowShell` import from here. No duplication.

2. **`src/components/WebflowShell.tsx`** — Server component that fetches the Webflow nav and footer from a donor page (`/services/ai-automations`) and wraps native React children. Extracts HTML before `<main>` (nav) and after `</main>` (footer), includes all Webflow CSS/scripts, and fixes active nav state for the current page via a client-side script.

3. **`src/components/ServicePage.tsx`** — Template component that takes a `ServicePageData` object and renders a full service page using Webflow CSS classes: hero, intro, features grid, process steps (alternating layout with numbered circles), why-us accordion, FAQ (using `<details>`/`<summary>`), and CTA. Wrapped in `WebflowShell`.

4. **`.claude/commands/create-service-page.md`** — Claude Code skill (`/create-service-page`) that guides the user through creating a new page. Gathers service info, generates all copy, creates AI-generated images, writes the page file and updates the sitemap, then verifies the build.

**Tested with a sample "AI Upskilling & Training" page** — nav, all 7 sections, and footer render correctly with proper Webflow styling.
