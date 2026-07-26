import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ShieldCheck, Zap, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) navigate("/");
  }, [isAuthenticated, isLoading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name || email.split("@")[0] } },
      });
      if (error) {
        setError(
          error.message.includes("already registered")
            ? "Questa email è già registrata. Prova ad accedere."
            : error.message
        );
      } else {
        setNotice(
          "Registrazione completata! Controlla la tua email per confermare l'account, poi accedi."
        );
        setMode("login");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(
          error.message.includes("Invalid login")
            ? "Email o password non corrette."
            : error.message.includes("Email not confirmed")
            ? "Devi prima confermare l'email: controlla la tua casella di posta."
            : error.message
        );
      } else {
        navigate("/");
      }
    }
    setBusy(false);
  }

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
            <h1 className="text-2xl font-bold text-white">
              {mode === "login" ? "Accedi" : "Crea il tuo account"}
            </h1>
            <p className="text-sm text-white/55 mt-2 leading-relaxed">
              {mode === "login"
                ? "Entra nella tua area clienti."
                : "Registrati gratis in pochi secondi."}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-white/5 p-1">
            <button
              onClick={() => { setMode("login"); setError(null); setNotice(null); }}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "login"
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Accedi
            </button>
            <button
              onClick={() => { setMode("register"); setError(null); setNotice(null); }}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "register"
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Registrati
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "register" && (
              <Input
                type="text"
                placeholder="Nome e cognome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/15 text-white placeholder:text-white/40"
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/15 text-white placeholder:text-white/40"
            />
            <Input
              type="password"
              placeholder="Password (min. 6 caratteri)"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/15 text-white placeholder:text-white/40"
            />

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            {notice && (
              <p className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
                {notice}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={busy}
              className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white border-0"
            >
              {busy ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {mode === "login" ? "Accedi" : "Registrati"}
            </Button>
          </form>

          <div className="mt-6 space-y-3 text-sm text-white/50">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              I tuoi dati sono al sicuro su Supabase
            </div>
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-cyan-300 shrink-0" />
              Accesso da qualsiasi dispositivo
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
