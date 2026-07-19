import type { Metadata } from "next";
import Section from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Atlas Equity Group collects, uses, and protects the information you share. We never sell or share your details.",
};

export default function PrivacyPage() {
  return (
    <Section background="paper" narrow>
      <h1>Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Last updated {new Date().getFullYear()}. This starter policy should be
        reviewed by your counsel before launch.
      </p>

      <div className="mt-10 flex flex-col gap-8 text-ink-soft">
        <section>
          <h2 className="text-xl">Information we collect</h2>
          <p className="mt-3">
            When you submit our offer form, we collect the details you provide:
            your name, email address, and optionally your phone number, property
            state and county, parcel number or address, acreage, letter
            reference code, and any notes you add. We also source publicly
            available land-ownership information from county records.
          </p>
        </section>

        <section>
          <h2 className="text-xl">How we use your information</h2>
          <p className="mt-3">
            We use your information solely to research your parcel, prepare a
            written cash offer, and communicate with you about that offer. We do
            not use it for any other purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl">We never sell or share your details</h2>
          <p className="mt-3">
            Your information is never sold, rented, or shared with third parties
            for marketing. We share information only with the licensed,
            independent title company handling a transaction you choose to
            proceed with, and only as needed to close that transaction.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Removal and contact preferences</h2>
          <p className="mt-3">
            One request removes you from all future contact, permanently. Reply
            to any letter, use our contact form, or email us at{" "}
            <a href={`mailto:${site.email}`} className="link record">
              {site.email}
            </a>
            .
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
            </a>
          </p>
        </section>
      </div>
    </Section>
  );
}
