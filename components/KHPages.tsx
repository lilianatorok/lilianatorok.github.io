"use client";

import { useEffect, useRef } from "react";
import { revealInTiles } from "@/lib/tileReveal";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// The personal loan page, section by section: header, hero, offer, calculator, video, other offers,
// FAQ and footer. Sizes of the cut images.
const desktop: [number, number][] = [
  [1440, 115], [1440, 704], [1440, 742], [1440, 1180], [1440, 1109], [1440, 694], [1440, 802], [1440, 712],
];
const mobile: [number, number][] = [
  [750, 136], [750, 1520], [750, 2386], [750, 1864], [750, 1400], [750, 2816], [750, 1750], [750, 704],
];

// One even run down the page at a constant speed, then the last stretch slows into the bottom (its
// curve starts at that same speed, so there's no jolt), a breath there, and a quicker trip back up.
const EVEN_MS = 11000;
const EVEN_SHARE = 0.85; // of the way down
const SETTLE_MS = 4000;
const HOLD_MS = 1000;
const BACK_MS = 1800;
const settleSlope = (EVEN_SHARE * SETTLE_MS) / ((1 - EVEN_SHARE) * EVEN_MS);
const legs = [
  { share: EVEN_SHARE, ms: EVEN_MS, easing: "linear" },
  { share: 1, ms: SETTLE_MS, easing: `cubic-bezier(0.2, ${Math.min(0.2 * settleSlope, 1).toFixed(3)}, 0.6, 1)` },
  { share: 1, ms: HOLD_MS, easing: "linear" },
  { share: 0, ms: BACK_MS, easing: "ease-in-out" },
];
const LOAD_MS = 1100;

function Device({ kind, sizes }: { kind: "d" | "m"; sizes: [number, number][] }) {
  return (
    <div className={`kh-device kh-device-${kind}`}>
      {kind === "d" && (
        <div className="kh-device-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>kh.hu/szemelyi-kolcson</span>
        </div>
      )}
      <div className="kh-device-screen">
        <div className="kh-device-page">
          {sizes.map(([width, height], index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={index} src={`${BASE}/kh/page-${kind}${index}.webp`} width={width} height={height} alt="" />
          ))}
        </div>
        <canvas className="kh-device-load" data-src={`${BASE}/kh/page-${kind}-top.webp`} />
      </div>
    </div>
  );
}

// The two screens load once, built up from tiles; then the page scrolls through on its own at an even
// pace, slows into the end, and goes back to the top. Only while it's on screen.
export default function KHPages() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const devices = [...root.querySelectorAll<HTMLElement>(".kh-device")].map((device) => {
      const canvas = device.querySelector<HTMLCanvasElement>(".kh-device-load")!;
      const image = new Image();
      image.src = canvas.dataset.src!;
      return {
        device,
        screen: device.querySelector<HTMLElement>(".kh-device-screen")!,
        page: device.querySelector<HTMLElement>(".kh-device-page")!,
        canvas,
        image,
      };
    });

    let timers: number[] = [];
    let reveals: (() => void)[] = [];
    let runs: Animation[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const offsetOf = (page: HTMLElement, screen: HTMLElement, section: number) => {
      const images = page.querySelectorAll("img");
      const whole = Math.floor(section);
      const top =
        whole >= images.length
          ? page.offsetHeight
          : images[whole].offsetTop + (section - whole) * images[whole].offsetHeight;
      return Math.min(top, page.offsetHeight - screen.clientHeight);
    };

    // The same timing on both screens, each in its own pixels; it loops until stopped.
    const tour = () => {
      const total = legs.reduce((sum, leg) => sum + leg.ms, 0);
      runs = devices.map(({ page, screen }) => {
        let at = 0;
        // A keyframe's easing shapes the leg that starts at it, so each leg's easing sits on the frame before.
        const frames: Keyframe[] = [{ transform: "translateY(0px)", offset: 0, easing: legs[0].easing }];
        const end = offsetOf(page, screen, 8);
        legs.forEach(({ share, ms }, index) => {
          at += ms;
          frames.push({
            transform: `translateY(${-end * share}px)`,
            offset: at / total,
            easing: legs[index + 1]?.easing ?? "linear",
          });
        });
        return page.animate(frames, { duration: total, iterations: Infinity });
      });
    };

    const reset = () => {
      timers.forEach(clearTimeout);
      reveals.forEach((stop) => stop());
      runs.forEach((run) => run.cancel());
      timers = [];
      reveals = [];
      runs = [];
      for (const { device, canvas } of devices) {
        device.classList.remove("is-loaded");
        canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const start = () => {
      reset();
      for (const { canvas, image } of devices) {
        const go = () => reveals.push(revealInTiles(canvas, image));
        if (image.complete && image.naturalWidth) go();
        else image.addEventListener("load", go, { once: true });
      }
      // Once built, the live page takes over from the picture of its top, which looks the same.
      later(() => devices.forEach(({ device }) => device.classList.add("is-loaded")), LOAD_MS);
      later(tour, LOAD_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
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
      className="kh-pages"
      role="img"
      aria-label="The K&H personal loan page loading on desktop and on a phone, then scrolling through"
    >
      <Device kind="d" sizes={desktop} />
      <Device kind="m" sizes={mobile} />
    </div>
  );
}
