import type { ReactNode } from "react";

type Background = "paper" | "wash" | "ink";

const bgClass: Record<Background, string> = {
  paper: "bg-paper text-ink",
  wash: "bg-ink-wash text-ink",
  ink: "bg-ink text-paper on-dark",
};

/**
 * Vertical rhythm wrapper — applies --section-y padding (design §4).
 * The page reads paper → paper → ink bookends via the `background` prop.
 */
export default function Section({
  children,
  id,
  background = "paper",
  narrow = false,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  background?: Background;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${bgClass[background]} ${className}`}
      style={{ paddingBlock: "var(--section-y)" }}
    >
      <div className={narrow ? "container-narrow" : "container"}>{children}</div>
    </section>
  );
}
