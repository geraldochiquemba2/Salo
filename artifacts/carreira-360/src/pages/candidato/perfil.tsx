import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function CandidatoPerfil() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    headline: "", bio: "", location: "", phone: "", linkedinUrl: "",
    skills: "", languages: "", experience: "", education: "",
  });

  useEffect(() => {
    apiFetch("/api/candidate/profile").then((p) => {
      setForm({
        headline: p.headline || "", bio: p.bio || "", location: p.location || "",
        phone: p.phone || "", linkedinUrl: p.linkedinUrl || "",
        skills: Array.isArray(p.skills) ? p.skills.join(", ") : "",
        languages: Array.isArray(p.languages) ? p.languages.map((l: any) => `${l.name} (${l.level})`).join(", ") : "",
        experience: Array.isArray(p.experience) ? p.experience.map((e: any) => `${e.title} @ ${e.company} (${e.period})`).join("\n") : "",
        education: Array.isArray(p.education) ? p.education.map((e: any) => `${e.degree} - ${e.institution} (${e.year})`).join("\n") : "",
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        headline: form.headline || null,
        bio: form.bio || null,
        location: form.location || null,
        phone: form.phone || null,
        linkedinUrl: form.linkedinUrl || null,
        skills: form.skills ? form.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
        languages: form.languages ? form.languages.split(",").map((l: string) => { const [name, level] = l.trim().split("("); return { name: name?.trim() || "", level: level?.replace(")", "").trim() || "" }; }) : [],
        experience: form.experience ? form.experience.split("\n").filter(Boolean).map((e: string) => { const parts = e.split("@"); const [title, rest] = [parts[0]?.trim() || "", parts[1]?.trim() || ""]; const [company, period] = rest.split("(").map((s: string) => s.replace(")", "").trim()); return { title, company: company || "", period: period || "", description: "" }; }) : [],
        education: form.education ? form.education.split("\n").filter(Boolean).map((e: string) => { const [degree, rest] = e.split("-").map((s: string) => s.trim()); const [institution, year] = (rest || "").split("(").map((s: string) => s.replace(")", "").trim()); return { degree: degree || "", institution: institution || "", field: "", year: year || "" }; }) : [],
      };
      await apiFetch("/api/candidate/profile", { method: "POST", body: JSON.stringify(body) });
      toast({ title: "PERFIL GUARDADO", description: "As tuas informações foram atualizadas." });
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full bg-white/5 border-2 border-white/20 text-white px-4 sm:px-6 py-4 text-base sm:text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30";
  const labelClass = "block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3";

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><p className="font-display text-4xl text-[#FACC15] animate-pulse">A CARREGAR...</p></div>;

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0A0A0A]/80"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-12">
          Meu <span className="text-[#FACC15]">Perfil</span>
        </h1>
        <form onSubmit={handleSave} className="space-y-8">
          <div>
            <label className={labelClass}>HEADLINE</label>
            <input value={form.headline} onChange={e => setForm({...form, headline: e.target.value})} placeholder="Ex: Desenvolvedor Full Stack" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>BIO</label>
            <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={4} placeholder="Fala sobre ti..." className={`${inputClass} resize-none`} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>LOCALIZAÇÃO</label>
              <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Luanda, Angola" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>TELEFONE</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+244 900 000 000" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>LINKEDIN URL</label>
            <input value={form.linkedinUrl} onChange={e => setForm({...form, linkedinUrl: e.target.value})} placeholder="https://linkedin.com/in/..." className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>COMPETÊNCIAS (separadas por vírgula)</label>
            <input value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} placeholder="JavaScript, React, Node.js, Python" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>IDIOMAS (nome e nível)</label>
            <input value={form.languages} onChange={e => setForm({...form, languages: e.target.value})} placeholder="Português (Nativo), Inglês (Fluente)" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>EXPERIÊNCIA (uma por linha: Cargo @ Empresa (Período))</label>
            <textarea value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} rows={4} placeholder="Dev Full Stack @ Unitel (2022-2024)" className={`${inputClass} resize-none`} />
          </div>
          <div>
            <label className={labelClass}>FORMAÇÃO (uma por linha: Grau - Instituição (Ano))</label>
            <textarea value={form.education} onChange={e => setForm({...form, education: e.target.value})} rows={3} placeholder="Licenciatura - Universidade Agostinho Neto (2022)" className={`${inputClass} resize-none`} />
          </div>
          <button type="submit" disabled={saving}
            className="w-full h-14 sm:h-20 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] text-lg sm:text-2xl font-display uppercase transition-colors disabled:opacity-50 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
            {saving ? "A GUARDAR..." : "GUARDAR PERFIL"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
