import { Link } from "wouter";
import { Briefcase, BarChart3, BookOpen, Bell, FileText, Heart, Mic, MessageSquare, User } from "lucide-react";

const totalVagas = 9;
const totalCursos = 12;

export default function CandidatoDashboard() {
  const cards = [
    { label: "VAGAS ENCONTRADAS", value: totalVagas, icon: Briefcase, href: "/candidato/vagas", color: "#1B98E0" },
    { label: "MATCH SCORE MÉDIO", value: "—", icon: BarChart3, href: "/candidato/analise", color: "#247BA0" },
    { label: "CURSOS RECOMENDADOS", value: totalCursos, icon: BookOpen, href: "/candidato/cursos", color: "#1B98E0" },
    { label: "NOTIFICAÇÕES", value: "—", icon: Bell, href: "/candidato/notificacoes", color: "#247BA0" },
  ];

  const quickActions = [
    { label: "MEU PERFIL", icon: User, href: "/candidato/perfil" },
    { label: "UPLOAD CV", icon: FileText, href: "/candidato/cv" },
    { label: "SWIPE VAGAS", icon: Heart, href: "/candidato/swipe" },
    { label: "ENTREVISTAS", icon: Mic, href: "/candidato/entrevistas" },
    { label: "CARTA DE MOTIVAÇÃO", icon: MessageSquare, href: "/candidato/carta-motivacao" },
  ];

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-12">
          Meu <span className="text-[#1B98E0]">Painel</span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.label} href={card.href}
                className="block bg-white/5 border-2 border-white/10 p-4 sm:p-8 hover:border-[#1B98E0] transition-colors group shadow-[8px_8px_0px_0px_rgba(36,123,160,0.3)]">
                <Icon size={32} className="text-[#1B98E0] mb-4" />
                <p className="font-display text-5xl text-white group-hover:text-[#1B98E0] transition-colors">{card.value}</p>
                <p className="font-bold text-sm text-white/50 uppercase tracking-widest mt-2">{card.label}</p>
              </Link>
            );
          })}
        </div>

        <h2 className="font-display text-4xl text-white uppercase mb-8">Acesso Rápido</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}
                className="flex flex-col items-center gap-4 bg-[#1B98E0] text-[#13293D] p-4 sm:p-8 hover:bg-[#247BA0] hover:text-white transition-colors shadow-[8px_8px_0px_0px_rgba(36,123,160,1)]">
                <Icon size={36} />
                <span className="font-display text-xl uppercase">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
