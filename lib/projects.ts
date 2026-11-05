const CDN = "https://framerusercontent.com/images";
// GitHub Pages serves the site from a sub-path, which plain image paths have to include.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type Section = { title: string; body: string; points?: string[] };

export type ProjectImage = { src: string; width: number; height: number; alt: string };

export type Project = {
  slug: string;
  type: string;
  year: string;
  name: string;
  subtitle: string;
  cover: string;
  images: ProjectImage[];
  // Shown under the title of every project, in this order.
  role?: string;
  timeline?: string;
  team?: string;
  sections?: Section[];
};

export const projects: Project[] = [
  {
    slug: "kh",
    type: "Banking web & design system",
    year: "2025–2026",
    name: "K&H",
    subtitle: "Financial services company",
    cover: `${BASE}/kh/cover.webp`,
    role: "Product designer",
    team: "Plenty of stakeholders, plenty of POs, not quite as many designers",
    timeline: "2025–2026",
    images: [
      { src: `${CDN}/RKQhL3I0VRozyZIoX57ECKNAg4s.png`, width: 1560, height: 1041, alt: "K&H project screens, part 1" },
      { src: `${CDN}/3LIjAJsNV70M3oRsuQKqiffi0.png`, width: 1560, height: 1041, alt: "K&H project screens, part 2" },
      { src: `${CDN}/MWBCbHxdvinuC7SdO6VmUGHrcLg.png`, width: 1560, height: 1041, alt: "K&H project screens, part 3" },
      { src: `${CDN}/YyeAvYjoIVwAWKA0T20JyUuWBpE.png`, width: 1560, height: 1041, alt: "K&H project screens, part 4" },
    ],
    sections: [
      {
        title: "Context",
        body: "At K&H, the UX team is a small but dynamic unit, managing a high volume of projects across multiple platforms. Since March 2025, I’ve contributed to over 20 initiatives, from minor enhancements to full-scale redesigns, spanning web and mobile banking applications. My work also involves maintaining and evolving the shared design system that underpins all projects.",
        points: [
          "Small UX team (4 designers + lead) managing 70+ projects per year",
          "Work spans web, mobile banking (iOS & Android) and e-banking platforms",
          "Responsible for both project work and maintaining the shared design system",
        ],
      },
      {
        title: "Challenges",
        body: "Designers often juggle 10+ projects simultaneously in a fast-paced environment. For the website, the challenge was creating a modular page kit on the existing design system while adapting to evolving subpage needs. Mobile banking projects required careful attention to platform-specific UX patterns.",
        points: [
          "Designers often work on 10+ projects simultaneously",
          "Tight deadlines and evolving, unstable concepts",
          "For the website: building a modular page kit on top of the design system while evolving subpages",
          "Mobile banking: attention to platform-specific UX and cross-functional collaboration",
        ],
      },
      {
        title: "Approach / Process",
        body: "Projects are handled end-to-end, from ideation to execution. Concepts are explored and validated early, then refined through challenge and execution phases with developer support. Iterative cycles and workshops address evolving ideas, and I coordinate external agencies to ensure alignment with our design system.",
        points: [
          "Idea → Concept → Challenge → Execution",
          "Workshops, iterative cycles, alignment with stakeholders",
          "Design system guidance",
          "Coordinating external agencies",
        ],
      },
      {
        title: "Impact / Results",
        body: "Embedding UX early ensures clear concepts, feasible implementations, and a cohesive user experience. By maintaining a consistent design system and close collaboration with developers and stakeholders, I’ve contributed to 20+ projects, balancing priorities, streamlining processes, and enhancing cross-platform UX.",
        points: [
          "UX recognized as strategic asset",
          "Easier dev work, smoother project progression",
          "Design system consistency maintained across platforms",
          "Personal contribution: multiple projects, bridging web + mobile UX",
        ],
      },
      {
        title: "Reflection",
        body: "Working in this environment has pushed me to think holistically and stay highly adaptable. I constantly balance diverse stakeholder expectations while designing for multiple platforms, from native mobile banking experiences to a large-scale website. Operating in a highly regulated and technically complex space has taught me to embrace constraints as part of the design process. Many ideas require careful adjustment due to legal or technical limitations, which challenges me to rethink solutions and find new ways to keep the system and the design fresh, relevant, and user-centered—even within tight boundaries.",
      },
    ],
  },
  {
    slug: "system",
    type: "Multi-brand CMS",
    year: "2023–2024",
    name: "One System",
    subtitle: "Four+ brands, one CMS",
    // One column per brand, built from its real pieces: hero, card and button on shared rows.
    cover: `${BASE}/one-system/cover-layers.webp`,
    role: "Product designer",
    team: "1 project owner, 2 backend developers, 1 frontend developer, 1 designer",
    timeline: "2023–2024",
    images: [],
  },
  {
    slug: "vois",
    type: "Product design",
    year: "2026–present",
    name: "VOIS",
    subtitle: "Telecommunications company",
    // A plain placeholder until there are pictures to show.
    cover: `${BASE}/vois/cover.webp`,
    role: "Product designer",
    timeline: "2026–present",
    team: "International team",
    images: [],
  },
  {
    slug: "factor-mes",
    type: "Industrial dashboard",
    year: "2021–2023",
    name: "Factor-MES",
    subtitle: "Industrial Manager",
    // The login screen's mesh, the machine drawing and the plant map, as in the old case study.
    cover: `${BASE}/factor-mes/cover.webp`,
    role: "Product designer",
    team: "1 project owner, 2 project managers, 1 lead developer, 1 designer",
    timeline: "2021–2023",
    images: [],
  },
];

