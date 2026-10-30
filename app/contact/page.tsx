import type { Metadata } from "next";
import CopyEmail from "@/components/CopyEmail";
import { contact } from "@/lib/projects";

export const metadata: Metadata = { title: "Contact — Liliána Török" };

export default function ContactPage() {
  return (
    <main className="contact">
      <h1 className="display">
        Shoot a
        <br />
        request
      </h1>
      <div className="contact-details">
        <span className="status">Available for work</span>
        <CopyEmail />
        <a href={contact.phoneHref}>{contact.phone}</a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </main>
  );
}
