import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Database,
  BrainCircuit,
  Rocket,
  Globe,
  Smartphone,
  ArrowRight,
  LogOut,
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
  Check,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const projects = [
  {
    img: "/projects/dashboard.png",
    title: "Nova Analytics",
    tag: "Web App · SaaS",
    desc: "Dashboard analytics in dark mode con grafici in tempo reale, KPI e reportistica avanzata.",
  },
  {
    img: "/projects/ecommerce.png",
    title: "Atelier Milano",
    tag: "E-commerce",
    desc: "Store di lusso con catalogo editoriale, checkout ottimizzato e design minimal di alto livello.",
  },
  {
    img: "/projects/aichat.png",
    title: "Synapse AI",
    tag: "Intelligenza Artificiale",
    desc: "Assistente conversazionale con interfaccia neon, memoria contestuale e risposte in streaming.",
  },
  {
    img: "/projects/mobileapp.png",
    title: "PulseFit",
    tag: "Mobile App",
    desc: "App fitness con tracking degli allenamenti, statistiche e piani personalizzati.",
  },
  {
    img: "/projects/realestate.png",
    title: "Immobilia",
    tag: "Piattaforma Web",
    desc: "Portale immobiliare con ricerca su mappa, schede proprietà e filtri intelligenti.",
  },
  {
    img: "/projects/ristorante.png",
    title: "Osteria Novecento",
    tag: "Sito Ristorante",
    desc: "Sito elegante per ristorante con menù digitale, prenotazione tavoli e galleria dei piatti.",
  },
  {
    img: "/projects/hotel.png",
    title: "Marechiaro Resort",
    tag: "Booking Engine",
    desc: "Piattaforma di prenotazione per resort con ricerca per date, camere con prezzi e checkout.",
  },
  {
    img: "/projects/fintech.png",
    title: "Konto",
    tag: "Fintech · Web App",
    desc: "Dashboard bancaria stile neobank con saldo, movimenti, grafici delle spese e carte virtuali.",
  },
  {
    img: "/projects/fotografo.png",
    title: "Luca Ferri — Fotografia",
    tag: "Portfolio",
    desc: "Portfolio artistico per fotografo con galleria a tutto schermo e tipografia minimale.",
  },
];

