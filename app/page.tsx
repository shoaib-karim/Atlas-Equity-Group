import Link from "next/link";
import { FileText, Lock, Check } from "lucide-react";
import Section from "@/components/Section";
import PlatFrame from "@/components/PlatFrame";
import TrustBar from "@/components/TrustBar";
import ComparisonTable from "@/components/ComparisonTable";
import ProcessTimeline from "@/components/ProcessTimeline";
import FaqSection from "@/components/FaqSection";
import OfferForm from "@/components/OfferForm";
import Reveal from "@/components/Reveal";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { site } from "@/lib/site";

const reassurance = [
  {
    icon: FileText,
    title: "It is a real offer.",
    body: "Every offer we make is written, specific to your parcel, and based on county data, comparable sales, and current market conditions.",
  },
  {
    icon: Lock,
    title: "Your protection is built in.",
    body: "Funds are never exchanged directly between us. A licensed, independent title company holds all money in escrow and verifies clear title before anything changes hands.",
  },
  {
    icon: Check,
    title: "No is a complete answer.",
    body: "If our number does not work for you, we part ways respectfully. No follow-up pressure, no repeated calls.",
  },
];

const situations = [
  { lead: "You inherited land you will never use", rest: ", possibly in a state you do not live in" },
  { lead: "The tax bills keep arriving", rest: " for a parcel that gives nothing back" },
  { lead: "You bought lots years ago", rest: " and the plans never materialized" },
  { lead: "The parcel is hard to sell", rest: ": landlocked, oddly shaped, or remote" },
  { lead: "Back taxes have piled up", rest: " and the county is sending notices" },
  { lead: "You simply want it handled", rest: ": rural acreage, infill lots, timber, agricultural, or recreational land" },
];

const principles = [
  { term: "Documented.", body: "Every offer, agreement, and closing statement in writing." },
  { term: "Independent.", body: "Neutral title companies handle every dollar." },
  { term: "Unpressured.", body: "Our offers stand on their own. Deciding is yours alone." },
];

