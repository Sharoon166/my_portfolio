import {
  appwrite,
  css,
  claude,
  cloudinary,
  edge,
  express,
  git,
  github,
  graphql,
  gsap,
  heroUI,
  html,
  javascript,
  mongo,
  motion,
  next,
  nextjs,
  nodejs,
  notion,
  openAI,
  postgresql,
  postman,
  reactRouter,
  react,
  shadcn,
  tailwindcss,
  tanstack,
  typescript,
  vercel,
  vite,
  vsCode,
  windsurf,
  zenBrowser,
  zustand,
} from "./assets/technologies";
import type { MinorProjectCardProps } from "./components/home/minor-project-card";
import type { ProjectCardProps, ProjectCategory } from "./components/home/project-card";

export const profile = {
  name: "Sharoon Shaleem",
  resume: "/Sharoon-Shaleem.pdf",
  resumeLink:
    "https://drive.google.com/file/d/1gpLw3Yi4TKH_Voi6klOKW1uxBFcDSYR6/view?usp=drive_link",
  email: "ssharoon166@gmail.com",
  emailLink: "mailto:ssharoon166@gmail.com",
  github: "https://github.com/Sharoon166",
  linkenIn: "https://www.linkedin.com/in/sharoon-shaleem-0a7a85226/",
  instagram: "https://www.instagram.com/sharoonshaleem/",
  meeting: "https://cal.com/sharoon-shaleem/30min",
};

export const technologiesCollection = {
  appwrite: { name: "Appwrite", icon: appwrite },
  css: { name: "CSS", icon: css },
  claude: { name: "Claude", icon: claude },
  cloudinary: { name: "Cloudinary", icon: cloudinary },
  edge: { name: "Edge", icon: edge },
  express: { name: "Express", icon: express },
  git: { name: "Git", icon: git },
  github: { name: "GitHub", icon: github },
  graphql: { name: "GraphQL", icon: graphql },
  gsap: { name: "GSAP", icon: gsap },
  heroUI: { name: "Hero UI", icon: heroUI },
  html: { name: "HTML", icon: html },
  javascript: { name: "JavaScript", icon: javascript },
  mongodb: { name: "MongoDB", icon: mongo },
  motion: { name: "Motion", icon: motion },
  next: { name: "Next.js", icon: next },
  nextjs: { name: "Next.js", icon: nextjs },
  nodejs: { name: "Node.js", icon: nodejs },
  notion: { name: "Notion", icon: notion },
  chatgpt: { name: "ChatGPT", icon: openAI },
  postgresql: { name: "PostgreSQL", icon: postgresql },
  postman: { name: "Postman", icon: postman },
  reactrouter: { name: "React Router", icon: reactRouter },
  react: { name: "React", icon: react },
  shadcn: { name: "Shadcn", icon: shadcn },
  tailwindcss: { name: "Tailwind CSS", icon: tailwindcss },
  tanstackQuery: { name: "TanStack Query", icon: tanstack },
  typescript: { name: "TypeScript", icon: typescript },
  vercel: { name: "Vercel", icon: vercel },
  vite: { name: "Vite", icon: vite },
  vscode: { name: "VS Code", icon: vsCode },
  windsurf: { name: "Windsurf", icon: windsurf },
  zenBrowser: { name: "Zen Browser", icon: zenBrowser },
  zustand: { name: "Zustand", icon: zustand },
};

export const technologies: (keyof typeof technologiesCollection)[] = [
  "html",
  "css",
  "tailwindcss",
  "shadcn",
  "javascript",
  "typescript",
  "react",
  "reactrouter",
  "zustand",
  "motion",
  "appwrite",
  "express",
  "nodejs",
  "mongodb",
  "postgresql",
  "next",
  "tanstackQuery",
] as const;

export const tools: (keyof typeof technologiesCollection)[] = [
  "git",
  "github",
  "postman",
  "vercel",
  "vite"
] as const;

