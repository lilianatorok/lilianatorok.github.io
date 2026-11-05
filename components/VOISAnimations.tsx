"use client";

import { type CSSProperties, type RefObject, useEffect, useRef, useState } from "react";

// Steps through a short sequence while the element is on screen, holding each step for its own time,
// and starts over at the end. Off screen it rests at the start. Like the site's other showpiece
// animations, these play even with reduced motion on (see the reduced-motion rule in globals.css).
function useSteps(ref: RefObject<HTMLElement | null>, holds: number[]) {
  const [step, setStep] = useState(0);
  const key = holds.join(",");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const times = key.split(",").map(Number);
    let timer = 0;
    const run = (at: number) => {
      setStep(at);
      timer = window.setTimeout(() => run((at + 1) % times.length), times[at]);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(timer);
        if (entry.isIntersecting) run(0);
        else setStep(0);
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [ref, key]);

  return step;
}

/* The handover: a storm of questions popping up faster than anyone could read them. Now and then one
   sticks, and at the end what stuck turns into what I brought home. */

const storm = [
  "Which squads are there?",
  "What does each squad own?",
  "How is work shared?",
  "Who decides?",
  "Where is it tracked?",
  "How is the design system used?",
  "Who maintains it?",
  "Is there a web version?",
  "How do we reach the developers?",
  "Who writes the specs?",
  "Where do the tickets live?",
  "Which platforms?",
  "iOS and Android too?",
  "Who signs off on design?",
  "Who signs off on business?",
  "Which tools do you use?",
  "Figma or something else?",
  "Which ceremonies are there?",
  "How long is a sprint?",
  "What runs the backend?",
  "Who knows it best?",
  "Is any of it documented?",
  "Which analytics can we see?",
  "Where are the dashboards?",
  "Who owns the content?",
  "How are releases planned?",
  "Who do we ask?",
  "Is this still live?",
  "Why does it work like this?",
  "Who built this?",
  "Is there a roadmap?",
  "What’s the priority?",
  "Who are the POs?",
  "What about legal?",
  "Where’s the brand guide?",
  "How is copy approved?",
  "Who tests it?",
  "What’s already in progress?",
];
// The questions that stick: when (a share of the storm) and where (a share of the room left across,
// and of the height down).
const pins = [
  { text: "Who decides what?", at: 0.22, x: 0.05, y: 0.14 },
  { text: "How do the squads run?", at: 0.48, x: 0.9, y: 0.44 },
  { text: "How do the workflows run?", at: 0.72, x: 0.25, y: 0.74 },
];
const broughtHome = ["Stakeholder map", "How the squads run", "Workflows"];
const STORM_MS = 8500;
const RESULT_MS = 4800;
const SPAWN_MS = 85;
const sizes = [13, 14, 15, 17, 19, 23];
const tones = ["is-fg", "is-fg", "is-muted", "is-muted", "is-ghost"];
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

