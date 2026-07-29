import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { SEO } from "@/components/SEO";
import { ProjectsList } from "@/components/ProjectsList";
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
  Instagram,
  Menu,
  X,
  Check,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

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
    { href: "#chi-sono", label: "Chi sono" },
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
              <Link to="/area-riservata">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyan-300/40 text-cyan-200 hover:bg-cyan-400/10 bg-transparent"
                >
                  <UserRound className="w-4 h-4 mr-1" /> Area riservata
                </Button>
              </Link>
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
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex flex-col gap-4">
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
            <>
              <Link to="/area-riservata" onClick={() => setOpen(false)}>
                <Button variant="outline" size="sm" className="border-cyan-300/40 text-cyan-200 hover:bg-cyan-400/10 bg-transparent w-fit">
                  <UserRound className="w-4 h-4 mr-1" /> Area riservata
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="border-white/20 text-white bg-transparent w-fit">
                <LogOut className="w-4 h-4 mr-1" /> Esci
              </Button>
            </>
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
    price: "EUR 1.499",
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
    price: "EUR 2.999",
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
  const [dbPlans, setDbPlans] = useState<typeof plans | null>(null);
  const [pricingLoading, setPricingLoading] = useState(true);
  const [pricingError, setPricingError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("name, description, price_from, unit, features, highlight")
        .eq("published", true)
        .order("sort_order");
      if (error) {
        setPricingError("Impossibile caricare i prezzi. Riprova più tardi.");
      } else if (data && data.length > 0) {
        setDbPlans(
          data.map((p) => ({
            name: p.name as string,
            price: `EUR ${Number(p.price_from).toLocaleString("it-IT")}`,
            unit: (p.unit as string) ?? "una tantum",
            desc: (p.description as string) ?? "",
            features: (p.features as string[]) ?? [],
            highlight: p.highlight as boolean,
            cta: "Richiedi preventivo",
          }))
        );
      }
      setPricingLoading(false);
    })().catch(() => {
      setPricingError("Errore di connessione. Riprova più tardi.");
      setPricingLoading(false);
    });
  }, []);

  const allPlans = dbPlans ?? plans;

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
        {pricingLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        ) : pricingError ? (
          <div className="text-center py-20">
            <p className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 inline-block">
              {pricingError}
            </p>
          </div>
        ) : (
        <div className="grid md:grid-cols-3 gap-8 mt-14 items-stretch">
          {allPlans.map((pl) => (
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
        )}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="chi-sono" className="py-24 bg-[#08081a]">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="shrink-0">
          <img
            src="/projects/logo.png"
            alt="Logo Walter Zannoni"
            className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_40px_rgba(139,92,246,0.5)]"
          />
        </div>
        <div>
          <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase">Chi sono</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Ciao, sono Walter 👋
          </h2>
          <p className="text-white/60 mt-5 text-lg leading-relaxed">
            Ingegnere informatico con la passione per il web e l'intelligenza artificiale.
            Da anni trasformo idee in prodotti digitali: siti che si fanno notare,
            web app che risolvono problemi veri e soluzioni AI che fanno risparmiare tempo.
          </p>
          <p className="text-white/60 mt-4 text-lg leading-relaxed">
            Lavoro da freelance, quindi parli sempre direttamente con me — niente agenzie,
            niente intermediari, niente sorprese. E il pinguino qui accanto? È il mio socio. 🐧
          </p>
          <div className="flex gap-8 mt-8">
            <div>
              <p className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text">20+</p>
              <p className="text-sm text-white/50 mt-1">Progetti consegnati</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text">100%</p>
              <p className="text-sm text-white/50 mt-1">Clienti soddisfatti</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text">24h</p>
              <p className="text-sm text-white/50 mt-1">Tempo di risposta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Marco R.",
    role: "Titolare, Ristorante Da Marco",
    text: "Walter mi ha fatto il sito con le prenotazioni online in una settimana. I clienti ora prenotano da soli e io ho smesso di perdere telefonate.",
  },
  {
    name: "Giulia T.",
    role: "Fotografa freelance",
    text: "Il mio portfolio è esattamente come lo volevo: elegante e velocissimo. Mi ha già portato due clienti nuovi dal sito. Super consigliato.",
  },
  {
    name: "Alessandro B.",
    role: "Founder, startup e-commerce",
    text: "Avevo preventivi da agenzie da 5.000EUR . Walter ha fatto lo stesso lavoro, meglio, a meno della metà. Comunicazione diretta e zero giri di parole.",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-[#050510]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase text-center">Dicono di me</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mt-3">
          Clienti che tornano, non solo clienti
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 hover:border-violet-400/40 transition-colors"
            >
              <div className="text-violet-300 text-4xl leading-none">"</div>
              <blockquote className="text-white/70 leading-relaxed mt-2">{t.text}</blockquote>
              <figcaption className="mt-5">
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-sm text-white/45">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { isAuthenticated, user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", plan: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { data: sessionData } = await supabase.auth.getSession();
    const { error: err } = await supabase.from("quote_requests").insert({
      user_id: sessionData.session?.user.id ?? null,
      name: form.name,
      email: form.email,
      plan: form.plan || null,
      message: form.message,
    });
    setBusy(false);
    if (err) {
      setError("Qualcosa è andato storto. Riprova o scrivimi direttamente via email.");
    } else {
      setSent(true);
    }
  }

  return (
    <section id="contatti" className="py-24 bg-[#050510] relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center">
          Hai un'idea? <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">Realizziamola.</span>
        </h2>
        <p className="text-white/55 mt-5 text-lg text-center">
          {isAuthenticated
            ? `Ciao ${user?.name ?? ""}! Compila il modulo: ti rispondo entro 24 ore con un preventivo gratuito.`
            : "Compila il modulo: ti rispondo entro 24 ore con un preventivo gratuito e senza impegno."}
        </p>

        {sent ? (
          <div className="mt-10 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white mt-4">Richiesta inviata! 🎉</h3>
            <p className="text-white/60 mt-2">
              Grazie {form.name}! Ti rispondo entro 24 ore all'indirizzo {form.email}.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Il tuo nome"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-white/5 border-white/15 text-white placeholder:text-white/40"
              />
              <Input
                type="email"
                placeholder="La tua email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/5 border-white/15 text-white placeholder:text-white/40"
              />
            </div>
            <select
              value={form.plan}
              onChange={(e) => setForm({ ...form, plan: e.target.value })}
              className="w-full rounded-md border border-white/15 bg-white/5 text-white px-3 py-2 text-sm [&>option]:bg-[#0a0a1a]"
            >
              <option value="">Che tipo di progetto hai in mente? (facoltativo)</option>
              <option value="Sito Vetrina">Sito Vetrina</option>
              <option value="Web App / E-commerce">Web App / E-commerce</option>
              <option value="Soluzione AI">Soluzione AI</option>
              <option value="App Mobile">App Mobile</option>
              <option value="Altro">Altro / non lo so ancora</option>
            </select>
            <Textarea
              placeholder="Raccontami la tua idea in poche righe..."
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-white/5 border-white/15 text-white placeholder:text-white/40"
            />
            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={busy}
              className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white border-0"
            >
              {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              Invia la richiesta
            </Button>
          </form>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:walterzannoni90@outlook.it">
            <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 bg-transparent px-8">
              <Mail className="w-4 h-4 mr-2" /> walterzannoni90@outlook.it
            </Button>
          </a>
        </div>
        <div className="flex items-center justify-center gap-5 mt-10 text-white/50">
          <a href="https://github.com/walterzannoni90-netizen" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          <a href="https://www.instagram.com/walterzannoni" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
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
    <div className="min-h-screen bg-[#050510] text-white scroll-smooth">
      <SEO
        title="Home"
        description="Sviluppatore web e specialista AI. Trasformo idee in prodotti digitali: siti, web app, database e soluzioni AI."
        path="/"
      />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <ProjectsList />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
