import {
  css,
  edge,
  express,
  git,
  github,
  graphql,
  gsap,
  html,
  javascript,
  mongo,
  motion,
  next,
  nextjs,
  nodejs,
  notion,
  postgresql,
  postman,
  reactRouter,
  react,
  tailwindcss,
  typescript,
  vercel,
  vite,
  vsCode,
  zustand,
} from "./assets/technologies";
import type { MinorProjectCardProps } from "./components/home/minor-project-card";
import type { ProjectCardProps } from "./components/home/project-card";

export const profile = {
  name: "Sharoon Shaleem",
  resume: "/Sharoon-Shaleem.pdf",
  resumeLink:
    "https://drive.google.com/file/d/18W8xMA8vyjzY1XjCGQn9HhEXvyWVAbY-/view?usp=sharing",
  email: "ssharoon166@gmail.com",
  emailLink: "mailto:ssharoon166@gmail.com",
  whatsapp: "+92-315-5417036",
  whatsappLink: "https://wa.me/923155417036",
  github: "https://github.com/Sharoon166",
  linkenIn: "https://www.linkedin.com/in/sharoon-shaleem-0a7a85226/",
  instagram: "https://www.instagram.com/sharoonshaleem/",
  meeting: "https://cal.com/sharoon-shaleem/30min",
};

export const technologiesCollection = {
  css: { name: "CSS", icon: css },
  edge: { name: "Edge", icon: edge },
  express: { name: "Express", icon: express },
  git: { name: "Git", icon: git },
  github: { name: "GitHub", icon: github },
  graphql: { name: "GraphQL", icon: graphql },
  gsap: {name: "GSAP", icon: gsap},
  html: { name: "HTML", icon: html },
  javascript: { name: "JavaScript", icon: javascript },
  mongodb: { name: "MongoDB", icon: mongo },
  motion: {name: "Motion", icon: motion},
  next: { name: "Next.js", icon: next },
  nextjs: { name: "Next.js", icon: nextjs },
  nodejs: { name: "Node.js", icon: nodejs },
  notion: { name: "Notion", icon: notion },
  postgresql: { name: "PostgreSQL", icon: postgresql },
  postman: { name: "Postman", icon: postman },
  reactrouter: { name: "React Router", icon: reactRouter },
  react: { name: "React", icon: react },
  tailwindcss: { name: "Tailwind CSS", icon: tailwindcss },
  typescript: { name: "TypeScript", icon: typescript },
  vercel: { name: "Vercel", icon: vercel },
  vite: { name: "Vite", icon: vite },
  vscode: { name: "VS Code", icon: vsCode },
  zustand: { name: "Zustand", icon: zustand },
};

export const technologies: (keyof typeof technologiesCollection)[] = [
  "html",
  "css",
  "tailwindcss",
  "javascript",
  "typescript",
  "vite",
  "react",
  "reactrouter",
  "zustand",
  "motion",
  "express",
  "nodejs",
  "mongodb",
  "postgresql",
  "next",
] as const;

export const tools: (keyof typeof technologiesCollection)[] = [
  "vscode",
  "git",
  "github",
  "postman",
  "vercel",
] as const;

export const projects: ProjectCardProps[] = [
  {
    title: "Animadom",
    description:
      "Animadom is a sleek platform for anime lovers, offering genre-based exploration and detailed insights. 🎌✨ Dive into the world of anime with ease!",
    githubUrl: "https://github.com/Sharoon166/Animadom",
    previewUrl: "https://animadom.vercel.app",
    image: "/projects/animadom.png",
    technologies: ["tailwindcss", "next", "typescript", "graphql", "gsap"],
    themeColor: "#FCDF47",
  },
  {
    title: "Voyager",
    description:
      "A sleek tourism website design, showcasing destinations, travel guides, and curated experiences for adventurers.",
    githubUrl: "https://github.com/Sharoon166",
    previewUrl: "https:voyagertravels.vercel.app",
    image: "/projects/voyager.png",
    technologies: ["html", "tailwindcss", "vite"],
    themeColor: "#CCF32F",
  },
  {
    title: "Samurai Systems",
    description:
      "A sleek, dark-themed landing page for a startup IT company, highlighting its expertise in cybersecurity, IT infrastructure, and digital transformation.",
    githubUrl: "https://github.com/Sharoon166/Samurai_Systems",
    previewUrl: "https://samurai-systems166.vercel.app/",
    image: "/projects/samurai-systems.png",
    technologies: ["next", "tailwindcss", "gsap"],
    themeColor: "#E74B4F",
  },
  {
    title: "Halal Devco.",
    description:
      "A sleek website for Halal DevCo, showcasing halal investment opportunities, industry growth, and sustainable innovation. ",
    githubUrl: "https://github.com/Sharoon166/halal_devco_frontend",
    previewUrl: "https://halal-devco.vercel.app/",
    image: "/projects/halal-devco.png",
    technologies: ["next", "tailwindcss"],
    themeColor: "#64B166",
  },
];

export const minorProjects: MinorProjectCardProps[] = [];
