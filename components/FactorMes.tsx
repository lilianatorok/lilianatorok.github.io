import type { ReactNode } from "react";
import FactorElements from "@/components/FactorElements";
import FactorHall from "@/components/FactorHall";
import FactorScreen, { screen } from "@/components/FactorScreen";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const monitoring = {
  before: screen("monitoring-before", 1600, 900, "Monitoring page before: one big production index ring"),
  after: screen(
    "monitoring-after",
    1600,
    900,
    "Monitoring page after: two chart widgets on top and more information about the efficiency",
  ),
};

const devices = {
  desktop: screen("kanban-desktop", 1600, 900, "Kanban on desktop"),
  mobile: [
    screen("kanban-mobile", 750, 1334, "Kanban on mobile, with the shift picker open"),
    screen("kanban-mobile-processing", 750, 1334, "Kanban on mobile: a processing card with its three buttons"),
  ],
  portrait: screen("kanban-tablet-portrait", 1536, 2048, "Kanban on a portrait tablet, with the desktop cards"),
  landscape: screen("kanban-tablet-landscape", 1600, 1200, "Kanban on a landscape tablet, with the mobile cards"),
  card: screen("kanban-card", 548, 308, "A kanban card with 70 pixel high buttons"),
};

const mobileHeader = {
  before: screen("mobile-before", 750, 1334, "Mobile kanban detail with the logo, hamburger menu and old view changer"),
  // The new header, with the view changer switched on and off in turn.
  after: [
    screen("mobile-after", 750, 1334, "Mobile kanban detail with a back button, the page name and a simpler view changer"),
    screen("mobile-after-off", 750, 1334, "The same page with the view changer switched off"),
  ],
};

const tasks = ["New screens", "Fixes from tests", "Smoother processes", "Light mode", "Tablet views"];

// What I inherited, what I did about it, and what it taught me.
const problems = [
  [
    "Plan the breakpoints first.",
    "The screens I took over were designed for four widths only: 375, 768, 1024 and 1920. Filling in the gaps later taught me to set the breakpoints before the first screen.",
  ],
  [
    "A system is only as good as its smallest parts.",
    "Auto-layout was used the wrong way and components were missing states, and every screen was built from them. Fixing them from the bottom up fixed the screens too.",
  ],
  [
    "Data needs density.",
    "Huge padding made data-heavy cards too big, and the header and sidebar took space from them. I tightened them, so the data got the room.",
  ],
  [
    "Readability starts with the font.",
    "Small text was hard to read, so I chose a rounder, more readable font, and raised the contrast with darker backgrounds and brighter text.",
  ],
];

