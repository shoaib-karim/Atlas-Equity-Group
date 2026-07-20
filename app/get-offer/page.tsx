import type { Metadata } from "next";
import { Check } from "lucide-react";
import Section from "@/components/Section";
import OfferForm from "@/components/OfferForm";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Cash Offer for Your Land",
  description:
    "Tell us about your land in two minutes. Receive a written, no-obligation cash offer within 48 hours. We pay all closing costs and close through a licensed title company.",
};

const nextSteps = [
  {
    when: "Within 24 hours",
    body: "We confirm receipt and begin researching your parcel using county records and market data.",
  },
  {
    when: "Within 48 hours",
    body: "Your written cash offer arrives by email, signed by the person handling your file, stating the exact amount and confirming we pay all costs.",
  },
  {
    when: "Entirely up to you",
    body: "Accept, decline, ask questions, or take time to decide. The offer is information, and it is yours.",
  },
];

const trustStrip = [
  "Written offers only. Nothing verbal, nothing vague.",
  "All funds held and released by a licensed, independent title company.",
  "We pay every closing cost. The offer is the amount you receive.",
  "One request removes you from all future contact.",
];

export default function GetOfferPage() {
  return (
    <>
      {/* ============ 01 · FORM HERO + THE FORM ============ */}
      <Section background="paper">
        <p className="section-index">
          <span>Request your offer</span>
        </p>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_560px] lg:items-start">
          <div>
            <h1 className="max-w-[15ch]">Request Your Written Cash Offer</h1>
            <p className="mt-10 measure text-ink-soft">
              Two minutes of your time. A written offer within 48 hours. No
              obligation at any point.
            </p>
            <p className="mt-6 measure text-ink-soft">
              Your information is used only to research your parcel and prepare
              your offer. We never sell or share your details.
            </p>

            <hr className="hairline mt-12" />

            <p className="mt-8 text-ink-soft">Prefer to talk first?</p>
            <p className="mt-3">
              <a
                href={site.phoneHref}
                className="record text-2xl text-ink underline decoration-plat-line underline-offset-4 hover:decoration-ink"
              >
                {site.phone}
              </a>
            </p>
            <p className="mt-3 text-ink-soft">
              Weekdays {site.hours}, your local time zone respected.
            </p>
          </div>

          <div>
            <OfferForm source="get-offer" />
          </div>
        </div>
      </Section>

      {/* ============ 02 · WHAT HAPPENS NEXT (dark) ============ */}
      <Section background="ink">
        <Reveal>
          <p className="section-index">
            <span>What happens next</span>
          </p>
          <h2 className="mt-10 max-w-[16ch] text-paper">After You Press Send</h2>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {nextSteps.map((s, i) => (
            <div key={s.when}>
              <span
                className="record flex h-12 w-12 items-center justify-center border border-[rgb(251_250_247/0.3)] text-lg text-[rgb(251_250_247/0.7)]"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-5 font-sans text-lg font-semibold text-paper">
                {s.when}
              </p>
              <p className="mt-2 text-[rgb(251_250_247/0.75)]">
                {s.body}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ============ 03 · TRUST STRIP ============ */}
      <Section background="paper">
        <Reveal>
          <p className="section-index">
            <span>What you can rely on</span>
          </p>
        </Reveal>
        <Reveal
          stagger
          className="mt-12 grid grid-cols-1 gap-x-14 gap-y-7 sm:grid-cols-2"
        >
          {trustStrip.map((item) => (
            <div key={item} className="flex items-start gap-4">
              <Check
                size={20}
                strokeWidth={2}
                className="mt-1 shrink-0 text-field-green"
                aria-hidden="true"
              />
              <span className="text-ink-soft">{item}</span>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ============ 04 · REACH US DIRECTLY (wash) ============ */}
      <Section background="wash">
        <Reveal>
          <p className="section-index">
            <span>Reach us directly</span>
          </p>
          <h2 className="mt-10 max-w-[14ch]">Reach Us Directly</h2>
          <p className="mt-10 measure text-ink-soft">
            Some owners prefer a conversation before sharing details, and we
            welcome that.
          </p>
        </Reveal>

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="section-index">
              <span>Email</span>
            </p>
            <p className="mt-4">
              <a href={`mailto:${site.email}`} className="link record text-lg">
                {site.email}
              </a>
            </p>
          </div>
          <div>
            <p className="section-index">
              <span>Phone</span>
            </p>
            <p className="mt-4">
              <a href={site.phoneHref} className="link record text-lg">
                {site.phone}
              </a>
            </p>
            <p className="mt-2 text-base text-ink-soft">
              Weekdays {site.hours}
            </p>
          </div>
          {/* Hidden until a registered address exists — a "Mail" heading with
              no address is worse than no block at all. */}
          {site.address ? (
            <div>
              <p className="section-index">
                <span>Mail</span>
              </p>
              <p className="mt-4 record text-base text-ink-soft">
                {site.legalName}
                <br />
                {site.address}
              </p>
            </div>
          ) : null}
        </Reveal>
      </Section>
    </>
  );
}
