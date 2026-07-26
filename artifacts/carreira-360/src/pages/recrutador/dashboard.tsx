import { useEffect, useState } from "react";
import { Link } from "wouter";
import { apiFetch } from "@/lib/auth";
import { Search, Users, BarChart3, Target } from "lucide-react";

export default function RecrutadorDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/recruiter/stats").then(setStats).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "TOTAL BUSCAS", value: stats?.totalSearches ?? "—", icon: Search, href: "/recrutador/buscar", color: "#FACC15" },
    { label: "CANDIDATOS", value: stats?.totalCandidates ?? "—", icon: Users, href: "/recrutador/ranking", color: "#F97316" },
    { label: "SCORE MÉDIO", value: stats?.avgMatchScore ? `${stats.avgMatchScore}%` : "—", icon: BarChart3, href: "/recrutador/ranking", color: "#FACC15" },
    { label: "BUSCAS ATIVAS", value: stats?.activeSearches ?? "—", icon: Target, href: "/recrutador/buscar", color: "#F97316" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-6xl md:text-8xl text-white uppercase mb-12">
          Painel <span className="text-[#F97316]">Recrutador</span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.label} href={card.href}
                className="block bg-white/5 border-2 border-white/10 p-8 hover:border-[#F97316] transition-colors group shadow-[8px_8px_0px_0px_rgba(249,115,22,0.3)]">
                <Icon size={32} className="text-[#F97316] mb-4" />
                <p className="font-display text-5xl text-white group-hover:text-[#F97316] transition-colors">{card.value}</p>
                <p className="font-bold text-sm text-white/50 uppercase tracking-widest mt-2">{card.label}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/recrutador/buscar" className="flex flex-col items-center gap-4 bg-[#F97316] text-white p-12 hover:bg-[#FACC15] hover:text-[#0A0A0A] transition-colors shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
            <Search size={48} />
            <span className="font-display text-3xl uppercase">Nova Busca de Candidatos</span>
          </Link>
          <Link href="/recrutador/ranking" className="flex flex-col items-center gap-4 bg-white/5 border-2 border-white/10 p-12 hover:border-[#F97316] transition-colors">
            <Users size={48} className="text-[#F97316]" />
            <span className="font-display text-3xl text-white uppercase">Ver Ranking de Candidatos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
