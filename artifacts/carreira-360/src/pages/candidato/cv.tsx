import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText } from "lucide-react";

export default function CandidatoCv() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ fileName: "", content: "", skills: "", experience: "", education: "", summary: "" });
  const [hasCv, setHasCv] = useState(false);

  useEffect(() => {
    apiFetch("/api/candidate/cv").then((cv) => {
      setHasCv(true);
      setForm({
        fileName: cv.fileName || "",
        content: cv.content || "",
        skills: Array.isArray(cv.skills) ? cv.skills.join(", ") : (typeof cv.skills === "string" ? JSON.parse(cv.skills).join(", ") : ""),
        experience: cv.experience || "",
        education: cv.education || "",
        summary: cv.summary || "",
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        fileName: form.fileName || "meu-cv.txt",
        content: form.content,
        skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
        experience: form.experience,
        education: form.education,
        summary: form.summary || null,
      };
      await apiFetch("/api/candidate/cv", { method: "POST", body: JSON.stringify(body) });
      setHasCv(true);
      toast({ title: "CV GUARDADO", description: "O teu CV foi atualizado com sucesso." });
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full bg-white/5 border-2 border-white/20 text-white px-6 py-4 text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30";
  const labelClass = "block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3";

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><p className="font-display text-4xl text-[#FACC15] animate-pulse">A CARREGAR...</p></div>;

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 md:p-12">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          {hasCv ? <FileText size={48} className="text-[#FACC15]" /> : <Upload size={48} className="text-[#F97316]" />}
          <h1 className="font-display text-6xl md:text-8xl text-white uppercase">
            {hasCv ? "Meu " : "Upload "}<span className="text-[#FACC15]">CV</span>
          </h1>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          <div>
            <label className={labelClass}>NOME DO FICHEIRO</label>
            <input value={form.fileName} onChange={e => setForm({...form, fileName: e.target.value})} placeholder="meu-cv.txt" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>CONTEÚDO DO CV</label>
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={10} placeholder="Cole ou escreve o conteúdo do teu CV aqui..." className={`${inputClass} resize-none`} required />
          </div>
          <div>
            <label className={labelClass}>COMPETÊNCIAS (separadas por vírgula)</label>
            <input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} placeholder="JavaScript, React, Node.js" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>EXPERIÊNCIA PROFISSIONAL</label>
            <textarea value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} rows={4} placeholder="Descreve a tua experiência..." className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>FORMAÇÃO</label>
            <textarea value={form.education} onChange={e => setForm({...form, education: e.target.value})} rows={3} placeholder="A tua formação académica..." className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>RESUMO (opcional)</label>
            <textarea value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} rows={3} placeholder="Um breve resumo do teu perfil..." className={`${inputClass} resize-none`} />
          </div>
          <button type="submit" disabled={saving}
            className="w-full h-20 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] text-2xl font-display uppercase transition-colors disabled:opacity-50 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
            {saving ? "A GUARDAR..." : hasCv ? "ATUALIZAR CV" : "GUARDAR CV"}
          </button>
        </form>
      </div>
    </div>
  );
}
