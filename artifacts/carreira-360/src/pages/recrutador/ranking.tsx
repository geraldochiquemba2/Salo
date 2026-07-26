import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { Users, MapPin, Star } from "lucide-react";

export default function RecrutadorRanking() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/recruiter/candidates").then(setCandidates).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><p className="font-display text-4xl text-[#F97316] animate-pulse">A CARREGAR...</p></div>;

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-6xl md:text-8xl text-white uppercase mb-12">
          Ranking de <span className="text-[#F97316]">Candidatos</span>
        </h1>

        {candidates.length === 0 ? (
          <div className="text-center py-20">
            <Users size={64} className="text-white/20 mx-auto mb-6" />
            <p className="font-display text-3xl text-white/40 uppercase">Nenhum candidato encontrado</p>
            <p className="text-white/30 mt-4">Faz uma busca primeiro</p>
          </div>
        ) : (
          <div className="space-y-4">
            {candidates.sort((a: any, b: any) => b.matchScore - a.matchScore).map((c: any, i: number) => (
              <div key={c.id} className="bg-white/5 border-2 border-white/10 p-6 flex items-center gap-6 hover:border-[#F97316] transition-colors">
                <span className="font-display text-5xl text-[#F97316] w-16 text-center">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-16 h-16 bg-[#F97316] flex items-center justify-center shrink-0">
                  {c.avatarUrl ? <img src={c.avatarUrl} alt="" className="w-full h-full object-cover" /> : <Users size={24} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-3xl text-white uppercase truncate">{c.name}</h3>
                  <p className="text-[#FACC15] font-bold text-sm uppercase">{c.title}</p>
                  <div className="flex items-center gap-2 text-white/40 text-sm mt-1"><MapPin size={12} /> {c.location}</div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-5xl text-[#F97316]">{c.matchScore}%</p>
                  <div className="flex items-center gap-1 text-[#FACC15] text-sm"><Star size={12} /> Match</div>
                </div>
                <div className="hidden md:flex flex-wrap gap-2 max-w-[300px]">
                  {(Array.isArray(c.skills) ? c.skills : JSON.parse(c.skills || "[]")).slice(0, 3).map((s: string) => (
                    <span key={s} className="text-xs border border-[#F97316] text-[#F97316] px-2 py-1 uppercase font-bold">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
