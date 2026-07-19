import type { ReactNode } from "react";

/**
 * The Plat Line — the site's single signature device (design §5).
 * A 1px surveyor boundary with 8px monument squares on all four corners.
 * Used ONLY on: hero promise card, comparison table, form card. Nowhere else.
 *
 * The required <span class="mark-b" /> child carries the bottom two corner
 * marks (::before / ::after on the frame itself carry the top two).
 */
export default function PlatFrame({
  children,
  className = "",
  onDark = false,
  label,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
  /** Optional mono annotation on the top-left edge (hero frame only, §5). */
  label?: string;
}) {
  return (
    <div
      className={`plat-frame ${onDark ? "plat-frame--on-dark" : ""} ${className}`}
    >
      {label ? <span className="plat-label record">{label}</span> : null}
      {children}
      <span className="mark-b" aria-hidden="true" />
    </div>
  );
}
