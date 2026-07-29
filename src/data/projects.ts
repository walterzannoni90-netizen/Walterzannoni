interface ProjectDetail {
  slug: string;
  title: string;
  tag: string;
  desc: string;
  longDesc: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: string[];
  img: string;
  date: string;
  link?: string;
  github?: string;
}

const projectsData: Record<string, ProjectDetail> = {
  "nova-analytics": {
    slug: "nova-analytics",
    title: "Nova Analytics",
    tag: "Web App · SaaS",
    desc: "Dashboard analytics in dark mode con grafici in tempo reale, KPI e reportistica avanzata.",
    longDesc: "Nova Analytics è una dashboard SaaS progettata per team di prodotto e data analyst che hanno bisogno di monitorare metriche chiave in tempo reale. L'applicazione supporta più fonti dati, visualizzazioni personalizzabili e un sistema di alerting via email/Slack.",
    challenge: "Il cliente aveva dati sparsi tra database PostgreSQL, API esterne e file CSV. Serviva una vista unificata con latenza < 200ms per dashboard condivise tra 50+ utenti simultanei.",
    solution: "Ho progettato un'architettura a microservizi con Node.js/Express per l'aggregazione dati, Redis per la cache, e Recharts/WebGL per il rendering grafici lato client. Autenticazione JWT + RBAC per gestire ruoli (admin, analyst, viewer).",
    results: [
      "Latenza dashboard ridotta da 2.3s a 180ms",
      "50+ utenti simultanei senza degradazione",
      "99.9% uptime negli ultimi 6 mesi",
      "Onboarding nuovi clienti in < 1 ora",
    ],
    tech: ["React 18", "TypeScript", "Recharts", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
    img: "/projects/dashboard.png",
    date: "Novembre 2024",
    link: "https://nova-analytics.example.com",
    github: "https://github.com/walterzannoni/nova-analytics",
  },
  "atelier-milano": {
    slug: "atelier-milano",
    title: "Atelier Milano",
    tag: "E-commerce",
    desc: "Store di lusso con catalogo editoriale, checkout ottimizzato e design minimal di alto livello.",
    longDesc: "E-commerce headless per brand di moda luxury. Il catalogo è gestito via Sanity CMS con preview live, il checkout usa Stripe con supporto Apple Pay / Google Pay, e le pagine prodotto hanno gallery 3D interattive.",
    challenge: "Il cliente voleva un'esperienza editoriale (stile rivista) ma con performance da e-commerce: LCP < 2.5s, zero layout shift, checkout in 2 click.",
    solution: "Next.js 14 con App Router, ISR per le pagine prodotto (revalidate: 60s), Image optimization automatico, Stripe Checkout session server-side. Tailwind per styling, Framer Motion per micro-animazioni.",
    results: [
      "LCP: 1.8s (mobile) / 1.2s (desktop)",
      "Conversion rate +34% vs sito precedente",
      "Core Web Vitals: tutti verdi",
      "Zero downtime durante Black Friday",
    ],
    tech: ["Next.js 14", "TypeScript", "Sanity CMS", "Stripe", "Tailwind CSS", "Framer Motion", "Vercel"],
    img: "/projects/ecommerce.png",
    date: "Settembre 2024",
    link: "https://atelier-milano.example.com",
  },
  "synapse-ai": {
    slug: "synapse-ai",
    title: "Synapse AI",
    tag: "Intelligenza Artificiale",
    desc: "Assistente conversazionale con interfaccia neon, memoria contestuale e risposte in streaming.",
    longDesc: "Chat AI per supporto clienti automatizzato. Usa RAG (Retrieval-Augmented Generation) su knowledge base aziendale, con fallback a operatore umano. Streaming token-by-token per UX fluida.",
    challenge: "Integrare LLM (OpenAI GPT-4o) con knowledge base privata (PDF, FAQ, manuali) mantenendo privacy dei dati e latenza < 500ms per primo token.",
    solution: "Embedding vettoriale (text-embedding-3-large) + Pinecone per vector search. Backend FastAPI con streaming SSE. Frontend React con useReducer per gestione stato conversazione. Rate limiting e content filtering.",
    results: [
      "First token latency: 380ms p95",
      "85% ticket risolti senza operatore umano",
      "CSAT 4.7/5 dagli utenti finali",
      "Costo per conversazione: $0.02",
    ],
    tech: ["Python", "FastAPI", "OpenAI API", "Pinecone", "React", "TypeScript", "WebSockets", "Docker"],
    img: "/projects/aichat.png",
    date: "Luglio 2024",
    link: "https://synapse-ai.example.com",
    github: "https://github.com/walterzannoni/synapse-ai",
  },
  "pulsefit": {
    slug: "pulsefit",
    title: "PulseFit",
    tag: "Mobile App",
    desc: "App fitness con tracking degli allenamenti, statistiche e piani personalizzati.",
    longDesc: "App mobile cross-platform per fitness tracking. Include: libreria esercizi con video, timer intervalli, cronologia allenamenti, grafici progressi, export CSV, notifiche push per reminder.",
    challenge: "Sincronizzazione offline-first (utenti in palestra senza connessione), animazioni 60fps su dispositivi 5 anni fa, bundle size < 50MB.",
    solution: "React Native + Expo (managed workflow). SQLite locale (expo-sqlite) con sync differenziale al backend Firebase. Reanimated 3 per animazioni native. Code splitting per bundle ottimizzato.",
    results: [
      "4.8★ su App Store / Play Store",
      "15k+ download primi 3 mesi",
      "Retention D30: 42%",
      "Crash-free sessions: 99.9%",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Firebase", "SQLite", "Reanimated 3", "Expo Router"],
    img: "/projects/mobileapp.png",
    date: "Maggio 2024",
    link: "https://pulsefit.example.com",
    github: "https://github.com/walterzannoni/pulsefit",
  },
  "immobilia": {
    slug: "immobilia",
    title: "Immobilia",
    tag: "Piattaforma Web",
    desc: "Portale immobiliare con ricerca su mappa, schede proprietà e filtri intelligenti.",
    longDesc: "Marketplace immobiliare B2C con geolocalizzazione, mappe interattive (Mapbox GL), ricerca full-text, alert email per nuove proprietà, area agente con CRM integrato.",
    challenge: "Gestire 50k+ listing con query spaziali complesse (poligoni, raggio, isocrone) mantenendo risposta < 300ms. SEO critico per traffico organico.",
    solution: "PostgreSQL + PostGIS per query spaziali. Next.js SSR per SEO. Mapbox GL JS per mappe lato client. Elasticsearch per full-text search. ISR per pagine proprietà (revalidate: 300s).",
    results: [
      "Query mappa: 120ms p95",
      "Traffico organico +180% in 6 mesi",
      "Lead qualificati: 200+/mese",
      "Core Web Vitals tutti passati",
    ],
    tech: ["React", "Next.js", "TypeScript", "PostgreSQL", "PostGIS", "Mapbox GL", "Elasticsearch", "Tailwind"],
    img: "/projects/realestate.png",
    date: "Marzo 2024",
    link: "https://immobilia.example.com",
  },
  "osteria-novecento": {
    slug: "osteria-novecento",
    title: "Osteria Novecento",
    tag: "Sito Ristorante",
    desc: "Sito elegante per ristorante con menù digitale, prenotazione tavoli e galleria dei piatti.",
    longDesc: "Sito one-page per ristorante stellato. Menù digitale multilingua (IT/EN) gestito da Sanity CMS, prenotazione tavoli via Cal.com embed, galleria piatti con lightbox, schema.org Restaurant markup per SEO locale.",
    challenge: "Caricamento istantaneo del menù (foto ad alta risoluzione), prenotazione senza uscire dal sito, GDPR compliant, multilingua.",
    solution: "Next.js + Sanity CMS (image pipeline: WebP/AVIF automatico). Cal.com per prenotazioni (iframe seamless). i18n routing. Schema.org JSON-LD. Vercel Edge Network.",
    results: [
      "LCP: 1.4s (mobile)",
      "Prenotazioni online: 65% del totale",
      "Zero costi piattaforma terze (no TheFork)",
      "Google PageSpeed: 98/100",
    ],
    tech: ["Next.js", "Sanity CMS", "Cal.com", "Tailwind CSS", "TypeScript", "Vercel"],
    img: "/projects/ristorante.png",
    date: "Dicembre 2023",
    link: "https://osteria-novecento.example.com",
  },
  "marechiaro-resort": {
    slug: "marechiaro-resort",
    title: "Marechiaro Resort",
    tag: "Booking Engine",
    desc: "Piattaforma di prenotazione per resort con ricerca per date, camere con prezzi e checkout.",
    longDesc: "Booking engine white-label per resort 5 stelle. Disponibilità real-time per tipologia camera, prezzi dinamici per stagione, extra (spa, transfer, escursioni), checkout Stripe con 3D Secure, email transazionali (conferma, reminder, post-soggiorno).",
    challenge: "Disponibilità real-time con concorrenza (overbooking prevention), prezzi dinamici complessi, PCI-DSS compliance per pagamenti, multi-lingua/valuta.",
    solution: "Node.js + PostgreSQL con advisory locks per prenotazioni atomiche. Stripe PaymentIntents + SetupIntents per salvataggio carte. i18n con next-intl. Testing E2E con Playwright per flusso prenotazione.",
    results: [
      "Tasso conversione booking: 12.3%",
      "Zero overbooking in 18 mesi",
      "Revenue da direct booking: +45%",
      "PCI-DSS SAQ-A compliant",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Stripe", "TypeScript", "Tailwind", "Docker", "AWS"],
    img: "/projects/hotel.png",
    date: "Ottobre 2023",
    link: "https://marechiaro.example.com",
  },
  "konto": {
    slug: "konto",
    title: "Konto",
    tag: "Fintech · Web App",
    desc: "Dashboard bancaria stile neobank con saldo, movimenti, grafici delle spese e carte virtuali.",
    longDesc: "Dashboard finanziaria personale con aggregazione conti via Plaid/Open Banking, categorizzazione automatica spese (ML), budget mensili con alert, carte virtuali usa-e-getta per abbonamenti, export CSV/PDF per commercialista.",
    challenge: "Sicurezza livello bancario (crittografia end-to-end, 2FA obbligatorio, audit trail), integrazione Plaid per 5000+ banche, sincronizzazione real-time via webhook, conformità PSD2.",
    solution: "React + Node.js (NestJS). Crittografia AES-256 per dati sensibili. Vault HashiCorp per secrets. Plaid Link per collegamento conti. Webhook idempotenti per sync. Test sicurezza con OWASP ZAP.",
    results: [
      "SOC 2 Type II certified",
      "10k+ utenti attivi",
      "Zero incidenti sicurezza",
      "NPS: 68",
    ],
    tech: ["React", "NestJS", "TypeScript", "PostgreSQL", "Plaid API", "Stripe", "HashiCorp Vault", "Docker", "Kubernetes"],
    img: "/projects/fintech.png",
    date: "Agosto 2023",
    link: "https://konto.example.com",
    github: "https://github.com/walterzannoni/konto",
  },
  "luca-ferri": {
    slug: "luca-ferri",
    title: "Luca Ferri — Fotografia",
    tag: "Portfolio",
    desc: "Portfolio artistico per fotografo con galleria a tutto schermo e tipografia minimale.",
    longDesc: "Portfolio personale per fotografo professionista. Galleria full-screen con navigazione keyboard/swipe, lazy loading progressivo (LQIP), filtri per categoria (ritratti, paesaggi, eventi), blog integrato per behind-the-scenes, contact form con reCAPTCHA.",
    challenge: "Immagini ad altissima risoluzione (40-80MB originali) senza rallentare il sito. Esperienza immersiva senza UI invadente. SEO per ricerca per nome fotografo.",
    solution: "Next.js Image con Cloudinary transformation on-the-fly (q:auto, f:auto). LQIP (Low Quality Image Placeholder) blur-up. Framer Motion per transizioni gallery. next-seo per meta tag. Vercel per edge caching.",
    results: [
      "LCP: 1.6s nonostante immagini 4K",
      "Time to Interactive: 2.1s",
      "Google Images: prime 3 posizioni per keyword brand",
      "Zero JavaScript bundle per gallery (CSS-only lightbox fallback)",
    ],
    tech: ["Next.js", "Cloudinary", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel"],
    img: "/projects/fotografo.png",
    date: "Giugno 2023",
    link: "https://lucaferri.example.com",
  },
};

export function getProject(slug: string): ProjectDetail | undefined {
  return projectsData[slug];
}

export function getAllProjects(): ProjectDetail[] {
  return Object.values(projectsData);
}