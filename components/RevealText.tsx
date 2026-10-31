import type { CSSProperties } from "react";

// Splits text into masked words and letters, so each letter can rise into view on its own.
export default function RevealText({ className, text }: { className: string; text: string }) {
  let letterIndex = 0;
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="reveal-word">
            {[...word].map((letter, index) => (
              <span
                key={index}
                className="reveal-letter"
                style={{ "--i": letterIndex++ } as CSSProperties}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
