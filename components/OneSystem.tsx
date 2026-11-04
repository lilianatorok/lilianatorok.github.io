import BeresDrip from "@/components/BeresDrip";
import BrandSwitcher from "@/components/BrandSwitcher";
import IdeaPin from "@/components/IdeaPin";
import type { ReactNode } from "react";
import { brands, type SpecialImage } from "@/lib/projects";

const stayed = ["The CMS", "Checkout", "Content types", "Page templates", "Components"];
const changed = ["Colour and type tokens", "Radius and spacing", "Imagery", "Features and variants"];

const learnings = [
  ["Tokens are a contract.", "Keeping them one to one with the developer turned every handover into a single list of changes."],
  ["Write the spec yourself.", "It’s the fastest way to learn how a developer thinks, and what a handover really needs."],
  ["A good system buys time.", "With nothing to rebuild, there was room to sit with stakeholders and get the brief right."],
];

function SpecialPicture({ image }: { image: SpecialImage }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image.src} width={image.size[0]} height={image.size[1]} alt={image.alt} loading="lazy" />
  );
}

export default function OneSystem({ facts }: { facts: ReactNode }) {
  return (
    <div className="one-system">
      <h1 className="display">One System</h1>
      <p className="project-subtitle">Four+ brands</p>

      {facts}

      <IdeaPin />

      <section className="case-section os-split">
        <h2>The system</h2>
        <div>
          <p>
            A small agency can’t build a new webshop for every client, so we didn’t. The CMS grew with each project,
            the Figma system grew with it, and a new brand came down to a few choices: webshop or not, blog or news,
            which filters, which component variant.
          </p>
          <div>
            <h3>Stayed the same</h3>
            <ul>
              {stayed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Changed per brand</h3>
            <ul>
              {changed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <BrandSwitcher />

      <section className="case-section">
        <h2>The payoff</h2>
        <div>
          <p>
            Four very different brands, one checkout and one CMS behind them. Building it taught me more about
            working with developers than any project before.
          </p>
          <h3 className="case-list-title">What I took from it</h3>
          <ul className="case-learnings">
            {learnings.map(([lead, text]) => (
              <li key={lead}>
                <strong>{lead}</strong> {text}
              </li>
            ))}
          </ul>
          <h3 className="case-list-title">Faster with every project</h3>
          <p>By the end, client conversations took more time than Figma.</p>
          <div className="os-numbers">
            <div>
              <strong>3 days</strong>
              <p>for a whole webshop in Figma</p>
            </div>
            <div>
              <strong>1–2 months</strong>
              <p>per project, with client meetings and iterations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section">
        <h2>What was actually new</h2>
        <div>
          <p>The system covered most of the work, so the design time could go to the one thing each business needed.</p>
          {brands.map((brand) => (
            <article key={brand.id} className="os-new">
              <span>{brand.name}</span>
              <h3>{brand.special.title}</h3>
              <p>{brand.special.text}</p>
              {brand.special.layout === "component" ? (
                // Shown the way Figma shows it: the main component, and instances of it with layers hidden.
                <div className="os-new-images os-new-component">
                  <figure>
                    <figcaption>◆ Main component</figcaption>
                    <SpecialPicture image={brand.special.images[0]} />
                  </figure>
                  <figure className="os-new-variants">
                    <figcaption>◇ Same card, unused elements hidden</figcaption>
                    <div>
                      {brand.special.images.slice(1).map((image) => (
                        <SpecialPicture key={image.src} image={image} />
                      ))}
                    </div>
                  </figure>
                </div>
              ) : brand.special.layout === "drip" ? (
                // The blocks joined the way the Béres site joins its sections: a gold line, and a drop.
                <div className="os-new-images os-new-drip">
                  <SpecialPicture image={brand.special.images[0]} />
                  <SpecialPicture image={brand.special.images[1]} />
                  <BeresDrip />
                </div>
              ) : (
                <div className={`os-new-images os-new-${brand.special.layout}`}>
                  {brand.special.images.map((image) => (
                    <SpecialPicture key={image.src} image={image} />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
