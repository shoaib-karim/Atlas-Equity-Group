"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

import {
  ContainerScroll,
  ContainerSticky,
  ProcessCard,
  ProcessCardBody,
  ProcessCardTitle,
} from "@/components/ui/process-timeline";
import ProcessSteps from "@/components/ProcessSteps";
import Reveal from "@/components/Reveal";
import { processSteps } from "@/lib/process";

/**
 * The settled deck spans `(cards - 1) * peek + cardWidth`. These pairs keep
 * that inside the container at every breakpoint so the last cards can't be
 * pushed off-screen.
 *   mobile  3*16 + 84% ≈ 98% of container
 *   tablet  3*40 + 62% ≈ 79%
 *   desktop 3*64 + 46% ≈ 60%
 */
function useResponsivePeek() {
  const [peek, setPeek] = React.useState(64);

  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPeek(w < 768 ? 16 : w < 1024 ? 40 : 64);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return peek;
}

function Heading() {
  return (
    <>
      <p className="section-index">
        <span>The process</span>
      </p>
      <h2 className="mt-10 max-w-[22ch]">
        Four Steps. Full Transparency at Each One.
      </h2>
    </>
  );
}

/**
 * Horizontal scroll-driven process timeline.
 *
 * The heading sits *inside* ContainerScroll on purpose: useScroll measures its
 * target, so if the container started at the cards, progress 0 would land only
 * once the heading had scrolled off the top. Wrapping the heading makes the
 * animation begin at the section's start, which is what it should feel like.
 *
 * Falls back to the plain vertical <ProcessSteps /> when not yet mounted (so
 * the server HTML carries the real copy and the first client render matches it)
 * and whenever the visitor prefers reduced motion.
 */
export default function ProcessTimeline() {
  const [mounted, setMounted] = React.useState(false);
  const prefersReduced = useReducedMotion();
  const peek = useResponsivePeek();

  React.useEffect(() => setMounted(true), []);

  if (!mounted || prefersReduced) {
    return (
      <Reveal>
        <Heading />
        <ProcessSteps />
      </Reveal>
    );
  }

  return (
    // Progress begins at 112px — exactly where the block pins — so the cards
    // start moving the moment "The process" reaches the top, with no dead zone.
    <ContainerScroll
      className="h-[280vh]"
      offset={["start 112px", "end end"]}
    >
      {/* Heading and cards pin together, so the heading stays on screen
          (clear of the 80px header) for the whole horizontal sequence. */}
      <ContainerSticky className="top-[112px]">
        <Heading />

        {/* No flex gap: the peek offset alone sets the spacing, and a gap would
            add to the cascade and push the last cards past the right edge. */}
        <div className="mt-12 flex flex-nowrap overflow-hidden py-6">
          {processSteps.map((step, index) => (
            <ProcessCard
              key={step.title}
              variant="paper"
              itemsLength={processSteps.length}
              index={index}
              peek={peek}
              className="min-w-[84%] max-w-[84%] rounded-card md:min-w-[62%] md:max-w-[62%] lg:min-w-[46%] lg:max-w-[46%]"
            >
              <ProcessCardTitle className="border-b border-plat-line pb-4 md:border-b-0 md:border-r md:pb-6">
                <span
                  className="record flex size-10 items-center justify-center border border-plat-line text-ink-soft"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </ProcessCardTitle>
              <ProcessCardBody className="gap-5">
                <h3 className="font-caslon font-bold leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="text-ink-soft">{step.body}</p>
              </ProcessCardBody>
            </ProcessCard>
          ))}
        </div>
      </ContainerSticky>
    </ContainerScroll>
  );
}
