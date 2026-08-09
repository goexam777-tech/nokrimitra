# OPD checkout backup — 2026-08-09

Verbatim copy of the current `/opd-mastery/checkout` design before A/B redesign.

## Files
- `page.tsx.bak`            → app/opd-mastery/checkout/page.tsx
- `checkout.module.css.bak` → app/opd-mastery/checkout/checkout.module.css
- `layout.tsx.bak`          → app/opd-mastery/checkout/layout.tsx

## How to restore this exact design
Copy each `.bak` back onto its original file (drop the `.bak` suffix), then
run `npx tsc --noEmit` and `npm run build`.

## Alternative restore (git)
This design is committed as `99b06db`. To restore only the checkout folder:

    git checkout 99b06db -- app/opd-mastery/checkout

Then rebuild. This does not touch any other files.
