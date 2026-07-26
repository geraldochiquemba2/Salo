import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-display text-3xl text-[#FACC15] hover:text-[#F97316] transition-colors">SALO</Link>
          <div className="flex items-center gap-6">
            <Link href="/vagas" className="text-white hover:text-[#FACC15] font-bold text-sm uppercase tracking-wider">Vagas</Link>
            <Link href="/empresas" className="text-white hover:text-[#FACC15] font-bold text-sm uppercase tracking-wider">Empresas</Link>
            {user ? (
              <Link href={user.role === "recruiter" ? "/recrutador" : "/candidato"} className="bg-[#FACC15] text-[#0A0A0A] px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-[#F97316] transition-colors">Painel</Link>
            ) : (
              <Link href="/login" className="bg-[#FACC15] text-[#0A0A0A] px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-[#F97316] transition-colors">Entrar</Link>
            )}
          </div>
        </div>
      </nav>
      <main className="pt-20">{children}</main>
    </div>
  );
}
