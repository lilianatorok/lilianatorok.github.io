import {
  Cinzel,
  Crimson_Text,
  Merriweather,
  Playfair_Display,
  Poppins,
  Raleway,
  Roboto,
} from "next/font/google";
import BrandSwitcher from "@/components/BrandSwitcher";
import Crop from "@/components/Crop";
import IdeaPin from "@/components/IdeaPin";
import { brands } from "@/lib/projects";

// Cinzel stands in for the gallery's Trajan Pro, which is not a free font.
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin", "latin-ext"], weight: "500" });
const crimson = Crimson_Text({ variable: "--font-crimson", subsets: ["latin", "latin-ext"], weight: ["400", "600"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin", "latin-ext"], weight: "700" });
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin", "latin-ext"], weight: ["400", "500"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin", "latin-ext"], weight: ["400", "600"] });
const merriweather = Merriweather({ variable: "--font-merriweather", subsets: ["latin", "latin-ext"], weight: "700" });
const raleway = Raleway({ variable: "--font-raleway", subsets: ["latin", "latin-ext"], weight: ["400", "600"] });

const fonts = [cinzel, crimson, playfair, roboto, poppins, merriweather, raleway]
  .map((font) => font.variable)
  .join(" ");

const stayed = ["The CMS", "Content types", "Page templates", "Components"];
const changed = ["Colour variables", "Type variables", "Radius and spacing", "Imagery"];

export default function OneSystem() {
  return (
    <div className={`one-system ${fonts}`}>
      <h1 className="display">
        One system,
        <br />
        four brands
      </h1>

      <dl className="facts">
        <div>
          <dt>My role</dt>
          <dd>Product designer</dd>
        </div>
        <div>
          <dt>Foundation</dt>
          <dd>One shared CMS, four brands</dd>
        </div>
        <div>
          <dt>Team</dt>
          <dd>1 project owner, 2 backend developers, 1 frontend developer, 1 designer</dd>
        </div>
      </dl>

      <IdeaPin />

      <div className="os-split">
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

      <BrandSwitcher />

      <section className="case-section">
        <h2>What was actually new</h2>
        <div>
          <p>The system covered most of the work, so the design time could go to the one thing each business needed.</p>
        </div>
      </section>

      <div className="os-added">
        {brands.map((brand) => (
          <article key={brand.id}>
            <Crop className="os-added-image" area={brand.added.image} alt={`${brand.name}: ${brand.added.title}`} />
            <span>{brand.name}</span>
            <h3>{brand.added.title}</h3>
            <p>{brand.added.text}</p>
          </article>
        ))}
      </div>

      <section className="case-section">
        <h2>Faster with every project</h2>
        <div>
          <p>By the end, client conversations took more time than Figma.</p>
        </div>
      </section>

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
  );
}
