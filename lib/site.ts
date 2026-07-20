/**
 * Single source of truth for the placeholder details the copy leaves as
 * [Phone], [Email], [hours], [registered address], [State].
 * Fill these in before launch — they render everywhere via these constants.
 */
export const site = {
  name: "Atlas Equity Group",
  legalName: "Atlas Equity Group LLC",
  phone: "(509) 679-4810",
  phoneHref: "tel:+15096794810",
  // Public contact address, and the default destination for form leads
  // (see app/api/contact/route.ts).
  email: "agreements@atlaseqg.com",
  hours: "9am–6pm ET",
  // Empty until the registered address is available. The footer and the
  // /get-offer "Mail" block are gated on this, so they stay hidden rather
  // than printing a placeholder — fill it in and both appear automatically.
  // Typed as `string` so those checks stay meaningful to TypeScript.
  address: "" as string,
  // State of LLC registration, used in the trust-bar verification line.
  registrationState: "Arizona",
  // Absolute base for metadata / OG. Lower-cased: it is emitted into
  // canonical and og:url tags, where mixed case reads as sloppy.
  url: "https://atlaseqg.com",
} as const;
