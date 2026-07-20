import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-plat-line bg-paper">
      <div className="container py-[clamp(48px,7vw,80px)]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src="/logo.png"
              alt="Atlas Equity Group"
              width={573}
              height={435}
              className="h-20 w-auto"
            />
            <address className="mt-5 not-italic text-ink-soft">
              {site.address ? (
                <p className="record text-sm">{site.address}</p>
              ) : null}
              <p className="record mt-1 text-sm">
                <a href={site.phoneHref} className="hover:text-ink">
                  {site.phone}
                </a>{" "}
                &nbsp;|&nbsp;{" "}
                <a href={`mailto:${site.email}`} className="hover:text-ink">
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-field-green">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/get-offer" className="hover:text-field-green">
                  Get Your Offer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-field-green">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-field-green">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-plat-line pt-6 text-sm text-ink-soft">
          <p className="measure">
            All transactions close through licensed, independent title
            companies. Atlas Equity Group is a direct land buyer and is not a
            real estate brokerage.
          </p>
          <p className="mt-3">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
