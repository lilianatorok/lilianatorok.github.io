"use client";

import { useEffect, useRef } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// The calculator's layouts, one per breakpoint: from this width up, this layout is used.
const layouts = [
  { from: 1440, size: [864, 1235] },
  { from: 1200, size: [720, 1234] },
  { from: 1024, size: [614, 1232] },
  { from: 768, size: [461, 1055] },
  { from: 576, size: [346, 1187] },
  { from: 375, size: [225, 1205] },
];
const MAX = 1440;
const MIN = 375;
// One sweep from desktop to mobile and back, with a short rest at each end.
const SWEEP_MS = 4200;
const REST_MS = 900;

const layoutIndex = (width: number) => {
  const index = layouts.findIndex((layout) => width >= layout.from);
  return index === -1 ? layouts.length - 1 : index;
};
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// A browser window that narrows from 1440 to 375 pixels and widens again, on its own or by dragging its
// edge. The calculator inside switches layout at each breakpoint, and the ruler shows which one is on.
// The animation writes to the page directly each frame instead of re-rendering, and every layout stays
// decoded and in place, only shown or hidden, so crossing a breakpoint never has to load anything.
export default function KHBreakpoints() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>(".kh-bp-stage")!;
    const win = root.querySelector<HTMLElement>(".kh-bp-window")!;
    const label = root.querySelector<HTMLElement>(".kh-bp-bar span")!;
    const handle = root.querySelector<HTMLElement>(".kh-bp-handle")!;
    const images = [...root.querySelectorAll<HTMLImageElement>(".kh-bp-screen img")];
    const ticks = [...root.querySelectorAll<HTMLElement>(".kh-bp-ruler span")];
    images.forEach((image) => image.decode?.().catch(() => {}));

    let shownWidth = -1;
    let shownLayout = -1;
    const show = (width: number) => {
      if (width === shownWidth) return;
      shownWidth = width;
      win.style.width = `${(width / MAX) * 100}%`;
      label.textContent = `${width} px`;
      const index = layoutIndex(width);
      if (index === shownLayout) return;
      shownLayout = index;
      images.forEach((image, i) => {
        image.classList.toggle("is-on", i === index);
        image.alt = i === index ? `The credit card calculator in its ${layouts[i].from} pixel layout` : "";
      });
      ticks.forEach((tick, i) => tick.classList.toggle("is-on", i === index));
    };
    show(MAX);

    let frame = 0;
    let start = 0;
    let dragging = false;
    const cycle = 2 * (SWEEP_MS + REST_MS);
    const tick = (now: number) => {
      if (!start) start = now;
      if (!dragging) {
        const t = (now - start) % cycle;
        let p = 0;
        if (t < SWEEP_MS) p = ease(t / SWEEP_MS);
        else if (t < SWEEP_MS + REST_MS) p = 1;
        else if (t < 2 * SWEEP_MS + REST_MS) p = 1 - ease((t - SWEEP_MS - REST_MS) / SWEEP_MS);
        show(Math.round(MAX - (MAX - MIN) * p));
      }
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) {
        start = 0;
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(root);

    // Dragging the edge sets the width by hand; letting go picks the animation up from the start.
    const onDown = (event: PointerEvent) => {
      dragging = true;
      try {
        handle.setPointerCapture(event.pointerId);
      } catch {}
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const box = stage.getBoundingClientRect();
      show(Math.round(Math.min(Math.max(((event.clientX - box.left) / box.width) * MAX, MIN), MAX)));
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      start = 0;
    };
    handle.addEventListener("pointerdown", onDown);
    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
    handle.addEventListener("pointercancel", onUp);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      handle.removeEventListener("pointerdown", onDown);
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      handle.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div ref={ref} className="kh-bp">
      <div className="kh-bp-ruler" aria-hidden="true">
        {layouts.map(({ from }, index) => (
          <span key={from} className={index === 0 ? "is-on" : undefined} style={{ left: `${(from / MAX) * 100}%` }}>
            {from}
          </span>
        ))}
      </div>
      <div className="kh-bp-stage">
        <div className="kh-bp-window" style={{ width: "100%" }}>
          <div className="kh-bp-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{MAX} px</span>
          </div>
          <div className="kh-bp-screen">
            {layouts.map(({ from, size }, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={from}
                className={index === 0 ? "is-on" : undefined}
                src={`${BASE}/kh/bp-${from}.webp`}
                width={size[0]}
                height={size[1]}
                alt={index === 0 ? `The credit card calculator in its ${from} pixel layout` : ""}
                decoding="sync"
              />
            ))}
          </div>
          <button type="button" className="kh-bp-handle" aria-label="Drag to resize the window" />
        </div>
      </div>
    </div>
  );
}
