"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RevealText from "@/components/RevealText";
import { projects } from "@/lib/projects";
import { coverImage, coverSrc, revealInTiles } from "@/lib/tileReveal";

const COPIES = [0, 1, 2];
const FOLLOW_MS = 180;

export default function ProjectList() {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const activeCover = projects.find((project) => project.slug === active)?.cover;

  // Loads every cover up front, so the first hover has something to show straight away.
  useEffect(() => {
    projects.forEach((project) => coverImage(coverSrc(project.cover)));
  }, []);

  // Restarts the reveal for each hovered project; leaving a project clears the picture at once.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    if (!activeCover) return;

    const image = coverImage(coverSrc(activeCover));
    let stop = () => {};
    const start = () => {
      stop = revealInTiles(canvas, image);
    };
    if (image.complete && image.naturalWidth) start();
    else image.addEventListener("load", start, { once: true });
    return () => {
      image.removeEventListener("load", start);
      stop();
    };
  }, [activeCover]);

  // Three copies of the list: scrolling past either end jumps by one copy, so it never ends.
  useEffect(() => {
    const list = listRef.current;
    const scroller = list?.closest(".scroller");
    if (!list || !scroller) return;
    const copyHeight = () => (list.firstElementChild as HTMLElement).offsetHeight;

    scroller.scrollTop = copyHeight();

    const onScroll = () => {
      const height = copyHeight();
      if (scroller.scrollTop < height * 0.5) scroller.scrollTop += height;
      else if (scroller.scrollTop >= height * 1.5) scroller.scrollTop -= height;
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  // The preview eases towards the cursor instead of sticking to it.
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || !window.matchMedia("(hover: hover)").matches) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...target };
    const current = { ...target };
    let frame = 0;
    let last = performance.now();

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };
    // Two chained followers give an ease-in-out: the picture starts gently, then settles gently.
    const tick = (now: number) => {
      const step = 1 - Math.exp(-Math.min(now - last, 50) / FOLLOW_MS);
      last = now;
      eased.x += (target.x - eased.x) * step;
      eased.y += (target.y - eased.y) * step;
      current.x += (eased.x - current.x) * step;
      current.y += (eased.y - current.y) * step;
      preview.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className={`loop${active ? " has-active" : ""}`} ref={listRef}>
        {COPIES.map((copy) => (
          <ul key={copy} className="loop-copy" aria-hidden={copy !== 1 || undefined}>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className={`loop-row${active === project.slug ? " is-active" : ""}`}
                  tabIndex={copy === 1 ? undefined : -1}
                  onPointerEnter={() => setActive(project.slug)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(project.slug)}
                  onBlur={() => setActive(null)}
                >
                  <RevealText className="loop-type" text={project.type} />
                  <span className="loop-name">{project.name}</span>
                  <RevealText className="loop-year" text={project.year} />
                  <span className="loop-subtitle">{project.subtitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="preview" ref={previewRef} aria-hidden="true">
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}
