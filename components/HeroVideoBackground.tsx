"use client";

import { useEffect, useState } from "react";

const VIMEO_SRC =
  "https://player.vimeo.com/video/1211402148?h=3a5e59ca91" +
  "&background=1&autoplay=1&loop=1&muted=1&dnt=1";

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

  // No video → no scrim. The scrim exists only to guarantee text contrast
  // over footage; rendering it against the flat ink ground would just be
  // dead weight darkening nothing.
  if (!show) return null;

  return (
    <>
      <div className="hero-video" aria-hidden="true">
        <iframe
          src={VIMEO_SRC}
          title=""
          tabIndex={-1}
          allow="autoplay; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />
    </>
  );
}
