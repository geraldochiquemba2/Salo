import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Plus, Trash2, Zap } from "lucide-react";

export default function CandidatoCarta() {
  const { toast } = useToast();
  const [letters, setLetters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", companyName: "", position: "", tone: "professional" });

  const loadLetters = () => apiFetch("/api/candidate/cover-letters").then(setLetters).catch(() => {});

  useEffect(() => { loadLetters().finally(() => setLoading(false)); }, []);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.companyName || !form.position) { toast({ title: "ERRO", description: "Empresa e posição são obrigatórias", variant: "destructive" }); return; }
    setGenerating(true);
    try {
      const result = await apiFetch("/api/candidate/cover-letters/generate", { method: "POST", body: JSON.stringify({ companyName: form.companyName, position: form.position, tone: form.tone }) });
      setForm(prev => ({ ...prev, content: result.content, title: `Carta - ${form.position} @ ${form.companyName}` }));
      toast({ title: "CARTA GERADA", description: "A IA gerou a tua carta de motivação." });
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.content) { toast({ title: "ERRO", description: "Título e conteúdo são obrigatórios", variant: "destructive" }); return; }
    try {
      await apiFetch("/api/candidate/cover-letters", { method: "POST", body: JSON.stringify(form) });
      toast({ title: "CARTA GUARDADA" });
      setShowForm(false);
      setForm({ title: "", content: "", companyName: "", position: "", tone: "professional" });
      loadLetters();
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    }
  }

  async function handleDelete(id: number) {
    try {
      await apiFetch(`/api/candidate/cover-letters/${id}`, { method: "DELETE" });
      loadLetters();
    } catch {}
  }

  const inputClass = "w-full bg-white/5 border-2 border-white/20 text-white px-4 sm:px-6 py-4 text-base sm:text-lg focus:border-[#1B98E0] focus:outline-none rounded-none placeholder:text-white/30";
  const labelClass = "block text-[#1B98E0] uppercase tracking-widest font-bold text-sm mb-3";

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase">
            Carta de <span className="text-[#1B98E0]">Motivação</span>
          </h1>
          <button onClick={() => setShowForm(!showForm)}
            className="h-14 bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] px-8 font-display text-lg uppercase transition-colors flex items-center gap-2">
            <Plus size={20} /> NOVA
          </button>
        </div>

        {showForm && (
          <div className="bg-white/5 border-2 border-[#1B98E0] p-4 sm:p-8 mb-12 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.5)]">
            <h2 className="font-display text-3xl text-[#1B98E0] uppercase mb-6">Gerar com IA</h2>
            <form onSubmit={handleGenerate} className="space-y-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className={labelClass}>EMPRESA</label><input value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} placeholder="Ex: Unitel" className={inputClass} /></div>
                <div><label className={labelClass}>POSIÇÃO</label><input value={form.position} onChange={e => setForm({...form, position: e.target.value})} placeholder="Ex: Desenvolvedor Full Stack" className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>TOM</label>
                <select value={form.tone} onChange={e => setForm({...form, tone: e.target.value})} className={inputClass} style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "white" }}>
                  <option value="professional" style={{ backgroundColor: "#1a1a1a", color: "white" }}>Profissional</option>
                  <option value="friendly" style={{ backgroundColor: "#1a1a1a", color: "white" }}>Amigável</option>
                  <option value="creative" style={{ backgroundColor: "#1a1a1a", color: "white" }}>Criativo</option>
                  <option value="formal" style={{ backgroundColor: "#1a1a1a", color: "white" }}>Formal</option>
                </select>
              </div>
              <button type="submit" disabled={generating}
                className="h-14 bg-[#247BA0] hover:bg-[#1B98E0] text-white hover:text-[#13293D] px-8 font-display text-lg uppercase transition-colors flex items-center gap-2 disabled:opacity-50">
                <Zap size={20} /> {generating ? "A GERAR..." : "GERAR COM IA"}
              </button>
            </form>

            {form.content && (
              <form onSubmit={handleSave} className="space-y-6 border-t border-white/10 pt-8">
                <div><label className={labelClass}>TÍTULO</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>CONTEÚDO</label><textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={12} className={`${inputClass} resize-none`} /></div>
                <button type="submit" className="w-full h-12 sm:h-16 bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] text-lg sm:text-xl font-display uppercase transition-colors shadow-[8px_8px_0px_0px_rgba(36,123,160,1)]">GUARDAR CARTA</button>
              </form>
            )}
          </div>
        )}

        {loading ? <p className="font-display text-4xl text-[#1B98E0] animate-pulse text-center py-20">A CARREGAR...</p> : letters.length === 0 ? (
          <div className="text-center py-20"><MessageSquare size={64} className="text-white/20 mx-auto mb-6" /><p className="font-display text-3xl text-white/40 uppercase">Nenhuma carta ainda</p></div>
        ) : (
          <div className="space-y-6">
            {letters.map((l: any) => (
              <div key={l.id} className="bg-white/5 border-2 border-white/10 p-4 sm:p-8 hover:border-[#1B98E0] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-3xl text-white uppercase">{l.title}</h3>
                    {l.companyName && <p className="text-[#247BA0] font-bold text-sm uppercase">{l.companyName} — {l.position}</p>}
                  </div>
                  <button onClick={() => handleDelete(l.id)} className="text-[#247BA0] hover:text-red-500"><Trash2 size={20} /></button>
                </div>
                <p className="text-white/60 whitespace-pre-wrap line-clamp-4">{l.content}</p>
                <p className="text-white/30 text-xs mt-4">{new Date(l.createdAt).toLocaleDateString("pt-AO")}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
