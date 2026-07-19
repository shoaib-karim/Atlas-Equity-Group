import { processSteps as steps } from "@/lib/process";

/**
 * Process steps (design §6.4): mono 01–04 numbers in 40px outlined squares,
 * 1px connector between them. Titles Caslon text-xl, bodies text-lg @ 60ch.
 */
export default function ProcessSteps() {
  return (
    <ol className="mt-10">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={step.title} className="flex items-stretch gap-5">
            {/* Number + connector column */}
            <div className="flex flex-col items-center">
              <span
                className="record flex h-10 w-10 shrink-0 items-center justify-center border border-plat-line text-[1.222rem] text-ink-soft"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {!isLast && <span className="mt-2 w-px flex-1 bg-plat-line" />}
            </div>

            {/* Content */}
            <div className={isLast ? "pb-0" : "pb-12"}>
              <h3 className="font-caslon text-xl font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[60ch] text-ink-soft">
                {step.body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
