"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import RollText from "@/components/RollText";
import { smoothWheel } from "@/lib/smoothWheel";

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// The whole page lives on a sheet that tilts aside to uncover the menu behind it. The sheet has a
// permanent transform, so fixed elements on it stay put relative to the sheet, and scrolling happens
// in an inner element, so tilting never depends on how far the page has been scrolled.
export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const menuButton = menuButtonRef.current;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      menuButton?.focus({ preventScroll: true });
    };
  }, [open]);

  // Lets the arrow keys and space scroll the page without clicking into it first.
  useEffect(() => {
    scrollerRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    return scroller ? smoothWheel(scroller) : undefined;
  }, [pathname]);

  return (
    <>
      <nav id="site-menu" className={`menu${open ? " is-open" : ""}`} inert={!open}>
        <button ref={closeRef} type="button" className="menu-close" onClick={() => setOpen(false)}>
          <RollText text="Close" />
        </button>
        <ul>
          {links.map((link, index) => (
            <li key={link.href} style={{ "--i": index } as React.CSSProperties}>
              <Link href={link.href} onClick={() => setOpen(false)}>
                <span className="menu-slide">
                  <RollText text={link.label} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="menu-note">Big or small teams, salty snacks required.</p>
      </nav>

      <div className={`sheet${open ? " is-open" : ""}`}>
        <div className="sheet-content" inert={open}>
          <Header
            menuOpen={open}
            onOpenMenu={() => setOpen(true)}
            menuButtonRef={menuButtonRef}
          />
          {/* Keyed by route so every page starts scrolled to the top. */}
          <div key={pathname} className="scroller" ref={scrollerRef} tabIndex={-1}>
            {children}
          </div>
        </div>
        {open && <div className="sheet-catcher" onClick={() => setOpen(false)} />}
      </div>
    </>
  );
}
