"use client";

import { useEffect, useRef, useState } from "react";

// Béres's trademark from its own site: a thin gold line through the sections with an empty drop on
// it, and a full drop that falls along the line and lands in the empty one. Here the line runs
// through both blocks, the empty drop sits in the middle of the dark banner, and the drop falls in
// each time the blocks come up to the middle of the screen.
const DROP = "M20 1C20 1 1 25 1 36a19 17 0 0 0 38 0C39 25 20 1 20 1Z";

export default function BeresDrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [dropping, setDropping] = useState(false);

  useEffect(() => {
    const drip = ref.current;
    const scroller = drip?.closest<HTMLElement>(".scroller");
    if (!drip || !scroller) return;
    const observer = new IntersectionObserver(
      ([entry]) => setDropping(entry.isIntersecting),
      // A band around the middle of the screen.
      { root: scroller, rootMargin: "-35% 0px -35% 0px" },
    );
    observer.observe(drip);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`beres-drip${dropping ? " is-dropping" : ""}`} aria-hidden="true">
      <i className="beres-drip-line beres-drip-above" />
      <i className="beres-drip-line beres-drip-below" />
      <svg viewBox="0 0 40 54" className="beres-drip-empty">
        <path d={DROP} />
      </svg>
      <svg viewBox="0 0 40 54" className="beres-drip-drop">
        <defs>
          <linearGradient id="beres-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#bb9e55" />
            <stop offset="1" stopColor="#ebd493" />
          </linearGradient>
        </defs>
        <path d={DROP} fill="url(#beres-gold)" />
      </svg>
    </div>
  );
}
