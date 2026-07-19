import { ChevronDown } from "lucide-react";
import Section from "./Section";
import { faqs } from "@/lib/faqs";
import { faqPageSchema } from "@/lib/schema";

/**
 * FAQ (design §6.7): native <details>/<summary>, first item default-open,
 * questions in Public Sans 600 (not Caslon — loses this audience at small
 * sizes), answers capped at 60ch. Emits FAQPage JSON-LD (dev notes §8).
 */
export default function FaqSection() {
  return (
    <Section id="faq" background="paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(faqs)),
        }}
      />
      <p className="section-index">
        <span>Questions</span>
      </p>
      <h2 className="mt-10 max-w-[18ch]">Questions Owners Ask Us</h2>

      <div className="mt-14">
        {faqs.map((f, i) => (
          <details
            key={f.question}
            className="faq-item border-b border-plat-line"
            open={i === 0}
          >
            <summary className="flex items-center justify-between gap-4 py-5">
              <span className="font-sans text-lg font-semibold text-ink">
                {f.question}
              </span>
              <ChevronDown
                className="faq-chevron text-ink-soft"
                size={22}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </summary>
            <p className="measure-narrow pb-5 text-ink-soft">
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
