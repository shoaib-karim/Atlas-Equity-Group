import { ShieldCheck, Landmark, FileText, CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Hero trust bar (design §6.2): 4 items, one row desktop / 2×2 mobile,
 * 20px stroke icons, alpha separators. Item 1 carries the single
 * seal-brass verification mark (design §2 — brass max twice per page).
 * Verification line is actionable (webcopy v1.2 change).
 */
export default function TrustBar() {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
      <li className="flex items-start gap-3 lg:border-l lg:border-[rgb(251_250_247/0.18)] lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
        <ShieldCheck
          size={20}
          strokeWidth={1.5}
          className="mt-1 shrink-0 text-seal-brass"
          aria-hidden="true"
        />
        <span className="text-sm text-[rgb(251_250_247/0.85)]">
          Registered US LLC.{" "}
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(
              `${site.registrationState} Secretary of State business search`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[rgb(251_250_247/0.5)] underline-offset-2 hover:decoration-paper"
          >
            Verify our registration with the {site.registrationState} Secretary
            of State
          </a>
        </span>
      </li>

      {[
        {
          icon: Landmark,
          text: "Every closing handled by an independent title company",
        },
        {
          icon: FileText,
          text: "Written offers, in plain English, valid for 30 days",
        },
        {
          icon: CalendarCheck,
          text: "You choose the closing date",
        },
      ].map(({ icon: Icon, text }) => (
        <li
          key={text}
          className="flex items-start gap-3 lg:border-l lg:border-[rgb(251_250_247/0.18)] lg:pl-6"
        >
          <Icon
            size={20}
            strokeWidth={1.5}
            className="mt-1 shrink-0 text-paper"
            aria-hidden="true"
          />
          <span className="text-sm text-[rgb(251_250_247/0.85)]">{text}</span>
        </li>
      ))}
    </ul>
  );
}
