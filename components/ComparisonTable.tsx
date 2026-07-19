import PlatFrame from "./PlatFrame";

const rows: { label: string; agent: string; atlas: string }[] = [
  { label: "Commissions", agent: "6-10% on vacant land", atlas: "None" },
  {
    label: "Closing costs",
    agent: "Typically $900-$1,800, paid by seller",
    atlas: "Paid in full by us",
  },
  {
    label: "Marketing period",
    agent: "Often 6-12 months for vacant land",
    atlas: "None. We are the buyer",
  },
  {
    label: "Showings and negotiations",
    agent: "Ongoing",
    atlas: "One written offer, your decision",
  },
  {
    label: "Closing timeline",
    agent: "30-60 days after an accepted offer",
    atlas: "As soon as 21 days, on your schedule",
  },
  {
    label: "Certainty",
    agent: "Buyer financing can fall through",
    atlas: "Cash funds verified in escrow",
  },
];

const AGENT_HEAD = "Listing With an Agent";
const ATLAS_HEAD = "Selling to Atlas Equity Group";

export default function ComparisonTable() {
  return (
    <>
      <PlatFrame className="rounded-card bg-paper-raised">
        {/* Desktop / tablet: semantic table */}
        <table className="hidden w-full border-collapse text-left md:table">
          <caption className="sr-only">
            Comparison of listing with an agent versus selling to Atlas Equity
            Group
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-1/4 p-5" />
              <th
                scope="col"
                className="p-5 font-sans text-xs font-semibold uppercase tracking-[0.06em] text-ink-soft"
              >
                {AGENT_HEAD}
              </th>
              <th
                scope="col"
                className="bg-[rgb(30_107_79/0.06)] p-5 font-sans text-xs font-semibold uppercase tracking-[0.06em] text-ink"
              >
                {ATLAS_HEAD}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.label}
                className="border-t border-[rgb(154_170_187/0.4)]"
              >
                <th
                  scope="row"
                  className="p-5 align-top font-sans font-semibold text-ink"
                >
                  {r.label}
                </th>
                <td className="p-5 align-top text-ink-soft">{r.agent}</td>
                <td className="bg-[rgb(30_107_79/0.06)] p-5 align-top font-semibold text-ink">
                  {r.atlas}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile: two stacked cards, never a horizontal-scroll table (§6.3) */}
        <div className="flex flex-col divide-y divide-[rgb(154_170_187/0.4)] md:hidden">
          <div className="p-6">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-ink-soft">
              {AGENT_HEAD}
            </p>
            <dl className="mt-4 flex flex-col gap-3">
              {rows.map((r) => (
                <div key={r.label}>
                  <dt className="font-sans text-sm font-semibold text-ink">
                    {r.label}
                  </dt>
                  <dd className="text-ink-soft">{r.agent}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="bg-[rgb(30_107_79/0.06)] p-6">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-ink">
              {ATLAS_HEAD}
            </p>
            <dl className="mt-4 flex flex-col gap-3">
              {rows.map((r) => (
                <div key={r.label}>
                  <dt className="font-sans text-sm font-semibold text-ink">
                    {r.label}
                  </dt>
                  <dd className="font-semibold text-ink">{r.atlas}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </PlatFrame>

      <p className="mt-4 text-sm text-ink-soft">
        Figures reflect typical US vacant land transactions and vary by county
        and property. We encourage every owner to compare options before
        deciding.
      </p>
    </>
  );
}
