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

  const inputClass = "w-full bg-white/5 border-2 border-white/20 text-white px-6 py-4 text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30";
  const labelClass = "block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3";

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 md:p-12">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="font-display text-6xl md:text-8xl text-white uppercase">
            Carta de <span className="text-[#FACC15]">Motivação</span>
          </h1>
          <button onClick={() => setShowForm(!showForm)}
            className="h-14 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] px-8 font-display text-lg uppercase transition-colors flex items-center gap-2">
            <Plus size={20} /> NOVA
          </button>
        </div>

        {showForm && (
          <div className="bg-white/5 border-2 border-[#FACC15] p-8 mb-12 shadow-[8px_8px_0px_0px_rgba(249,115,22,0.5)]">
            <h2 className="font-display text-3xl text-[#FACC15] uppercase mb-6">Gerar com IA</h2>
            <form onSubmit={handleGenerate} className="space-y-6 mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className={labelClass}>EMPRESA</label><input value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} placeholder="Ex: Unitel" className={inputClass} /></div>
                <div><label className={labelClass}>POSIÇÃO</label><input value={form.position} onChange={e => setForm({...form, position: e.target.value})} placeholder="Ex: Desenvolvedor Full Stack" className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>TOM</label>
                <select value={form.tone} onChange={e => setForm({...form, tone: e.target.value})} className={inputClass}>
                  <option value="professional">Profissional</option>
                  <option value="friendly">Amigável</option>
                  <option value="creative">Criativo</option>
                  <option value="formal">Formal</option>
                </select>
              </div>
              <button type="submit" disabled={generating}
                className="h-14 bg-[#F97316] hover:bg-[#FACC15] text-white hover:text-[#0A0A0A] px-8 font-display text-lg uppercase transition-colors flex items-center gap-2 disabled:opacity-50">
                <Zap size={20} /> {generating ? "A GERAR..." : "GERAR COM IA"}
              </button>
            </form>

            {form.content && (
              <form onSubmit={handleSave} className="space-y-6 border-t border-white/10 pt-8">
                <div><label className={labelClass}>TÍTULO</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputClass} /></div>
                <div><label className={labelClass}>CONTEÚDO</label><textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={12} className={`${inputClass} resize-none`} /></div>
                <button type="submit" className="w-full h-16 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] text-xl font-display uppercase transition-colors shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">GUARDAR CARTA</button>
              </form>
            )}
          </div>
        )}

        {loading ? <p className="font-display text-4xl text-[#FACC15] animate-pulse text-center py-20">A CARREGAR...</p> : letters.length === 0 ? (
          <div className="text-center py-20"><MessageSquare size={64} className="text-white/20 mx-auto mb-6" /><p className="font-display text-3xl text-white/40 uppercase">Nenhuma carta ainda</p></div>
        ) : (
          <div className="space-y-6">
            {letters.map((l: any) => (
              <div key={l.id} className="bg-white/5 border-2 border-white/10 p-8 hover:border-[#FACC15] transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-3xl text-white uppercase">{l.title}</h3>
                    {l.companyName && <p className="text-[#F97316] font-bold text-sm uppercase">{l.companyName} — {l.position}</p>}
                  </div>
                  <button onClick={() => handleDelete(l.id)} className="text-[#F97316] hover:text-red-500"><Trash2 size={20} /></button>
                </div>
                <p className="text-white/60 whitespace-pre-wrap line-clamp-4">{l.content}</p>
                <p className="text-white/30 text-xs mt-4">{new Date(l.createdAt).toLocaleDateString("pt-AO")}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
