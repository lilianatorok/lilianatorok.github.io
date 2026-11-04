import Link from "next/link";
import RollText from "@/components/RollText";

export default function CvLink() {
  return (
    <Link className="text-link" href="/Liliana_Torok_CV.pdf" download prefetch={false}>
      <span className="text-link-label">
        <RollText text="Download CV" />
      </span>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 1.5v9M4 6.5l4 4 4-4M2 14.5h12" />
      </svg>
    </Link>
  );
}