export function VOISHandover() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>(".vh-stage")!;
    const layer = root.querySelector<HTMLElement>(".vh-storm")!;
    const pinned = [...root.querySelectorAll<HTMLElement>(".vh-pin")];

    // Places each pinned question inside the stage, whatever its width.
    const placePins = () => {
      pinned.forEach((pin, index) => {
        const room = stage.clientWidth - pin.offsetWidth;
        pin.style.left = `${Math.max(0, room * pins[index].x)}px`;
        pin.style.top = `${pins[index].y * 100}%`;
      });
    };

    let timers: number[] = [];
    let spawner = 0;
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const spawn = () => {
      const bubble = document.createElement("span");
      bubble.className = `vh-bubble ${pick(tones)}`;
      bubble.textContent = pick(storm);
      bubble.style.fontSize = `${pick(sizes)}px`;
      layer.appendChild(bubble);
      const x = Math.random() * Math.max(0, stage.clientWidth - bubble.offsetWidth);
      const y = Math.random() * Math.max(0, stage.clientHeight - bubble.offsetHeight);
      bubble.style.transform = `translate(${x}px, ${y}px)`;
      const at = `translate(${x}px, ${y}px)`;
      bubble
        .animate(
          [
            { opacity: 0, transform: `${at} translateY(18px) scale(0.6)`, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
            { opacity: 1, transform: `${at} translateY(-4px) scale(1.08)`, offset: 0.14 },
            { opacity: 1, transform: `${at} scale(1)`, offset: 0.24 },
            { opacity: 1, transform: `${at} translateY(-6px)`, offset: 0.72, easing: "ease-in" },
            { opacity: 0, transform: `${at} translateY(-20px) scale(0.96)` },
          ],
          { duration: 1200 + Math.random() * 1000 },
        )
        .finished.then(() => bubble.remove())
        .catch(() => bubble.remove());
    };

    const reset = () => {
      timers.forEach(clearTimeout);
      timers = [];
      clearInterval(spawner);
      layer.replaceChildren();
      root.classList.remove("is-done");
      pinned.forEach((pin) => pin.classList.remove("is-on"));
    };

    const run = () => {
      reset();
      placePins();
      spawner = window.setInterval(spawn, SPAWN_MS);
      pins.forEach(({ at }, index) => later(() => pinned[index].classList.add("is-on"), at * STORM_MS));
      later(() => {
        clearInterval(spawner);
        root.classList.add("is-done");
      }, STORM_MS);
      later(run, STORM_MS + RESULT_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
        else reset();
      },
      { threshold: 0.3 },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      reset();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="vh"
      aria-label="Hundreds of handover questions, of which a few stuck. Brought home: a stakeholder map, how the squads run, and the workflows"
    >
      <div className="vh-stage" aria-hidden="true">
        <div className="vh-storm" />
        {pins.map(({ text }) => (
          <span key={text} className="vh-pin">
            <span className="vh-mark">✓</span>
            {text}
          </span>
        ))}
        <div className="vh-home">
          <span className="vh-label">Brought home</span>
          <ul>
            {broughtHome.map((item, index) => (
              <li key={item} style={{ "--i": index } as CSSProperties}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* The squad: a working day (9 to 5, local) in four cities on one axis, and the wait for an answer. */

const cities: { city: string; offset: string; from: number }[] = [
  { city: "London", offset: "", from: 9 },
  { city: "Budapest", offset: "+1 h", from: 8 },
  { city: "Cairo", offset: "+2 h", from: 7 },
  { city: "Bengaluru", offset: "+5.5 h", from: 3.5 },
];
const DAY = [3, 19]; // the part of the UK day the axis shows
const at = (hour: number) => `${((hour - DAY[0]) / (DAY[1] - DAY[0])) * 100}%`;

export function VOISTimezones() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useSteps(ref, [300, 1400, 2800, 4500]);

  return (
    <div
      ref={ref}
      className={`vt${step >= 1 ? " is-drawn" : ""}${step >= 2 ? " is-waiting" : ""}${step >= 3 ? " is-answered" : ""}`}
      aria-label="Working days in London, Budapest, Cairo and Bengaluru, a few hours apart; a question asked on Monday gets its answer on Wednesday"
    >
      <div className="vt-rows" aria-hidden="true">
        {cities.map(({ city, offset, from }, index) => (
          <div key={city} className="vt-row">
            <span className="vt-city">
              {city}
              {offset && <em>{offset}</em>}
            </span>
            <span className="vt-track">
              <span
                className="vt-bar"
                style={{ left: at(from), width: `calc(${at(from + 8)} - ${at(from)})`, "--i": index } as CSSProperties}
              />
            </span>
          </div>
        ))}
      </div>
      <div className="vt-axis" aria-hidden="true">
        {[6, 9, 12, 15, 18].map((hour) => (
          <span key={hour} style={{ left: at(hour) }}>
            {hour}:00
          </span>
        ))}
      </div>
      <div className="vt-wait" aria-hidden="true">
        <span className="vt-msg is-question">Question, Monday</span>
        <span className="vt-gap">
          <i />
          <i />
          <i />
        </span>
        <span className="vt-msg is-answer">Answer, Wednesday</span>
      </div>
    </div>
  );
}

/* A new generation: the line builds from a single word to a whole system, one idea at a time. */

const ideas = [
  ["A copy change in a new tone", "Small"],
  ["A small animation", ""],
  ["A journey, reworked", ""],
  ["A rewards or loyalty system", "Long term"],
];

export function VOISScale() {
  const ref = useRef<HTMLDivElement>(null);
  const step = useSteps(ref, [400, 1000, 1000, 1000, 5000]);
  const reached = Math.max(0, step - 1);

  return (
    <div
      ref={ref}
      className="vs"
      style={{ "--p": reached / (ideas.length - 1) } as CSSProperties}
      aria-label="Ideas from small to long term: a copy change in a new tone, a small animation, a reworked journey, a rewards or loyalty system"
    >
      <ol className="vs-stops" aria-hidden="true">
        {ideas.map(([idea, end], index) => (
          <li key={idea} className={step >= index + 1 ? "is-on" : undefined} style={{ "--i": index } as CSSProperties}>
            <span className="vs-dot" />
            <span className={`vs-end${end ? "" : " is-empty"}`}>{end || " "}</span>
            <span className="vs-idea">{idea}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
