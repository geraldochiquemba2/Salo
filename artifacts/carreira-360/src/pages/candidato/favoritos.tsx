import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useHasCv } from "@/hooks/use-has-cv";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Briefcase, DollarSign, Trash2, ExternalLink, CheckCircle, XCircle, BookOpen, Sparkles, Target } from "lucide-react";
import { getJobUrl } from "./vagas";

const allCourses = [
  { id: 1, skill: "Soldadura", title: "Soldadura e Corte Industrial", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true },
  { id: 2, skill: "Electricidade", title: "Electricidade Geral e Instalações", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "4 meses", level: "Técnico", free: true },
  { id: 3, skill: "Mecânica", title: "Mecânica Automóvel e Diesel", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "6 meses", level: "Técnico", free: true },
  { id: 4, skill: "Informática", title: "Manutenção de Computadores e Redes", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true },
  { id: 7, skill: "Compliance", title: "Compliance Officer", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/Compliance-Officer", duration: "40 horas", level: "Avançado", free: false },
  { id: 8, skill: "Gestão de Riscos", title: "Gestão de Riscos Corporativos", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/gestao-de-riscos", duration: "40 horas", level: "Avançado", free: false },
  { id: 9, skill: "Auditoria", title: "Controlo Interno e Auditoria", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/controlo-interno-e-auditoria", duration: "40 horas", level: "Avançado", free: false },
  { id: 10, skill: "Banca", title: "Banca e Sistema Financeiro", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/banca-e-sistema-financeiro", duration: "20 horas", level: "Avançado", free: false },
  { id: 11, skill: "AML", title: "Prevenção do Branqueamento de Capitais", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/prevencao-do-branqueamento-de-capitais-bcft", duration: "20 horas", level: "Avançado", free: false },
  { id: 12, skill: "ESG", title: "ESG e Sustentabilidade Corporativa", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/esg-e-sustentabilidade-corporativa", duration: "40 horas", level: "Avançado", free: false },
  { id: 13, skill: "Excel", title: "Excel em 1 Hora — Fórmulas Essenciais", provider: "CursosAngola", url: "https://cursosangola.com/curso/0c34615a-cbea-4ac0-a3da-0d0fa6720123", duration: "1h", level: "Iniciante", free: true },
  { id: 14, skill: "WordPress", title: "WordPress com Elementor", provider: "CursosAngola", url: "https://cursosangola.com/curso/4b8460de-fd27-4295-ab41-7e523df632c9", duration: "3h 41min", level: "Iniciante", free: true },
  { id: 15, skill: "Inteligência Artificial", title: "Produtos Digitais com IA + Canva", provider: "CursosAngola", url: "https://cursosangola.com/curso/13371045-c871-49e3-bd51-8ab58a85388e", duration: "15min", level: "Iniciante", free: true },
  { id: 25, skill: "HSE", title: "HSE — Higiene, Segurança e Ambiente", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "40 horas", level: "Profissional", free: false },
  { id: 26, skill: "Gestão de Projectos", title: "Gestão de Projectos (PMP)", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "40 horas", level: "Avançado", free: false },
  { id: 27, skill: "Liderança", title: "Liderança e Gestão de Equipas", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "20 horas", level: "Intermédio", free: false },
];

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

function findRecommendedCourses(gaps: string[]) {
  const recommended: typeof allCourses = [];
  for (const gap of gaps) {
    for (const course of allCourses) {
      if (
        course.skill.toLowerCase().includes(gap.toLowerCase()) ||
        gap.toLowerCase().includes(course.skill.toLowerCase()) ||
        course.title.toLowerCase().includes(gap.toLowerCase())
      ) {
        if (!recommended.find(r => r.id === course.id)) {
          recommended.push(course);
        }
      }
    }
  }
  return recommended;
}

export default function CandidatoFavoritos() {
  const { toast } = useToast();
  const { hasCv, cvSkills } = useHasCv();
  const [favoritos, setFavoritos] = useState<Favorito[]>(initialFavoritos);
  const [expandedId, setExpandedId] = useState<number | null>(null);

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
      <div className="relative z-10 p-6 md:p-12 pt-24 sm:pt-28">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Heart size={48} className="text-[#1B98E0]" fill="#1B98E0" />
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase">
              Meus <span className="text-[#1B98E0]">Favoritos</span>
            </h1>
          </div>

          {hasCv && cvSkills.length > 0 && (
            <div className="mb-8 bg-[#13293D]/90 backdrop-blur-sm border-2 border-[#1B98E0] p-6 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.3)]">
              <div className="flex items-center gap-3 mb-3">
                <Target size={20} className="text-[#1B98E0]" />
                <p className="text-white text-sm uppercase font-bold tracking-widest">As tuas competências ({cvSkills.length})</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {cvSkills.map((s, i) => (
                  <span key={i} className="bg-white/5 border border-white/20 text-white px-3 py-1.5 text-xs font-bold uppercase">{s}</span>
                ))}
              </div>
            </div>
          )}

          {favoritos.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={64} className="text-white/10 mx-auto mb-4" />
              <p className="font-display text-3xl text-white/30 uppercase">Sem favoritos</p>
              <p className="text-white/20 mt-2">Faz Super Like nas vagas para as guardar aqui.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              <AnimatePresence>
                {favoritos.map((job) => {
                  const { matched, gaps } = hasCv && cvSkills.length > 0
                    ? matchSkills(cvSkills, job.skills)
                    : { matched: [], gaps: [] };
                  const matchPercent = job.skills.length > 0 ? Math.round((matched.length / job.skills.length) * 100) : 0;
                  const recommendedCourses = gaps.length > 0 ? findRecommendedCourses(gaps) : [];
                  const isExpanded = expandedId === job.id;

                  return (
                    <motion.div
                      key={job.id}
                      layout
                      exit={{ opacity: 0, x: -200 }}
                      className="bg-[#13293D]/90 backdrop-blur-sm border-2 border-white/20 p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.5)]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Briefcase size={20} className="text-[#1B98E0]" />
                            <span className="text-white text-sm uppercase">{job.company}</span>
                            {hasCv && cvSkills.length > 0 && (
                              <span className={`text-xs font-bold px-3 py-1 ${matchPercent >= 70 ? "bg-emerald-500/20 text-emerald-400" : matchPercent >= 40 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>
                                {matchPercent}% match
                              </span>
                            )}
                          </div>
                          <h2 className="font-display text-2xl sm:text-4xl text-white uppercase mb-3">{job.title}</h2>
                          <div className="flex items-center gap-4 text-white mb-3">
                            <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                            <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary}</span>
                          </div>
                          <p className="text-white mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((s) => {
                              const isMatched = matched.includes(s);
                              const isGap = gaps.includes(s);
                              return (
                                <span key={s} className={`text-xs px-3 py-1 uppercase font-bold border ${
                                  isMatched ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" :
                                  isGap ? "border-red-500/50 text-red-400 bg-red-500/10" :
                                  "border-white/30 text-white"
                                }`}>
                                  {isMatched && <CheckCircle size={10} className="inline mr-1" />}
                                  {isGap && <XCircle size={10} className="inline mr-1" />}
                                  {s}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex sm:flex-col gap-2">
                          <button onClick={() => handleRemove(job.id)}
                            className="flex items-center gap-2 px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-colors text-sm font-bold uppercase">
                            <Trash2 size={14} /> Remover
                          </button>
                          <a href={getJobUrl(job.title, job.company)} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border border-[#1B98E0]/50 text-[#1B98E0] hover:bg-[#1B98E0] hover:text-[#13293D] transition-colors text-sm font-bold uppercase">
                            <ExternalLink size={14} /> Ver
                          </a>
                          {hasCv && cvSkills.length > 0 && (matched.length > 0 || gaps.length > 0) && (
                            <button onClick={() => setExpandedId(isExpanded ? null : job.id)}
                              className="flex items-center gap-2 px-4 py-2 border border-[#247BA0]/50 text-[#247BA0] hover:bg-[#247BA0] hover:text-white transition-colors text-sm font-bold uppercase">
                              <Sparkles size={14} /> {isExpanded ? "Fechar" : "Análise"}
                            </button>
                          )}
                        </div>
                      </div>

                      {isExpanded && hasCv && cvSkills.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-6 pt-6 border-t border-white/10"
                        >
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Skills Match */}
                            <div className="bg-[#13293D]/90 backdrop-blur-sm border border-emerald-500/30 p-4 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.2)]">
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle size={18} className="text-emerald-400" />
                                <p className="text-emerald-400 font-bold text-sm uppercase">Competências que tens ({matched.length})</p>
                              </div>
                              {matched.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {matched.map(s => (
                                    <span key={s} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 text-xs font-bold uppercase">{s}</span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-white/30 text-sm">Nenhuma competência directamente correspondente</p>
                              )}
                            </div>

                            {/* Skills Gap */}
                            <div className="bg-[#13293D]/90 backdrop-blur-sm border border-red-500/30 p-4 shadow-[4px_4px_0px_0px_rgba(239,68,68,0.2)]">
                              <div className="flex items-center gap-2 mb-3">
                                <XCircle size={18} className="text-red-400" />
                                <p className="text-red-400 font-bold text-sm uppercase">Competências em falta ({gaps.length})</p>
                              </div>
                              {gaps.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {gaps.map(s => (
                                    <span key={s} className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 text-xs font-bold uppercase">{s}</span>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-emerald-400 text-sm font-bold">Tens todas as competências! 🎉</p>
                              )}
                            </div>
                          </div>

                          {/* Recommended Courses */}
                          {recommendedCourses.length > 0 && (
                            <div className="mt-6 bg-[#13293D]/90 backdrop-blur-sm border border-[#1B98E0]/30 p-4 shadow-[4px_4px_0px_0px_rgba(36,123,160,0.2)]">
                              <div className="flex items-center gap-2 mb-3">
                                <BookOpen size={18} className="text-[#1B98E0]" />
                                <p className="text-[#1B98E0] font-bold text-sm uppercase">Cursos recomendados para preencher as lacunas</p>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-3">
                                {recommendedCourses.slice(0, 4).map(course => (
                                  <a key={course.id} href={course.url} target="_blank" rel="noopener"
                                    className="flex items-center justify-between bg-[#13293D]/80 border border-white/10 p-3 hover:border-[#1B98E0] transition-colors group">
                                    <div>
                                      <p className="text-white text-sm font-bold group-hover:text-[#1B98E0]">{course.title}</p>
                                      <p className="text-white/40 text-xs">{course.provider} — {course.duration} {course.free && "• GRATUITO"}</p>
                                    </div>
                                    <ExternalLink size={14} className="text-[#247BA0] shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          <p className="text-center text-white/20 text-sm mt-8 uppercase">{favoritos.length} vaga{favoritos.length !== 1 ? "s" : ""} guardada{favoritos.length !== 1 ? "s" : ""}</p>
        </div>
      </div>
    </div>
  );
}
