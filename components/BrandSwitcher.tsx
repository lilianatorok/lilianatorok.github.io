"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { brands, type Brand, type MockupPiece } from "@/lib/projects";

// Every brand's site laid out the same way, from pieces cut out of its Figma page. Positions follow
// the reference layout (a 1564-wide board) and scale with the stage. The slots are the same for every
// brand, so switching tabs moves nothing: headers end on one line however tall they are, the hero is
// cropped to its slot, the cards are fitted into theirs and every button gets the same height.
const HEADER = { x: 84, bottom: 130, w: 1082 };
// The buttons drift with the hero, so they never slide up into the header.
const BUTTONS = { x: 84, y: 170, h: 29, gap: 17, depth: 0.3 };
const HERO = { x: 84, y: 216, w: 1082, h: 429 };
// The big card hangs over the hero's bottom left, the small one sits on the right, above the form.
const CARDS = [
  { x: 188, y: 551, w: 429, h: 397, align: "left", depth: 1.4 },
  { x: 1197, y: 163, w: 263, h: 295, align: "right", depth: 0.8 },
] as const;
const FORM = { x: 767, y: 509, w: 694, depth: 1 };

type Placed = { piece: MockupPiece; role: string; x: number; y: number; w: number; h: number; depth: number; cover?: string };

const heightAt = (piece: MockupPiece, w: number) => (w * piece.box[3]) / piece.box[2];

function layout(brand: Brand): Placed[] {
  const { header, hero, cards, buttons, form } = brand.mockup;
  const placed: Placed[] = [
    { piece: header, role: "header", x: HEADER.x, y: HEADER.bottom - heightAt(header, HEADER.w), w: HEADER.w, h: heightAt(header, HEADER.w), depth: 0 },
    { piece: hero, role: "hero", x: HERO.x, y: HERO.y, w: HERO.w, h: HERO.h, depth: 0.3, cover: brand.mockup.heroFocus ?? "center" },
  ];

  let buttonX = BUTTONS.x;
  for (const button of buttons) {
    const w = (BUTTONS.h * button.box[2]) / button.box[3];
    placed.push({ piece: button, role: "button", x: buttonX, y: BUTTONS.y, w, h: BUTTONS.h, depth: BUTTONS.depth });
    buttonX += w + BUTTONS.gap;
  }

  cards.forEach((card, index) => {
    const slot = CARDS[index];
    const w = Math.min(slot.w, (slot.h * card.box[2]) / card.box[3]);
    const x = slot.align === "right" ? slot.x + slot.w - w : slot.x;
    placed.push({ piece: card, role: "card", x, y: slot.y, w, h: heightAt(card, w), depth: slot.depth });
  });

  placed.push({ piece: form, role: "form", x: FORM.x, y: FORM.y, w: FORM.w, h: heightAt(form, FORM.w), depth: FORM.depth });
  return placed;
}

// The stage is cut to what the pieces cover across all brands (no margins), so they show as big as
// the stage allows, and every brand gets the same height so the page below never jumps on a switch.
const everything = brands.flatMap(layout);
const LEFT = Math.min(...everything.map((item) => item.x));
const TOP = Math.min(...everything.map((item) => item.y));
const CANVAS = Math.max(...everything.map((item) => item.x + item.w)) - LEFT;
const HEIGHT = Math.max(...everything.map((item) => item.y + item.h)) - TOP;
const placeOnStage = (brand: Brand) => layout(brand).map((item) => ({ ...item, x: item.x - LEFT, y: item.y - TOP }));

function Piece({ item, order }: { item: Placed; order: number }) {
  const [bx, by, bw, bh] = item.piece.box;
  const style = {
    "--x": item.x,
    "--y": item.y,
    "--w": item.w,
    "--depth": item.depth,
    "--order": order,
    aspectRatio: item.cover ? `${item.w} / ${item.h}` : `${bw} / ${bh}`,
  } as CSSProperties;
  // A cover piece fills its slot and is cropped to it; the others show whole, shadow included.
  const imageStyle: CSSProperties = item.cover
    ? { inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: item.cover }
    : { left: `${(-bx / bw) * 100}%`, top: `${(-by / bh) * 100}%`, width: `${(item.piece.size[0] / bw) * 100}%` };
  return (
    <div className={`os-piece os-piece-${item.role}`} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.piece.src} alt="" draggable={false} style={imageStyle} />
    </div>
  );
}

export default function BrandSwitcher() {
  const [activeId, setActiveId] = useState(brands[0].id);
  const brand = brands.find((item) => item.id === activeId) ?? brands[0];
  const { variables } = brand;
  const placed = placeOnStage(brand);
  const mockRef = useRef<HTMLDivElement>(null);

  // Have every brand's pieces ready, so switching tabs never waits for a download.
  useEffect(() => {
    for (const item of brands) {
      const { header, hero, cards, buttons, form } = item.mockup;
      for (const piece of [header, hero, ...cards, ...buttons, form]) new Image().src = piece.src;
    }
  }, []);

  // The pieces drift apart at different speeds as the stage scrolls past, the nearest ones most.
  useEffect(() => {
    const mock = mockRef.current;
    const scroller = mock?.closest<HTMLElement>(".scroller");
    if (!mock || !scroller) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = mock.getBoundingClientRect();
      const shift = (rect.top + rect.height / 2 - scroller.clientHeight / 2) / scroller.clientHeight;
      mock.style.setProperty("--shift", String(Math.max(-1, Math.min(1, shift))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // The stage is new for every brand (it is keyed), so it is looked up again on a switch.
  }, [brand.id]);

  const tokens = [
    { label: "Primary", value: variables.primary },
    { label: "Secondary", value: variables.secondary },
    { label: "Background", value: variables.bg },
    { label: "Text", value: variables.fg },
  ];

  return (
    <section className="os-switcher" aria-label="Brand switcher">
      <div className="os-tabs">
        {brands.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === brand.id}
            onClick={() => setActiveId(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="os-stage">
        <div className="os-mock-frame">
          {/* Keyed by brand, so the new brand's pieces come in one after another. */}
          <div
            key={brand.id}
            ref={mockRef}
            className="os-mock"
            role="img"
            aria-label={`${brand.name} website: header, hero, cards, buttons and contact form`}
            style={{ "--h": HEIGHT, "--canvas": CANVAS } as CSSProperties}
          >
            {placed.map((item, index) => (
              <Piece key={`${item.role}-${index}`} item={item} order={index} />
            ))}
          </div>
        </div>

        <div className="os-side">
          <div>
            <h3>Variables</h3>
            <dl className="os-tokens">
              {tokens.map((token) => (
                <div key={token.label}>
                  <dt>{token.label}</dt>
                  <dd>
                    <i style={{ background: token.value }} />
                    {token.value}
                  </dd>
                </div>
              ))}
              <div>
                <dt>Heading</dt>
                <dd>{variables.headingName}</dd>
              </div>
              <div>
                <dt>Body</dt>
                <dd>{variables.bodyName}</dd>
              </div>
              <div>
                <dt>Radius</dt>
                <dd>{variables.radius}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3>Templates</h3>
            <dl className="os-tokens">
              <div>
                <dt>List page</dt>
                <dd>{brand.structure.list}</dd>
              </div>
              <div>
                <dt>Detail page</dt>
                <dd>{brand.structure.detail}</dd>
              </div>
              <div>
                <dt>Main card</dt>
                <dd>{brand.structure.card}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
