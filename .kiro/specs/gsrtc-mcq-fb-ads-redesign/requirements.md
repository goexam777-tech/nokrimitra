# Requirements Document

## Introduction
This specification defines the approved GSRTC MCQ landing-page and checkout-summary behavior for a clear, mobile-first purchase funnel.

## Glossary
- **Landing Page:** `/gsrtc-mcq-course`.
- **Checkout:** `/gsrtc-mcq-course/checkout`.
- **Primary CTA:** A dominant purchase link to Checkout.
- **Bundle:** 20 Content PDFs, 2500+ MCQs, 21 Model Practice Papers, and 10 Computer Notes.

## Requirements

### Requirement 1: Purchase Navigation
**User Story:** As a buyer, I want purchase actions to open the correct checkout so that I can complete my order.

#### Acceptance Criteria
1. WHEN a user activates a Primary CTA THEN the Landing Page SHALL navigate to Checkout.

### Requirement 2: Bundle Consistency
**User Story:** As a buyer, I want consistent package details so that I know exactly what I am purchasing.

#### Acceptance Criteria
1. THE Landing Page and Checkout summary SHALL show 20 Content PDFs, 2500+ MCQs, 21 Model Practice Papers, and 10 Computer Notes.

### Requirement 3: Claim Integrity
**User Story:** As a buyer, I want accurate sales copy so that I can make an informed purchase decision.

#### Acceptance Criteria
1. THE funnel SHALL NOT introduce unsupported urgency, official affiliation, bestseller, rating, buyer-count, or outcome claims.

### Requirement 4: Mobile Conversion Priority
**User Story:** As a mobile ad visitor, I want the offer and purchase action immediately visible so that I can act without unnecessary scrolling.

#### Acceptance Criteria
1. WHEN the Landing Page is viewed on a mobile viewport THEN it SHALL prioritize the offer, ₹99 price, Primary CTA, and delivery reassurance before secondary content.

### Requirement 5: Digital Delivery Destination
**User Story:** As a buyer, I want the purchased bundle link to open the current product folder so that I receive the correct files.

#### Acceptance Criteria
1. WHEN a verified buyer uses the page or email download link THEN `/gsrtc-mcq-course/go` SHALL redirect to the folder configured by `MCQ_DRIVE_URL`.