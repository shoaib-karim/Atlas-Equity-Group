/**
 * Single source of truth for the placeholder details the copy leaves as
 * [Phone], [Email], [hours], [registered address], [State].
 * Fill these in before launch — they render everywhere via these constants.
 */
export const site = {
  name: "Atlas Equity Group",
  legalName: "Atlas Equity Group LLC",
  // Placeholders — replace with real values before launch.
  phone: "(555) 000-0000",
  phoneHref: "tel:+15550000000",
  email: "offers@atlasequitygroup.com",
  hours: "9am–6pm ET",
  address: "[Registered address once provided]",
  // State of LLC registration, used in the trust-bar verification line.
  registrationState: "Delaware",
  // Absolute base for metadata / OG. Replace with the production domain.
  url: "https://www.atlasequitygroup.com",
} as const;
