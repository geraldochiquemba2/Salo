import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Menu, X, LogOut, User, Briefcase, FileText, Search, BarChart3, Bell, MessageSquare, BookOpen, Heart, Star, Mic, LayoutDashboard } from "lucide-react";

const candidateLinks = [
  { href: "/candidato", label: "Dashboard", icon: LayoutDashboard },
  { href: "/candidato/perfil", label: "Perfil", icon: User },
  { href: "/candidato/cv", label: "CV", icon: FileText },
  { href: "/candidato/vagas", label: "Vagas", icon: Briefcase },
  { href: "/candidato/swipe", label: "Swipe", icon: Heart },
  { href: "/candidato/favoritos", label: "Favoritos", icon: Star },
  { href: "/candidato/analise", label: "Análise", icon: BarChart3 },
  { href: "/candidato/cursos", label: "Cursos", icon: BookOpen },
  { href: "/candidato/carta-motivacao", label: "Carta", icon: MessageSquare },
  { href: "/candidato/entrevistas", label: "Entrevistas", icon: Mic },
  { href: "/candidato/notificacoes", label: "Notificações", icon: Bell },
];

const recruiterLinks = [
  { href: "/recrutador", label: "Dashboard", icon: LayoutDashboard },
  { href: "/recrutador/buscar", label: "Buscar", icon: Search },
  { href: "/recrutador/ranking", label: "Ranking", icon: BarChart3 },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = user?.role === "recruiter" ? recruiterLinks : candidateLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#13293D] border-b-2 border-[#1B98E0]">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-display text-3xl text-[#1B98E0] hover:text-[#247BA0] transition-colors">TALENTOS</Link>
        
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = location === link.href;
            return (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${active ? "bg-[#1B98E0] text-[#13293D]" : "text-white hover:text-[#1B98E0]"}`}>
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <span className="text-white/60 text-sm font-bold uppercase">{user?.name}</span>
          <button onClick={logout} className="flex items-center gap-2 text-[#247BA0] hover:text-[#1B98E0] text-sm font-bold uppercase"><LogOut size={16} /></button>
        </div>

        <button className="lg:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#13293D] border-t border-white/10 p-6 flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const active = location === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-lg font-display uppercase ${active ? "bg-[#1B98E0] text-[#13293D]" : "text-white hover:text-[#1B98E0]"}`}>
                <Icon size={20} /> {link.label}
              </Link>
            );
          })}
          <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-3 px-4 py-3 text-lg font-display uppercase text-[#247BA0]"><LogOut size={20} /> Sair</button>
        </div>
      )}
    </nav>
  );
}
