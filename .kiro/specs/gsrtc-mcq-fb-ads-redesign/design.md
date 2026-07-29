# GSRTC MCQ Facebook Ads Landing Page Redesign

## Status
Approved for the homepage, landing-page, and checkout-data amendments below.

## Approved Package Amendment
- Scope includes canonical product data on Homepage `/`, product copy on `/gsrtc-mcq-course`, and the package checklist on `/gsrtc-mcq-course/checkout`; payment, delivery, analytics, and backend behavior remain unchanged.
- The canonical bundle shown across all three routes is: 10 Content PDFs, 2500+ MCQs, 21 Model Practice Papers, and 10 Computer Notes.
- Homepage keeps its existing layout and CSS while synchronizing its product image, metadata, bundle facts, sample, purchase links, comparison price, and WhatsApp prefill.
- The `આ પેકેજમાં શું મળશે?` section uses four clean editorial inventory rows: a prominent quantity/unit beside a title and concise buyer benefit.
- Desktop uses a restrained two-column layout; mobile uses one readable column with divider lines rather than heavy boxed cards.
- Every visible bundle count within Homepage, the landing page, and checkout summary must use the amended values.
- The PDF preview ends with a clean sample-information strip using a small label, a clear sample disclaimer, and the complete package summary; it uses restrained dividers rather than a heavy card.

## Overview
Keep Homepage `/` synchronized with the canonical GSRTC MCQ offer and redesign `/gsrtc-mcq-course` as a focused, mobile-first Gujarati sales page that gives Facebook ad visitors immediate product clarity, credible proof, and a low-friction path to the existing ₹99 checkout.

## Architecture
Keep the existing Next.js App Router structure. Homepage and the landing page remain server components using static content arrays and static `next/image` imports; the checkout remains the existing client component. Homepage work is limited to product data and links, while landing-page redesign work is limited to page composition, content hierarchy, responsive styling, and visual continuity.

## Components and Interfaces
- `app/page.tsx`: existing Homepage composition with canonical GSRTC MCQ metadata, static product image, bundle data, checkout links, one real sample link, and package-specific WhatsApp support.
- `app/gsrtc-mcq-course/page.tsx`: semantic landing-page sections, static product content, checkout links, sample link, and WhatsApp support.
- `app/gsrtc-mcq-course/mcq-course.module.css`: mobile-first layout, typography, CTA, offer, preview, FAQ, footer, and sticky-action styles.
- `app/gsrtc-mcq-course/checkout/page.tsx`: preserve payment interface while allowing a compact mobile summary and consistent copy.
- `app/gsrtc-mcq-course/checkout/checkout.module.css`: align checkout hierarchy and responsive presentation with the landing page.
- Existing interfaces remain `/`, `/gsrtc-mcq-course`, `/gsrtc-mcq-course/checkout`, `/GSRTC_Paper_01.pdf`, `/gsrtc-mcq-course/go`, `MCQ_DRIVE_URL`, and the Gujarati WhatsApp URL.
- Homepage, landing-page, and checkout purchase actions use `/gsrtc-mcq-course/checkout`.
- The page and confirmation email both use `/gsrtc-mcq-course/go`; its deployment environment target must be the approved Google Drive folder.

## Data Models
No new persisted data model is required. Product facts remain static typed arrays/objects in the pages: bundle items, benefits, FAQs, and any approved proof. Canonical displayed price remains ₹99 with ₹299 as the comparison price. Homepage uses `public/166b7903-e5fb-4b19-8ac7-a530a7215d05.webp` and `/GSRTC_Paper_01.pdf` as its canonical image and sole sample.

## Correctness Properties
### Property 1: Purchase destination consistency
**Validates: Requirements 1.1**
Every primary purchase action on Homepage and the landing page resolves to the GSRTC MCQ checkout route.

### Property 2: Funnel offer consistency
**Validates: Requirements 2.1, 2.2**
Every displayed bundle count within Homepage, `/gsrtc-mcq-course`, and its checkout summary is consistent: 10 Content PDFs, 2500+ MCQs, 21 Model Practice Papers, and 10 Computer Notes. Homepage also uses the canonical product image, price pair, model-paper sample, and checkout destination.

### Property 3: Claim integrity
**Validates: Requirements 3.1**
Unsupported social-proof, urgency, official-affiliation, or syllabus-currency claims are absent.

### Property 4: Mobile conversion priority
**Validates: Requirements 4.1**
The mobile layout keeps the offer and CTA visible before secondary content.

