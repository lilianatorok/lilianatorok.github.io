"use client";

import { useEffect, useRef, useState } from "react";
import RevealText from "@/components/RevealText";
import { brands } from "@/lib/projects";
import { coverImage, coverSrc, REVEAL_TOTAL_MS, revealInTiles } from "@/lib/tileReveal";

// The first brand appears as soon as its picture has come this far up the screen.
const START_AT = 0.85;
// Extra scroll room around the pinned stage; keep in step with --os-slack in the stylesheet.
const SLACK_PX = 200;
// A pause this long, a change of direction or a sudden rise in speed starts a new scroll...
const GESTURE_GAP_MS = 120;
const SPEED_RISE = 1.6;
const MIN_RISING_SPEED = 20; // Momentum's slow tail wobbles, which isn't a new scroll.
// ...and a scroll that goes on this long counts as a new one too, so the page can never get stuck.
const LONGEST_SCROLL_MS = 1800;
const SWIPE_PX = 30;
const DOWN_KEYS = ["ArrowDown", "PageDown", " "];
const UP_KEYS = ["ArrowUp", "PageUp"];

export default function IdeaPin() {
  const pinRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const brand = brands[activeIndex];
  const activeCover = brand?.cover;

  useEffect(() => {
    brands.forEach((item) => coverImage(coverSrc(item.cover)));
  }, []);

  // At the top of the screen the section switches off the page's scrolling, so momentum simply ends
  // and nothing has to fight it. Each separate scroll then moves one brand, once the current picture
  // has built up. After the last brand scrolling comes back on and the page goes on as usual.
  useEffect(() => {
    const pin = pinRef.current;
    const scroller = pin?.closest<HTMLElement>(".scroller");
    if (!pin || !scroller) return;

    let index = -1;
    let locked = false;
    let left = false;
    let lastScrollTop = scroller.scrollTop;
    let lastShownAt = -Infinity;
    let lastWheelAt = -Infinity;
    let lastDirection = 0;
    let lastSpeed = 0;
    let scrollStartedAt = -Infinity;
    let touchStartY = 0;

    const show = (next: number) => {
      if (next === index) return;
      index = next;
      lastShownAt = performance.now();
      setActiveIndex(next);
    };

    const setLocked = (value: boolean) => {
      locked = value;
      scroller.classList.toggle("os-locked", value);
    };

    const step = (direction: number) => {
      if (performance.now() - lastShownAt < REVEAL_TOTAL_MS) return;
      const next = index + direction;
      if (next >= 0 && next < brands.length) {
        show(next);
        return;
      }
      // Leaving downwards starts from the far end of the slack, where the stage is about to move.
      if (direction > 0) {
        scroller.scrollTop += pin.getBoundingClientRect().top + SLACK_PX;
        left = true;
      }
      lastScrollTop = scroller.scrollTop;
      setLocked(false);
    };

    const onScroll = () => {
      const viewport = scroller.clientHeight;
      const top = pin.getBoundingClientRect().top;
      const scrollingUp = scroller.scrollTop < lastScrollTop;
      lastScrollTop = scroller.scrollTop;

      if (top > 0) left = false;

      if (locked || (!left && top < -1)) {
        setLocked(true);
        // The stage is pinned throughout the slack, so settling back to its start doesn't show.
        if (Math.abs(top) > 0.5) {
          scroller.scrollTop += top;
          lastScrollTop = scroller.scrollTop;
        }
        if (index < 0) show(0);
        return;
      }

      const picture = canvasRef.current?.getBoundingClientRect();
      if (!picture) return;
      // Coming back up from below skips the brands: the section simply starts over at the first.
      if (left && scrollingUp && picture.bottom > 0) show(0);
      else if (picture.top > viewport * START_AT) show(-1);
      else if (index < 0) show(0);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      const now = performance.now();
      const direction = Math.sign(event.deltaY);
      const speed = Math.abs(event.deltaY);
      const isNewScroll =
        now - lastWheelAt > GESTURE_GAP_MS ||
        direction !== lastDirection ||
        (speed >= MIN_RISING_SPEED && speed > lastSpeed * SPEED_RISE) ||
        now - scrollStartedAt > LONGEST_SCROLL_MS;
      lastWheelAt = now;
      lastDirection = direction;
      lastSpeed = speed;
      if (!isNewScroll) return;
      scrollStartedAt = now;
      if (locked) step(direction);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!locked) return;
      const direction = DOWN_KEYS.includes(event.key) ? 1 : UP_KEYS.includes(event.key) ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      if (!event.repeat) step(direction);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (!locked) return;
      const moved = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(moved) >= SWIPE_PX) step(Math.sign(moved));
    };

    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: true });
    scroller.addEventListener("keydown", onKeyDown);
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scroller.classList.remove("os-locked");
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("keydown", onKeyDown);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Same as the home list: the old picture clears at once and the next one builds up from tiles.
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

  return (
    <section className="os-pin" ref={pinRef}>
      <div className="os-pin-stage">
        <div className="os-pin-text">
          <h2>The idea</h2>
          <p>
            These four businesses look nothing alike, yet they all run on the same CMS. For each new brand I
            changed the UI and the variables in Figma, made a few optimisations, and added a new component
            only where the business really needed one.
          </p>
          <div key={brand?.id} className="os-pin-current">
            {brand && (
              <>
                <RevealText className="os-pin-name" text={brand.name} />
                <RevealText className="os-pin-kind" text={brand.kind} />
              </>
            )}
          </div>
        </div>

        <canvas
          ref={canvasRef}
          className="os-pin-image"
          role="img"
          aria-label={brand ? `${brand.name} project` : undefined}
        />
      </div>
    </section>
  );
}
