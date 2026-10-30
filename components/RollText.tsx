"use client";

import { useEffect, useRef, useState } from "react";

// Always-visible text whose letters roll once when its link or button is hovered: each letter
// leaves upwards, one after another, while a copy of it rises from below. The copy is the letter's
// ::after, drawn from data-letter. The roll always finishes and never plays backwards; it then
// resets, which is invisible because the copy looks exactly like the letter it replaced.
export default function RollText({ text }: { text: string }) {
  const rollRef = useRef<HTMLSpanElement>(null);
  const [rolling, setRolling] = useState(false);
  const letters = [...text];

  useEffect(() => {
    const host = rollRef.current?.closest("a, button");
    if (!host) return;
    const onPointerEnter = (event: Event) => {
      if ((event as PointerEvent).pointerType !== "touch") setRolling(true);
    };
    const onFocus = () => {
      if (host.matches(":focus-visible")) setRolling(true);
    };
    host.addEventListener("pointerenter", onPointerEnter);
    host.addEventListener("focus", onFocus);
    return () => {
      host.removeEventListener("pointerenter", onPointerEnter);
      host.removeEventListener("focus", onFocus);
    };
  }, []);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={rollRef} className={`roll${rolling ? " is-rolling" : ""}`} aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="roll-letter"
            data-letter={letter}
            style={{ "--i": index } as React.CSSProperties}
            onAnimationEnd={index === letters.length - 1 ? () => setRolling(false) : undefined}
          >
            {letter}
          </span>
        ))}
      </span>
    </>
  );
}
