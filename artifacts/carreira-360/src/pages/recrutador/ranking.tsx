import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { Users, MapPin, Star, Globe, ExternalLink } from "lucide-react";

export default function RecrutadorRanking() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "plataforma" | "linkedin">("all");

  useEffect(() => {
    apiFetch("/api/recruiter/candidates").then(setCandidates).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? candidates : candidates.filter(c => c.source === filter);
  const sorted = [...filtered].sort((a: any, b: any) => b.matchScore - a.matchScore);
  const platformCount = candidates.filter(c => c.source === "plataforma").length;
  const linkedinCount = candidates.filter(c => c.source === "linkedin").length;

  if (loading) return <div className="min-h-screen bg-[#13293D] flex items-center justify-center"><p className="font-display text-4xl text-[#247BA0] animate-pulse">A CARREGAR...</p></div>;

  return (
    <div className="min-h-screen bg-[#13293D] p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-4">
          Ranking de <span className="text-[#247BA0]">Candidatos</span>
        </h1>

        {candidates.length > 0 && (
          <>
            <p className="text-white/40 text-lg mb-8 font-bold">
              {candidates.length} candidatos encontrados — {platformCount} na plataforma — {linkedinCount} no LinkedIn
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button onClick={() => setFilter("all")}
                className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-colors ${filter === "all" ? "bg-[#247BA0] text-white" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
                Todos ({candidates.length})
              </button>
              <button onClick={() => setFilter("plataforma")}
                className={`flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-colors ${filter === "plataforma" ? "bg-[#1B98E0] text-[#13293D]" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
                <Users size={16} /> Plataforma ({platformCount})
              </button>
              <button onClick={() => setFilter("linkedin")}
                className={`flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-colors ${filter === "linkedin" ? "bg-[#0077B5] text-white" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
                <Globe size={16} /> LinkedIn ({linkedinCount})
              </button>
            </div>
          </>
        )}

        {candidates.length === 0 ? (
          <div className="text-center py-20">
            <Users size={64} className="text-white/20 mx-auto mb-6" />
            <p className="font-display text-3xl text-white/40 uppercase">Nenhum candidato encontrado</p>
            <p className="text-white/30 mt-4">Faz uma busca primeiro</p>
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20">
            <Users size={64} className="text-white/20 mx-auto mb-6" />
            <p className="font-display text-3xl text-white/40 uppercase">Nenhum candidato nesta categoria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((c: any, i: number) => (
              <div key={c.id} className="bg-white/5 border-2 border-white/10 p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:border-[#247BA0] transition-colors">
                <span className="font-display text-3xl sm:text-5xl text-[#247BA0] w-12 sm:w-16 text-center">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-16 h-16 flex items-center justify-center shrink-0 overflow-hidden">
                  {c.avatarUrl ? (
                    <img src={c.avatarUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#247BA0] flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-xl sm:text-3xl text-white uppercase truncate">{c.name}</h3>
                    <span className={`shrink-0 text-xs font-bold px-2 py-0.5 uppercase ${c.source === "plataforma" ? "bg-[#1B98E0]/20 text-[#1B98E0] border border-[#1B98E0]/30" : "bg-[#0077B5]/20 text-[#0077B5] border border-[#0077B5]/30"}`}>
                      {c.source === "plataforma" ? "Plataforma" : "LinkedIn"}
                    </span>
                  </div>
                  <p className="text-[#1B98E0] font-bold text-sm uppercase">{c.title}</p>
                  <div className="flex items-center gap-2 text-white/40 text-sm mt-1"><MapPin size={12} /> {c.location}</div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-3xl sm:text-5xl text-[#247BA0]">{c.matchScore}%</p>
                  <div className="flex items-center gap-1 text-[#1B98E0] text-sm"><Star size={12} /> Match</div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <div className="hidden md:flex flex-wrap gap-2 max-w-[300px]">
                    {(Array.isArray(c.skills) ? c.skills : JSON.parse(c.skills || "[]")).slice(0, 3).map((s: string) => (
                      <span key={s} className="text-xs border border-[#247BA0] text-[#247BA0] px-2 py-1 uppercase font-bold">{s}</span>
                    ))}
                  </div>
                  {c.profileUrl && (
                    <a href={c.profileUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-white/40 hover:text-[#1B98E0] transition-colors">
                      <ExternalLink size={12} /> {c.source === "linkedin" ? "Ver no LinkedIn" : "Ver perfil"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
