const CDN = "https://framerusercontent.com/images";

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
  role?: string;
  timeline?: string;
  challenges?: string;
  sections?: Section[];
};

export const projects: Project[] = [
  {
    slug: "kh",
    type: "Lorem ipsum",
    year: "2025",
    name: "K&H",
    subtitle: "Bank group",
    cover: `${CDN}/yfILBw04ZGvgE2VWBmoQt2I0U.png`,
    role: "Product designer",
    timeline: "March 2025 – present",
    challenges: "High volume of projects, small team, tight deadlines",
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
    year: "2024",
    name: "One System",
    subtitle: "Four brands, one CMS",
    cover: `${CDN}/wTJCohDqICYhg8cL2iwlkPn2LQ.png`,
    images: [],
  },
  {
    slug: "factor",
    type: "Dolor sit",
    year: "2024",
    name: "Factor-MES",
    subtitle: "Case study",
    cover: `${CDN}/gBifZZX8JH7uu1UWzj6TGXj7xds.png`,
    images: [{ src: `${CDN}/Fm7s4bFpwJSDvlXdwQY0bdDOK0.gif`, width: 1920, height: 13039, alt: "Factor-MES case study" }],
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
  surface: string;
  fg: string;
  accent: string;
  onAccent: string;
  headerBg: string;
  headerFg: string;
  radius: string;
  heading: string;
  body: string;
  headingName: string;
  bodyName: string;
};

export type Brand = {
  id: string;
  name: string;
  kind: string;
  cover: string;
  logo: string;
  nav: string[];
  hero: { title: string; text: string; action: string; image: CropArea };
  cards: { title: string; meta: string; price: string; image: CropArea }[];
  cardAction: string;
  variables: BrandVariables;
  structure: { list: string; detail: string; card: string };
  added: { title: string; text: string; image: CropArea };
};

const maklary = { src: `${CDN}/Qiu2VquYrLTkD5zTLMoWnjvzT0.png`, width: 1920, height: 27100 };
const beres = { src: `${CDN}/cDn0alDAWrp3hPFqrNVS90SBx8.gif`, width: 1920, height: 15393 };
const total = { src: `${CDN}/rNIhX2eqI1cfIDwlpbifg0wbGYo.png`, width: 1920, height: 21900 };
const szamos = { src: `${CDN}/GcEDGgTWP7QbxxSlepF412dR7G0.png`, width: 1920, height: 25840 };

export const brands: Brand[] = [
  {
    id: "maklary",
    name: "Makláry",
    kind: "Fine art gallery",
    cover: `${CDN}/8Ydu0FPqHW0iyPT6LQ6YUAdEHKs.png`,
    logo: "Kálmán Makláry Fine Arts",
    nav: ["Artists", "Exhibitions", "Shop", "News"],
    hero: {
      title: "Modern & contemporary gallery",
      text: "Artists of the Post-War School of Paris.",
      action: "See exhibitions",
      image: { ...maklary, x: 590, y: 792, w: 750, h: 500 },
    },
    cards: [
      { title: "Reigl Judit 100", meta: "Exhibition", price: "2024", image: { ...maklary, x: 1224, y: 9090, w: 432, h: 324 } },
      { title: "Judit Reigl", meta: "Artist", price: "Paris", image: { ...maklary, x: 682, y: 14784, w: 278, h: 360 } },
      { title: "Abstract work", meta: "Artwork", price: "On request", image: { ...maklary, x: 206, y: 10584, w: 210, h: 150 } },
    ],
    cardAction: "More",
    variables: {
      bg: "#ffffff",
      surface: "#eae9e9",
      fg: "#212121",
      accent: "#e30613",
      onAccent: "#ffffff",
      headerBg: "#ffffff",
      headerFg: "#212121",
      radius: "0px",
      heading: "var(--font-cinzel)",
      body: "var(--font-crimson)",
      headingName: "Trajan Pro",
      bodyName: "Crimson Text",
    },
    structure: { list: "Artists, exhibitions, news", detail: "Artwork, exhibition", card: "Art card" },
    added: {
      title: "One card, many jobs",
      text: "A single main card holds every element. Switching elements off turns it into an artist, artwork, exhibition, news or book card.",
      image: { ...maklary, x: 168, y: 10480, w: 1560, h: 640 },
    },
  },
  {
    id: "beres",
    name: "Béres",
    kind: "Vineyards and winery",
    cover: `${CDN}/wnyGECh3Fz5lGlTK3uYki9TEBY.png`,
    logo: "Béres Tokaj",
    nav: ["Borok", "A birtok", "Család", "Kapcsolat"],
    hero: {
      title: "Minden cseppje Béres",
      text: "Tokaji borok a családi birtokról.",
      action: "Borok megtekintése",
      image: { ...beres, x: 96, y: 7368, w: 816, h: 456 },
    },
    cards: [
      { title: "Tokaji Aszú", meta: "6 puttonyos", price: "8 000 Ft", image: { ...beres, x: 1290, y: 5832, w: 160, h: 648, contain: true } },
      { title: "Lőcse Furmint", meta: "Száraz", price: "24 000 Ft", image: { ...beres, x: 150, y: 6620, w: 1170, h: 370, contain: true } },
      { title: "Hárslevelű", meta: "Édes", price: "5 400 Ft", image: { ...beres, x: 830, y: 125, w: 110, h: 355, contain: true } },
    ],
    cardAction: "Kosárba",
    variables: {
      bg: "#fffdf7",
      surface: "#f4ecd8",
      fg: "#1d1a14",
      accent: "#d2b26a",
      onAccent: "#1d1a14",
      headerBg: "#fffdf7",
      headerFg: "#1d1a14",
      radius: "2px",
      heading: "var(--font-playfair)",
      body: "var(--font-roboto)",
      headingName: "Playfair Display",
      bodyName: "Roboto",
    },
    structure: { list: "Wines", detail: "Wine", card: "Product card" },
    added: {
      title: "A card for the best wines",
      text: "Next to the default product card came a featured one for seasonal wines, and the product page got tabs for the wine details.",
      image: { ...beres, x: 72, y: 5808, w: 1728, h: 1248 },
    },
  },
  {
    id: "total",
    name: "Totál-Épker",
    kind: "Building materials webshop",
    cover: `${CDN}/wTJCohDqICYhg8cL2iwlkPn2LQ.png`,
    logo: "totálEPKER",
    nav: ["Termékek", "Hírek", "Ajánlat", "Kapcsolat"],
    hero: {
      title: "Szakértelem minden felületre",
      text: "Festékek és építőanyagok egy helyen.",
      action: "Termékek",
      image: { ...total, x: 984, y: 6384, w: 864, h: 840 },
    },
    cards: [
      { title: "Héra Gold falfesték", meta: "Beltéri, 3 kiszerelés", price: "12 320 Ft", image: { ...total, x: 144, y: 19488, w: 456, h: 336 } },
      { title: "Dulux falfesték", meta: "Beltéri, 10 szín", price: "9 500 Ft", image: { ...total, x: 840, y: 12985, w: 264, h: 239 } },
      { title: "Héra Gold 10 L", meta: "Beltéri", price: "9 500 Ft", image: { ...total, x: 840, y: 12360, w: 240, h: 216 } },
    ],
    cardAction: "Kosárba",
    variables: {
      bg: "#f6f4ea",
      surface: "#ffffff",
      fg: "#003b21",
      accent: "#ede937",
      onAccent: "#003b21",
      headerBg: "#003b21",
      headerFg: "#ffffff",
      radius: "12px",
      heading: "var(--font-poppins)",
      body: "var(--font-poppins)",
      headingName: "Poppins",
      bodyName: "Poppins",
    },
    structure: { list: "Paints and materials", detail: "Product", card: "Product card" },
    added: {
      title: "Variations in the list",
      text: "A new product card lets customers add any mix of colours and sizes to the cart straight from the listing, without opening the detail page.",
      image: { ...total, x: 120, y: 20760, w: 1656, h: 640 },
    },
  },
  {
    id: "szamos",
    name: "Szamos",
    kind: "Chocolate school",
    cover: `${CDN}/t0Pff8K4jD70Mv2iBSh20Hxhw.png`,
    logo: "Szamos Csokoládé Iskola",
    nav: ["Kurzusok", "Programok", "Ajándékkártya", "Kapcsolat"],
    hero: {
      title: "Indul a tavaszi csokoládé műhely",
      text: "Készítsd el a saját bonbonjaidat a mestercukrászokkal.",
      action: "Tavaszi kurzusok",
      image: { ...szamos, x: 200, y: 4008, w: 1650, h: 1100 },
    },
    cards: [
      { title: "Macaron", meta: "Kurzus", price: "Tavasz", image: { ...szamos, x: 854, y: 15796, w: 120, h: 90 } },
      { title: "Le croissant", meta: "Kurzus", price: "Tavasz", image: { ...szamos, x: 1190, y: 15796, w: 120, h: 90 } },
      { title: "Cukrászkurzus", meta: "Kurzus", price: "Tavasz", image: { ...szamos, x: 1460, y: 15796, w: 120, h: 90 } },
    ],
    cardAction: "Részletek",
    variables: {
      bg: "#fbf6f7",
      surface: "#ffffff",
      fg: "#4a1a1e",
      accent: "#c2204f",
      onAccent: "#ffffff",
      headerBg: "#ffffff",
      headerFg: "#4a1a1e",
      radius: "6px",
      heading: "var(--font-merriweather)",
      body: "var(--font-raleway)",
      headingName: "Merriweather",
      bodyName: "Raleway",
    },
    structure: { list: "Courses, programmes", detail: "Course", card: "Course card" },
    added: {
      title: "Programmes, not products",
      text: "Courses, team building and gift cards moved onto the same list and detail templates, and the whole site was checked against WCAG.",
      image: { ...szamos, x: 840, y: 15480, w: 816, h: 1056 },
    },
  },
];

export const contact = {
  email: "torokliliana.gd@gmail.com",
  phone: "+36 (20) 441 0941",
  phoneHref: "tel:+36204410941",
  linkedin: "https://www.linkedin.com/in/liliána-török-4a4140225",
};

export const portrait = `${CDN}/IkhRzmjkiXgkgd5qEhTtHJU5XPs.png`;

export const alsoMe = [
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

export const services = [
  "Product design",
  "UX & UI design",
  "Prototyping",
  "Design systems",
  "Vibe coding",
  "Dev handoff",
];
