import Link from "next/link";
import CopyEmail from "@/components/CopyEmail";
import { contact } from "@/lib/projects";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-lead">
        Curious what we could build together? <em>Let’s find out.</em>
      </p>
      <Link href="/contact" className="footer-cta">
        Get in touch
      </Link>
      <div className="footer-meta">
        <span className="status">Available for work</span>
        <CopyEmail />
        <a href={contact.phoneHref}>{contact.phone}</a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
