import type { ReactNode } from "react";
import { VOISHandover, VOISScale, VOISTimezones } from "@/components/VOISAnimations";

// What the acquisition changes for Three, and what it has to keep.
const becomes = ["The design system", "Platforms and systems", "Processes and tools", "Ways of working"];
const stays = ["Its look, as a reskin", "Its voice", "What its customers know it for"];

const learnings = [
  [
    "Shared knowledge is the biggest knowledge.",
    "Here, information comes and goes, often without being written down or shared, and people work on features without knowing about each other. Across these distances, documentation is one of the greatest treasures: open to everyone, and clear to everyone.",
  ],
  [
    "Every culture talks differently.",
    "People from other countries communicate in other ways. Building relationships matters just as much as anywhere, but with this many people and this much distance, it’s a lot harder.",
  ],
  [
    "Know where your role ends.",
    "Unlike at a small agency, I can’t take part in every step. Who owns what is strictly set. We don’t write specifications at all, a separate team does. Still, they’re worth reading: that’s how you get to know the system you design for.",
  ],
];

export default function VOIS({ facts }: { facts: ReactNode }) {
  return (
    <div className="vois">
      <h1 className="display">VOIS</h1>
      <p className="project-subtitle">Telecommunications company</p>

      {facts}

      <section className="case-section">
        <h2>About the project</h2>
        <div>
          <p>
            I came to VOIS to work in an international team, and to see what it’s like to be part of an even bigger
            organisation.
          </p>
          <p>
            Vodafone acquired Three, and Three is the brand I work on. It has to become part of Vodafone while
            keeping what makes it Three. Even the design system changes: Three moves onto Vodafone’s, reskinned
            with its own brand. That’s the main project: helping the brand through the change, step by step.
            Meanwhile, we keep everything else running with a long list of everyday projects.
          </p>
          <p>
            I can’t show the work from here yet. What I can show is how it goes, and what I’ve learned along the
            way.
          </p>
          <div className="vois-split">
            <div>
              <h3 className="case-list-title">Becomes Vodafone</h3>
              <ul className="case-big-list">
                {becomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="case-list-title">Stays Three</h3>
              <ul className="case-big-list">
                {stays.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section">
        <h2>Handover, week two</h2>
        <div>
          <p>
            In my second week I flew to the UK for a handover with the Vodafone side. I came with a long list of
            questions. They hadn’t prepared much either, so every answer took a few more questions to get out, and
            some answers only turned into new questions.
          </p>
          <p>
            Still, I came home with what the team needed most: a stakeholder map, how the squads run, and the
            workflows behind them.
          </p>
          <figure className="kh-figure">
            <figcaption>The handover, in questions</figcaption>
            <VOISHandover />
          </figure>
        </div>
      </section>

      <section className="case-section">
        <h2>The squad</h2>
        <div>
          <p>
            Back home I joined a squad with colleagues from the UK, India and Egypt. Here a lot of people have to
            line up with a lot of things at once, so agreeing on anything takes longer. Sometimes an answer takes a
            day, or more.
          </p>
          <p>It’s also the first place where I’m this far from the developers, and that is very new for me.</p>
          <p>
            The pace is what you’d expect from a big corporation. Projects move slowly, through a lot of
            stakeholders.
          </p>
          <figure className="kh-figure">
            <figcaption>Four time zones, and the wait in between</figcaption>
            <VOISTimezones />
          </figure>
        </div>
      </section>

      <section className="case-section">
        <h2>A new generation</h2>
        <div>
          <p>
            Besides the squad work, I’m on a project that isn’t tied to any one squad. The brand wants to reach a
            new generation, so its features have to change with it, across the whole website and app, from the
            sales pages to any journey that follows.
          </p>
          <p>
            It’s brainstorming with the stakeholders. I bring ideas from outside the box, and together we narrow
            them down until they’re feasible and fit into how we build. Some are small, some are long term.
          </p>
          <figure className="kh-figure">
            <figcaption>From one word to a whole system</figcaption>
            <VOISScale />
          </figure>
        </div>
      </section>

      <section className="case-section">
        <h2>Takeaways so far</h2>
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
