import Link from "next/link";
import CopyEmail from "@/components/CopyEmail";
import RollText from "@/components/RollText";
import { contact } from "@/lib/projects";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-lead">
          Curious what we could build together? <em>Let’s find out.</em>
        </p>
        <Link href="/contact" className="footer-cta">
          <RollText text="Get in touch" />
        </Link>
        <div className="footer-meta">
          <span className="status">Available for work</span>
          {/* The same underlined, rolling links as on the contact page. */}
          <CopyEmail asLink />
          <a className="text-link" href={contact.phoneHref}>
            <span className="text-link-label">
              <RollText text={contact.phone} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