const services = [
  {
    icon: Globe,
    title: "Siti Web & Web App",
    desc: "Siti vetrina, portali e applicazioni web moderne, veloci e responsive, costruite con React e TypeScript.",
  },
  {
    icon: Database,
    title: "Database & Backend",
    desc: "Architetture dati solide, API sicure e database scalabili per far crescere il tuo progetto senza limiti.",
  },
  {
    icon: BrainCircuit,
    title: "Soluzioni AI",
    desc: "Chatbot, assistenti intelligenti e automazioni con l'intelligenza artificiale integrate nel tuo business.",
  },
  {
    icon: Smartphone,
    title: "App Mobile",
    desc: "Esperienze mobile fluide e native-like, dal prototipo alla pubblicazione.",
  },
];

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#servizi", label: "Servizi" },
    { href: "#progetti", label: "Progetti" },
    { href: "#prezzi", label: "Prezzi" },
    { href: "#contatti", label: "Contatti" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2.5 text-white font-bold text-lg tracking-tight">
          <img src="/projects/logo.png" alt="Logo Walter Zannoni" className="w-10 h-10 drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
          Walter<span className="text-violet-400">Zannoni</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-white/70">
                Ciao, <span className="text-white font-medium">{user?.name ?? "utente"}</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-1" /> Esci
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button
                size="sm"
                className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white border-0"
              >
                Accedi / Registrati
              </Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          {isAuthenticated ? (
            <Button variant="outline" size="sm" onClick={logout} className="border-white/20 text-white bg-transparent w-fit">
              <LogOut className="w-4 h-4 mr-1" /> Esci
            </Button>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white border-0 w-fit">
                Accedi / Registrati
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src="/projects/hero.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050510]" />
      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center w-full">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/40 bg-violet-500/10 text-violet-300 text-sm mb-8">
          <Rocket className="w-4 h-4" /> Web Developer & AI Specialist
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
          Creo <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">web app</span>,
          <br className="hidden md:block" /> siti spettacolari e AI
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
          Sono Walter Zannoni: trasformo idee in prodotti digitali — siti,
          applicazioni, database e soluzioni basate sull'intelligenza artificiale.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#progetti">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white border-0 px-8">
              Guarda i progetti <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a href="#contatti">
            <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 bg-transparent px-8">
              Lavoriamo insieme
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servizi" className="py-24 bg-[#050510]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase text-center">Cosa faccio</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mt-3">
          Servizi su misura per il web
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-violet-400/50 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon className="w-6 h-6 text-violet-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-white/55 mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="progetti" className="py-24 bg-[#08081a]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-cyan-300 text-sm font-semibold tracking-widest uppercase text-center">Portfolio</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mt-3">
          Progetti che parlano da soli
        </h2>
        <p className="text-white/50 text-center mt-4 max-w-xl mx-auto">
          Una selezione di lavori recenti: web app, e-commerce, piattaforme AI e mobile.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-cyan-300/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden aspect-[3/2]">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full bg-black/60 backdrop-blur text-cyan-200 border border-white/10">
                  {p.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-white/55 mt-1.5 leading-relaxed">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Sito Vetrina",
    price: "€499",
    unit: "una tantum",
    desc: "Perfetto per presentarti al mondo con stile.",
    features: [
      "Sito one-page con design esclusivo",
      "Responsive: perfetto su ogni dispositivo",
      "SEO di base e velocità ottimizzata",
      "Modulo contatti e social integrati",
      "Consegna in 7 giorni",
    ],
    highlight: false,
    cta: "Inizia da qui",
  },
  {
    name: "Web App / E-commerce",
    price: "€1.499",
    unit: "una tantum",
    desc: "La scelta giusta per vendere e gestire tutto online.",
    features: [
      "Tutto del piano Vetrina",
      "Database e backend dedicati",
      "Area riservata con login e registrazione",
      "Catalogo prodotti e gestione ordini",
      "Dashboard amministrativa",
      "Consegna in 3 settimane",
    ],
    highlight: true,
    cta: "Il più scelto",
  },
  {
    name: "Soluzione AI",
    price: "€2.999",
    unit: "una tantum",
    desc: "Per chi vuole il futuro, oggi.",
    features: [
      "Tutto del piano Web App",
      "Chatbot / assistente AI personalizzato",
      "Automazioni intelligenti sui tuoi processi",
      "Integrazione con i tuoi strumenti",
      "Addestramento sui tuoi dati",
      "Supporto prioritario 12 mesi",
    ],
    highlight: false,
    cta: "Vai oltre",
  },
];

function Pricing() {
  return (
    <section id="prezzi" className="py-24 bg-[#08081a] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 text-cyan-300 text-sm font-semibold tracking-widest uppercase">
          <Sparkles className="w-4 h-4" /> Prezzi chiari, zero sorprese
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mt-3">
          Scegli il tuo prodotto
        </h2>
        <p className="text-white/50 text-center mt-4 max-w-xl mx-auto">
          Ogni progetto è unico: questi sono i prezzi di partenza. Contattami per un preventivo su misura, sempre gratuito.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-14 items-stretch">
          {plans.map((pl) => (
            <div
              key={pl.name}
              className={`relative rounded-3xl p-8 flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                pl.highlight
                  ? "border-violet-400/60 bg-gradient-to-b from-violet-600/20 to-cyan-500/10 shadow-[0_0_50px_rgba(139,92,246,0.25)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25"
              }`}
            >
              {pl.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white whitespace-nowrap">
                  PIÙ RICHIESTO
                </span>
              )}
              <h3 className="text-xl font-bold text-white">{pl.name}</h3>
              <p className="text-sm text-white/50 mt-1">{pl.desc}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-sm text-white/50 mb-1.5">da</span>
                <span className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text">
                  {pl.price}
                </span>
                <span className="text-sm text-white/40 mb-1.5">{pl.unit}</span>
              </div>
              <ul className="mt-7 space-y-3 flex-1">
                {pl.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Check className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contatti" className="mt-8">
                <Button
                  className={`w-full ${
                    pl.highlight
                      ? "bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white border-0"
                      : "border-white/25 text-white hover:bg-white/10 bg-transparent"
                  }`}
                  variant={pl.highlight ? "default" : "outline"}
                >
                  {pl.cta} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { isAuthenticated, user } = useAuth();
  return (
    <section id="contatti" className="py-24 bg-[#050510] relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Hai un'idea? <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">Realizziamola.</span>
        </h2>
        <p className="text-white/55 mt-5 text-lg">
          {isAuthenticated
            ? `Perfetto ${user?.name ?? ""}, sei già registrato: scrivimi e parliamo del tuo progetto.`
            : "Registrati gratuitamente per entrare nell'area clienti, oppure scrivimi direttamente."}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {!isAuthenticated && (
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white border-0 px-8">
                Accedi / Registrati gratis
              </Button>
            </Link>
          )}
          <a href="mailto:walter.zannoni@example.com">
            <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 bg-transparent px-8">
              <Mail className="w-4 h-4 mr-2" /> Scrivimi una mail
            </Button>
          </a>
        </div>
        <div className="flex items-center justify-center gap-5 mt-10 text-white/50">
          <a href="#" aria-label="GitHub" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050510] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/40">
        <span className="flex items-center gap-2">
          <img src="/projects/logo.png" alt="" className="w-6 h-6" />
          © {new Date().getFullYear()} Walter Zannoni — Web & AI Developer
        </span>
        <span>Fatto con React, TypeScript e un tocco di AI</span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050510] text-white scroll-smooth" style={{ scrollBehavior: "smooth" }}>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
