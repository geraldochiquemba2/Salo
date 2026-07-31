import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { BarChart3, TrendingUp, TrendingDown, Target } from "lucide-react";

export default function CandidatoAnalise() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/candidate/analysis").then(setAnalysis).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-[#13293D] flex items-center justify-center"><p className="font-display text-4xl text-[#1B98E0] animate-pulse">A ANALISAR...</p></div>;

  if (!analysis) return <div className="min-h-screen relative flex items-center justify-center"><div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-[#13293D]/50"></div></div><p className="font-display text-3xl text-white/60 relative z-10">Faz upload do teu CV primeiro</p></div>;

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-12">
          Análise de <span className="text-[#1B98E0]">Skills</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 border-2 border-[#1B98E0] p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.5)]">
            <Target size={32} className="text-[#1B98E0] mb-4" />
            <p className="font-display text-5xl sm:text-7xl text-[#1B98E0]">{analysis.overallMatchScore}%</p>
            <p className="text-white/50 uppercase font-bold text-sm mt-2">Score Geral</p>
          </div>
          <div className="bg-white/5 border-2 border-green-500 p-4 sm:p-8">
            <TrendingUp size={32} className="text-green-500 mb-4" />
            <p className="font-display text-2xl sm:text-4xl text-white mb-2">COMPETÊNCIAS FORTES</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {(analysis.strongSkills || []).map((s: string) => (
                <span key={s} className="border border-green-500 text-green-500 px-4 py-2 text-sm font-bold uppercase">{s}</span>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border-2 border-[#247BA0] p-4 sm:p-8">
            <TrendingDown size={32} className="text-[#247BA0] mb-4" />
            <p className="font-display text-2xl sm:text-4xl text-white mb-2">SKILLS EM FALTA</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {(analysis.missingSkills || []).map((s: string) => (
                <span key={s} className="border border-[#247BA0] text-[#247BA0] px-4 py-2 text-sm font-bold uppercase">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border-2 border-white/10 p-4 sm:p-8">
            <h2 className="font-display text-2xl sm:text-4xl text-[#1B98E0] uppercase mb-6">Cargos Recomendados</h2>
            <div className="space-y-4">
              {(analysis.recommendedRoles || []).map((r: string, i: number) => (
                <div key={r} className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="font-display text-4xl text-[#247BA0]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-white text-lg font-bold uppercase">{r}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border-2 border-white/10 p-4 sm:p-8">
            <h2 className="font-display text-2xl sm:text-4xl text-[#1B98E0] uppercase mb-6">Demanda de Mercado</h2>
            <div className="space-y-4">
              {Object.entries(analysis.marketDemand || {}).slice(0, 8).map(([skill, score]) => (
                <div key={skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white font-bold text-sm uppercase">{skill}</span>
                    <span className="text-[#1B98E0] font-bold">{score as number}%</span>
                  </div>
                  <div className="h-3 bg-white/10">
                    <div className="h-full bg-[#1B98E0]" style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
