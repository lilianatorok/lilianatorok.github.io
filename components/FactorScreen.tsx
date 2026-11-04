// A screen or element exported from Figma (the Cloudberry PDFs), in a dark and a light version.
// Both are in the page, one over the other, and the page's theme shows one of them, so switching
// the theme switches the dashboard with it.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type Screen = { name: string; size: [number, number]; alt: string };

export const screen = (name: string, w: number, h: number, alt: string): Screen => ({ name, size: [w, h], alt });

export default function FactorScreen({ image, className }: { image: Screen; className?: string }) {
  return (
    <span className={`factor-themed${className ? ` ${className}` : ""}`}>
      {(["light", "dark"] as const).map((mode) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={mode}
          className={`is-${mode}`}
          src={`${BASE}/factor-mes/${image.name}-${mode}.webp`}
          width={image.size[0]}
          height={image.size[1]}
          alt={mode === "light" ? image.alt : ""}
          aria-hidden={mode === "dark" || undefined}
          loading="lazy"
        />
      ))}
    </span>
  );
}
