import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import { SEO } from "@/components/SEO";
import { getAllProjects } from "@/data/projects";

const projects = getAllProjects().map(p => ({
  slug: p.slug,
  img: p.img,
  title: p.title,
  tag: p.tag,
  desc: p.desc,
  tech: p.tech,
  date: p.date,
  link: p.link,
}));

export function ProjectsList() {
  return (
    <section id="progetti" className="py-24 px-6 bg-neutral-950/50">
      <SEO title="Progetti" description="Una selezione di progetti: web app, e-commerce, piattaforme AI, mobile app e siti web." path="/progetti" />
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Progetti <span className="text-violet-400">recenti</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Una selezione di lavori: web app, e-commerce, piattaforme AI e mobile.
            Ogni progetto nasce da un problema reale e si risolve con codice pulito.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="group relative bg-neutral-900/80 border border-neutral-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
            >
              <Link to={`/progetti/${p.slug}`} className="block">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs px-3 py-1 bg-neutral-900/80 border border-neutral-700 rounded-full backdrop-blur">
                      {p.tag}
                    </span>
                    <span className="text-sm text-neutral-400">{p.date}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs bg-neutral-800 border border-neutral-700 rounded text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-neutral-800 border border-neutral-700 rounded text-neutral-500">
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <div className="px-6 pb-6 pt-0">
                <Link
                  to={`/progetti/${p.slug}`}
                  className="inline-flex items-center gap-2 w-full px-4 py-3 border border-neutral-700 rounded-lg text-neutral-300 hover:border-violet-500 hover:text-violet-400 hover:bg-neutral-900/50 transition-all text-center"
                >
                  Vedi dettagli <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-neutral-500 mb-4">
            Vuoi vedere tutti i progetti? <Link to="/progetti" className="text-violet-400 hover:underline">Visualizza la lista completa</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
