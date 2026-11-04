"use client";

import { useState } from "react";
import RollText from "@/components/RollText";
import { contact } from "@/lib/projects";

// `asLink` gives the address the underlined, rolling style of the other text links.
export default function CopyEmail({ asLink = false }: { asLink?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <span className="copy-email">
      {asLink ? (
        <a className="text-link" href={`mailto:${contact.email}`}>
          <span className="text-link-label">
            <RollText text={contact.email} />
          </span>
        </a>
      ) : (
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      )}
      <button type="button" onClick={copy} aria-live="polite">
        {copied ? "Copied!" : "Copy"}
      </button>
    </span>
  );
}
