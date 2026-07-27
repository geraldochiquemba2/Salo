import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { login } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, navigate] = useLocation();
  const { setUser } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "ERRO", description: "Email inválido", variant: "destructive" });
      return;
    }
    if (!password) {
      toast({ title: "ERRO", description: "Senha obrigatória", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const user = await login(email, password);
      setUser(user);
      toast({ title: "BEM-VINDO", description: `Olá ${user.name}!` });
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
          alt="Login background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/80"></div>
      </div>
      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#FACC15] transition-colors mb-8 font-bold text-sm uppercase tracking-wider">
          ← Voltar
        </Link>
        <Link href="/" className="font-display text-4xl sm:text-5xl text-[#FACC15] block text-center mb-12">SALO</Link>
        <h1 className="font-display text-4xl sm:text-6xl text-white text-center mb-12 uppercase">Entrar</h1>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label className="block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-white/5 border-2 border-white/20 text-white h-14 sm:h-16 px-4 sm:px-6 text-base sm:text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30" placeholder="teu@email.com" />
          </div>
          <div>
            <label className="block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3">Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full bg-white/5 border-2 border-white/20 text-white h-14 sm:h-16 px-4 sm:px-6 text-base sm:text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full h-14 sm:h-20 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] text-lg sm:text-2xl font-display uppercase transition-colors disabled:opacity-50 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
            {loading ? "A entrar..." : "Entrar"}
          </button>
        </form>
        <p className="text-center text-white/50 mt-8 font-sans">
          Não tens conta? <Link href="/cadastro" className="text-[#FACC15] font-bold hover:text-[#F97316] uppercase">Registar</Link>
        </p>
      </div>
    </div>
  );
}
