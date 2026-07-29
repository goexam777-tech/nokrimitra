# Requirements Document

## Introduction
This specification defines the approved GSRTC MCQ homepage, landing-page, and checkout-summary behavior for a clear, mobile-first purchase funnel.

## Glossary
- **Homepage:** `/`.
- **Landing Page:** `/gsrtc-mcq-course`.
- **Checkout:** `/gsrtc-mcq-course/checkout`.
- **Primary CTA:** A dominant purchase link to Checkout.
- **Bundle:** 10 Content PDFs, 2500+ MCQs, 21 Model Practice Papers, and 10 Computer Notes.
- **Canonical Product Image:** `public/166b7903-e5fb-4b19-8ac7-a530a7215d05.webp`.

## Requirements

### Requirement 1: Purchase Navigation
**User Story:** As a buyer, I want purchase actions to open the correct checkout so that I can complete my order.

#### Acceptance Criteria
1. WHEN a user activates a Primary CTA on the Homepage or Landing Page THEN the page SHALL navigate to Checkout.

### Requirement 2: Bundle Consistency
**User Story:** As a buyer, I want consistent package details so that I know exactly what I am purchasing.

#### Acceptance Criteria
1. THE Homepage, Landing Page, and Checkout summary SHALL show 10 Content PDFs, 2500+ MCQs, 21 Model Practice Papers, and 10 Computer Notes.
2. THE Homepage product presentation SHALL use the Canonical Product Image, the ₹99 current price, the ₹299 comparison price, the real `/GSRTC_Paper_01.pdf` model-paper sample, and purchase links to Checkout.

### Requirement 3: Claim Integrity
**User Story:** As a buyer, I want accurate sales copy so that I can make an informed purchase decision.

#### Acceptance Criteria
1. THE funnel SHALL NOT introduce unsupported urgency, official affiliation, syllabus-currency, bestseller, rating, buyer-count, or outcome claims.

### Requirement 4: Mobile Conversion Priority
**User Story:** As a mobile ad visitor, I want the offer and purchase action immediately visible so that I can act without unnecessary scrolling.

#### Acceptance Criteria
1. WHEN the Landing Page is viewed on a mobile viewport THEN it SHALL prioritize the offer, ₹99 price, Primary CTA, and delivery reassurance before secondary content.

### Requirement 5: Digital Delivery Destination
**User Story:** As a buyer, I want the purchased bundle link to open the current product folder so that I receive the correct files.

#### Acceptance Criteria
1. WHEN a verified buyer uses the page or email download link THEN `/gsrtc-mcq-course/go` SHALL redirect to the folder configured by `MCQ_DRIVE_URL`.