export const projects: ProjectCardProps[] = [{
  title: "Diniiz",
  description: "Restaurant management application with order, customer, and analytics features, built during work at Synctom. Includes realtime notifications, messaging, and reservation visualization on an interactive floor canvas 🤯",
  image: "/projects/diniiz.png",
  githubUrl: "",
  previewUrl: "https://diniiz.com",
  technologies: ["react", "reactrouter", "tailwindcss", "shadcn", "nodejs", "express", "mongodb", "cloudinary"],
  themeColor: "#0C9CDC",
  categories: ["Full Stack", "Dashboard"],
  caseStudyId: "diniiz",
},
{
  title: "Newon",
  description: "A centralized operations platform for inventory, invoicing, and financial management, built solo for a real business client.",
  image: "/projects/newon.webp",
  githubUrl: "",
  previewUrl: "",
  technologies: ["tailwindcss", "next", "typescript", "shadcn", "mongodb"],
  themeColor: "#cb743f",
  categories: ["Full Stack", "Dashboard"],
  caseStudyId: "newon",
},
{
  title: "Reverie",
  description: "Internal operations platform built for Synctom to manage clients, finances, leads, and team operations in one place.",
  image: "/projects/reverie.jpg",
  githubUrl: "",
  previewUrl: "",
  technologies: ["tailwindcss", "next", "typescript", "shadcn", "appwrite"],
  themeColor: "#FACA3F",
  categories: ["Full Stack", "Dashboard"],
  caseStudyId: "reverie",
},
{
  title: "Brake Time",
  description: "A powerful admin dashboard for Braketime's backoffice, streamlining employee records, customer data, and inventory management. 💼📊",
  githubUrl: "https://github.com/Sharoon166/brake-time",
  previewUrl: "https://brake-time.vercel.app",
  image: "/projects/brake-time.png",
  technologies: ["tailwindcss", "next", "heroUI"],
  themeColor: "#1ECF76",
  categories: ["Dashboard", "Frontend"],
},
{
  title: "Metrics",
  description: "Blue-themed dashboard template with a sleek design and comprehensive features for business analytics and data visualization. It was built just for fun 😜",
  githubUrl: "https://github.com/Sharoon166/dashboard-pixelz",
  previewUrl: "https://pixelz-dashboard.vercel.app",
  image: "/projects/metrics.webp",
  technologies: ["react", "tailwindcss", "shadcn", "motion"],
  themeColor: "#6160ff",
  categories: ["Dashboard", "Frontend"],
},
{
  title: "Animadom",
  description:
    "Animadom is a sleek platform for anime lovers, offering genre-based exploration and detailed insights. 🎌✨ Dive into the world of anime with ease!",
  githubUrl: "https://github.com/Sharoon166/Animadom",
  previewUrl: "https://animadom.vercel.app",
  image: "/projects/animadom.png",
  technologies: ["tailwindcss", "shadcn", "reactrouter", "typescript", "graphql", "motion"],
  themeColor: "#00abc2",
  categories: ["Frontend", "Full Stack"],
  caseStudyId: "animadom",
},
{
  title: "Audix",
  description:
    "An interactive earbuds showcase with smooth animations and view-transitions. 🎧✨ Explore premium audio devices!",
  githubUrl: "https://github.com/Sharoon166/audix",
  previewUrl: "https://audixs.vercel.app/",
  image: "/projects/audix.png",
  technologies: ["tailwindcss", "next", "motion"],
  themeColor: "#9FDAEC",
  categories: ["Frontend"],
},
{
  title: "Mangadom",
  description: "Discover and explore a vast collection of manga titles. Browse genres and dive into captivating stories from our extensive library. 📚✨",
  githubUrl: "https://github.com/Sharoon166/mangadom",
  previewUrl: "https://mangadom.vercel.app/",
  image: "/projects/mangadom.png",
  technologies: ["tailwindcss", "shadcn", "next"],
  themeColor: "#6B7280",
  categories: ["Frontend"],
},
{
  title: "Samurai Systems",
  description:
    "A practice project focused on replicating a high-end design and mastering complex GSAP animations in Next.js.",
  githubUrl: "https://github.com/Sharoon166/Samurai_Systems",
  previewUrl: "https://samurai-systems166.vercel.app/",
  image: "/projects/samurai-systems.png",
  technologies: ["next", "tailwindcss", "gsap"],
  themeColor: "#E74B4F",
  categories: ["Frontend", "Web Design"],
  caseStudyId: "samurai-systems",
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
  categories: ["Frontend", "Web Design"],
},
{
  title: "Voyager",
  description:
    "A sleek tourism website design, showcasing destinations, travel guides, and curated experiences for adventurers.",
  githubUrl: "https://github.com/Sharoon166",
  previewUrl: "https://voyagertravels.vercel.app",
  image: "/projects/voyager.png",
  technologies: ["html", "tailwindcss", "vite"],
  themeColor: "#CCF32F",
  categories: ["Web Design", "Frontend"],
},
];

