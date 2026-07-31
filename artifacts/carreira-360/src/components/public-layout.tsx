import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[#13293D] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#13293D]/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-display text-3xl text-[#1B98E0] hover:text-[#247BA0] transition-colors">TALENTOS</Link>
          <div className="flex items-center gap-6">
            <Link href="/vagas" className="text-white hover:text-[#1B98E0] font-bold text-sm uppercase tracking-wider">Vagas</Link>
            <Link href="/empresas" className="text-white hover:text-[#1B98E0] font-bold text-sm uppercase tracking-wider">Empresas</Link>
            {user ? (
              <Link href={user.role === "recruiter" ? "/recrutador" : "/candidato"} className="bg-[#1B98E0] text-[#13293D] px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-[#247BA0] transition-colors">Painel</Link>
            ) : (
              <Link href="/login" className="bg-[#1B98E0] text-[#13293D] px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-[#247BA0] transition-colors">Entrar</Link>
            )}
          </div>
        </div>
      </nav>
      <main className="pt-20">{children}</main>
    </div>
  );
}