export type CropArea = {
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
  w: number;
  h: number;
  contain?: boolean;
};

export type BrandVariables = {
  bg: string;
  fg: string;
  primary: string;
  secondary: string;
  radius: string;
  headingName: string;
  bodyName: string;
};

export type SpecialImage = { src: string; size: [number, number]; alt: string };

export type Brand = {
  id: string;
  name: string;
  kind: string;
  cover: string;
  mockup: Mockup;
  variables: BrandVariables;
  structure: { list: string; detail: string; card: string };
  // What only this brand needed, built on top of the shared system. `layout` says how its images sit.
  special: { title: string; text: string; images: SpecialImage[]; layout: "single" | "drip" | "side" | "component" };
};


// One element of a brand's site, cut from its Figma page together with its shadow. `size` is the
// whole cut; `box` is where the element itself sits inside it, which the layout lines up.
export type MockupPiece = { src: string; size: [number, number]; box: [number, number, number, number] };

export type Mockup = {
  header: MockupPiece;
  hero: MockupPiece;
  cards: [MockupPiece, MockupPiece];
  buttons: [MockupPiece, MockupPiece];
  form: MockupPiece;
  // Which part of the hero stays when it is cropped to its slot, as an object-position.
  heroFocus?: string;
};

const piece = (brand: string, name: string, size: [number, number], box?: [number, number, number, number]): MockupPiece => ({
  src: `${BASE}/one-system/${brand}/${name}.webp`,
  size,
  box: box ?? [0, 0, size[0], size[1]],
});

