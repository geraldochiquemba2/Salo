import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, X, MapPin, Briefcase, DollarSign, Undo2, History } from "lucide-react";

const allJobs = [
  { id: 1, title: "Engenheiro de Software Sénior", company: "Unitel", location: "Luanda", description: "Desenvolvimento de aplicações web e mobile utilizando tecnologias modernas.", skills: ["React", "Node.js", "PostgreSQL"], salary: "350 000 – 500 000 Kz" },
  { id: 2, title: "Analista de Dados", company: "Banco BFA", location: "Luanda", description: "Análise e modelagem de dados para apoio à tomada de decisões.", skills: ["Python", "SQL", "Power BI"], salary: "280 000 – 380 000 Kz" },
  { id: 3, title: "Gestor de Projecto", company: "Odebrecht Angola", location: "Cabinda", description: "Gestão e coordenação de projectos de construção civil.", skills: ["PMP", "MS Project", "Liderança"], salary: "400 000 – 600 000 Kz" },
  { id: 4, title: "Designer de Produto", company: "AfriTech", location: "Luanda", description: "Design de interfaces de utilizador e experiência do utilizador.", skills: ["Figma", "UX Research", "Design System"], salary: "220 000 – 320 000 Kz" },
  { id: 5, title: "Engenheiro Petrolífero", company: "Sonangol", location: "Soyo", description: "Engenharia de perfuração e exploração petrolífera.", skills: ["Reservoir Eng.", "Drilling", "HSE"], salary: "800 000 – 1 200 000 Kz" },
  { id: 6, title: "Especialista em Telecomunicações", company: "Angola Telecom", location: "Huambo", description: "Gestão de redes de telecomunicações e infraestrutura.", skills: ["Redes 5G", "Fibra Óptica", "VoIP"], salary: "300 000 – 420 000 Kz" },
  { id: 7, title: "Responsável de Marketing Digital", company: "Multichoice Angola", location: "Luanda", description: "Estratégias de marketing digital e redes sociais.", skills: ["SEO", "Meta Ads", "Conteúdo"], salary: "240 000 – 340 000 Kz" },
  { id: 8, title: "Gestor Financeiro", company: "Grupo Zahara", location: "Luanda", description: "Gestão financeira e controlo orçamental.", skills: ["IFRS", "Controlo de Gestão", "Excel"], salary: "500 000 – 700 000 Kz" },
  { id: 9, title: "Arquitecto de Software", company: "iGrow", location: "Luanda", description: "Arquitetura de soluções cloud e microserviços.", skills: ["AWS", "Microserviços", "Golang"], salary: "450 000 – 650 000 Kz" },
];

interface SwipeAction {
  job: typeof allJobs[0];
  action: "superlike" | "pass";
}

export default function CandidatoSwipe() {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading] = useState(false);
  const [swiping, setSwiping] = useState(false);
  const [history, setHistory] = useState<SwipeAction[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const currentJob = allJobs[currentIndex];

  function handleSwipe(action: "superlike" | "pass") {
    if (!currentJob || swiping) return;
    setSwiping(true);
    setHistory(prev => [...prev, { job: currentJob, action }]);
    if (action !== "pass") {
      toast({ title: "SUPER LIKE!", description: `${currentJob.title} @ ${currentJob.company}` });
    }
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwiping(false);
    }, 300);
  }

  function handleUndo() {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }

  if (loading) return <div className="min-h-screen bg-[#13293D] flex items-center justify-center"><p className="font-display text-4xl text-[#1B98E0] animate-pulse">A CARREGAR...</p></div>;

  if (!currentJob) return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>
      <div className="text-center relative z-10">
        <p className="font-display text-5xl text-[#1B98E0] mb-4">ACABASTE!</p>
        <p className="text-white/50 text-xl mb-8">Não há mais vagas para swipar.</p>
        {history.length > 0 && (
          <button onClick={() => setShowHistory(!showHistory)} className="h-14 bg-[#247BA0] hover:bg-[#1B98E0] text-white hover:text-[#13293D] px-8 font-display uppercase flex items-center gap-3 mx-auto">
            <History size={20} /> VER HISTÓRICO ({history.length})
          </button>
        )}
        {showHistory && (
          <div className="mt-8 max-w-lg mx-auto space-y-3">
            {history.map((h, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-4 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-white font-bold">{h.job.title}</p>
                  <p className="text-white/40 text-sm">{h.job.company}</p>
                </div>
                <span className={`font-display text-lg ${h.action === "superlike" ? "text-[#1B98E0]" : "text-[#247BA0]"}`}>
                  {h.action === "superlike" ? "★" : "✕"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase">
            Swipe <span className="text-[#1B98E0]">Vagas</span>
          </h1>
          {history.length > 0 && (
            <button onClick={handleUndo} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 font-bold text-sm uppercase transition-colors">
              <Undo2 size={16} /> Desfazer
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto mb-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentJob.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 border-2 border-white/10 p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.5)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Briefcase size={24} className="text-[#1B98E0]" />
              <span className="text-white/40 text-sm uppercase">{currentJob.company}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white uppercase mb-4">{currentJob.title}</h2>
            <div className="flex items-center gap-2 text-white/50 mb-4">
              <MapPin size={16} /> {currentJob.location}
            </div>
            {currentJob.salary && (
              <div className="flex items-center gap-2 text-[#1B98E0] mb-6">
                <DollarSign size={16} /> <span className="font-bold">{currentJob.salary}</span>
              </div>
            )}
            <p className="text-white/60 mb-6">{currentJob.description}</p>
            <div className="flex flex-wrap gap-2">
              {(currentJob.skills || []).map((s: string) => (
                <span key={s} className="text-xs border border-[#1B98E0] text-[#1B98E0] px-3 py-1 uppercase font-bold">{s}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-6 mt-8">
          <button onClick={() => handleSwipe("pass")} disabled={swiping}
            className="w-20 h-20 border-2 border-[#247BA0] text-[#247BA0] flex items-center justify-center hover:bg-[#247BA0] hover:text-white transition-colors disabled:opacity-50">
            <X size={32} />
          </button>
          <button onClick={() => handleSwipe("superlike")} disabled={swiping}
            className="w-20 h-20 border-2 border-[#1B98E0] text-[#1B98E0] flex items-center justify-center hover:bg-[#1B98E0] hover:text-[#13293D] transition-colors disabled:opacity-50">
            <ThumbsUp size={32} />
          </button>
        </div>
        <p className="text-center text-white/30 text-sm mt-4 uppercase">{currentIndex + 1} / {allJobs.length}</p>
        {history.length > 0 && (
          <p className="text-center text-white/20 text-xs mt-2 uppercase">{history.length} vagas avaliadas</p>
        )}
      </div>
    </div>
  );
}
