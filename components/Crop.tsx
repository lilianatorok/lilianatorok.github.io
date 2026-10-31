import type { CropArea } from "@/lib/projects";

// The old case studies are single long images, so an SVG viewBox cuts out one area. The inner svg
// clips to that area, so a contained crop doesn't show the rest of the long image around it.
export default function Crop({ area, alt, className }: { area: CropArea; alt: string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`${area.x} ${area.y} ${area.w} ${area.h}`}
      preserveAspectRatio={`xMidYMid ${area.contain ? "meet" : "slice"}`}
      role="img"
      aria-label={alt}
    >
      <svg x={area.x} y={area.y} width={area.w} height={area.h}>
        <image x={-area.x} y={-area.y} href={area.src} width={area.width} height={area.height} />
      </svg>
    </svg>
  );
}