export const brands: Brand[] = [
  {
    id: "maklary",
    name: "Makláry",
    kind: "Fine art gallery",
    cover: `${BASE}/one-system/maklary/cover.webp`,
    mockup: {
      header: piece("maklary", "header", [1524, 134], [6, 4, 1512, 122]),
      hero: piece("maklary", "hero", [1296, 730]),
      cards: [piece("maklary", "card1", [326, 508], [10, 62, 306, 432]), piece("maklary", "card2", [326, 364], [10, 62, 306, 288])],
      buttons: [piece("maklary", "button1", [109, 33]), piece("maklary", "button2", [121, 33])],
      form: piece("maklary", "form", [1316, 665], [10, 6, 1296, 645]),
    },
    variables: {
      bg: "#ffffff",
      fg: "#212529",
      primary: "#000000",
      secondary: "#e30613",
      radius: "4px",
      headingName: "Trajan Pro",
      bodyName: "Crimson Text",
    },
    structure: { list: "Artists, exhibitions, news", detail: "Artwork, exhibition", card: "Art card" },
    special: {
      title: "One card, many jobs",
      text: "A single main card holds every element. Switching elements off turns it into an artist, artwork, exhibition, news or book card.",
      // The first image is the main card; the rest are made from it.
      images: [
        { src: `${BASE}/one-system/maklary/special-card-main.webp`, size: [390, 852], alt: "The main Makláry card, with every element switched on" },
        { src: `${BASE}/one-system/maklary/special-card-1.webp`, size: [306, 478], alt: "Exhibition card" },
        { src: `${BASE}/one-system/maklary/special-card-2.webp`, size: [306, 466], alt: "Artist card" },
        { src: `${BASE}/one-system/maklary/special-card-3.webp`, size: [306, 500], alt: "Book card" },
        { src: `${BASE}/one-system/maklary/special-card-4.webp`, size: [306, 448], alt: "Exhibition card with a photo" },
        { src: `${BASE}/one-system/maklary/special-card-5.webp`, size: [306, 241], alt: "News card" },
      ],
      layout: "component",
    },
  },
  {
    id: "beres",
    name: "Béres",
    kind: "Vineyards and winery",
    cover: `${BASE}/one-system/beres/cover.webp`,
    mockup: {
      header: piece("beres", "header", [1562, 150], [25, 25, 1512, 100]),
      hero: piece("beres", "hero", [1512, 771]),
      cards: [piece("beres", "card1", [510, 620], [50, 50, 410, 520]), piece("beres", "card2", [510, 717], [50, 50, 410, 617])],
      buttons: [piece("beres", "button1", [223, 43]), piece("beres", "button2", [249, 51])],
      form: piece("beres", "form", [1316, 677], [10, 6, 1296, 657]),
    },
    variables: {
      bg: "#ffffff",
      fg: "#212529",
      primary: "#d4bb76",
      secondary: "#91763e",
      radius: "30px",
      headingName: "Playfair Display",
      bodyName: "Roboto",
    },
    structure: { list: "Wines", detail: "Wine", card: "Product card" },
    special: {
      title: "Every drop counts",
      text: "Offers, stories and events are built from alternating content blocks, joined by the brand’s own gold line and a drop that falls into place.",
      images: [
        { src: `${BASE}/one-system/beres/special-story.webp`, size: [1717, 847], alt: "Béres content block about the 20-year-old estate" },
        { src: `${BASE}/one-system/beres/special-banner.webp`, size: [1920, 635], alt: "Béres dark banner about the Lőcse vineyard" },
      ],
      layout: "drip",
    },
  },
  {
    id: "aroom",
    name: "AROOM",
    kind: "Escape rooms",
    cover: `${BASE}/one-system/aroom/cover.webp`,
    mockup: {
      header: piece("aroom", "header", [1524, 92], [6, 4, 1512, 80]),
      hero: piece("aroom", "hero", [1512, 600]),
      cards: [piece("aroom", "room1", [600, 557]), piece("aroom", "card2", [336, 378])],
      buttons: [piece("aroom", "button1", [145, 41]), piece("aroom", "button2", [165, 41])],
      form: piece("aroom", "form", [1296, 706]),
    },
    variables: {
      bg: "#ffffff",
      fg: "#1b2745",
      primary: "#1b2745",
      secondary: "#eabc00",
      radius: "6px",
      headingName: "Oxanium",
      bodyName: "Roboto",
    },
    structure: { list: "Rooms, bookings", detail: "Room", card: "Room card" },
    special: {
      title: "Booking at a glance",
      text: "Every room’s free slots on one screen, with discounts and unlocks marked, and filters for families and team sizes.",
      images: [{ src: `${BASE}/one-system/aroom/special-booking.webp`, size: [1296, 841], alt: "AROOM booking view with each room’s time slots" }],
      layout: "single",
    },
  },
  {
    id: "szamos",
    name: "Szamos",
    kind: "Chocolate school",
    cover: `${BASE}/one-system/szamos/cover.webp`,
    mockup: {
      header: piece("szamos", "header", [1524, 78], [6, 4, 1512, 66]),
      hero: piece("szamos", "hero", [1296, 447]),
      cards: [piece("szamos", "card1", [416, 448]), piece("szamos", "card2", [416, 448])],
      buttons: [piece("szamos", "button1", [150, 33]), piece("szamos", "button2", [172, 33])],
      form: piece("szamos", "form", [1316, 596], [10, 6, 1296, 576]),
      heroFocus: "right",
    },
    variables: {
      bg: "#ffffff",
      fg: "#212529",
      primary: "#bf244d",
      secondary: "#49181b",
      radius: "2px",
      headingName: "Raleway",
      bodyName: "Open Sans",
    },
    structure: { list: "Courses, programmes", detail: "Course", card: "Course card" },
    special: {
      title: "Programmes, not products",
      text: "Courses, team building and gift cards moved onto the same list and detail templates, and the whole site was checked against WCAG.",
      images: [
        { src: `${BASE}/one-system/szamos/special-form.webp`, size: [856, 1311], alt: "Szamos team building request form with a date picker" },
        { src: `${BASE}/one-system/szamos/special-giftcard.webp`, size: [1296, 450], alt: "Szamos gift card block" },
        { src: `${BASE}/one-system/szamos/special-newsletter.webp`, size: [1296, 486], alt: "Szamos newsletter sign-up" },
      ],
      layout: "side",
    },
  },
];

