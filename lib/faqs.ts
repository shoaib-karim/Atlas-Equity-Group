import type { FaqEntry } from "./schema";

/**
 * The eight FAQs from webcopy v1.2 §7. Single source: rendered by
 * FaqSection and emitted as FAQPage JSON-LD (dev notes §8, 1:1 mapping).
 * First entry ("Is this legitimate?") renders default-open (design §6.7).
 */
export const faqs: FaqEntry[] = [
  {
    question: "Is this legitimate?",
    answer:
      "A healthy question, and the reason we structure everything around third parties you can verify. Atlas Equity Group is a registered US limited liability company, and every transaction closes through a licensed, independent title company in your property's state. The title company, not us, holds and releases all funds. You can verify our registration and the title company's license before signing anything.",
  },
  {
    question: "How did you get my information?",
    answer:
      "From public county records. Every county in the United States maintains open records of land ownership, and that is the only source we use. We do not buy private data, and one request removes you from our mailing list permanently.",
  },
  {
    question: "How do you set your price, and will it be full market value?",
    answer:
      "We analyze county records, parcel characteristics, access and utilities, zoning, and recent comparable sales in your area. And honestly: the offer is usually below full market value, and we would rather you hear that from us. It reflects what we can responsibly pay as a cash buyer who purchases as-is, covers every cost, and closes in weeks instead of months. For owners who value speed, certainty, and zero fees, the trade is worth it. For owners whose priority is maximum price and who can wait out a 6-12 month listing, an agent may serve you better, and if that is your situation, we will say so.",
  },
  {
    question: "Will I pay any fees, commissions, or closing costs?",
    answer:
      "No. The offer amount is the amount you receive. We pay all closing costs, title fees, and recording fees. There are no commissions because there are no agents involved.",
  },
  {
    question: "How fast can we close?",
    answer:
      "Most closings complete within 21 to 30 days of a signed agreement, subject to the county's pace and the title company verifying clear title, which protects you as much as us. If you need more time, you set the date. We work on your schedule, not the other way around.",
  },
  {
    question: "What if there are back taxes or title issues on my land?",
    answer:
      "In most cases we can still buy. Back taxes are typically settled from the sale proceeds at closing, and the title company works through common title issues as part of the process. Tell us about the situation up front and we will tell you honestly whether we can proceed.",
  },
  {
    question: "Do I need a lawyer?",
    answer:
      "You never need one to sell to us, but we genuinely encourage owners to have any agreement reviewed by their own attorney. A transaction that cannot survive a lawyer's review is not one we want to be part of.",
  },
  {
    question: "How do I stop receiving letters?",
    answer:
      "Reply to any letter, or use the contact form, and ask to be removed. It is done once and permanently.",
  },
];