## Error Handling
The sample action must remain useful when inline PDF rendering is unavailable by offering a direct open action. Checkout navigation uses a normal route link, and existing payment/form errors remain owned by the checkout flow. WhatsApp support remains available as the recovery path.

## Testing Strategy
Run diagnostics on `requirements.md`, `design.md`, and `app/page.tsx` after implementation. Manually verify Homepage CTA destinations, sample PDF access, image data, comparison price, WhatsApp prefill, legal links, keyboard focus, and absence of the superseded inventory. Landing-page and checkout validation remains as defined for their own implementation tasks.

## Visual Direction
- Use a clean Gujarati seller-page style, not an AI-generated card-grid aesthetic.
- Keep the existing white, deep green, and restrained orange palette.
- Prefer typography, spacing, dividers, and real product imagery over decorative gradients, icons, and heavy borders.
- Use `public/166b7903-e5fb-4b19-8ac7-a530a7215d05.webp` through static `next/image` imports on Homepage, the landing page, and checkout summary; use the same public asset path in the Razorpay popup.
- Keep motion minimal and preserve strong contrast, visible focus states, and readable Gujarati text.

## Mobile-First Page Flow
1. **Ad-matched hero:** Gujarati category label, neutral product headline, concise bundle contents, ₹99/₹299 pricing, one direct checkout CTA, secure instant-delivery note, then a compact product image.
2. **Quick credibility strip:** four plain facts—10 Content PDFs, 2500+ MCQs, 21 Model Practice Papers, and 10 Computer Notes—without boxed mini-card repetition.
3. **Candidate problem and solution:** describe scattered study material, weak practice, and computer-topic difficulty; connect each problem to this bundle.
4. **Package breakdown:** readable editorial rows for each deliverable with what it contains and how it helps preparation.
5. **Real sample:** replace the mobile PDF iframe with a lightweight preview treatment using the existing sample PDF, with an option to open the full sample.
6. **Why this bundle:** instant access, mobile-friendly PDFs, exam-focused organization, and Razorpay payment reassurance.
7. **Proof:** use testimonials/ratings/download counts only when supportable; otherwise use neutral buyer guidance and transparent product facts.
8. **Offer block:** repeat complete contents, ₹99 price, delivery expectations, refund-policy link, and direct checkout CTA.
9. **FAQ and footer:** answer delivery, device, exam relevance, payment, support, and refund questions; retain legal links.
10. **Mobile sticky action:** one dominant `ખરીદો ₹99` action; WhatsApp remains a visually secondary support option.

## Conversion Behavior
- Homepage, hero, and repeated purchase CTAs link directly to `/gsrtc-mcq-course/checkout`; no misleading scroll-only “download” CTA.
- CTA text must state the product and price clearly and avoid unsupported urgency.
- The first mobile viewport must show the offer, price, primary CTA, and one delivery/security reassurance.
- Homepage WhatsApp prefill identifies the GSRTC MCQ package; landing-page and checkout support remain distinguishable.
- Do not invent scarcity, results, official affiliation, bestseller status, syllabus currency, ratings, or buyer counts.

## Checkout Continuity
The checkout should retain the same product name, ₹99 price, green palette, bundle summary, and delivery promise. On mobile, the customer form and pay action should appear before or alongside a compact summary rather than below a long product panel. Existing Razorpay, Pixel, GA, email, and download behavior remain functionally unchanged in this visual redesign.

## Responsive and Performance Rules
- Design from 360px width upward, with comfortable touch targets and no horizontal overflow.
- Avoid a heavy embedded PDF in the initial mobile render; defer or open the sample on demand.
- Keep the hero image appropriately sized and avoid large decorative assets that delay the CTA.

## Scope Boundary
The approved amendment covers canonical data and navigation in `app/page.tsx`, the `/gsrtc-mcq-course` landing page and its CSS, and the static package checklist on `/gsrtc-mcq-course/checkout`. Homepage layout/CSS, checkout styling, payment authorization, fulfilment gating, analytics, email delivery, backend behavior, and assets remain outside this amendment.

## Design Acceptance Criteria
- Homepage product image, bundle data, prices, sample, purchase links, and WhatsApp prefill match the canonical GSRTC MCQ offer without changing unrelated layout or behavior.
- Mobile visitors understand what is sold, what is included, the ₹99 price, and how delivery works without scrolling.
- The page uses a natural seller-page hierarchy with fewer boxes and no repetitive gradient card grids.
- Every primary CTA reaches the existing checkout and uses consistent Gujarati copy.
- Existing real image, sample PDF, WhatsApp support, legal links, and product facts are retained.
- Desktop remains polished while mobile ordering and conversion clarity take priority.