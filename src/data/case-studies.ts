export interface Challenge {
  challenge: string;
  solution: string;
}

export interface TechStack {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  api?: string[];
  services?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  type: string;
  status: string;
  year: string;
  context: string;
  role: string;
  private: boolean;
  privateNote?: string;
  githubUrl?: string;
  previewUrl?: string;
  themeColor: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: TechStack;
  categories: string[];
  challenges: Challenge[];
  outcome: string;
  learnings: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  diniiz: {
    id: "diniiz",
    title: "Diniiz",
    tagline: "All-in-one restaurant management platform built for real clients",
    type: "Full-stack Web Application",
    status: "Production",
    year: "June 2025 – November 2025",
    context: "Built during employment at Synctom, Islamabad. Deployed to real restaurant clients.",
    role: "Frontend Developer",
    private: true,
    privateNote: "Proprietary codebase — developed during employment at Synctom",
    previewUrl: "https://diniiz.com",
    themeColor: "#0C9CDC",
    overview: "Diniiz is a production-grade restaurant management platform built for real restaurant businesses at Synctom. It consolidates reservations, order management, staff coordination, customer tracking, and location administration into a single role-aware interface. The platform was actively used by real clients before being temporarily taken offline due to internal changes at Synctom.",
    problem: "Restaurant owners were juggling reservations, staff coordination, and customer records across disconnected tools — spreadsheets, WhatsApp groups, and paper logs. There was no single system that gave owners, managers, and staff a shared view of what was happening on the floor in real time. And for clients with their own websites, there was no easy way to let customers book a table without building something from scratch.",
    solution: "A unified platform where every role — owner, manager, staff — sees exactly what they need. Live floor status, reservation management, staff coordination, customer history, and analytics all in one place. Paired with an embeddable reservation widget that any client could drop into their existing website with a single script tag.",
    features: [
      "Interactive floor canvas with live table status (available, occupied, reserved) powered by WebSockets",
      "Drag-and-drop floor layout builder — owners design their actual floor plan including table placement",
      "Embeddable reservation widget via <script> tag — renders a custom web component compatible with WordPress and SPAs",
      "Widget supports brand color customization with full palette generated from a single primary color",
      "Featured event display in widget — shows events at that location and marks slots held for specific events",
      "Role-based access control — distinct views and permissions for owners, managers, and staff",
      "Multi-location admin management",
      "Customer tracking with full visit history and profiles",
      "Guestbook for capturing and managing walk-in and returning guest records",
      "Built-in staff messaging for coordination",
      "Analytics dashboard with revenue, order trends, and peak hour insights",
      "Realtime notifications for new reservations and order status changes",
      "Cloudinary integration for menu item image uploads"
    ],
    techStack: {
      frontend: ["React", "React Router", "Tailwind CSS", "Shadcn"],
      backend: ["Node.js", "Express"],
      database: ["MongoDB"],
      services: ["Cloudinary", "WebSockets"]
    },
    categories: ["Full Stack", "Dashboard"],
    challenges: [
      {
        challenge: "Building an embeddable widget that works anywhere",
        solution: "Architected a custom web component delivered via a single <script> tag written in vanilla JS, no framework dependencies, no setup required. Clients integrated it into WordPress sites and React apps without any code changes beyond pasting the tag. The widget handled its own state, reservation logic, event display, and brand theming in isolation."
      },
      {
        challenge: "Dynamic brand theming from a single color",
        solution: "Designed a theming system where clients provide one primary color and the widget derives a full consistent palette automatically, keeping the widget on-brand for every client without requiring design input from them."
      },
      {
        challenge: "Live floor canvas with real-time state",
        solution: "Built the interactive floor canvas with WebSocket integration so table status (available, occupied, reserved) updates instantly across all connected devices. Restaurant owners could also design their exact floor layout using a drag-and-drop builder, making the canvas a true reflection of their physical space."
      },
      {
        challenge: "Role-based UI across a complex platform",
        solution: "Implemented a role-aware frontend that renders entirely different views and access levels for owners, managers, and staff, ensuring no role sees data or controls outside their responsibility."
      }
    ],
    outcome: "Deployed to production and actively used by real restaurant clients acquired by Synctom. The platform replaced manual processes across reservations, floor management, and staff coordination. The embeddable widget was successfully integrated into client websites including WordPress and React-based sites. Platform is temporarily offline due to internal changes at Synctom and expected to return shortly.",
    learnings: "This was my first experience shipping software that real businesses depended on daily. I learned what separates a working demo from production-ready software — the widget especially taught me how to build for environments you don't control, where your code has to work cleanly inside someone else's site with zero assumptions. Real user feedback also fundamentally changed how I think about edge cases."
  },
  newon: {
    id: "newon",
    title: "Newon",
    tagline: "A centralized operations platform that replaced a client's disconnected manual tools with a single system for inventory, invoicing, and financial management.",
    type: "Full-stack Web Application",
    status: "Production",
    year: "October 2025 – January 2026",
    context: "Solely designed and developed during employment at Synctom for a real business client. Currently in active use.",
    role: "Full-stack Developer",
    private: true,
    privateNote: "Proprietary codebase — developed during employment at Synctom",
    previewUrl: "",
    themeColor: "#cb743f",
    overview: "Newon is a production-grade business management platform I designed and built entirely on my own for a real client at Synctom. It covers inventory with multi-location stock tracking and product variants, a full invoice and quotation system with GST and payment tracking, customer financial management, project budget tracking, a double-entry ledger, and role-based access control, all connected under one cohesive platform. It has been in active use since delivery and currently manages records across invoices, products, and customers.",
    problem: "The client was managing inventory, invoices, customer balances, and project budgets across disconnected tools with no unified view of anything. There was no way to know which stock was consumed by which invoice, whether a customer had an outstanding balance, or how much of a project budget had actually been spent. Every answer required manual cross-referencing across different places.",
    solution: "A centralized full-stack platform where every module talks to each other. Inventory deductions flow from invoices, customer balances update automatically from payments, project expenses track against budgets in real time, and every financial transaction lands in a ledger. I built the whole thing solo from schema design to deployment.",
    features: [
      "Product management with a flexible attributes and variants system. You define the attributes like size or color and the system generates all variants with their own individual SKUs",
      "Multi-location stock tracking across 2 locations with available and backorder stock levels per variant",
      "FIFO cost calculation across purchase batches for accurate per unit cost and profit tracking",
      "Virtual and composite products with full component breakdowns, custom expenses like materials, labor and transport, and automatic break-even calculation per item",
      "Purchase management with FIFO tracked remaining stock per purchase batch",
      "Invoice and quotation creation with multi-item support, percentage and fixed discounts, GST calculation, and support for additional charges",
      "Multiple payment methods per invoice with automatic status progression from pending to partial to paid",
      "Professional invoice printing and PDF export built with React Print and jsPDF",
      "Customer financial tracking with totalInvoiced, totalPaid, and outstandingBalance synced automatically across all transactions",
      "Double-entry ledger with support for invoices, payments, adjustments, credit notes, and debit notes",
      "Project management with budget tracking, expense tracking against projects, and a full status workflow from planning through to completion",
      "Category based expense tracking with source attribution so you know whether an expense came from a manual entry, an invoice, or a project",
      "Role-based access control for admin and staff with route protection enforced at the middleware level",
      "Auto-generated custom IDs for invoices and products so records are always organized and traceable",
      "Cloudinary integration for product image uploads and management"
    ],
    techStack: {
      frontend: ["Next", "TypeScript", "Tailwind CSS", "Shadcn UI", "React Print"],
      backend: ["Next.js API Routes", "MongoDB", "NextAuth"],
      database: ["MongoDB"],
      services: ["Cloudinary", "jsPDF"]
    },
    categories: ["Full Stack", "Dashboard"],
    challenges: [
      {
        challenge: "FIFO cost calculation across purchases",
        solution: "I built a FIFO engine that allocates stock consumption across purchase batches in chronological order, tracking remaining quantities per batch as invoices are created or edited. The tricky parts were handling identical purchase dates, correctly restoring stock when an invoice gets edited, and making sure stale data from previous calculations never corrupted the current result. It took a lot of edge case thinking to get right."
      },
      {
        challenge: "Product variant and attributes system",
        solution: "Instead of generating every possible combination upfront, I designed a schema where attributes and their allowed values are defined at the product level. When a staff member creates a variant, the system presents only the relevant attributes for that product and they pick the values that apply. This way variants are created intentionally rather than exploding into combinations nobody asked for. Each variant gets its own SKU, stock levels per location, and purchase history, and getting the embedded document structure right so queries stayed clean took several iterations."
      },
      {
        challenge: "Customer financial sync across transactions",
        solution: "Every time an invoice was created, edited, or paid, the customer's totalInvoiced, totalPaid, and outstandingBalance had to stay perfectly in sync. I used MongoDB transactions to make sure these updates were atomic and wrote migration scripts early on to fix any drift that crept in during development."
      },
      {
        challenge: "Stock deduction race conditions on invoices",
        solution: "When two invoices hit the same purchase batch simultaneously, the remaining stock count could get corrupted. I solved this using MongoDB transactions and atomic updates on the remaining field so concurrent invoice creation could never produce incorrect stock deductions."
      },
      {
        challenge: "Backend performance across interconnected modules",
        solution: "Early on the platform was slow because of chained populate calls and separate calculations running after each query. I refactored the backend to use MongoDB aggregation pipelines that compute totals, averages, and balances in a single database trip. Added proper indexing on frequently queried fields and pagination across all list endpoints. The difference in response times was significant."
      },
      {
        challenge: "Professional invoice printing",
        solution: "The client needed invoices that looked presentable enough to send to their own customers. I built a print layout in React that matched what you would expect from proper accounting software and wired it up with React Print and jsPDF so invoices could be printed directly or exported as a PDF."
      }
    ],
    outcome: "Delivered and deployed to the client through Synctom. The platform has been in active daily use since January 2026 and currently manages over 200 records across products, invoices, and customers. It replaced a collection of disconnected manual tools and gave the client a single place to run their operations.",
    learnings: "This was the most complex thing I had built on my own up to that point. Designing interconnected modules where data flows correctly between inventory, invoices, customers, and the ledger taught me to think about the whole system before touching a single line of code. The FIFO engine especially pushed me to think carefully about state, ordering, and edge cases in a way that tutorials never do. Building it solo also meant every architectural decision was mine to own and mine to fix."
  },
  reverie: {
    id: "reverie",
    title: "Reverie",
    tagline: "Internal operations platform built for Synctom to manage clients, finances, leads, and team operations in one place",
    type: "Internal Tool / Web Application",
    status: "Production",
    year: "October 2025 – December 2025",
    context: "Built collaboratively with a colleague during employment at Synctom. Used internally by the team for day to day operations.",
    role: "Full-stack Developer",
    private: true,
    privateNote: "Proprietary codebase — developed during employment at Synctom",
    previewUrl: "",
    themeColor: "#FACA3F",
    overview: "Reverie is an internal operations platform built for Synctom to replace scattered tools with a single place to manage clients, invoices, employees, leads, expenses, and quarterly financials. I built the employee management system, financial reporting, quarter closing, project tracking, and parts of the frontend UI. The rest was built by a colleague. The platform is actively used by the Synctom team for day to day operations.",
    problem: "Synctom was managing client records, employee attendance, salary payments, leads, and finances across disconnected tools with no single source of truth. There was no way to get a clear picture of quarterly performance, track which leads converted to clients, or know the cash position at any given point without manually pulling numbers from multiple places.",
    solution: "A centralized internal platform where every part of the business connects. Invoices feed into financial reports, leads convert directly into clients, employee attendance feeds into salary calculations, and quarter closing automatically handles carryovers and archives. Built with Next.js and Appwrite as the backend service.",
    features: [
      "Dashboard with KPI cards covering monthly retainer revenue, active clients, quarterly revenue, profit and loss, and cash on hand",
      "Finance charts and quarterly summaries built with Recharts",
      "Real time activity feed pulling from invoices and employee actions via Appwrite subscriptions",
      "Full invoice management with auto generated invoice numbers, line items, percentage and fixed discounts, tax configuration, and status workflow from draft through to paid or overdue",
      "PDF invoice generation with company branding, client details, line items, discounts, and payment terms via jsPDF and autotable",
      "Employee management with profile image uploads, attendance tracking with check in and check out times, monthly salary processing with optional bonuses, per employee notes, and soft delete termination",
      "CSV and Excel export for employee records",
      "Quarter closing system that validates cash position, handles withdrawals, creates automatic carryover invoices or expenses, and archives leads and invoices on close",
      "Quarterly P&L statements with revenue breakdown between retainers and projects and expense breakdown between business costs and salaries",
      "Quarterly targets with real time progress tracking across revenue, client acquisition, retainer income, and lead conversion",
      "Lead management with source tracking, status and priority workflow, assignment to employees, follow up dates, and one click conversion to client",
      "Client management with retainer tracking, financial history, and lead conversion",
      "Expense management with receipt uploads, category tracking, and approval status",
      "Project management with basic CRUD",
      "Appwrite authentication with protected routes and session management"
    ],
    techStack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Recharts"],
      backend: ["Appwrite"],
      services: ["Appwrite Auth", "Appwrite Database", "Appwrite Realtime", "jsPDF"]
    },
    categories: ["Full Stack", "Dashboard"],
    challenges: [
      {
        challenge: "Quarter closing system",
        solution: "This was the most complex thing I built in this project. Closing a quarter meant validating the quarter was still open, calculating the exact cash position, checking withdrawals against available cash, creating a system carryover record that was either an invoice or an expense depending on whether the balance was positive or negative, archiving all leads, and closing out invoices. Every step had to happen in the right order and any failure had to leave the data in a clean state. Getting the edge cases right, especially around duplicate carryover prevention and withdrawal validation, took the most time."
      },
      {
        challenge: "Financial reporting across interconnected data",
        solution: "The quarterly P&L had to pull paid invoices, expenses, and salaries, filter them correctly by quarter date ranges, separate retainer income from project income, and calculate profit margins per quarter. I used Appwrite queries to fetch only what was needed and did the aggregation on the server side to keep the client lean and the numbers accurate."
      },
      {
        challenge: "Real time activity feed",
        solution: "Used Appwrite realtime subscriptions to keep the dashboard activity feed live without polling. Any invoice update or employee action propagated to the feed instantly across all connected sessions."
      },
      {
        challenge: "Learning Appwrite under a real deadline",
        solution: "This was my first time using a BaaS in production. I had to get comfortable with Appwrite's collections model, permissions system, and realtime subscriptions while shipping features. The tradeoff of faster backend setup was absolutely worth it for an internal tool at this scale."
      }
    ],
    outcome: "Delivered and actively used by the Synctom team for managing their day to day operations. The platform gave the team a single place to track finances, employees, leads, and clients for the first time.",
    learnings: "The quarter closing system was a good lesson in thinking through stateful operations carefully. When a process touches multiple collections and has real financial consequences, the order of operations and failure handling matter a lot more than they do in typical CRUD work. It also gave me my first real experience shipping a collaborative codebase and coordinating on shared UI without stepping on each other."
  },
  animadom: {
    id: "animadom",
    title: "Animadom",
    tagline: "Anime discovery platform with genre exploration and detailed insights",
    type: "Frontend Web Application",
    status: "Live",
    year: "2023",
    context: "A collaborative project where I helped a friend build a clean, modern anime discovery platform.",
    role: "Collaborative Developer",
    private: false,
    githubUrl: "https://github.com/Sharoon166/Animadom",
    previewUrl: "https://animadom.vercel.app",
    themeColor: "#00abc2",
    overview: "Animadom is a high-performance anime discovery platform that lets users explore titles by genre, view detailed information, and discover new series. Built with GraphQL to query the AniList API, I collaborated with a friend to turn a passion for anime into a professional-grade web application. My primary focus was on the frontend architecture, GraphQL integration, and the overall motion design system.",
    problem: "Most anime discovery platforms are either cluttered with ads or suffer from slow, unintuitive interfaces. Finding new series based on specific genres or seasonal trends often feels like a chore rather than an exploration.",
    solution: "A clean, minimalist anime browser that prioritizes discovery and speed. We leveraged the AniList GraphQL API to build a highly responsive interface with advanced filtering, real-time search, and smooth, staggered animations that make browsing thousands of titles feel effortless.",
    features: [
      "Real-time anime discovery pulling trending, popular, and top-rated titles directly from the AniList API",
      "Advanced genre-based filtering allowing users to discover shows by mood, theme, or seasonal category",
      "Comprehensive title pages featuring detailed synopses, user ratings, studio information, and airing status",
      "Type-safe GraphQL integration using optimized queries to fetch precisely the data needed for each view",
      "Seamless page transitions and staggered entrance animations powered by Framer Motion",
      "Global search functionality with instant results across the entire AniList database",
      "Mobile-first responsive design that maintains a premium, gallery-like aesthetic on all screens"
    ],
    techStack: {
      frontend: ["React Router", "TypeScript", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
      api: ["AniList GraphQL API"],
    },
    categories: ["Frontend", "Full Stack"],
    challenges: [
      {
        challenge: "GraphQL query optimization and over-fetching",
        solution: "Fetching data for thousands of titles can easily lead to performance bottlenecks. I focused on designing optimized GraphQL queries that used fragments to request only the specific fields needed for each view—gallery cards only got thumbnails and titles, while detail pages requested the full metadata. This kept our payloads small and the UI snappier."
      },
      {
        challenge: "Designing for inconsistent API data",
        solution: "The AniList API provides varying image qualities and metadata completeness. I built a robust, flexible layout system using CSS Grid and aspect-ratio constraints to ensure the gallery stayed perfectly aligned regardless of the artwork provided by the API, using subtle placeholders for missing data."
      },
      {
        challenge: "Coordinating a collaborative codebase",
        solution: "As a joint project, we had to ensure our work didn't overlap. I helped establish a modular component architecture and a clean folder structure that allowed us to work on separate features (like filtering vs. title pages) without merge conflicts, serving as a great introduction to collaborative development."
      }
    ],
    outcome: "Live and fully functional. A project I'm genuinely proud of — it's both technically solid and built around something I care about.",
    learnings: "Building something you actually want to use makes you a better developer. GraphQL's self-documenting nature and TypeScript integration made this one of the cleanest codebases I've written."
  },
  "samurai-systems": {
    id: "samurai-systems",
    title: "Samurai Systems",
    tagline: "Dark landing page for a startup IT and cybersecurity company",
    type: "Marketing Website / Landing Page",
    status: "Live",
    year: "2023",
    context: "A technical practice project built to master Next.js and complex GSAP animations. Replicated a high-end design to understand the mechanics of premium scroll-triggered sequences.",
    role: "Solo Developer",
    private: false,
    githubUrl: "https://github.com/Sharoon166/Samurai_Systems",
    previewUrl: "https://samurai-systems166.vercel.app/",
    themeColor: "#E74B4F",
    overview: "A sleek, dark-themed landing page for Samurai Systems, a startup IT company specializing in cybersecurity, IT infrastructure, and digital transformation. Built with GSAP for premium scroll animations.",
    problem: "High-end marketing designs often feature complex, multi-layered animations and non-standard scroll behaviors that are difficult to implement without sacrificing performance or responsive integrity. Replicating such a design required a deep understanding of how to sequence animations across a long-form page.",
    solution: "A technical study in advanced GSAP implementation. I rebuilt the design from the ground up in Next.js, focusing specifically on ScrollTrigger sequences, pinned section reveals, and smooth entrance effects. The goal was to prove that premium, cinematic web experiences can be built with clean, maintainable React code.",
    features: [
      "GSAP-powered scroll animations and entrance effects",
      "Services section highlighting cybersecurity and IT offerings",
      "Dark premium design aesthetic",
      "Responsive layout",
      "Smooth section transitions",
      "Contact and CTA sections"
    ],
    techStack: {
      frontend: ["Next", "Tailwind CSS", "GSAP"],
    },
    categories: ["Frontend", "Web Design"],
    challenges: [
      {
        challenge: "First substantial GSAP project",
        solution: "Started with ScrollTrigger for section reveals, then progressively added more complex timeline animations. GSAP's documentation is excellent — learned it mostly through their docs and experimenting."
      },
      {
        challenge: "Communicating technical services visually without being generic",
        solution: "Used iconography, subtle grid patterns, and code-inspired visual elements to reinforce the technical brand without falling into stock photo territory."
      }
    ],
    outcome: "Successfully replicated the design and mastered complex GSAP sequences. The project served as a critical learning milestone for building high-performance, animation-heavy marketing sites.",
    learnings: "GSAP is genuinely powerful for marketing sites. Replicating a premium design taught me to think about layout and timing in a way that typical functional apps don't require."
  }

};
