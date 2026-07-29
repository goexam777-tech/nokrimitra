# GSRTC MCQ Facebook Ads Landing Page Redesign

## Status
Approved for the landing-page and checkout-data amendments below.

## Approved Package Amendment
- Scope includes product copy on `/gsrtc-mcq-course` and the package checklist on `/gsrtc-mcq-course/checkout`; payment, delivery, analytics, and backend behavior remain unchanged.
- The canonical bundle shown across both routes is: 20 Content PDFs, 2500+ MCQs, 21 Model Practice Papers, and 10 Computer Notes.
- The `આ પેકેજમાં શું મળશે?` section uses four clean editorial inventory rows: a prominent quantity/unit beside a title and concise buyer benefit.
- Desktop uses a restrained two-column layout; mobile uses one readable column with divider lines rather than heavy boxed cards.
- Every visible bundle count within the landing page and checkout summary must use the amended values.
- The PDF preview ends with a clean sample-information strip using a small label, a clear sample disclaimer, and the complete package summary; it uses restrained dividers rather than a heavy card.

## Overview
Redesign `/gsrtc-mcq-course` as a focused, mobile-first Gujarati sales page that gives Facebook ad visitors immediate product clarity, credible proof, and a low-friction path to the existing ₹99 checkout.

## Architecture
Keep the existing Next.js App Router structure. The landing page remains a server component using static content arrays and CSS Modules; the checkout remains the existing client component. Redesign work is limited to page composition, content hierarchy, responsive styling, and visual continuity between these routes.

## Components and Interfaces
- `app/gsrtc-mcq-course/page.tsx`: semantic landing-page sections, static product content, checkout links, sample link, and WhatsApp support.
- `app/gsrtc-mcq-course/mcq-course.module.css`: mobile-first layout, typography, CTA, offer, preview, FAQ, footer, and sticky-action styles.
- `app/gsrtc-mcq-course/checkout/page.tsx`: preserve payment interface while allowing a compact mobile summary and consistent copy.
- `app/gsrtc-mcq-course/checkout/checkout.module.css`: align checkout hierarchy and responsive presentation with the landing page.
- Existing interfaces remain `/gsrtc-mcq-course/checkout`, `/GSRTC_Paper_01.pdf`, `/gsrtc-mcq-course/go`, `MCQ_DRIVE_URL`, and the Gujarati WhatsApp URL.
- The page and confirmation email both use `/gsrtc-mcq-course/go`; its deployment environment target must be the approved Google Drive folder.

## Data Models
No new persisted data model is required. Product facts remain static typed arrays/objects in the page: bundle items, benefits, FAQs, and any approved proof. Canonical displayed price remains ₹99 with ₹299 as the comparison price.

## Correctness Properties
### Property 1: Purchase destination consistency
**Validates: Requirements 1.1**
Every primary purchase action resolves to the GSRTC MCQ checkout route.

### Property 2: Funnel offer consistency
**Validates: Requirements 2.1**
Every displayed bundle count within `/gsrtc-mcq-course` and its checkout summary is consistent: 20 Content PDFs, 2500+ MCQs, 21 Model Practice Papers, and 10 Computer Notes.

### Property 3: Claim integrity
**Validates: Requirements 3.1**
Unsupported social-proof or urgency claims are absent.

### Property 4: Mobile conversion priority
**Validates: Requirements 4.1**
The mobile layout keeps the offer and CTA visible before secondary content.

## Error Handling
The sample action must remain useful when inline PDF rendering is unavailable by offering a direct open action. Checkout navigation uses a normal route link, and existing payment/form errors remain owned by the checkout flow. WhatsApp support remains available as the recovery path.

## Testing Strategy
Run Next.js diagnostics and the production build after implementation. Manually verify 360px mobile ordering, desktop layout, CTA destinations, sample PDF access, WhatsApp prefill, legal links, keyboard focus, and absence of horizontal overflow. No new automated test suite is introduced for this visual-only phase.

