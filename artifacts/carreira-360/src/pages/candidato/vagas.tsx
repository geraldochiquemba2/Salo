import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Search, Briefcase, MapPin, ExternalLink } from "lucide-react";

export default function CandidatoVagas() {
  const { toast } = useToast();
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/candidate/jobs").then(async (existing) => {
      if (existing && existing.length > 0) {
        setJobs(existing);
      } else {
        setSearching(true);
        await apiFetch("/api/candidate/jobs/search", { method: "POST", body: JSON.stringify({ keywords: "Developer", location: "Luanda" }) });
        const updated = await apiFetch("/api/candidate/jobs");
        setJobs(updated);
        setSearching(false);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!keywords.trim()) return;
    setSearching(true);
    try {
      await apiFetch("/api/candidate/jobs/search", { method: "POST", body: JSON.stringify({ keywords, location: location || undefined }) });
      const updated = await apiFetch("/api/candidate/jobs");
      setJobs(updated);
      toast({ title: "BUSCA CONCLUÍDA", description: `${updated.length} vagas encontradas.` });
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0A0A0A]/80"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-12">
          Buscar <span className="text-[#FACC15]">Vagas</span>
        </h1>

        <form onSubmit={handleSearch} className="bg-white/5 border-2 border-white/10 p-4 sm:p-8 mb-12 shadow-[8px_8px_0px_0px_rgba(249,115,22,0.3)]">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3">PALAVRAS-CHAVE</label>
              <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="Ex: JavaScript, React, Developer"
                className="w-full bg-white/5 border-2 border-white/20 text-white h-14 sm:h-16 px-4 sm:px-6 text-base sm:text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30" />
            </div>
            <div>
              <label className="block text-[#FACC15] uppercase tracking-widest font-bold text-sm mb-3">LOCALIZAÇÃO</label>
              <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Luanda, Angola"
                className="w-full bg-white/5 border-2 border-white/20 text-white h-14 sm:h-16 px-4 sm:px-6 text-base sm:text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30" />
            </div>
          </div>
          <button type="submit" disabled={searching}
            className="mt-6 h-12 sm:h-16 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] text-lg sm:text-xl font-display uppercase px-12 transition-colors disabled:opacity-50 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
            {searching ? "A BUSCAR..." : "BUSCAR VAGAS"}
          </button>
        </form>

        {loading ? (
          <p className="font-display text-4xl text-[#FACC15] animate-pulse text-center py-20">A CARREGAR...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase size={64} className="text-white/20 mx-auto mb-6" />
            <p className="font-display text-3xl text-white/40 uppercase">Nenhuma vaga encontrada</p>
            <p className="text-white/30 mt-4">Faz uma busca para encontrar vagas compatíveis</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job: any) => (
              <div key={job.id} className="bg-white/5 border-2 border-white/10 p-4 sm:p-8 hover:border-[#FACC15] transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-3xl text-white group-hover:text-[#FACC15] uppercase">{job.title}</h3>
                    <p className="text-[#F97316] font-bold uppercase tracking-wider mt-1">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-4xl text-[#FACC15]">{job.matchScore}%</p>
                    <p className="text-xs text-white/40 uppercase">Match</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                  <MapPin size={14} /> {job.location}
                </div>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">{job.description}</p>
                <div className="h-2 bg-white/10 mb-4">
                  <div className="h-full bg-[#FACC15]" style={{ width: `${job.matchScore}%` }} />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(Array.isArray(job.skillsRequired) ? job.skillsRequired : JSON.parse(job.skillsRequired || "[]")).slice(0, 4).map((s: string) => (
                    <span key={s} className="text-xs border border-[#FACC15] text-[#FACC15] px-3 py-1 uppercase font-bold">{s}</span>
                  ))}
                </div>
                {job.url && (
                  <a href={job.url} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-[#F97316] font-bold text-sm uppercase hover:text-[#FACC15]">
                    <ExternalLink size={14} /> Ver no LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
