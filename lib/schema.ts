import { site } from "./site";

/**
 * JSON-LD builders (design §10, webcopy dev notes §3).
 * Organization sitewide + FAQPage on the home FAQ section.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    description:
      "A US-registered land acquisition company that buys vacant land directly from owners across all 50 states.",
    areaServed: "US",
  };
}

export type FaqEntry = { question: string; answer: string };

export function faqPageSchema(faqs: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
