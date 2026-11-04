import type { CSSProperties, ReactNode } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// One calculator section at every breakpoint, drawn at the same scale so the widths compare.
const breakpoints = [
  { width: 1440, size: [864, 1235] },
  { width: 1200, size: [720, 1234] },
  { width: 1024, size: [614, 1232] },
  { width: 768, size: [461, 1055] },
  { width: 576, size: [346, 1187] },
  { width: 375, size: [225, 1205] },
];

const numbers = [
  ["20+", "projects, several at a time"],
  ["1", "subpage the whole system was derived from"],
  ["6", "breakpoints for every component"],
  ["68", "colour tokens re-checked for contrast"],
];

// Contrast with white text, before and after the accessibility update (from the colour review).
type Level = "fail" | "large" | "aa" | "aaa";
const colours: { token: string; before: [string, number]; after: [string, number] }[] = [
  { token: "primary-accent", before: ["#00AEEF", 2.52], after: ["#0097DB", 3.25] },
  { token: "primary-accent-600", before: ["#008BBF", 3.85], after: ["#007AB1", 4.75] },
  { token: "primary-main", before: ["#003665", 12.24], after: ["#0D2A50", 14.34] },
];
const level = (ratio: number): Level => (ratio >= 7 ? "aaa" : ratio >= 4.5 ? "aa" : ratio >= 3 ? "large" : "fail");
const levelText: Record<Level, string> = { fail: "Fails", large: "AA large text", aa: "AA", aaa: "AAA" };

const platforms = ["Mobile app, iOS", "Mobile app, Android", "Internet bank", "Website"];

const learnings = [
  [
    "No good system without developers.",
    "Some systems can’t be finished in Figma. I had to understand what the developers build, think the way they do, and keep the design system in sync with theirs.",
  ],
  [
    "A marathon, not a sprint.",
    "The limits are stricter here, and sometimes hard to understand. You still move forward, only slower, so it’s better to go slowly and surely.",
  ],
  [
    "Small wins count.",
    "Even a copy change goes through rounds of agreement, so every step that ships is worth being glad about.",
  ],
  ["More accepting, not helpless.", "I learned where to push and where to let go, without giving up on the system."],
];

function Swatch({ colour, ratio, label }: { colour: string; ratio: number; label: string }) {
  const result = level(ratio);
  return (
    <div className="kh-swatch">
      <span className="kh-swatch-label">{label}</span>
      <div className="kh-swatch-chip" style={{ background: colour }}>
        Aa
      </div>
      <span className="kh-swatch-hex">{colour}</span>
      <span className={`kh-swatch-ratio is-${result}`}>
        {ratio.toFixed(2)}:1 · {levelText[result]}
      </span>
    </div>
  );
}

export default function KH({ facts }: { facts: ReactNode }) {
  return (
    <div className="kh">
      <h1 className="display">K&amp;H</h1>
      <p className="project-subtitle">Financial services company</p>

      {facts}

      <section className="case-section">
        <h2>About the project</h2>
        <div>
          <p>
            I came to K&amp;H to see the corporate side: a big design team, where I wouldn’t have to solve
            everything alone. That only partly came true. I still ran several projects at once, and many of them
            were complex enough on their own.
          </p>
          <p>
            My main work was the website: building its design system, and with it, a way of working with the
            developers.
          </p>
          <div className="kh-numbers">
            {numbers.map(([value, text]) => (
              <div key={text}>
                <strong>{value}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section">
        <h2>Before the first component</h2>
        <div>
          <p>
            The developers had documentation for the CMS. Designers had none. It took me months of research and
            meetings just to understand how the site works, and to build a working relationship with the
            developers along the way.
          </p>
          <p>
            Until then, designers at K&amp;H worked on their own, mostly for the app. That worked there, but the
            website needed a completely different structure.
          </p>
          <figure className="kh-figure">
            <figcaption>One calculator section at all six breakpoints</figcaption>
            <div className="kh-breakpoints">
              {breakpoints.map(({ width, size }) => (
                <div key={width} style={{ flexGrow: size[0] }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE}/kh/bp-${width}.webp`}
                    width={size[0]}
                    height={size[1]}
                    alt={`Credit card calculator at ${width} pixels wide`}
                    loading="lazy"
                  />
                  <span>{width}</span>
                </div>
              ))}
            </div>
          </figure>
        </div>
      </section>

      <section className="case-section">
        <h2>A system from a single page</h2>
        <div>
          <p>
            There was no time to build the system from the ground up. It had to be worked out from one subpage,
            and we knew it wouldn’t hold. At the start you can’t know what a component will have to carry, or in
            how many combinations.
          </p>
          <p>
            The developers and I saw the trouble coming, and we argued with the business about it many times. In
            the end both sides paid for it, design and development alike. We corrected what we could.
          </p>
          <figure className="kh-figure">
            <figcaption>One card component, and the layouts it had to cover from desktop to mobile</figcaption>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="kh-board"
              src={`${BASE}/kh/card-layouts.webp`}
              width={2400}
              height={700}
              alt="A card component with three cards laid out at six breakpoints"
              loading="lazy"
            />
          </figure>
          <p>
            A system like this needs documentation, annotations and constant syncing, because the needs change
            from month to month.
          </p>
        </div>
      </section>

      <section className="case-section">
        <h2>One token, every platform</h2>
        <div>
          <p>
            My biggest pain was that the app and web systems were never fully separated. The design system was
            tokenised at the primitive level, and that couldn’t be changed. So any change ran through every
            platform, even the ones the web developers had no way to adjust.
          </p>
          <p>Keeping the two apart would have been much safer in the long run.</p>
          <div className="kh-flow" aria-label="One primitive colour token feeds every platform at once">
            <div className="kh-flow-token">
              <span style={{ background: "#0097DB" }} />
              cyan
            </div>
            <ul>
              {platforms.map((platform, index) => (
                <li key={platform} style={{ "--i": index } as CSSProperties}>
                  {platform}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="case-section">
        <h2>Accessibility</h2>
        <div>
          <p>
            I also helped with accessibility. That meant re-checking the whole colour palette, 68 tokens in 12
            groups, and agreeing every change with a long list of people.
          </p>
          <div className="kh-colours">
            {colours.map(({ token, before, after }) => (
              <div key={token} className="kh-colour-row">
                <span className="kh-token">{token}</span>
                <Swatch colour={before[0]} ratio={before[1]} label="Before" />
                <Swatch colour={after[0]} ratio={after[1]} label="After" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section">
        <h2>Takeaways</h2>
        <div>
          <ul className="case-learnings">
            {learnings.map(([lead, text]) => (
              <li key={lead}>
                <strong>{lead}</strong> {text}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
