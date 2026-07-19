"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * GSAP scroll reveal.
 *
 * Uses gsap.from() deliberately: the element renders visible in the DOM and
 * GSAP animates *from* a hidden state. If JS never runs (or a crawler reads
 * the page), the content is still there and visible — no CSS opacity:0 trap.
 *
 * Presets follow the motion database:
 *  - subtle  : opacity/y12, 0.35s, power1.out, start "top 90%"
 *  - stagger : children opacity/y24, 0.5s, 0.08 stagger, power2.out, "top 85%"
 *
 * prefers-reduced-motion is handled by gsap.matchMedia — animations are simply
 * never created for those users, so nothing is left mid-transform.
 */
export default function Reveal({
  children,
  className = "",
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  /** Animate direct children in sequence. Keep groups to ~8 items. */
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = ref.current;
        if (!el) return;

        if (stagger) {
          gsap.from(el.children, {
            opacity: 0,
            y: 24,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        } else {
          gsap.from(el, {
            opacity: 0,
            y: 12,
            duration: 0.35,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
