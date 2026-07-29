import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { SEO } from "@/components/SEO";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center px-6">
      <SEO title="Pagina non trovata" description="La pagina che cerchi non esiste." />
      <div className="text-center max-w-sm">
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-white/60 mt-4 text-lg">
          Pagina non trovata
        </p>
        <p className="text-white/40 mt-2 text-sm">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link to="/" className="inline-block mt-8">
          <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white border-0">
            <Home className="w-4 h-4 mr-2" /> Torna alla home
          </Button>
        </Link>
      </div>
    </div>
  );
}
