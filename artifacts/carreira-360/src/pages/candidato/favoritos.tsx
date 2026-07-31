import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Briefcase, DollarSign, Trash2, ExternalLink } from "lucide-react";

interface Favorito {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  salary: string;
}

const initialFavoritos: Favorito[] = [
  { id: 1, title: "Engenheiro de Software Sénior", company: "Unitel", location: "Luanda", description: "Desenvolvimento de aplicações web e mobile utilizando tecnologias modernas.", skills: ["React", "Node.js", "PostgreSQL"], salary: "350 000 – 500 000 Kz" },
  { id: 4, title: "Designer de Produto", company: "AfriTech", location: "Luanda", description: "Design de interfaces de utilizador e experiência do utilizador.", skills: ["Figma", "UX Research", "Design System"], salary: "220 000 – 320 000 Kz" },
  { id: 9, title: "Arquitecto de Software", company: "iGrow", location: "Luanda", description: "Arquitetura de soluções cloud e microserviços.", skills: ["AWS", "Microserviços", "Golang"], salary: "450 000 – 650 000 Kz" },
];

export default function CandidatoFavoritos() {
  const { toast } = useToast();
  const [favoritos, setFavoritos] = useState<Favorito[]>(initialFavoritos);

  function handleRemove(id: number) {
    setFavoritos(prev => prev.filter(f => f.id !== id));
    toast({ title: "REMOVIDO", description: "Vaga removida dos favoritos." });
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Heart size={48} className="text-[#1B98E0]" fill="#1B98E0" />
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase">
              Meus <span className="text-[#1B98E0]">Favoritos</span>
            </h1>
          </div>

          {favoritos.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={64} className="text-white/10 mx-auto mb-4" />
              <p className="font-display text-3xl text-white/30 uppercase">Sem favoritos</p>
              <p className="text-white/20 mt-2">Faz Super Like nas vagas para as guardar aqui.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              <AnimatePresence>
                {favoritos.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    exit={{ opacity: 0, x: -200 }}
                    className="bg-white/5 border-2 border-white/10 p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.5)]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Briefcase size={20} className="text-[#1B98E0]" />
                          <span className="text-white/40 text-sm uppercase">{job.company}</span>
                        </div>
                        <h2 className="font-display text-2xl sm:text-4xl text-white uppercase mb-3">{job.title}</h2>
                        <div className="flex items-center gap-4 text-white/50 mb-3">
                          <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                          <span className="flex items-center gap-1 text-[#1B98E0]"><DollarSign size={14} /> {job.salary}</span>
                        </div>
                        <p className="text-white/60 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((s) => (
                            <span key={s} className="text-xs border border-[#1B98E0] text-[#1B98E0] px-3 py-1 uppercase font-bold">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2">
                        <button onClick={() => handleRemove(job.id)}
                          className="flex items-center gap-2 px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-colors text-sm font-bold uppercase">
                          <Trash2 size={14} /> Remover
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#1B98E0]/50 text-[#1B98E0] hover:bg-[#1B98E0] hover:text-[#13293D] transition-colors text-sm font-bold uppercase">
                          <ExternalLink size={14} /> Ver
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <p className="text-center text-white/20 text-sm mt-8 uppercase">{favoritos.length} vaga{favoritos.length !== 1 ? "s" : ""} guardada{favoritos.length !== 1 ? "s" : ""}</p>
        </div>
      </div>
    </div>
  );
}
