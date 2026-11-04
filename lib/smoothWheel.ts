// A mouse wheel moves the page in big notches. Like the old Framer site, each notch here only sets
// where the page is heading, and the page glides there over a few frames. Touchpads already scroll
// smoothly and keep the browser's own scrolling, unless a glide is under way, which they then join.

// How quickly the page closes in on where it is heading: after this long, 63% of the way is done.
const GLIDE_MS = 110;
// Touchpads send many small steps; a wheel notch is around 100 px.
const NOTCH_PX = 50;

const LINE_PX = 16;

function canScrollInside(element: Element | null, scroller: HTMLElement) {
  for (let node = element; node && node !== scroller; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) return true;
  }
  return false;
}

export function smoothWheel(scroller: HTMLElement) {
  let position = scroller.scrollTop;
  let target = position;
  let lastSeen = position;
  let frame = 0;
  let lastFrameAt = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const glide = (now: number) => {
    // Something else moved the page (the home list looping, the One System block settling), so
    // carry on from there.
    const moved = scroller.scrollTop - lastSeen;
    if (Math.abs(moved) > 1) {
      position += moved;
      target += moved;
    }
    // The One System block holds the page while it shows its brands.
    if (scroller.classList.contains("os-locked")) return stop();

    // A frame's time is when the frame began, which can be just before the wheel event that started
    // the glide; that must not count as negative time, or the page would first step backwards.
    const elapsed = Math.max(now - lastFrameAt, 0);
    position += (target - position) * (1 - Math.exp(-elapsed / GLIDE_MS));
    lastFrameAt = now;
    if (Math.abs(target - position) < 0.5) position = target;
    scroller.scrollTop = position;
    lastSeen = scroller.scrollTop;
    frame = position === target ? 0 : requestAnimationFrame(glide);
  };

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
    if (scroller.classList.contains("os-locked")) return;
    const delta =
      event.deltaY * (event.deltaMode === 1 ? LINE_PX : event.deltaMode === 2 ? scroller.clientHeight : 1);
    if (!frame && Math.abs(delta) < NOTCH_PX) return;
    if (canScrollInside(event.target as Element, scroller)) return;

    event.preventDefault();
    if (!frame) {
      position = target = lastSeen = scroller.scrollTop;
      lastFrameAt = performance.now();
      frame = requestAnimationFrame(glide);
    }
    target = Math.min(Math.max(target + delta, 0), scroller.scrollHeight - scroller.clientHeight);
  };

  scroller.addEventListener("wheel", onWheel, { passive: false });
  return () => {
    stop();
    scroller.removeEventListener("wheel", onWheel);
  };
}
