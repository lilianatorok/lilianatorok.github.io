"use client";

import { useEffect, useState } from "react";
import RevealText from "@/components/RevealText";

const WORDS = ["Lili", "a product designer", "curious", "always learning"];
const WORD_MS = 1500;

export default function AboutTitle() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((current) => current + 1), WORD_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <h1 className="display about-title">
      <span className="sr-only">I am Lili, a product designer, curious and always learning</span>
      <span aria-hidden="true">
        I am
        <span className="about-title-words">
          {/* The longest word holds the height, so the page below stays put when it wraps on a phone. */}
          {WORDS.map((word) => (
            <span key={word} className="about-title-sizer">
              {word}
            </span>
          ))}
          {tick > 0 && (
            <RevealText key={tick - 1} className="about-title-out" text={WORDS[(tick - 1) % WORDS.length]} />
          )}
          <RevealText key={tick} className="about-title-in" text={WORDS[tick % WORDS.length]} />
        </span>
      </span>
    </h1>
  );
}