export default function HomePage() {
  return (
    <>
      {/* ================= 01 · HERO ================= */}
      <section className="hero on-dark -mt-[80px] pt-[80px]">
        <HeroVideoBackground />

        <div
          className="container relative flex flex-1 flex-col"
          style={{ paddingBlock: "clamp(32px, 5vh, 72px)" }}
        >
          {/* Main block takes the free space and centres within it */}
          <div className="flex flex-1 flex-col justify-center">
            <p className="section-index">
              <span>Direct land buyers · All 50 states</span>
            </p>

            <h1 className="mt-8 max-w-[17ch] text-paper">
              Get a Written Cash Offer for Your Land Within 48 Hours
            </h1>

            <p className="mt-8 measure text-[rgb(251_250_247/0.82)]">
              Atlas Equity Group buys vacant land directly from owners across
              the United States, as-is, exactly as it sits. No fees, no
              commissions, no repairs, and no obligation to accept. Every
              closing is handled by a licensed, independent title company.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link href="#offer-form" className="btn btn-primary">
                Request My Cash Offer
              </Link>
              <Link href="/get-offer" className="link-cta link-cta--on-dark">
                Received a letter from us? Start here.
              </Link>
              <PlatFrame
                onDark
                label="OFFER · IN WRITING"
                className="rounded-card px-6 py-4"
              >
                <p className="record text-base text-paper">
                  Written offer · 48 hours · $0 in fees
                </p>
              </PlatFrame>
            </div>
          </div>

          {/* Trust bar anchors to the bottom of the screen */}
          <div className="mt-12">
            <TrustBar />
          </div>
        </div>
      </section>

      {/* ============ 02 · RECEIVED OUR LETTER ============ */}
      <Section background="wash">
        <Reveal>
          <p className="section-index">
            <span>Your letter</span>
          </p>
          <h2 className="mt-10">
            If You Received a Letter From Us, Here Is What It Means
          </h2>
          <div className="mt-10 flex flex-col gap-5 measure text-ink-soft">
            <p>
              We research county records to find vacant land that may no longer
              serve its owner: inherited parcels, lots bought years ago, land
              with ongoing tax bills and no plans attached. If you received a
              letter, it means your property matched what we look for, and we
              are prepared to make a genuine cash offer on it.
            </p>
            <p>
              There is no catch and no obligation. The letter is an invitation
              to a conversation, nothing more. If you would rather not hear from
              us again, one reply removes you from our mailing list permanently.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reassurance.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-card bg-paper-raised p-8 shadow-card"
            >
              <Icon
                size={24}
                strokeWidth={1.5}
                className="text-field-green"
                aria-hidden="true"
              />
              <h3 className="mt-5 font-sans text-lg font-semibold text-ink">
                {title}
              </h3>
              <p className="mt-2 text-ink-soft">{body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <p className="mt-12">
            <Link href="/get-offer" className="link-cta">
              Reference your letter and get your offer →
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* ============ 03 · THE HONEST MATH ============ */}
      <Section id="math" background="paper">
        <Reveal>
          <p className="section-index">
            <span>The math</span>
          </p>
          <h2 className="mt-10 max-w-[20ch]">The Honest Math of Selling Land</h2>
          <p className="mt-10 measure text-ink-soft">
            Listing land with an agent works for some owners. For many, the
            numbers tell a different story. Vacant land routinely sits on the
            market for six months or longer, and the costs come out of your side
            of the table.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <ComparisonTable />
        </Reveal>

        <Reveal>
          <div className="mt-14">
            <Link href="#offer-form" className="btn btn-primary">
              See What We Would Offer for Your Land
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ============ 04 · PROCESS ============ */}
      <Section id="process" background="paper" className="border-t border-plat-line">
        {/* ProcessTimeline renders its own heading — it must sit inside the
            scroll container for the animation to start at the section top. */}
        <ProcessTimeline />
        <Reveal>
          <div className="mt-14">
            <Link href="#offer-form" className="btn btn-primary">
              Start Step 1: Request Your Offer
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ============ 05 · WHAT WE BUY ============ */}
      <Section id="what-we-buy" background="wash">
        <Reveal>
          <p className="section-index">
            <span>What we buy</span>
          </p>
          <h2 className="mt-10 max-w-[20ch]">
            We Buy Land in All 50 States, As-Is
          </h2>
          <p className="mt-10 measure text-ink-soft">
            If any of these sound familiar, we would like to make you an offer:
          </p>
        </Reveal>

        <Reveal
          stagger
          className="mt-12 grid grid-cols-1 gap-x-14 gap-y-7 md:grid-cols-2"
        >
          {situations.map((s) => (
            <div key={s.lead} className="flex items-start gap-4">
              <span
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-field-green"
                aria-hidden="true"
              >
                <Check size={14} strokeWidth={2.5} className="text-field-green" />
              </span>
              <span className="text-base">
                <strong className="font-semibold text-ink">{s.lead}</strong>
                <span className="text-ink-soft">{s.rest}</span>
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <p className="mt-12 measure text-ink-soft">
            We buy exactly as the land sits. No clearing, no surveys ordered by
            you, no cleanup. Unsure whether your parcel qualifies? Send us the
            details. The evaluation is free, and so is walking away.
          </p>
        </Reveal>
      </Section>

      {/* ============ 06 · WHO WE ARE (dark beat) ============ */}
      <Section background="ink">
        <Reveal>
          <p className="section-index">
            <span>Who we are</span>
          </p>
          <h2 className="mt-10 max-w-[18ch] text-paper">
            A Direct Buyer, Not a Middleman
          </h2>
          <div className="mt-10 flex flex-col gap-5 measure text-[rgb(251_250_247/0.78)]">
            <p>
              Atlas Equity Group is a US-registered land acquisition company. We
              purchase land directly from owners and hold or resell it to home
              builders, developers, and investors. Because we are the actual
              buyer, there is no listing period, no chain of agents, and no
              commission taken from your proceeds.
            </p>
            <p>
              We built this company on a simple observation: selling vacant land
              through traditional channels is slow, expensive, and stacked
              against the owner. Our model removes the friction. You get a clean,
              fast, documented sale. We get land for our portfolio. Both sides
              know exactly where they stand.
            </p>
          </div>
        </Reveal>

        <hr className="hairline mt-16" />

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {principles.map((p) => (
            <div key={p.term}>
              <p className="font-caslon text-xl font-bold text-paper">
                {p.term}
              </p>
              <p className="mt-2 text-[rgb(251_250_247/0.72)]">
                {p.body}
              </p>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* ============ 07 · FAQ ============ */}
      <FaqSection />

      {/* ============ 08 · FINAL CTA ============ */}
      <Section id="offer-form" background="ink">
        {/* One two-column grid for the whole section: all copy left, form
            right, both starting at the same top edge. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_560px] lg:items-start lg:gap-20">
          {/* LEFT — heading, promise, phone */}
          <Reveal className="order-2 lg:order-1">
            <p className="section-index">
              <span>Your offer</span>
            </p>
            <h2 className="mt-8 max-w-[16ch] text-paper">
              Find Out What Your Land Is Worth to a Cash Buyer
            </h2>
            <p className="mt-8 max-w-[52ch] text-[rgb(251_250_247/0.82)]">
              It costs nothing to ask, and the offer is yours to accept,
              decline, or sit with for 30 days. Most owners hear back from us
              within 48 hours.
            </p>

            <hr className="hairline mt-12" />

            <p className="mt-8 text-[rgb(251_250_247/0.78)]">
              Prefer to talk first?
            </p>
            <p className="mt-3">
              <a
                href={site.phoneHref}
                className="record text-2xl text-paper underline decoration-[rgb(251_250_247/0.4)] underline-offset-4 hover:decoration-paper"
              >
                {site.phone}
              </a>
            </p>
            <p className="mt-3 text-[rgb(251_250_247/0.66)]">
              Weekdays {site.hours}. You will reach a person, not a queue.
            </p>
          </Reveal>

          {/* RIGHT — the form, top-aligned with the heading */}
          <div className="order-1 lg:order-2">
            <OfferForm source="home" />
          </div>
        </div>
      </Section>
    </>
  );
}
