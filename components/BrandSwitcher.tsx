"use client";

import { useState, type CSSProperties } from "react";
import Crop from "@/components/Crop";
import { brands } from "@/lib/projects";

export default function BrandSwitcher() {
  const [activeId, setActiveId] = useState(brands[0].id);
  const brand = brands.find((item) => item.id === activeId) ?? brands[0];
  const { variables } = brand;

  const stage = {
    "--b-bg": variables.bg,
    "--b-surface": variables.surface,
    "--b-fg": variables.fg,
    "--b-accent": variables.accent,
    "--b-on-accent": variables.onAccent,
    "--b-header-bg": variables.headerBg,
    "--b-header-fg": variables.headerFg,
    "--b-radius": variables.radius,
    "--b-heading": variables.heading,
    "--b-body": variables.body,
  } as CSSProperties;

  const tokens = [
    { label: "Background", value: variables.bg },
    { label: "Surface", value: variables.surface },
    { label: "Text", value: variables.fg },
    { label: "Accent", value: variables.accent },
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

      <div className="os-stage" style={stage}>
        <div className="os-demo">
          <div className="os-demo-header">
            <strong>{brand.logo}</strong>
            <ul>
              {brand.nav.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="os-demo-hero">
            <div>
              <h3>{brand.hero.title}</h3>
              <p>{brand.hero.text}</p>
              <span className="os-demo-button">{brand.hero.action}</span>
            </div>
            <Crop key={brand.id} className="os-demo-image" area={brand.hero.image} alt="" />
          </div>

          <div className="os-demo-cards">
            {brand.cards.map((card) => (
              <article key={`${brand.id}-${card.title}`}>
                <Crop className="os-demo-image" area={card.image} alt="" />
                <div>
                  <span>{card.meta}</span>
                  <h4>{card.title}</h4>
                  <p>{card.price}</p>
                  <span className="os-demo-button">{brand.cardAction}</span>
                </div>
              </article>
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
                <dt>Text</dt>
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
