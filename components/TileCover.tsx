"use client";

import { useEffect, useRef } from "react";
import { coverImage, coverSrc, drawCover, LOOP_JUMP, revealInTiles } from "@/lib/tileReveal";

const PHONE = "(max-width: 800px)";

// On phones the list shows each project's picture, built up from tiles whenever it scrolls into view.
export default function TileCover({ cover }: { cover: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const list = canvas?.closest(".loop");
    if (!canvas || !list || !window.matchMedia(PHONE).matches) return;
    const image = coverImage(coverSrc(cover));
    let stop = () => {};
    let shown = false;

    const reveal = () => {
      stop();
      if (image.complete && image.naturalWidth) stop = revealInTiles(canvas, image);
      else image.addEventListener("load", reveal, { once: true });
    };

    const clear = () => {
      stop();
      canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    };

    const onScreen = () => {
      const box = canvas.getBoundingClientRect();
      return box.bottom > 0 && box.top < window.innerHeight;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shown) {
          shown = true;
          reveal();
        } else if (!entry.isIntersecting && shown) {
          // Off screen it clears, so it builds up again next time it comes into view.
          shown = false;
          clear();
        }
      },
      { threshold: 0.2 },
    );

    // The list loops by jumping one copy of itself: the pictures now on screen are the twins of the
    // ones that were, so they appear finished at once instead of building up again.
    const onJump = () => {
      if (onScreen()) {
        if (!image.complete || !image.naturalWidth) return;
        stop();
        drawCover(canvas, image);
        shown = true;
      } else if (shown) {
        shown = false;
        clear();
      }
    };

    observer.observe(canvas);
    list.addEventListener(LOOP_JUMP, onJump);
    return () => {
      observer.disconnect();
      list.removeEventListener(LOOP_JUMP, onJump);
      image.removeEventListener("load", reveal);
      stop();
    };
  }, [cover]);

  return <canvas ref={canvasRef} className="loop-cover" aria-hidden="true" />;
}