## Visual Direction
- Use a clean Gujarati seller-page style, not an AI-generated card-grid aesthetic.
- Keep the existing white, deep green, and restrained orange palette.
- Prefer typography, spacing, dividers, and real product imagery over decorative gradients, icons, and heavy borders.
- Use `public/166b7903-e5fb-4b19-8ac7-a530a7215d05.webp` through static `next/image` imports on the landing page and checkout summary; use the same public asset path in the Razorpay popup.
- Keep motion minimal and preserve strong contrast, visible focus states, and readable Gujarati text.

## Mobile-First Page Flow
1. **Ad-matched hero:** Gujarati category label, outcome-led 2026 headline, concise bundle contents, ₹99/₹299 pricing, one direct checkout CTA, secure instant-delivery note, then a compact product image.
2. **Quick credibility strip:** four plain facts—20 Content PDFs, 2500+ MCQs, 21 Model Practice Papers, and 10 Computer Notes—without boxed mini-card repetition.
3. **Candidate problem and solution:** describe scattered study material, weak practice, and computer-topic difficulty; connect each problem to this bundle.
4. **Package breakdown:** readable editorial rows for each deliverable with what it contains and how it helps preparation.
5. **Real sample:** replace the mobile PDF iframe with a lightweight preview treatment using the existing sample PDF, with an option to open the full sample.
6. **Why this bundle:** instant access, mobile-friendly PDFs, exam-focused organization, and Razorpay payment reassurance.
7. **Proof:** use testimonials/ratings/download counts only when supportable; otherwise use neutral buyer guidance and transparent product facts.
8. **Offer block:** repeat complete contents, ₹99 price, delivery expectations, refund-policy link, and direct checkout CTA.
9. **FAQ and footer:** answer delivery, device, exam relevance, payment, support, and refund questions; retain legal links.
10. **Mobile sticky action:** one dominant `ખરીદો ₹99` action; WhatsApp remains a visually secondary support option.

## Conversion Behavior
- Hero and repeated purchase CTAs link directly to `/gsrtc-mcq-course/checkout`; no misleading scroll-only “download” CTA.
- CTA text must state the product and price clearly and avoid unsupported urgency.
- The first mobile viewport must show the offer, price, primary CTA, and one delivery/security reassurance.
- Preserve the existing Gujarati WhatsApp prefill and distinguish landing-page support from checkout support.
- Do not invent scarcity, results, official affiliation, bestseller status, syllabus currency, ratings, or buyer counts.

## Checkout Continuity
The checkout should retain the same product name, ₹99 price, green palette, bundle summary, and delivery promise. On mobile, the customer form and pay action should appear before or alongside a compact summary rather than below a long product panel. Existing Razorpay, Pixel, GA, email, and download behavior remain functionally unchanged in this visual redesign.

## Responsive and Performance Rules
- Design from 360px width upward, with comfortable touch targets and no horizontal overflow.
- Avoid a heavy embedded PDF in the initial mobile render; defer or open the sample on demand.
- Keep the hero image appropriately sized and avoid large decorative assets that delay the CTA.

## Scope Boundary
The approved amendment covers the `/gsrtc-mcq-course` landing page, its CSS, and the static package checklist on `/gsrtc-mcq-course/checkout`. Checkout styling, payment authorization, fulfilment gating, analytics, email delivery, and backend behavior remain outside this amendment.

## Design Acceptance Criteria
- Mobile visitors understand what is sold, what is included, the ₹99 price, and how delivery works without scrolling.
- The page uses a natural seller-page hierarchy with fewer boxes and no repetitive gradient card grids.
- Every primary CTA reaches the existing checkout and uses consistent Gujarati copy.
- Existing real image, sample PDF, WhatsApp support, legal links, and product facts are retained.
- Desktop remains polished while mobile ordering and conversion clarity take priority.