export interface Testimonial {
  name: string;
  designation: string;
  testimony: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  location: string;
  desc: string;
  tags?: string[];
  type: string;
  icon?: string;
  testimonial?: Testimonial;
  technologies?: (keyof typeof technologiesCollection)[];
}

export const experience: ExperienceItem[] = [
  {
    id: "01",
    period: "July 2025 – April 2026",
    company: "Synctom",
    role: "Web Developer",
    location: "Full-time",
    desc: "• Built Diniiz — a restaurant management platform with realtime order tracking, interactive floor canvas for reservations, and live messaging\n• Solo-developed Newon — a centralized operations platform for inventory, invoicing, and financial management for a production client\n• Developed Reverie — internal business management platform for streamlining Synctom's day-to-day operations\n• Assisted in development of official Synctom website.",
    // tags: ["React", "Node.js", "MongoDB", "Next.js"],
    type: "Work",
    icon: "briefcase",
    testimonial: {
      name: "Ali Taqi",
      designation: "CEO @ Synctom",
      testimony: "I've had the pleasure of working with Sharoon, and I can confidently say he is a highly capable and dependable Frontend Developer. He consistently transforms complex ideas into clean, responsive, and visually polished interfaces.",
    },
    technologies: ["react", "next", "nodejs", "mongodb", "tailwindcss", "typescript"],
  },
  {
    id: "02",
    period: "Sep 2022 – Oct 2026",
    company: "NUML",
    role: "Student",
    location: "University",
    desc: "My time at NUML has been about much more than just a degree—it's where my interest in tech actually turned into a career. From high-level theory to practical software engineering, this journey has been shaped by the people I've met and the challenges we've tackled together.\n\n• Maintaining a 3.9 CGPA while diving into the heavy stuff like Data Structures, Algorithms, and OS\n• Won the Visio Spark Quiz at COMSATS Wah Campus with my best friend (one of my favorite highlights so far)\n• Getting hands-on with DBMS and Software Engineering through collaborative, real-world projects\n• Genuinely grateful for the teachers who actually pushed me and the friends who made the late-night debugging sessions bearable",
    tags: ["CS", "DSA", "Algorithms", "OS", "DBMS", "SDLC"],
    type: "Education",
    icon: "graduation-cap",
    technologies: ["javascript", "typescript", "html", "css"],
  },
];

export const minorProjects: MinorProjectCardProps[] = [
  {
    title: "Z Digitizing",
    description: "A modern portfolio showcasing 10+ years of unique embroidery designs and craftsmanship.",
    liveUrl: "https://z-digitizing.vercel.app/",
    technologies: ["react", "tailwindcss", "motion", "vite"],
  },
  {
    title: "DevHive",
    description: "A modern developer community platform where tech professionals can connect, share knowledge, and stay updated with the latest industry trends.",
    liveUrl: "https://devhsr.vercel.app/",
    technologies: ["next", "tailwindcss", "typescript", "appwrite", "shadcn"],
  },
];

export const skillCategories = [
  {
    title: "Frontend Development",
    skills: ["next", "react", "typescript", "javascript", "tailwindcss", "shadcn", "reactrouter", "zustand", "motion", "html", "css"] as (keyof typeof technologiesCollection)[]
  },
  {
    title: "Backend & Database",
    skills: ["nodejs", "express", "mongodb", "postgresql", "appwrite"] as (keyof typeof technologiesCollection)[]
  },
  {
    title: "Tools & Libraries",
    skills: ["tanstackQuery", "git", "github", "postman", "vercel", "vite"] as (keyof typeof technologiesCollection)[]
  }
];
