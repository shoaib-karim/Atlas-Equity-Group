import type { Metadata } from "next";
import Section from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the Atlas Equity Group website and the non-binding nature of requesting a cash offer.",
};

export default function TermsPage() {
  return (
    <Section background="paper" narrow>
      <h1>Terms of Service</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Last updated {new Date().getFullYear()}. This starter document should be
        reviewed by your counsel before launch.
      </p>

      <div className="mt-10 flex flex-col gap-8 text-ink-soft">
        <section>
          <h2 className="text-xl">About this website</h2>
          <p className="mt-3">
            This website is operated by {site.legalName}, a US-registered land
            acquisition company. {site.name} is a direct land buyer and is not a
            real estate brokerage.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Requesting an offer is not binding</h2>
          <p className="mt-3">
            Submitting the offer form does not obligate you to sell, and it does
            not create a contract. It begins our research so we can prepare a
            written cash offer for your consideration. Any offer we make is
            yours to accept, decline, or let expire. A sale becomes binding only
            upon a signed purchase agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Offers and closing</h2>
          <p className="mt-3">
            Written offers stay valid for 30 days unless stated otherwise. All
            transactions close through a licensed, independent title company in
            your property&apos;s state, which holds and releases all funds and
            verifies clear title. You never send money to us at any point.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Accuracy of information</h2>
          <p className="mt-3">
            The figures and timelines described on this site reflect typical US
            vacant land transactions and vary by county and property. Nothing on
            this site is a guarantee of a specific price or closing date.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Contact us</h2>
          <p className="mt-3">
            {site.legalName}
            <br />
            {site.address}
            <br />
            <a href={site.phoneHref} className="link record">
              {site.phone}
            </a>{" "}
            ·{" "}
            <a href={`mailto:${site.email}`} className="link record">
              {site.email}
            </a>
          </p>
        </section>
      </div>
    </Section>
  );
}
