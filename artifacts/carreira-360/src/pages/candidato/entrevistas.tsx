import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Mic, Play, CheckCircle, Clock, Award, ChevronDown, ChevronUp, Minus, Plus, PlayCircle, X, Trash2 } from "lucide-react";

export default function CandidatoEntrevistas() {
  const { toast } = useToast();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeInterview, setActiveInterview] = useState<any>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const [questionCount, setQuestionCount] = useState(5);
  const [showStartForm, setShowStartForm] = useState(false);
  const [startForm, setStartForm] = useState({ company: "", position: "" });

  const load = () => apiFetch("/api/candidate/interviews").then(setInterviews).catch(() => {});
  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    if (!startForm.company || !startForm.position) {
      toast({ title: "ERRO", description: "Empresa e posição são obrigatórias", variant: "destructive" });
      return;
    }
    const tempId = Date.now();
    const tempInterview = {
      id: tempId,
      jobTitle: startForm.position,
      company: startForm.company,
      status: "pending",
      questions: [],
      answers: [],
      isSimulation: true,
      createdAt: new Date().toISOString(),
    };
    setActiveInterview(tempInterview);
    setCurrentQ(0);
    setShowStartForm(false);
    setStartForm({ company: "", position: "" });
    try {
      const data = await apiFetch("/api/candidate/interviews", { method: "POST", body: JSON.stringify({ jobTitle: startForm.position, company: startForm.company, questionCount }) });
      setActiveInterview(data);
      toast({ title: "ENTREVISTA INICIADA", description: `${questionCount} perguntas para ${startForm.position} @ ${startForm.company}` });
    } catch (err: any) {
      setActiveInterview(null);
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    }
  }

  async function handleContinue(interview: any) {
    setActiveInterview(interview);
    setCurrentQ(interview.answers?.length || 0);
    setAnswer("");
    toast({ title: "ENTREVISTA RETOMADA", description: `Pergunta ${(interview.answers?.length || 0) + 1} de ${interview.questions?.length || 5}` });
  }

  async function handleCancel() {
    if (!activeInterview) return;
    const interviewId = activeInterview.id;
    setActiveInterview(null);
    toast({ title: "ENTREVISTA CANCELADA" });
    try {
      await apiFetch(`/api/candidate/interviews/${interviewId}`, { method: "DELETE" });
      load();
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    }
  }

  async function handleDelete(id: number) {
    setInterviews(prev => prev.filter(i => i.id !== id));
    try {
      await apiFetch(`/api/candidate/interviews/${id}`, { method: "DELETE" });
    } catch {}
  }

  async function handleRespond() {
    if (!answer.trim()) return;
    setSubmitting(true);
    try {
      const data = await apiFetch(`/api/candidate/interviews/${activeInterview.id}/respond`, { method: "POST", body: JSON.stringify({ answer }) });
      if (data.completed) {
        setActiveInterview({ ...activeInterview, ...data, status: "completed" });
        toast({ title: "ENTREVISTA CONCLUÍDA", description: `Score: ${data.score}%` });
        load();
      } else {
        setActiveInterview(data);
        setCurrentQ((c: number) => c + 1);
      }
      setAnswer("");
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="min-h-screen bg-[#13293D] flex items-center justify-center"><p className="font-display text-4xl text-[#1B98E0] animate-pulse">A CARREGAR...</p></div>;

  const inputClass = "w-full bg-white/5 border-2 border-white/20 text-white px-4 sm:px-6 py-4 text-base sm:text-lg focus:border-[#1B98E0] focus:outline-none rounded-none placeholder:text-white/30";
  const labelClass = "block text-[#1B98E0] uppercase tracking-widest font-bold text-sm mb-3";

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12 pt-24 sm:pt-28">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-12">
          Entrevistas <span className="text-[#1B98E0]">IA</span>
        </h1>

        {activeInterview ? (
          <div>
            {activeInterview.status === "completed" || activeInterview.completed ? (
              <div className="space-y-6">
                <div className="bg-[#13293D]/90 backdrop-blur-sm border-2 border-[#1B98E0] p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.5)]">
                  <CheckCircle size={48} className="text-green-500 mb-6" />
                  <h2 className="font-display text-3xl sm:text-5xl text-white uppercase mb-2">Entrevista Concluída!</h2>
                  <p className="text-[#247BA0] font-bold text-sm uppercase mb-4">{activeInterview.company} — {activeInterview.jobTitle}</p>
                  <div className="flex items-center gap-4 mb-6">
                    <Award size={32} className="text-[#1B98E0]" />
                    <span className="font-display text-4xl sm:text-6xl text-[#1B98E0]">{activeInterview.score}%</span>
                  </div>
                  <p className="text-white/70 whitespace-pre-wrap mb-6">{activeInterview.feedback}</p>
                  <button onClick={() => { setActiveInterview(null); load(); }} className="h-14 bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] px-8 font-display uppercase">VOLTAR</button>
                </div>

                {activeInterview.questionAnalysis && activeInterview.questionAnalysis.length > 0 && (
                  <div className="bg-[#13293D]/90 backdrop-blur-sm border-2 border-white/20 p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.3)]">
                    <h3 className="font-display text-2xl sm:text-3xl text-white uppercase mb-6">As Tuas Respostas & Recomendações</h3>
                    <div className="space-y-4">
                      {activeInterview.questionAnalysis.map((qa: any, idx: number) => (
                        <div key={idx} className="bg-[#13293D]/90 backdrop-blur-sm border border-white/20 p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]">
                          <button
                            onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
                            className="w-full flex items-center justify-between text-left"
                          >
                            <div className="flex-1">
                              <p className="text-[#1B98E0] font-bold text-sm uppercase mb-1">Pergunta {idx + 1}</p>
                              <p className="text-white font-display text-lg">{qa.question}</p>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                              <span className={`font-display text-2xl ${qa.score >= 70 ? "text-emerald-400" : qa.score >= 40 ? "text-amber-400" : "text-red-400"}`}>{qa.score}%</span>
                              {expandedQ === idx ? <ChevronUp size={20} className="text-white/50" /> : <ChevronDown size={20} className="text-white/50" />}
                            </div>
                          </button>
                          {expandedQ === idx && (
                            <div className="mt-4 pt-4 border-t border-white/10">
                              <div className="mb-3">
                                <p className="text-white/40 text-xs uppercase font-bold mb-1">A Tua Resposta</p>
                                <p className="text-white/80 whitespace-pre-wrap">{qa.answer || "Sem resposta"}</p>
                              </div>
                              <div>
                                <p className="text-[#1B98E0] text-xs uppercase font-bold mb-1">Recomendações da IA</p>
                                <p className="text-[#1B98E0]/80 whitespace-pre-wrap">{qa.feedback}</p>
                              </div>
                              <div className="h-2 bg-white/10 mt-3">
                                <div className={`h-full ${qa.score >= 70 ? "bg-emerald-500" : qa.score >= 40 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${qa.score}%` }} />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#13293D]/90 backdrop-blur-sm border-2 border-white/20 p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.3)]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[#247BA0] font-bold text-sm uppercase">{activeInterview.company} — {activeInterview.jobTitle}</p>
                  <button onClick={handleCancel} className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold text-sm uppercase transition-colors">
                    <X size={16} /> Cancelar
                  </button>
                </div>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-white/50 font-bold uppercase">Pergunta {(activeInterview.answers?.length || 0) + 1} de {activeInterview.questions?.length || 5}</p>
                  <div className="h-2 flex-1 mx-6 bg-white/10"><div className="h-full bg-[#1B98E0]" style={{ width: `${((activeInterview.answers?.length || 0) / (activeInterview.questions?.length || 5)) * 100}%` }} /></div>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl text-white uppercase mb-8">{activeInterview.questions?.[currentQ] || "A carregar pergunta..."}</h2>
                <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={6} placeholder="Escreve a tua resposta..."
                  className="w-full bg-white/5 border-2 border-white/20 text-white px-4 sm:px-6 py-4 text-base sm:text-lg focus:border-[#1B98E0] focus:outline-none rounded-none placeholder:text-white/30 resize-none mb-6" />
                <button onClick={handleRespond} disabled={submitting || !answer.trim()}
                  className="h-12 sm:h-16 bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] text-lg sm:text-xl font-display uppercase transition-colors disabled:opacity-50 shadow-[8px_8px_0px_0px_rgba(36,123,160,1)]">
                  {submitting ? "A ENVIAR..." : "ENVIAR RESPOSTA"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {showStartForm ? (
              <div className="bg-[#13293D]/90 backdrop-blur-sm border-2 border-[#1B98E0] p-4 sm:p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.5)]">
                <h3 className="font-display text-2xl text-[#1B98E0] uppercase mb-6">Configurar Entrevista</h3>
                <form onSubmit={handleStart} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div><label className={labelClass}>EMPRESA</label><input value={startForm.company} onChange={e => setStartForm({...startForm, company: e.target.value})} placeholder="Ex: Unitel" className={inputClass} /></div>
                    <div><label className={labelClass}>POSIÇÃO</label><input value={startForm.position} onChange={e => setStartForm({...startForm, position: e.target.value})} placeholder="Ex: Desenvolvedor Full Stack" className={inputClass} /></div>
                  </div>
                  <div>
                    <label className={labelClass}>NÚMERO DE PERGUNTAS</label>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setQuestionCount(q => Math.max(5, q - 1))}
                        className="w-12 h-12 border-2 border-[#1B98E0] text-[#1B98E0] flex items-center justify-center hover:bg-[#1B98E0] hover:text-[#13293D] transition-colors">
                        <Minus size={20} />
                      </button>
                      <span className="font-display text-5xl text-[#1B98E0] w-20 text-center">{questionCount}</span>
                      <button type="button" onClick={() => setQuestionCount(q => Math.min(20, q + 1))}
                        className="w-12 h-12 border-2 border-[#1B98E0] text-[#1B98E0] flex items-center justify-center hover:bg-[#1B98E0] hover:text-[#13293D] transition-colors">
                        <Plus size={20} />
                      </button>
                    </div>
                    <p className="text-white/30 text-sm mt-2">Mínimo: 5 | Máximo: 20</p>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="flex-1 h-14 bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] font-display text-lg uppercase transition-colors flex items-center justify-center gap-2 shadow-[8px_8px_0px_0px_rgba(36,123,160,1)]">
                      <Play size={20} /> INICIAR
                    </button>
                    <button type="button" onClick={() => setShowStartForm(false)}
                      className="h-14 px-8 bg-white/10 hover:bg-white/20 text-white font-display text-lg uppercase transition-colors">
                      CANCELAR
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <button onClick={() => setShowStartForm(true)} className="w-full h-16 sm:h-24 bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] text-xl sm:text-3xl font-display uppercase transition-colors mb-12 flex items-center justify-center gap-4 shadow-[8px_8px_0px_0px_rgba(36,123,160,1)]">
                <Play size={32} /> INICIAR NOVA ENTREVISTA
              </button>
            )}

            <h2 className="font-display text-4xl text-white uppercase mb-8">Histórico</h2>
            {interviews.length === 0 ? (
              <p className="text-white/40 text-center py-10">Nenhuma entrevista ainda</p>
            ) : (
              <div className="space-y-4">
                {interviews.map((i: any) => (
                  <div key={i.id} className="bg-[#13293D]/90 backdrop-blur-sm border-2 border-white/20 p-6 flex items-center justify-between hover:border-[#1B98E0] transition-colors shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]">
                    <div>
                      <h3 className="font-display text-2xl text-white uppercase">{i.jobTitle}</h3>
                      <p className="text-white/40 text-sm">{i.company} — {new Date(i.createdAt).toLocaleDateString("pt-AO")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {i.status === "completed" ? (
                        <span className="font-display text-3xl text-[#1B98E0]">{i.score}%</span>
                      ) : (
                        <button onClick={() => handleContinue(i)}
                          className="flex items-center gap-2 bg-[#247BA0] hover:bg-[#1B98E0] text-white hover:text-[#13293D] px-4 py-2 font-bold text-sm uppercase transition-colors">
                          <PlayCircle size={16} /> Continuar
                        </button>
                      )}
                      <button onClick={() => handleDelete(i.id)} className="text-[#247BA0] hover:text-red-500 p-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </div>
  );
}
