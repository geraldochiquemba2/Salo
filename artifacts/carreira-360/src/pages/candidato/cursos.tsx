import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { BookOpen, ExternalLink, Clock, Award } from "lucide-react";

export default function CandidatoCursos() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/candidate/courses").then(setCourses).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><p className="font-display text-4xl text-[#FACC15] animate-pulse">A CARREGAR...</p></div>;

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0A0A0A]/80"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-12">
          Cursos <span className="text-[#FACC15]">Recomendados</span>
        </h1>

        {courses.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={64} className="text-white/20 mx-auto mb-6" />
            <p className="font-display text-3xl text-white/40 uppercase">Nenhum curso recomendado</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c: any) => (
              <a key={c.id} href={c.url} target="_blank" rel="noopener"
                className="block bg-white/5 border-2 border-white/10 p-4 sm:p-8 hover:border-[#FACC15] transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs border border-[#FACC15] text-[#FACC15] px-3 py-1 uppercase font-bold">{c.skill}</span>
                  {c.free ? <span className="text-xs bg-green-500 text-white px-3 py-1 uppercase font-bold">GRATUITO</span> : null}
                </div>
                <h3 className="font-display text-xl sm:text-3xl text-white group-hover:text-[#FACC15] uppercase mb-2">{c.title}</h3>
                <p className="text-[#F97316] font-bold uppercase text-sm mb-4">{c.provider}</p>
                <div className="flex items-center gap-4 text-white/50 text-sm">
                  <span className="flex items-center gap-1"><Clock size={14} /> {c.duration || "N/A"}</span>
                  <span className="flex items-center gap-1"><Award size={14} /> {c.level}</span>
                </div>
                <div className="mt-6 flex items-center gap-2 text-[#F97316] font-bold text-sm uppercase group-hover:text-[#FACC15]">
                  <ExternalLink size={14} /> Ver Curso
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
