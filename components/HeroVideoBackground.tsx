"use client";

import { useEffect, useRef, useState } from "react";

const VIMEO_SRC =
  "https://player.vimeo.com/video/1211402148?h=3a5e59ca91" +
  "&background=1&autoplay=1&loop=1&muted=1&dnt=1";

/** The clip is 16:9; the iframe must keep that ratio to avoid stretching. */
const RATIO = 16 / 9;

/**
 * Decorative Vimeo background for the hero.
 *
 * Deliberately conservative for this audience and for Core Web Vitals:
 *  - Mounts only after first paint, so the iframe never competes with LCP.
 *    The hero's --ink background is painted server-side and always readable.
 *  - Never loads under prefers-reduced-motion or when Save-Data is on.
 *  - aria-hidden + tabIndex -1: purely decorative, out of the a11y tree and
 *    out of the tab order. All meaning lives in the text on top of it.
 *  - dnt=1 asks Vimeo not to track the session.
 */
export default function HeroVideoBackground() {
  const [show, setShow] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;

    if (prefersReduced || saveData) return;

    const timer = window.setTimeout(() => setShow(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  /**
   * Measure the hero box itself rather than the viewport.
   *
   * Viewport units cannot solve this: covering a box requires deriving one
   * axis from the other (width = height x 16/9), and CSS has no way to read a
   * container's height into a width. On phones the hero routinely grows well
   * past 100svh — the copy, CTAs and trust bar stack — so a viewport-sized
   * video left a bare strip along the bottom. A ResizeObserver on the wrapper
   * gives the real box at all times, including when the address bar collapses.
   */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !show) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setBox({ w: width, h: height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [show]);

  if (!show) return null;

  // Cover: scale to whichever axis is deficient, keeping 16:9 exactly.
  // Overflow is clipped by .hero-video, so the excess simply crops.
  let width = box.w;
  let height = box.w / RATIO;
  if (height < box.h) {
    height = box.h;
    width = box.h * RATIO;
  }
  const measured = box.w > 0 && box.h > 0;

  return (
    <>
      <div className="hero-video" aria-hidden="true" ref={wrapRef}>
        <iframe
          src={VIMEO_SRC}
          title=""
          tabIndex={-1}
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          // Before the first measurement the CSS rule in globals.css supplies
          // viewport-based cover sizing, so there is no unstyled flash.
          style={
            measured
              ? { width: `${width}px`, height: `${height}px`, minWidth: 0, minHeight: 0 }
              : undefined
          }
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />
    </>
  );
}