export const contact = {
  email: "torokliliana.gd@gmail.com",
  phone: "+36 (20) 441 0941",
  phoneHref: "tel:+36204410941",
};

export const portrait = `${CDN}/IkhRzmjkiXgkgd5qEhTtHJU5XPs.png`;

export const alsoMe = [
  "VC9D27zD0rliRvF9HWVyQo3WuBA.png",
  "Bgop64yvRfovVBSkG2CqPORMiU.png",
  "r9fjXy5kV9sf7WkasjmO6fXqFI.jpg",
  "EOAtlhJ6jcB9n3uMZpACiPoqo.jpeg",
  "I7LzeB9zgMCE6kIH6mX5HVqrmI.jpeg",
  "RGYr5Z6cuGMQYjEKQXTzEXciJ48.jpeg",
  "XrKoPRNHC2C3QVZAvnvavYyqY.jpeg",
  "v8jbq88DVD3v1xg0x4VElw12uDU.jpg",
  "qkQi2cq4byHCiMmRSfMcouoDs8.png",
  "FhvF6WPLDhb2i2zmO4wizUgXyeU.jpeg",
  "hiys2XH2yNnK77iJ7TuvwJvXRs.jpeg",
  "iv0gt0nmX5f4Xtp76vwQGFuR4A.jpeg",
  "0Wx2DxwpVyUeOmCqxcBpsmVFCA.png",
  "dZIIvNbPlbL3qiuymZkKKFnyM.jpeg",
  "OWbMeCpiENwNxVohjtfiQslK1fg.png",
  "ehZ5XXSr6NTmfEHGUb3XlQJ8bjA.jpeg",
].map((file) => `${CDN}/${file}`);

export const faqs = [
  {
    question: "Do I get to pick the snacks while we brainstorm?",
    answer:
      "We can agree on this! Snacks are a non-negotiable part of my creative process 😄 I have a personal tier list of chips (yes, really) and I always keep a stash at home. Salty-sweet combos are my favorite, and I love trying unique international flavors. A good snack can even make tricky tasks a lot more fun.",
  },
  {
    question: "How many cups of coffee does it take to make magic happen?",
    answer:
      "Just 1 or 2 cups of coffee… or a matcha if I’m feeling fancy. That little boost is usually all I need to focus and turn ideas into workable, creative solutions — small cup, big ideas.",
  },
  {
    question: "What happens if we accidentally make the next big thing together?",
    answer:
      "We’d celebrate a little 😄, then focus on making sure the idea actually works, delivers real value, and can scale. The best part? Watching something grow from a spark into a product that truly makes an impact — all with an awesome team.",
  },
  {
    question: "How does the creative chaos start?",
    answer:
      "I start by gathering all the info I can — best practices, bad practices, anything that helps me understand the problem. Then comes the fun part: a full-on brainstorm in my head, sketches everywhere, ideas bouncing off the walls 😅. Slowly, the chaos starts to settle, patterns emerge, and bit by bit the concept takes shape. Working closely with developers along the way helps me refine the details until it’s ready for launch — messy, fun, and always learning.",
  },
];

export const services = [
  "Product design",
  "UX & UI design",
  "Prototyping",
  "Design systems",
  "Vibe coding",
  "Dev handoff",
];
