import { useParams, Link } from "react-router";
import { ArrowLeft, Calendar, Tag, CheckCircle2, Github, Globe, Star, Sparkles, ArrowRight } from "lucide-react";
import { getProject, getAllProjects } from "@/data/projects";
import { SEO } from "@/components/SEO";

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug || "");
  const allProjects = getAllProjects();

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Progetto non trovato</h1>
          <p className="text-neutral-400 mb-8">Il case study richiesto non esiste.</p>
          <Link to="/progetti" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300">
            <ArrowLeft className="w-4 h-4" /> Torna ai progetti
          </Link>
        </div>
      </div>
    );
  }

  const prevProject = allProjects[allProjects.findIndex(p => p.slug === project.slug) - 1];
  const nextProject = allProjects[allProjects.findIndex(p => p.slug === project.slug) + 1];

  return (
    <>
      <SEO
        title={project.title}
        description={project.desc}
        ogImage={project.img}
        ogType="article"
        path={`/progetti/${project.slug}`}
      />
    <article className="min-h-screen bg-neutral-950 text-white">
      {/* Hero */}
      <header className="relative min-h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-neutral-400">
              <li><Link to="/" className="hover:text-violet-400">Home</Link></li>
              <li className="flex items-center gap-2"><span aria-hidden="true">/</span><Link to="/progetti" className="hover:text-violet-400">Progetti</Link></li>
              <li className="flex items-center gap-2"><span aria-hidden="true">/</span><span className="text-white font-medium">{project.title}</span></li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <Tag className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900/80 border border-neutral-700 rounded-full backdrop-blur mb-4 text-sm">
              <Calendar className="w-4 h-4" /> {project.date}
              <span className="mx-1">·</span>
              <span>{project.tag}</span>
            </Tag>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl text-neutral-300 leading-relaxed max-w-2xl mb-8">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 font-medium rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <Globe className="w-4 h-4" /> Visita il sito
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 text-neutral-300 font-medium rounded-lg hover:border-violet-500 hover:text-violet-400 transition-colors"
                >
                  <Github className="w-4 h-4" /> Codice sorgente
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Tech Stack */}
      <section className="py-16 px-6 bg-neutral-900/50 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Stack tecnologico</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm font-medium text-neutral-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge / Solution / Results */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-3 gap-12 mb-24">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Sparkles className="text-violet-400" /> La sfida
              </h2>
              <div className="prose prose-invert max-w-none text-neutral-300 leading-relaxed">
                <p>{project.challenge}</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Star className="text-cyan-400" /> La soluzione
              </h2>
              <div className="prose prose-invert max-w-none text-neutral-300 leading-relaxed">
                <p>{project.solution}</p>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <section className="bg-neutral-900/80 border border-neutral-700 rounded-2xl p-8 sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-green-400" /> Risultati ottenuti
              </h3>
              <ul className="space-y-4">
                {project.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300">
                    <CheckCircle2 className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-neutral-900/80 border border-neutral-700 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-full text-sm text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-between pt-12 border-t border-neutral-800" aria-label="Project navigation">
          {prevProject && (
            <Link
              to={`/progetti/${prevProject.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 rounded-lg text-neutral-300 hover:border-violet-500 hover:text-violet-400 hover:bg-neutral-900/50 transition-all"
            >
              <ArrowLeft /> Progetto precedente
              <div className="text-right">
                <span className="block text-xs text-neutral-500">{prevProject.tag}</span>
                <span className="font-medium">{prevProject.title}</span>
              </div>
            </Link>
          )}

          <Link
            to="/progetti"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 font-medium rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Tutti i progetti
          </Link>

          {nextProject && (
            <Link
              to={`/progetti/${nextProject.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 rounded-lg text-neutral-300 hover:border-violet-500 hover:text-violet-400 hover:bg-neutral-900/50 transition-all"
            >
              Progetto successivo
              <div className="text-left">
                <span className="block text-xs text-neutral-500">{nextProject.tag}</span>
                <span className="font-medium">{nextProject.title}</span>
              </div>
              <ArrowLeft className="-rotate-180" />
            </Link>
          )}
        </nav>
      </div>

      {/* CTA */}
      <section className="py-24 px-6 bg-neutral-900/50 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Hai un progetto simile in mente?
          </h2>
          <p className="text-neutral-400 text-lg mb-8">
            Parliamone. Ti rispondo entro 24 ore con un preventivo gratuito.
          </p>
          <Link to="#contatti">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold rounded-xl hover:from-violet-500 hover:to-cyan-400 transition-all shadow-lg shadow-violet-500/25">
              Richiedi preventivo <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </article>
    </>
  );
}