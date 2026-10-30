"use client";

import { useState } from "react";
import { contact } from "@/lib/projects";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <span className="copy-email">
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
      <button type="button" onClick={copy} aria-live="polite">
        {copied ? "Copied!" : "Copy"}
      </button>
    </span>
  );
}
