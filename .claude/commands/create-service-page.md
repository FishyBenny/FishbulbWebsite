# Create Service Page

Project skill: `/create-service-page`
Location: `.claude/commands/create-service-page.md`
Last verified: 2026-05-20

You are creating a new service/offering page for the Fishbulb Solutions website. Fishbulb is an Australian software development company. The tone should be professional but approachable — no jargon, no hype, just clear value.

## Step 1: Gather Information

Ask the user for:

1. **Service name** — What is the service/offering called?
2. **Short description** — One or two sentences about what it is
3. **Target audience** — Who is this for?
4. **Key benefits** — 3-5 main benefits or outcomes
5. **Anything else** — Any specifics they want included (pricing model, process, tools used, etc.)

Keep the conversation casual. If they give you a rough brief, work with it and confirm what you've inferred.

## Step 2: Generate Content

Using the information provided, write compelling copy for each section below. Match the tone of existing Fishbulb pages — confident, practical, and outcome-focused.

### Hero
- **Headline**: 5-10 words, punchy value proposition
- **Subheadline**: 2-3 sentences expanding on the headline
- **CTA text**: Action-oriented (e.g. "Book a free consultation", "Get started")

### Intro
- **Heading**: Section title introducing the service
- **Paragraphs**: 2-3 paragraphs explaining the service in plain language

### Features (4-6 items)
- **Section heading + optional subheading**
- **Feature cards**: Each has a title and 1-2 sentence description

### Process (3-5 steps)
- **Section heading** (e.g. "How it works")
- **Steps**: Each has a title and description

### Why Fishbulb (3-5 points)
- **Heading + optional description**
- **Differentiators**: Title + description for each

### FAQ (4-6 items)
- **Section heading**
- **Q&A pairs**: Real questions a prospect would ask

### CTA
- **Heading**: Urgency or value focused
- **Subheading**: Supporting sentence
- **Button text**: Clear action

## Step 3: Generate Images

Generate 1-2 images for the page:
1. **Hero image** — Professional, abstract/illustrative, related to the service theme. Should work at ~1200x800.
2. **Intro image** (optional) — Supporting visual for the explanation section.

Save images to `public/images/services/[slug]/`. Use descriptive filenames like `hero.webp`.

If you cannot generate images, create simple SVG placeholder graphics and save them instead:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect fill="#f0f8fa" width="1200" height="800"/>
  <text fill="#078bd3" font-family="sans-serif" font-size="32" text-anchor="middle" x="600" y="400">[Service Name]</text>
</svg>
```

## Step 4: Create the Page File

Derive the URL slug from the service name (lowercase, hyphens, no special characters).

Create `src/app/services/[slug]/page.tsx` following this pattern:

```tsx
import ServicePage from "@/components/ServicePage";
import type { ServicePageData } from "@/components/ServicePage";
import type { Metadata } from "next";

const data: ServicePageData = {
  meta: {
    title: "Page Title — Fishbulb Solutions",
    description: "Meta description for SEO",
    slug: "the-slug",
  },
  hero: {
    headline: "...",
    subheadline: "...",
    ctaText: "...",
    ctaHref: "/contact",
    imageSrc: "/images/services/the-slug/hero.webp",
    imageAlt: "...",
  },
  intro: { heading: "...", paragraphs: ["...", "..."] },
  features: {
    heading: "...",
    subheading: "...",
    items: [{ title: "...", description: "..." }],
  },
  process: {
    heading: "...",
    steps: [{ title: "...", description: "..." }],
  },
  whyUs: {
    heading: "...",
    points: [{ title: "...", description: "..." }],
  },
  faq: {
    heading: "Common Questions",
    items: [{ question: "...", answer: "..." }],
  },
  cta: {
    heading: "...",
    subheading: "...",
    buttonText: "...",
    buttonHref: "/contact",
  },
};

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: {
    canonical: `https://www.fishbulbsolutions.com.au/services/${data.meta.slug}`,
  },
  openGraph: {
    title: data.meta.title,
    description: data.meta.description,
    url: `https://www.fishbulbsolutions.com.au/services/${data.meta.slug}`,
    siteName: "Fishbulb Solutions",
    type: "website",
  },
};

export default function Page() {
  return <ServicePage data={data} />;
}
```

## Step 5: Update Sitemap

Add the new page to `src/app/sitemap.ts`. Insert a new entry in the array:

```ts
{
  url: `${SITE_URL}/services/[slug]`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.8,
},
```

## Step 6: Verify

1. Run `npx tsc --noEmit` to check types
2. Start or refresh the dev server and visit the new page
3. Check that:
   - The nav and footer appear correctly
   - All sections render with proper styling
   - The page is mobile-friendly
   - Links work (especially the CTA → /contact)
4. Show the user the preview and ask if they want any changes

## Key Files
- `src/components/ServicePage.tsx` — Template component (read the `ServicePageData` type)
- `src/components/WebflowShell.tsx` — Wraps pages in Webflow nav/footer
- `src/lib/webflow.ts` — Shared Webflow fetch utilities
- `src/app/sitemap.ts` — Sitemap to update
