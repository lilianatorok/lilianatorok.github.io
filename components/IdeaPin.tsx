"use client";

import { useEffect, useRef, useState } from "react";
import RevealText from "@/components/RevealText";
import { brands } from "@/lib/projects";
import { coverImage, coverSrc, REVEAL_TOTAL_MS, revealInTiles } from "@/lib/tileReveal";

// How long each brand stays once its picture has built up, before the next one comes.
const HOLD_MS = 2600;

export default function IdeaPin() {
  const pinRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const brand = brands[activeIndex];
  const activeCover = brand?.cover;

  useEffect(() => {
    brands.forEach((item) => coverImage(coverSrc(item.cover)));
  }, []);

  // The brands loop on their own while the block is on screen, and wait while it isn't.
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(pin);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(
      () => setActiveIndex((index) => (index + 1) % brands.length),
      REVEAL_TOTAL_MS + HOLD_MS,
    );
    return () => window.clearTimeout(timer);
  }, [visible, activeIndex]);

  // Same as the home list: the old picture clears at once and the next one builds up from tiles.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    if (!activeCover || !visible) return;

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
  }, [activeCover, visible]);

  return (
    <section className="os-pin" ref={pinRef}>
      <div className="os-pin-stage">
        <h2>About the project</h2>

        <div className="os-pin-body">
          <p>
            A small agency can’t build a new webshop for every client, so with our developers we built one CMS for
            all of them.
          </p>
          <p>
            These four brands look nothing alike, yet they run on the same system. For each one I only changed the
            UI and variables in Figma, and added components where needed.
          </p>
          <canvas
            ref={canvasRef}
            className="os-pin-image"
            role="img"
            aria-label={brand ? `${brand.name} project` : undefined}
          />
          <div key={`${brand?.id}-${visible}`} className="os-pin-current">
            {brand && visible && (
              <>
                <RevealText className="os-pin-name" text={`${activeIndex + 1}. ${brand.name}`} />
                <RevealText className="os-pin-kind" text={brand.kind} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
