"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import TileCover from "@/components/TileCover";
import { projects } from "@/lib/projects";
import { coverImage, coverSrc, revealInTiles } from "@/lib/tileReveal";

const FOLLOW_MS = 180;

// The alternative home list: the names stand in one left-aligned column, once, with no looping.
// The hovered project's picture builds up from tiles and follows the cursor, as on the home page,
// with its type, year and subtitle under it.
export default function ProjectListAlt() {
  const previewRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const project = projects.find((item) => item.slug === active);

  useEffect(() => {
    projects.forEach((item) => coverImage(coverSrc(item.cover)));
  }, []);

  // Restarts the reveal for each hovered project; leaving a project clears the picture at once.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    if (!project) return;
    const image = coverImage(coverSrc(project.cover));
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
  }, [project]);

  // The preview eases towards the cursor instead of sticking to it.
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || !window.matchMedia("(hover: hover)").matches) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...target };
    const current = { ...target };
    let frame = 0;
    let last = performance.now();

    const canvas = preview.querySelector("canvas")!;
    const MARGIN = 16;
    const INFO = 80; // room kept for the type, year and subtitle under the picture

    // The picture is centred on the cursor, but never lower than lets it and its details fit on screen,
    // so the last rows show it whole instead of cut off at the bottom.
    const onMove = (event: PointerEvent) => {
      const half = canvas.offsetHeight / 2;
      target.x = event.clientX;
      target.y = Math.max(half + MARGIN, Math.min(event.clientY, window.innerHeight - MARGIN - INFO - half));
    };
    // Two chained followers give an ease-in-out: the picture starts gently, then settles gently.
    const tick = (now: number) => {
      const step = 1 - Math.exp(-Math.min(now - last, 50) / FOLLOW_MS);
      last = now;
      eased.x += (target.x - eased.x) * step;
      eased.y += (target.y - eased.y) * step;
      current.x += (eased.x - current.x) * step;
      current.y += (eased.y - current.y) * step;
      preview.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
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
      <div className={`works${active ? " has-active" : ""}`}>
        <ul className="works-list">
          {projects.map((item) => (
            <li key={item.slug} className={item.minor ? "is-minor" : undefined}>
              <Link
                href={`/work/${item.slug}`}
                className={`works-row${active === item.slug ? " is-active" : ""}`}
                onPointerEnter={() => setActive(item.slug)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(item.slug)}
                onBlur={() => setActive(null)}
              >
                <TileCover cover={item.cover} />
                <span className="works-name">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="works-preview" ref={previewRef} aria-hidden="true">
        <div className="works-preview-inner">
          <canvas ref={canvasRef} />
          {project && (
            <div key={project.slug} className="works-info">
              <span className="works-type">{project.type}</span>
              <span className="works-year">{project.year}</span>
              <p className="works-subtitle">{project.subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
