import type { ReactNode } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Picture = { src: string; size: [number, number]; alt: string; wide?: boolean };

const rooster: Picture[] = [
  { src: "rooster", size: [1920, 1080], alt: "The original 3D model: a war rooster on a gun carriage, with goggles and a Gatling gun" },
  { src: "rooster-teal", size: [1920, 1080], alt: "The original model up close, lit in teal and red" },
  { src: "rooster-gun", size: [1920, 1080], alt: "A close-up of the rooster’s Gatling gun" },
  { src: "rooster-skinned", size: [1344, 768], alt: "The rooster, skinned, standing on cobblestones by a lighthouse and windmills at dusk" },
];
const shoes: Picture[] = [
  { src: "shoes-elf", size: [1920, 1080], alt: "Canvas shoes painted with an elf warrior riding a corgi" },
  { src: "shoes-pugs", size: [1140, 641], alt: "Black canvas shoes painted with portraits of two dogs, named on the toes" },
];
const emotes: Picture[] = [
  { src: "emotes", size: [1920, 1080], alt: "A Mario-style character with a B on his cap, jumping between clouds and B blocks", wide: true },
];
const film: Picture[] = [
  { src: "film-veil", size: [1150, 494], alt: "A film still: a pale girl with a tall blond wig and a white veil in a dark forest", wide: true },
  { src: "film-globe", size: [1152, 487], alt: "A film still: a boy on the floor of his room beside a glowing globe" },
  { src: "film-caravan", size: [1151, 485], alt: "A film still: a man reading in a cluttered caravan with a rusty wall behind him" },
];

// `even` crops every picture to 16:9, so a grid of slightly different shapes lines up.
function Shots({ pictures, even }: { pictures: Picture[]; even?: boolean }) {
  return (
    <div className={`side-shots${even ? " is-even" : ""}`}>
      {pictures.map(({ src, size, alt, wide }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          className={wide ? "is-wide" : undefined}
          src={`${BASE}/side/${src}.webp`}
          width={size[0]}
          height={size[1]}
          alt={alt}
          loading="lazy"
        />
      ))}
    </div>
  );
}

export default function SideQuests({ facts }: { facts: ReactNode }) {
  return (
    <div className="side">
      <h1 className="display">Side Quests</h1>
      <p className="project-subtitle">Things I make after hours</p>

      {facts}

      <section className="case-section">
        <h2>Off the clock</h2>
        <div>
          <p>
            I trained as a costume and set design assistant, and I’ve drawn all my life. These are the things I make
            just for fun.
          </p>
        </div>
      </section>

      <section className="case-section">
        <h2>The war rooster</h2>
        <div>
          <p>
            I modelled him in Maya about ten years ago, back when I was teaching myself 3D. Only now, with some
            help from AI, did he finally get his skin, after an embarrassing amount of research into which grenade
            he should carry. I’ve been planning a companion for him ever since, a mouse. Ten years in progress,
            poor guy.
          </p>
          {/* In the order they were made: the model, the skin, and then the skin in motion. */}
          <Shots pictures={rooster} even />
          <div className="side-shots">
            <div className="side-video is-wide">
              <video
                src={`${BASE}/side/rooster.mp4`}
                poster={`${BASE}/side/rooster-skinned.webp`}
                autoPlay
                muted
                loop
                playsInline
                aria-label="The skinned rooster in motion, with a lighthouse and windmills behind him"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="case-section">
        <h2>Sets and costumes</h2>
        <div>
          <p>Sets and costumes for several film shoots, all with a budget of exactly zero. We made them for love.</p>
          <Shots pictures={film} />
        </div>
      </section>

      <section className="case-section">
        <h2>Painted shoes</h2>
        <div>
          <p>
            Hand-painted canvas shoes: game characters, beloved dogs, whatever the wearer loves most. There’s no
            undo button.
          </p>
          <Shots pictures={shoes} />
        </div>
      </section>

      <section className="case-section">
        <h2>Emotes for a streamer</h2>
        <div>
          <p>Twitch graphics and a set of Mario-inspired emotes for a streamer. Just don’t tell Nintendo.</p>
          <Shots pictures={emotes} />
        </div>
      </section>
    </div>
  );
}
