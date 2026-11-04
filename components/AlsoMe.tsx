"use client";

import { useEffect, useRef } from "react";
import { alsoMe } from "@/lib/projects";

// How far each column rolls per pixel scrolled. Positive rolls up, negative rolls down.
const COLUMN_SPEEDS = [0.9, -0.65, 0.75, -1];
// Each column repeats its pictures, so it can loop without ever showing a gap.
const COPIES = 3;
// How slowly the columns catch up with the scroll. Higher feels heavier.
const GLIDE_MS = 260;

const columns = COLUMN_SPEEDS.map((_, column) =>
  alsoMe.filter((_, index) => index % COLUMN_SPEEDS.length === column),
);

export default function AlsoMe() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scroller = section?.closest(".scroller");
    if (!section || !scroller) return;

    const rollingColumns = section.querySelectorAll<HTMLElement>(".also-me-column");
    const scrolled = () => -section.getBoundingClientRect().top;
    let rolled = scrolled();
    let frame = 0;
    let lastTime = 0;

    const place = () => {
      rollingColumns.forEach((column, index) => {
        const speed = COLUMN_SPEEDS[index];
        const loop = column.offsetHeight / COPIES;
        const travel = (((rolled * Math.abs(speed)) % loop) + loop) % loop;
        column.style.transform = `translateY(${speed > 0 ? -travel : travel - loop}px)`;
      });
    };

    // Trails behind the scroll and eases to a stop, so the columns keep gliding after the wheel stops.
    const glide = (now: number) => {
      const target = scrolled();
      rolled += (target - rolled) * (1 - Math.exp(-Math.max(now - lastTime, 0) / GLIDE_MS));
      lastTime = now;
      if (Math.abs(target - rolled) < 0.1) {
        rolled = target;
        frame = 0;
      } else {
        frame = requestAnimationFrame(glide);
      }
      place();
    };

    const startGliding = () => {
      if (frame) return;
      lastTime = performance.now();
      frame = requestAnimationFrame(glide);
    };

    place();
    scroller.addEventListener("scroll", startGliding, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", startGliding);
      window.removeEventListener("resize", place);
    };
  }, []);

  return (
    <section className="also-me" ref={sectionRef}>
      <div className="also-me-stage">
        <h2 className="display">
          This is <em>also</em> me
        </h2>
        <div className="also-me-columns">
          {columns.map((pictures, column) => (
            <div key={column} className="also-me-column">
              {Array.from({ length: COPIES }, () => pictures)
                .flat()
                .map((src, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={index} src={`${src}?scale-down-to=512`} alt="" />
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
