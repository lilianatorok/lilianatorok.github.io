import type { Metadata } from "next";
import CopyEmail from "@/components/CopyEmail";
import CvLink from "@/components/CvLink";
import RollText from "@/components/RollText";
import { contact } from "@/lib/projects";

export const metadata: Metadata = { title: "Contact — Liliána Török" };

export default function ContactPage() {
  return (
    <main className="contact">
      <div>
        <h1 className="display">
          Shoot a
          <br />
          request
        </h1>
        <ul className="contact-links">
          <li>
            <CopyEmail asLink />
          </li>
          <li>
            <a className="text-link" href={contact.phoneHref}>
              <span className="text-link-label">
                <RollText text={contact.phone} />
              </span>
            </a>
          </li>
          <li>
            <CvLink />
          </li>
        </ul>
      </div>
      <span className="status">Available for work</span>
    </main>
  );
}
