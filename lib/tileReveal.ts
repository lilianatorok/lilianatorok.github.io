const TILE_COLUMNS = 8;
const REVEAL_MS = 750;
const TILE_FADE_MS = 200;

export const REVEAL_TOTAL_MS = REVEAL_MS + TILE_FADE_MS;

const covers = new Map<string, HTMLImageElement>();

export const coverSrc = (cover: string) => `${cover}?scale-down-to=1024`;

export function coverImage(src: string) {
  let image = covers.get(src);
  if (!image) {
    image = new Image();
    image.src = src;
    covers.set(src, image);
  }
  return image;
}

// Draws one area of the picture, cropped to the canvas the way object-fit: cover would.
export function drawCoverArea(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const { width: canvasWidth, height: canvasHeight } = ctx.canvas;
  const scale = Math.max(canvasWidth / image.naturalWidth, canvasHeight / image.naturalHeight);
  const offsetX = (image.naturalWidth - canvasWidth / scale) / 2;
  const offsetY = (image.naturalHeight - canvasHeight / scale) / 2;
  ctx.drawImage(image, offsetX + x / scale, offsetY + y / scale, width / scale, height / scale, x, y, width, height);
}

// Builds the picture out of square tiles that softly fade in, in random order. Their start times
// follow an ease-in-out curve: a few tiles first, a rush in the middle, the last few trickling in.
// Returns a function that stops the animation.
export function revealInTiles(canvas: HTMLCanvasElement, image: HTMLImageElement, columns = TILE_COLUMNS) {
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const width = Math.round(canvas.offsetWidth * ratio);
  const height = Math.round(canvas.offsetHeight * ratio);
  if (!ctx || !width || !height) return () => {};
  canvas.width = width;
  canvas.height = height;

  const size = Math.ceil(width / columns);
  const tiles: { x: number; y: number; delay: number }[] = [];
  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      const share = Math.random();
      tiles.push({ x, y, delay: (Math.acos(1 - 2 * share) / Math.PI) * REVEAL_MS });
    }
  }

  const start = performance.now();
  let frame = 0;
  const draw = (now: number) => {
    let finished = true;
    ctx.clearRect(0, 0, width, height);
    for (const tile of tiles) {
      const progress = (now - start - tile.delay) / TILE_FADE_MS;
      if (progress < 1) finished = false;
      if (progress <= 0) continue;
      ctx.globalAlpha = 1 - (1 - Math.min(progress, 1)) ** 3;
      drawCoverArea(ctx, image, tile.x, tile.y, size, size);
    }
    if (!finished) frame = requestAnimationFrame(draw);
  };
  frame = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(frame);
}
