# Atlas Equity Group

Two-page land acquisition site (USA-wide). Next.js 14 App Router + Tailwind CSS + TypeScript.

Built from `atlas-equity-webcopy.md` (v1.2) and `design.md` (v1.0).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | Resend API key for lead delivery |
| `LEAD_NOTIFICATION_FROM` | yes | Sender on a domain verified in Resend |
| `LEAD_NOTIFICATION_TO` | no | Overrides the lead destination. Defaults to `site.email` in `lib/site.ts` |

Form leads go to `site.email` (`agreements@atlaseqg.com`) unless
`LEAD_NOTIFICATION_TO` overrides it.

Without `RESEND_API_KEY` and `LEAD_NOTIFICATION_FROM` the offer form still
validates and returns success, but the lead is only logged to the server
console — **nothing is emailed**. See `app/api/contact/route.ts`.

## Structure

```
app/            routes: / , /get-offer , /privacy , /terms , /api/contact
components/     site components
components/ui/  shadcn primitives + header / process timeline
lib/            validation, content data, JSON-LD, site constants
```

`app/globals.css` is the single styling source of truth — every design token lives
in its `:root`, and `tailwind.config.ts` maps utilities onto those same variables.
No hex values belong outside that file.

## Before launch

- [ ] Fill real contact details in `lib/site.ts` (phone, email, hours, address,
      LLC registration state) — all are placeholders.
- [ ] Configure Resend env vars above, and send a live test submission.
- [ ] Confirm the **48-hour offer promise** is operationally achievable
      nationwide. If not, change every instance to "2 business days" in the copy
      docs *and* the code.
- [ ] Have counsel review `/privacy` and `/terms` — these are starter documents.
- [ ] Whitelist the production domain for the hero Vimeo video, or drop the
      video (`components/HeroVideoBackground.tsx`); the hero is designed to work
      without it.
- [ ] Replace the OG image font with the brand Caslon face
      (`app/opengraph-image.tsx` currently falls back to a system serif).
