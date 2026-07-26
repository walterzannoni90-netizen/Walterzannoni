import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) navigate("/");
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-[#050510] relative flex items-center justify-center px-6 overflow-hidden">
      <img
        src="/projects/hero.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-[#050510]" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <img
              src="/projects/logo.png"
              alt="Logo Walter Zannoni"
              className="w-20 h-20 mb-5 drop-shadow-[0_0_20px_rgba(139,92,246,0.7)]"
            />
            <h1 className="text-2xl font-bold text-white">Accedi o registrati</h1>
            <p className="text-sm text-white/55 mt-2 leading-relaxed">
              Entra nell'area clienti di Walter Zannoni. Se non hai un account,
              verrà creato automaticamente al primo accesso.
            </p>
          </div>

          <Button
            size="lg"
            className="w-full mt-8 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white border-0"
            onClick={() => {
              window.location.href = getOAuthUrl();
            }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Continua con Kimi
          </Button>

          <div className="mt-6 space-y-3 text-sm text-white/50">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              Accesso sicuro, nessuna password da ricordare
            </div>
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-cyan-300 shrink-0" />
              Registrazione automatica in pochi secondi
            </div>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">
            ← Torna alla home
          </Link>
        </p>
      </div>
    </div>
  );
}
