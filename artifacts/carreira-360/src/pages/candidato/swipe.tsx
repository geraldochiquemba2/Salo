import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useHasCv } from "@/hooks/use-has-cv";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, X, MapPin, Briefcase, DollarSign, Undo2, History, CheckCircle, XCircle, BookOpen, ExternalLink, Target } from "lucide-react";

import { allJobs as vagasJobs } from "./vagas";

const allJobs = vagasJobs.map(j => ({
  id: j.id,
  title: j.title,
  company: j.company,
  location: j.location,
  description: `Vaga de ${j.title} na empresa ${j.company}, localizada em ${j.location}.`,
  skills: j.skills,
  salary: j.salary,
}));

const miniCourses = [
  { id: 1, skill: "Soldadura", title: "Soldadura e Corte Industrial", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", free: true },
  { id: 2, skill: "Electricidade", title: "Electricidade Geral e Instalações", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "4 meses", free: true },
  { id: 3, skill: "Mecânica", title: "Mecânica Automóvel e Diesel", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "6 meses", free: true },
  { id: 4, skill: "Informática", title: "Manutenção de Computadores e Redes", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", free: true },
  { id: 5, skill: "Redes", title: "Configuração de Redes e Wi-Fi", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", free: true },
  { id: 6, skill: "Cibersegurança", title: "Cibersegurança e Firewalls", provider: "INESCOI", url: "https://www.inescoi.ao", duration: "40 horas", free: false },
  { id: 7, skill: "Compliance", title: "Compliance Officer", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/Compliance-Officer", duration: "40 horas", free: false },
  { id: 11, skill: "Excel", title: "Excel em 1 Hora — Fórmulas Essenciais", provider: "CursosAngola", url: "https://cursosangola.com", duration: "1h", free: true },
  { id: 13, skill: "Inteligência Artificial", title: "Produtos Digitais com IA + Canva", provider: "CursosAngola", url: "https://cursosangola.com", duration: "15min", free: true },
  { id: 14, skill: "WordPress", title: "WordPress com Elementor", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h 41min", free: true },
  { id: 15, skill: "HSE", title: "HSE — Higiene, Segurança e Ambiente", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "40 horas", free: false },
  { id: 16, skill: "Gestão de Projectos", title: "Gestão de Projectos (PMP)", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "40 horas", free: false },
  { id: 17, skill: "Liderança", title: "Liderança e Gestão de Equipas", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "20 horas", free: false },
  { id: 18, skill: "Scrum", title: "Scrum e Metodologias Ágeis", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "20 horas", free: false },
  { id: 19, skill: "Comunicação", title: "Comunicação Efectiva no Trabalho", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "16 horas", free: false },
  { id: 20, skill: "Python", title: "Python Fundamentos", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", free: true },
  { id: 21, skill: "SQL", title: "Base de Dados e SQL", provider: "CursosAngola", url: "https://cursosangola.com", duration: "2h", free: true },
  { id: 22, skill: "Power BI", title: "Power BI — Dashboards e Relatórios", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", free: true },
  { id: 23, skill: "Figma", title: "Design de Interfaces com Figma", provider: "CursosAngola", url: "https://cursosangola.com", duration: "2h", free: true },
  { id: 24, skill: "AWS", title: "AWS Cloud Concepts", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", free: true },
  { id: 25, skill: "Docker", title: "Docker e Containers", provider: "CursosAngola", url: "https://cursosangola.com", duration: "2h", free: true },
  { id: 26, skill: "JavaScript", title: "JavaScript Essencial", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", free: true },
  { id: 27, skill: "React", title: "React — Desenvolvimento Web", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", free: true },
  { id: 28, skill: "Node.js", title: "Node.js e APIs REST", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", free: true },
  { id: 29, skill: "Java", title: "Java Fundamentos", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", free: true },
  { id: 30, skill: "TypeScript", title: "TypeScript para Developers", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", free: true },
  { id: 31, skill: "Firewall", title: "Administração de Firewalls", provider: "INESCOI", url: "https://www.inescoi.ao", duration: "30 horas", free: false },
  { id: 32, skill: "Suporte", title: "Suporte Técnico de Informática", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", free: true },
  { id: 33, skill: "Hardware", title: "Hardware e Manutenção de Computadores", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", free: true },
  { id: 34, skill: "CCTV", title: "Instalação de Sistemas CCTV e Segurança", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "2 meses", free: true },
  { id: 35, skill: "Inglês", title: "Inglês para Negócios", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "3 meses", free: false },
  { id: 36, skill: "PowerPoint", title: "PowerPoint — Apresentações Profissionais", provider: "CursosAngola", url: "https://cursosangola.com", duration: "1h", free: true },
  { id: 37, skill: "DevOps", title: "DevOps e CI/CD", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", free: true },
  { id: 38, skill: "Golang", title: "Go (Golang) Fundamentos", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", free: true },
  { id: 39, skill: "Microserviços", title: "Arquitectura de Microserviços", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", free: true },
  { id: 40, skill: "PLC", title: "Programação de PLCs e Automação", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "4 meses", free: true },
  { id: 41, skill: "Análise de Dados", title: "Análise de Dados com Python e SQL", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", free: true },
  { id: 42, skill: "Engenharia Informática", title: "Engenharia Informática", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", free: false },
  { id: 43, skill: "Engenharia Civil", title: "Engenharia Civil", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", free: true },
  { id: 44, skill: "Segurança", title: "Segurança da Informação", provider: "INESCOI", url: "https://www.inescoi.ao", duration: "40 horas", free: false },
  { id: 45, skill: "Cloud", title: "Cloud Computing e Virtualização", provider: "INESCOI", url: "https://www.inescoi.ao", duration: "30 horas", free: false },
  { id: 46, skill: "Resolução de Problemas", title: "Resolução Analítica de Problemas", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "16 horas", free: false },
  { id: 47, skill: "Trabalho em Equipa", title: "Trabalho em Equipa e Colaboração", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "12 horas", free: false },
];

interface SwipeAction {
  job: typeof allJobs[0];
  action: "superlike" | "pass";
}

function matchSkills(cvSkills: string[], jobSkills: string[]) {
  const matched: string[] = [];
  const gaps: string[] = [];
  for (const js of jobSkills) {
    const found = cvSkills.some(cs =>
      cs.toLowerCase().includes(js.toLowerCase()) ||
      js.toLowerCase().includes(cs.toLowerCase()) ||
      cs.toLowerCase() === js.toLowerCase()
    );
    if (found) matched.push(js);
    else gaps.push(js);
  }
  return { matched, gaps };
}

function findCourses(gaps: string[]) {
  const found: typeof miniCourses = [];
  for (const gap of gaps) {
    for (const c of miniCourses) {
      if ((c.skill.toLowerCase().includes(gap.toLowerCase()) || gap.toLowerCase().includes(c.skill.toLowerCase()) || c.title.toLowerCase().includes(gap.toLowerCase())) && !found.find(f => f.id === c.id)) {
        found.push(c);
      }
    }
  }
  return found;
}

function jobHasMatch(cvSkills: string[], jobSkills: string[]) {
  return jobSkills.some(js =>
    cvSkills.some(cs =>
      cs.toLowerCase().includes(js.toLowerCase()) ||
      js.toLowerCase().includes(cs.toLowerCase()) ||
      cs.toLowerCase() === js.toLowerCase()
    )
  );
}

export default function CandidatoSwipe() {
  const { toast } = useToast();
  const { hasCv, cvSkills } = useHasCv();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading] = useState(false);
  const [swiping, setSwiping] = useState(false);
  const [history, setHistory] = useState<SwipeAction[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [filterByCv, setFilterByCv] = useState(false);

  const filteredJobs = useMemo(() => {
    if (!filterByCv || !hasCv || cvSkills.length === 0) return allJobs;
    return allJobs.filter(j => jobHasMatch(cvSkills, j.skills));
  }, [filterByCv, hasCv, cvSkills]);

  const currentJob = filteredJobs[currentIndex];
  const { matched, gaps } = currentJob && hasCv && cvSkills.length > 0 ? matchSkills(cvSkills, currentJob.skills) : { matched: [], gaps: [] };
  const matchPercent = currentJob && currentJob.skills.length > 0 ? Math.round((matched.length / currentJob.skills.length) * 100) : 0;
  const courses = gaps.length > 0 ? findCourses(gaps) : [];

  function handleSwipe(action: "superlike" | "pass") {
    if (!currentJob || swiping) return;
    setSwiping(true);
    setShowAnalysis(false);
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
    setHistory(prev => prev.slice(0, -1));
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setShowAnalysis(false);
  }

  function toggleFilter() {
    const newFilter = !filterByCv;
    setFilterByCv(newFilter);
    setCurrentIndex(0);
    setShowAnalysis(false);
    setHistory([]);
  }

  if (loading) return <div className="min-h-screen bg-[#13293D] flex items-center justify-center"><p className="font-display text-4xl text-[#1B98E0] animate-pulse">A CARREGAR...</p></div>;

  if (!currentJob) return (
    <div className="min-h-screen relative flex items-center justify-center p-6 pt-24 sm:pt-28">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>
      <div className="text-center relative z-10">
        <p className="font-display text-5xl text-[#1B98E0] mb-4">ACABASTE!</p>
        <p className="text-white/50 text-xl mb-2">Não há mais vagas para swipar.</p>
        {filterByCv && <p className="text-[#1B98E0] text-sm mb-6">(Filtrado por competências do CV)</p>}
        {history.length > 0 && (
          <button onClick={() => setShowHistory(!showHistory)} className="h-14 bg-[#247BA0] hover:bg-[#1B98E0] text-white hover:text-[#13293D] px-8 font-display uppercase flex items-center gap-3 mx-auto">
            <History size={20} /> VER HISTÓRICO ({history.length})
          </button>
        )}
        {showHistory && (
          <div className="mt-8 max-w-lg mx-auto space-y-3">
            {history.map((h, i) => (
              <div key={i} className="bg-[#13293D]/90 backdrop-blur-sm border border-white/20 p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]">
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
        <button onClick={toggleFilter} className="mt-6 px-6 py-3 bg-[#247BA0] hover:bg-[#1B98E0] text-white hover:text-[#13293D] font-bold text-sm uppercase transition-colors">
          {filterByCv ? "Mostrar Todas as Vagas" : "Mostrar por Perfil CV"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 md:p-12 pt-24 sm:pt-28 flex flex-col items-center relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase">
            Swipe <span className="text-[#1B98E0]">Vagas</span>
          </h1>
          <div className="flex items-center gap-3">
            {history.length > 0 && (
              <button onClick={handleUndo} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 font-bold text-sm uppercase transition-colors">
                <Undo2 size={16} /> Desfazer
              </button>
            )}
            {hasCv && cvSkills.length > 0 && (
              <button onClick={toggleFilter}
                className={`flex items-center gap-2 px-4 py-2 font-bold text-sm uppercase transition-colors border ${
                  filterByCv 
                    ? "bg-[#1B98E0] text-[#13293D] border-[#1B98E0]" 
                    : "bg-white/10 text-white border-white/20 hover:border-[#1B98E0] hover:text-[#1B98E0]"
                }`}>
                <Target size={16} /> Com base no meu perfil
              </button>
            )}
          </div>
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
            className="bg-[#13293D]/90 backdrop-blur-sm border-2 border-white/20 p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.5)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase size={24} className="text-[#1B98E0]" />
              <span className="text-white text-sm uppercase">{currentJob.company}</span>
              {hasCv && cvSkills.length > 0 && (
                <span className={`text-xs font-bold px-3 py-1 ${matchPercent >= 70 ? "bg-emerald-500/20 text-emerald-400" : matchPercent >= 40 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>
                  {matchPercent}% match
                </span>
              )}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-white uppercase mb-4">{currentJob.title}</h2>
            <div className="flex items-center gap-2 text-white mb-4">
              <MapPin size={16} /> {currentJob.location}
            </div>
            {currentJob.salary && (
              <div className="flex items-center gap-2 text-white mb-6">
                <DollarSign size={16} /> <span className="font-bold">{currentJob.salary}</span>
              </div>
            )}
            <p className="text-white mb-6">{currentJob.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {(currentJob.skills || []).map((s: string) => {
                const isMatched = matched.includes(s);
                const isGap = gaps.includes(s);
                return (
                  <span key={s} className={`text-xs px-3 py-1 uppercase font-bold border ${
                    isMatched ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" :
                    isGap ? "border-red-500/50 text-red-400 bg-red-500/10" :
                    "border-white/30 text-white"
                  }`}>
                    {isMatched && <CheckCircle size={10} className="inline mr-0.5" />}
                    {isGap && <XCircle size={10} className="inline mr-0.5" />}
                    {s}
                  </span>
                );
              })}
            </div>

            {hasCv && cvSkills.length > 0 && (matched.length > 0 || gaps.length > 0) && (
              <button onClick={() => setShowAnalysis(!showAnalysis)}
                className="w-full mt-2 py-2 text-[#247BA0] hover:text-[#1B98E0] text-sm font-bold uppercase flex items-center justify-center gap-2 transition-colors border border-white/10 hover:border-[#1B98E0]">
                <BookOpen size={14} /> {showAnalysis ? "Fechar Análise" : "Ver Análise do Perfil"}
              </button>
            )}

            {showAnalysis && hasCv && cvSkills.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                {matched.length > 0 && (
                  <div>
                    <p className="text-emerald-400 text-xs font-bold uppercase mb-1">Competências que tens ({matched.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {matched.map(s => (
                        <span key={s} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 text-xs font-bold uppercase">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {gaps.length > 0 && (
                  <div>
                    <p className="text-red-400 text-xs font-bold uppercase mb-1">Em falta ({gaps.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {gaps.map(s => (
                        <span key={s} className="bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 text-xs font-bold uppercase">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {courses.length > 0 && (
                  <div>
                    <p className="text-[#1B98E0] text-xs font-bold uppercase mb-1 flex items-center gap-1"><BookOpen size={10} /> Cursos recomendados</p>
                    <div className="space-y-1">
                      {courses.slice(0, 3).map(c => (
                        <a key={c.id} href={c.url} target="_blank" rel="noopener"
                          className="flex items-center justify-between bg-[#13293D]/80 border border-white/10 p-2 hover:border-[#1B98E0] transition-colors group/course">
                          <div>
                            <p className="text-white text-xs font-bold group-hover/course:text-[#1B98E0]">{c.title}</p>
                            <p className="text-white/30 text-[10px]">{c.provider} — {c.duration} {c.free && "• GRATUITO"}</p>
                          </div>
                          <ExternalLink size={10} className="text-[#247BA0] shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-6 mt-8">
          <button onClick={() => handleSwipe("pass")} disabled={swiping}
            className="w-20 h-20 border-2 border-white/30 text-white flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-colors disabled:opacity-50">
            <X size={32} />
          </button>
          <button onClick={() => handleSwipe("superlike")} disabled={swiping}
            className="w-20 h-20 border-2 border-white/30 text-white flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-colors disabled:opacity-50">
            <ThumbsUp size={32} />
          </button>
        </div>
        <p className="text-center text-white/30 text-sm mt-4 uppercase">{currentIndex + 1} / {filteredJobs.length}</p>
        {history.length > 0 && (
          <p className="text-center text-white/20 text-xs mt-2 uppercase">{history.length} vagas avaliadas</p>
        )}
      </div>
    </div>
  );
}
