import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/auth";
import { useLocation } from "wouter";
import { Search, Zap, Users, Globe } from "lucide-react";

export default function RecrutadorBuscar() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!description || !keywords) { toast({ title: "ERRO", description: "Descrição e keywords são obrigatórias", variant: "destructive" }); return; }
    setLoading(true);
    try {
      await apiFetch("/api/recruiter/searches", { method: "POST", body: JSON.stringify({ description, keywords, location: location || undefined }) });
      toast({ title: "BUSCA CONCLUÍDA", description: "Candidatos encontrados na plataforma e no LinkedIn." });
      navigate("/recrutador/ranking");
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full bg-white/5 border-2 border-white/20 text-white px-4 sm:px-6 py-4 text-base sm:text-lg focus:border-[#247BA0] focus:outline-none rounded-none placeholder:text-white/30";
  const labelClass = "block text-[#247BA0] uppercase tracking-widest font-bold text-sm mb-3";

  return (
    <div className="min-h-screen bg-[#13293D] p-6 md:p-12">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-4">
          Buscar <span className="text-[#247BA0]">Candidatos</span>
        </h1>
        <p className="text-white/40 text-lg mb-8 font-bold">Busca na plataforma e no LinkedIn simultaneamente</p>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-[#1B98E0]/10 border border-[#1B98E0]/30 px-4 py-2">
            <Users size={16} className="text-[#1B98E0]" />
            <span className="text-[#1B98E0] font-bold text-sm uppercase">Plataforma</span>
          </div>
          <div className="flex items-center gap-2 bg-[#0077B5]/10 border border-[#0077B5]/30 px-4 py-2">
            <Globe size={16} className="text-[#0077B5]" />
            <span className="text-[#0077B5] font-bold text-sm uppercase">LinkedIn</span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-8 bg-white/5 border-2 border-[#247BA0] p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.5)]">
          <div>
            <label className={labelClass}>DESCRIÇÃO DA VAGA</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} required placeholder="Descreve a posição que pretendes preencher..."
              className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>COMPETÊNCIAS (separadas por vírgula)</label>
            <input value={keywords} onChange={e => setKeywords(e.target.value)} required placeholder="JavaScript, React, Node.js"
              className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>LOCALIZAÇÃO</label>
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Luanda, Angola"
              className={inputClass} />
          </div>
          <button type="submit" disabled={loading}
            className="w-full h-14 sm:h-20 bg-[#247BA0] hover:bg-[#1B98E0] text-white hover:text-[#13293D] text-lg sm:text-2xl font-display uppercase transition-colors disabled:opacity-50 flex items-center justify-center gap-4 shadow-[8px_8px_0px_0px_rgba(36,123,160,1)]">
            {loading ? "A BUSCAR..." : <><Zap size={24} /> BUSCAR CANDIDATOS</>}
          </button>
        </form>
      </div>
    </div>
  );
}
