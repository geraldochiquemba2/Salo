import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { register } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Cadastro() {
  const [, navigate] = useLocation();
  const { setUser } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(email, password, name, role);
      setUser(user);
      toast({ title: "CONTA CRIADA", description: "Bem-vindo ao SALO!" });
      navigate(user.role === "recruiter" ? "/recrutador" : "/candidato");
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80"
          alt="Cadastro background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/80"></div>
      </div>
      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#FACC15] transition-colors mb-8 font-bold text-sm uppercase tracking-wider">
          ← Voltar
        </Link>
        <Link href="/" className="font-display text-4xl sm:text-5xl text-[#FACC15] block text-center mb-12">SALO</Link>
        <h1 className="font-display text-4xl sm:text-6xl text-white text-center mb-12 uppercase">Criar Conta</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3">Nome</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required
              className="w-full bg-white/5 border-2 border-white/20 text-white h-14 sm:h-16 px-4 sm:px-6 text-base sm:text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30" placeholder="O teu nome" />
          </div>
          <div>
            <label className="block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-white/5 border-2 border-white/20 text-white h-14 sm:h-16 px-4 sm:px-6 text-base sm:text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30" placeholder="teu@email.com" />
          </div>
          <div>
            <label className="block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3">Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
              className="w-full bg-white/5 border-2 border-white/20 text-white h-14 sm:h-16 px-4 sm:px-6 text-base sm:text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30" placeholder="Mínimo 6 caracteres" />
          </div>
          <div>
            <label className="block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3">Eu sou</label>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => setRole("candidate")}
                className={`h-16 font-display text-xl uppercase border-2 transition-colors ${role === "candidate" ? "bg-[#FACC15] text-[#0A0A0A] border-[#FACC15]" : "border-white/20 text-white hover:border-[#FACC15]"}`}>
                Candidato
              </button>
              <button type="button" onClick={() => setRole("recruiter")}
                className={`h-16 font-display text-xl uppercase border-2 transition-colors ${role === "recruiter" ? "bg-[#F97316] text-white border-[#F97316]" : "border-white/20 text-white hover:border-[#F97316]"}`}>
                Recrutador
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full h-14 sm:h-20 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] text-lg sm:text-2xl font-display uppercase transition-colors disabled:opacity-50 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
            {loading ? "A criar..." : "Criar Conta"}
          </button>
        </form>
        <p className="text-center text-white/50 mt-8 font-sans">
          Já tens conta? <Link href="/login" className="text-[#FACC15] font-bold hover:text-[#F97316] uppercase">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
