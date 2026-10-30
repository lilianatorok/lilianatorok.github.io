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
    slug: "factor",
    type: "Dolor sit",
    year: "2024",
    name: "Factor-MES",
    subtitle: "Case study",
    cover: `${CDN}/gBifZZX8JH7uu1UWzj6TGXj7xds.png`,
    images: [{ src: `${CDN}/Fm7s4bFpwJSDvlXdwQY0bdDOK0.gif`, width: 1920, height: 13039, alt: "Factor-MES case study" }],
  },
  {
    slug: "szamos",
    type: "Amet elit",
    year: "2023",
    name: "Szamos",
    subtitle: "Chocolate school",
    cover: `${CDN}/t0Pff8K4jD70Mv2iBSh20Hxhw.png`,
    images: [{ src: `${CDN}/GcEDGgTWP7QbxxSlepF412dR7G0.png`, width: 1920, height: 25840, alt: "Szamos chocolate school case study" }],
  },
  {
    slug: "maklary",
    type: "Sed tempor",
    year: "2022",
    name: "Makláry",
    subtitle: "Fine art gallery",
    cover: `${CDN}/8Ydu0FPqHW0iyPT6LQ6YUAdEHKs.png`,
    images: [{ src: `${CDN}/Qiu2VquYrLTkD5zTLMoWnjvzT0.png`, width: 1920, height: 27100, alt: "Maklary's fine art gallery case study" }],
  },
  {
    slug: "total",
    type: "Ut labore",
    year: "2021",
    name: "Totál-Épker",
    subtitle: "Case study",
    cover: `${CDN}/wTJCohDqICYhg8cL2iwlkPn2LQ.png`,
    images: [{ src: `${CDN}/rNIhX2eqI1cfIDwlpbifg0wbGYo.png`, width: 1920, height: 21900, alt: "Totál-Épker case study" }],
  },
  {
    slug: "beres",
    type: "Magna aliqua",
    year: "2020",
    name: "Béres",
    subtitle: "Vineyards and winery",
    cover: `${CDN}/wnyGECh3Fz5lGlTK3uYki9TEBY.png`,
    images: [{ src: `${CDN}/cDn0alDAWrp3hPFqrNVS90SBx8.gif`, width: 1920, height: 15393, alt: "Béres vineyards and winery case study" }],
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