export default function FactorMes({ facts }: { facts: ReactNode }) {
  return (
    <div className="factor">
      <h1 className="display">Factor-MES</h1>
      <p className="project-subtitle">Industrial Manager</p>

      {facts}

      <section className="case-section">
        <h2>About the project</h2>
        <div>
          <p>
            Factor-MES coordinates industrial machines and manages their efficiency. It measures and optimises the
            performance of large-scale machines such as lathes and drilling machines, hall by hall across the plant. I
            took the project over with an atomic system and the screens built on it, and kept designing new screens as
            the needs grew.
          </p>
          <FactorHall />
        </div>
      </section>

      <section className="case-section">
        <h2>My role</h2>
        <div>
          <p>
            I designed from the project manager’s brief, adding ideas for a better experience within what the atomic
            system allowed, and we reviewed each round together.
          </p>
          <h3 className="case-list-title">My design tasks</h3>
          <ul className="case-big-list">
            {tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="case-section">
        <h2>Data at a glance</h2>
        <div>
          <p>
            Every screen is full of numbers about how the machines are doing, and they have to be read in a moment. So
            the data speaks through graphs, bar charts and progress bars.
          </p>
          {/* The whole screen first, so the elements below read as its parts. */}
          <figure className="factor-dashboard">
            <figcaption>The project list as a Gantt chart: every job, its status and its progress on one timeline</figcaption>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/factor-mes/gantt.webp`}
              width={1600}
              height={901}
              alt="A dark Gantt chart: a list of projects and tasks with their number, status and percent done on the left, and coloured bars on a day-by-day timeline on the right"
              loading="lazy"
            />
          </figure>
          <FactorElements />

          <article className="case-item">
            <span>Monitoring</span>
            <h3>Charts that fit</h3>
            <p>
              Bar charts and progress bars were used at the wrong sizes, so I corrected and re-placed them, and suggested
              to the client what else the pages could show.
            </p>
            {/* Before above after; numbered pins on the after screen mark what came in. */}
            <figure className="factor-compare">
              <figcaption>Before</figcaption>
              <FactorScreen image={monitoring.before} />
            </figure>
            <figure className="factor-compare">
              <figcaption>After</figcaption>
              <div className="factor-annotated">
                <FactorScreen image={monitoring.after} />
                <span className="factor-pin factor-pin-widgets">1</span>
                <span className="factor-pin factor-pin-efficiency">2</span>
              </div>
              <ol className="factor-notes">
                <li>
                  <span>1</span>+ widgets
                </li>
                <li>
                  <span>2</span>+ more information about the efficiency
                </li>
              </ol>
            </figure>
          </article>
        </div>
      </section>

      <section className="case-section">
        <h2>The man in gloves</h2>
        <div>
          <p>
            The same screens are used at a desk and on the factory floor, where the so-called{" "}
            <strong>“man in gloves”</strong> works on a tablet with gloves on. Everything had to work for both of them,
            and the tablet views became the biggest challenge.
          </p>
          <div className="factor-devices">
            <figure>
              <figcaption>Desktop</figcaption>
              <FactorScreen image={devices.desktop} />
            </figure>
            <div className="factor-devices-row">
              <figure>
                <figcaption>Mobile</figcaption>
                <div className="factor-phones">
                  {devices.mobile.map((image) => (
                    <FactorScreen key={image.name} image={image} />
                  ))}
                </div>
              </figure>
              <figure>
                <figcaption>Tablet, portrait</figcaption>
                <FactorScreen image={devices.portrait} />
              </figure>
            </div>
            <figure>
              <figcaption>Tablet, landscape</figcaption>
              <FactorScreen image={devices.landscape} />
            </figure>
          </div>
          <p className="factor-tablet-text">
            For the tablet I <strong>combined desktop and mobile elements</strong>, whichever was simpler to use. The
            kanban cards, for example, got the desktop layout in portrait and the mobile one in landscape. After several
            rounds of consultations and prototypes, the buttons got a size that worked with gloves on.
          </p>
          <div className="factor-result">
            <div>
              <strong>70 px</strong>
              <p>The minimum button height on the kanban cards, according to the tests.</p>
            </div>
            <FactorScreen image={devices.card} className="factor-card" />
          </div>
        </div>
      </section>

      <section className="case-section">
        <h2>What else I worked on</h2>
        <div>
          <article className="case-item">
            <span>Mobile</span>
            <h3>A lighter header</h3>
            <p>
              I redesigned the mobile header and view changer to be airier and easier to use. The view changer (the
              second row) can be switched off to save space.
            </p>
            <div className="factor-header-compare">
              <figure>
                <figcaption>Before</figcaption>
                <FactorScreen image={mobileHeader.before} />
              </figure>
              <figure>
                <figcaption>
                  After, view changer{" "}
                  <span className="factor-switch-word">
                    <span>on</span>
                    <span>off</span>
                  </span>
                </figcaption>
                {/* The view changer slides in under the header and pushes the card down, then back up:
                    the page without it below, the page with it sliding over, the header fixed on top. */}
                <div className="factor-slide">
                  <FactorScreen image={mobileHeader.after[1]} />
                  <div className="factor-slide-move">
                    <FactorScreen image={mobileHeader.after[0]} />
                  </div>
                  <div className="factor-slide-head" aria-hidden="true">
                    <FactorScreen image={mobileHeader.after[1]} />
                  </div>
                </div>
              </figure>
            </div>
          </article>

          <article className="case-item">
            <span>All screens</span>
            <h3>Light mode, same contrast</h3>
            <p>
              I made a light mode for every existing page, and added its colour styles to the atomic system with a
              contrast that matches the dark mode.
            </p>
            {/* The two themes fade into each other, softly, the way the site itself changes theme. */}
            <div className="factor-shot factor-lightmode" role="img" aria-label="Light mode of the monitoring, kanban and planning pages">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/factor-mes/lightmode-dark.webp`} width={1650} height={1080} alt="" loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/factor-mes/lightmode-light.webp`} width={1650} height={1080} alt="" loading="lazy" />
            </div>
          </article>
        </div>
      </section>

      <section className="case-section">
        <h2>Takeaways</h2>
        <div>
          <p>
            I took the project over from another designer, and some of the earlier design errors only came to light
            later. Fixing them taught me the most.
          </p>
          <h3 className="case-list-title">What I fixed, and learned</h3>
          <ul className="case-learnings">
            {problems.map(([lead, text]) => (
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
