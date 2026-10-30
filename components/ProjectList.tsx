"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";

const COPIES = [0, 1, 2];

export default function ProjectList() {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const activeProject = projects.find((project) => project.slug === active);

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
    const current = { ...target };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      // Sits right of the cursor so the hovered name stays readable, and never leaves the screen.
      const x = Math.min(current.x + 32, window.innerWidth - preview.offsetWidth - 16);
      const y = Math.max(
        16,
        Math.min(current.y - preview.offsetHeight / 2, window.innerHeight - preview.offsetHeight - 16),
      );
      preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
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
            {projects.map((project, index) => (
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
                  <span className="loop-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="loop-name">{project.name}</span>
                  <span className="loop-subtitle">{project.subtitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="preview" ref={previewRef} aria-hidden="true">
        {projects.map((project) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={project.slug}
            src={`${project.cover}?scale-down-to=1024`}
            alt=""
            className={active === project.slug ? "is-active" : undefined}
          />
        ))}
        {activeProject && <span className="preview-caption">{activeProject.subtitle}</span>}
      </div>
    </>
  );
}
