import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Loader2, LogOut, UserRound } from "lucide-react";

type QuoteRequest = {
  id: number;
  plan: string | null;
  message: string;
  status: string;
  created_at: string;
};

const statusLabels: Record<string, { label: string; color: string }> = {
  nuova: { label: "Inviata", color: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30" },
  letta: { label: "Presa in carico", color: "bg-violet-500/15 text-violet-300 border-violet-400/30" },
  in_lavorazione: { label: "In lavorazione 🔥", color: "bg-amber-500/15 text-amber-300 border-amber-400/30" },
  chiusa: { label: "Completata ✅", color: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
};

export default function AreaRiservata() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    supabase
      .from("quote_requests")
      .select("id, plan, message, status, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRequests((data as QuoteRequest[]) ?? []);
        setLoading(false);
      });
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050510] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img src="/projects/logo.png" alt="" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold">Area riservata</h1>
              <p className="text-sm text-white/50">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-white/20 text-white bg-transparent hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-1" /> Home
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={logout} className="border-white/20 text-white bg-transparent hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-1" /> Esci
            </Button>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex items-center gap-4">
          <UserRound className="w-10 h-10 text-violet-300" />
          <div>
            <p className="font-semibold text-lg">Ciao, {user?.name}! 👋</p>
            <p className="text-white/55 text-sm">
              Benvenuto nella tua area clienti. Qui trovi le tue richieste di preventivo e il loro stato.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-300" /> Le mie richieste
        </h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/55">
            Non hai ancora inviato richieste.{" "}
            <Link to="/#contatti" className="text-cyan-300 hover:underline">
              Richiedi il tuo primo preventivo →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => {
              const st = statusLabels[r.status] ?? statusLabels.nuova;
              return (
                <div key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-semibold">{r.plan ?? "Richiesta generica"}</span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${st.color}`}>
                      {st.label}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mt-3 leading-relaxed">{r.message}</p>
                  <p className="text-white/35 text-xs mt-3">
                    Inviata il {new Date(r.created_at).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
