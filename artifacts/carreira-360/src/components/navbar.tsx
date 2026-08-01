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
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#13293D] border-b-2 border-[#1B98E0]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href={user?.role === "recruiter" ? "/recrutador" : "/candidato"} className="font-display text-2xl sm:text-3xl text-[#1B98E0] hover:text-[#247BA0] transition-colors shrink-0">TALENTOS</Link>
          
          <div className="hidden md:flex items-center gap-1 flex-wrap flex-1 mx-4">
            {links.map((link) => {
              const Icon = link.icon;
              const active = location === link.href;
              return (
                <Link key={link.href} href={link.href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] lg:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors shrink-0 ${active ? "bg-[#1B98E0] text-[#13293D]" : "text-white hover:text-[#1B98E0]"}`}>
                  <Icon size={12} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <span className="text-white/60 text-xs font-bold uppercase">{user?.name}</span>
            <button onClick={logout} className="text-[#247BA0] hover:text-[#1B98E0]"><LogOut size={16} /></button>
          </div>

          <button 
            className="md:hidden text-white shrink-0 p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center" 
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div 
          className="fixed inset-0 z-[99] bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div 
        className={`fixed top-16 sm:top-20 left-0 right-0 z-[100] md:hidden transition-all duration-300 ease-in-out ${
          mobileOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-[#13293D] border-b-2 border-[#1B98E0] max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto shadow-2xl">
          <div className="p-4 flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = location === link.href;
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 text-base font-display uppercase rounded transition-colors min-h-[48px] ${active ? "bg-[#1B98E0] text-[#13293D]" : "text-white hover:bg-white/10 hover:text-[#1B98E0]"}`}>
                  <Icon size={20} /> {link.label}
                </Link>
              );
            })}
            <div className="border-t border-white/10 mt-2 pt-2">
              <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-3 px-4 py-3.5 text-base font-display uppercase text-[#247BA0] hover:text-[#1B98E0] min-h-[48px] w-full text-left">
                <LogOut size={20} /> Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
