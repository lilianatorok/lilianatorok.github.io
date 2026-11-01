"use client";

import { useEffect, useRef } from "react";
import { coverImage, drawCoverArea, REVEAL_TOTAL_MS, revealInTiles } from "@/lib/tileReveal";

const COLUMNS = 24;
const PHONE_COLUMNS = 16;
const PHONE_WIDTH = 600;
const BITE_MS = 2000;
const IN_VIEW = 0.2;

// Builds up from tiles once it scrolls into view. After that the mouse bites square holes into the
// picture, which close again by themselves.
export default function BitePicture({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const image = coverImage(src);
    const bites = new Map<string, ReturnType<typeof setTimeout>>();
    let stopReveal = () => {};
    let bitesFrom = Infinity;
    let columns = COLUMNS;

    const reveal = () => {
      columns = canvas.offsetWidth < PHONE_WIDTH ? PHONE_COLUMNS : COLUMNS;
      stopReveal = revealInTiles(canvas, image, columns);
      bitesFrom = performance.now() + REVEAL_TOTAL_MS;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (image.complete && image.naturalWidth) reveal();
        else image.addEventListener("load", reveal, { once: true });
      },
      { threshold: IN_VIEW },
    );
    observer.observe(canvas);

    // Rounded edges, so neighbouring cells meet without a seam.
    const cellArea = (column: number, row: number) => {
      const size = canvas.width / columns;
      const x = Math.round(column * size);
      const y = Math.round(row * size);
      return [x, y, Math.round((column + 1) * size) - x, Math.round((row + 1) * size) - y] as const;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (performance.now() < bitesFrom) return;
      const box = canvas.getBoundingClientRect();
      const cell = box.width / columns;
      const column = Math.floor((event.clientX - box.left) / cell);
      const row = Math.floor((event.clientY - box.top) / cell);
      const key = `${column}/${row}`;

      const [x, y, width, height] = cellArea(column, row);
      ctx.clearRect(x, y, width, height);
      clearTimeout(bites.get(key));
      bites.set(
        key,
        setTimeout(() => {
          bites.delete(key);
          drawCoverArea(ctx, image, x, y, width, height);
        }, BITE_MS),
      );
    };

    canvas.addEventListener("pointermove", onPointerMove);
    return () => {
      observer.disconnect();
      image.removeEventListener("load", reveal);
      canvas.removeEventListener("pointermove", onPointerMove);
      stopReveal();
      bites.forEach((timer) => clearTimeout(timer));
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} role="img" aria-label={alt} />;
}
