import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Mic, Play, CheckCircle, Clock, Award, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";

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

  const load = () => apiFetch("/api/candidate/interviews").then(setInterviews).catch(() => {});
  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  async function handleStart() {
    try {
      const data = await apiFetch("/api/candidate/interviews", { method: "POST", body: JSON.stringify({ jobTitle: "Entrevista Simulada", company: "TALENTOS", questionCount }) });
      setActiveInterview(data);
      setCurrentQ(0);
      toast({ title: "ENTREVISTA INICIADA", description: `${questionCount} perguntas. Responde a cada uma.` });
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    }
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

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-12">
          Entrevistas <span className="text-[#1B98E0]">IA</span>
        </h1>

        {activeInterview ? (
          <div>
            {activeInterview.status === "completed" || activeInterview.completed ? (
              <div className="space-y-6">
                <div className="bg-white/5 border-2 border-[#1B98E0] p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.5)]">
                  <CheckCircle size={48} className="text-green-500 mb-6" />
                  <h2 className="font-display text-3xl sm:text-5xl text-white uppercase mb-4">Entrevista Concluída!</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <Award size={32} className="text-[#1B98E0]" />
                    <span className="font-display text-4xl sm:text-6xl text-[#1B98E0]">{activeInterview.score}%</span>
                  </div>
                  <p className="text-white/70 whitespace-pre-wrap mb-6">{activeInterview.feedback}</p>
                  <button onClick={() => { setActiveInterview(null); load(); }} className="h-14 bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] px-8 font-display uppercase">VOLTAR</button>
                </div>

                {activeInterview.questionAnalysis && activeInterview.questionAnalysis.length > 0 && (
                  <div className="bg-white/5 border-2 border-white/10 p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.3)]">
                    <h3 className="font-display text-2xl sm:text-3xl text-white uppercase mb-6">Análise por Pergunta</h3>
                    <div className="space-y-4">
                      {activeInterview.questionAnalysis.map((qa: any, idx: number) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-4 sm:p-6">
                          <button
                            onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
                            className="w-full flex items-center justify-between text-left"
                          >
                            <div className="flex-1">
                              <p className="text-[#1B98E0] font-bold text-sm uppercase mb-1">Pergunta {idx + 1}</p>
                              <p className="text-white font-display text-lg">{qa.question}</p>
                            </div>
                            <div className="flex items-center gap-3 ml-4">
                              <span className="font-display text-2xl text-[#1B98E0]">{qa.score}%</span>
                              {expandedQ === idx ? <ChevronUp size={20} className="text-white/50" /> : <ChevronDown size={20} className="text-white/50" />}
                            </div>
                          </button>
                          {expandedQ === idx && (
                            <div className="mt-4 pt-4 border-t border-white/10">
                              <div className="mb-3">
                                <p className="text-white/40 text-xs uppercase font-bold mb-1">A Tua Resposta</p>
                                <p className="text-white/80 whitespace-pre-wrap">{qa.answer}</p>
                              </div>
                              <div>
                                <p className="text-white/40 text-xs uppercase font-bold mb-1">Análise da IA</p>
                                <p className="text-[#1B98E0]/80 whitespace-pre-wrap">{qa.feedback}</p>
                              </div>
                              <div className="h-2 bg-white/10 mt-3">
                                <div className="h-full bg-[#1B98E0]" style={{ width: `${qa.score}%` }} />
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
              <div className="bg-white/5 border-2 border-white/10 p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.3)]">
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
            {/* SELETOR DE PERGUNTAS */}
            <div className="bg-white/5 border-2 border-white/10 p-6 sm:p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.3)]">
              <h3 className="font-display text-2xl text-white uppercase mb-4">Configurar Entrevista</h3>
              <p className="text-white/50 mb-6">Escolhe quantas perguntas queres na tua entrevista simulada.</p>
              <div className="flex items-center gap-6">
                <span className="text-white/60 font-bold uppercase text-sm">Número de Perguntas</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuestionCount(q => Math.max(5, q - 1))}
                    className="w-12 h-12 border-2 border-[#1B98E0] text-[#1B98E0] flex items-center justify-center hover:bg-[#1B98E0] hover:text-[#13293D] transition-colors font-display text-2xl">
                    <Minus size={20} />
                  </button>
                  <span className="font-display text-5xl text-[#1B98E0] w-20 text-center">{questionCount}</span>
                  <button onClick={() => setQuestionCount(q => Math.min(20, q + 1))}
                    className="w-12 h-12 border-2 border-[#1B98E0] text-[#1B98E0] flex items-center justify-center hover:bg-[#1B98E0] hover:text-[#13293D] transition-colors font-display text-2xl">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <p className="text-white/30 text-sm mt-3">Mínimo: 5 | Máximo: 20</p>
            </div>

            <button onClick={handleStart} className="w-full h-16 sm:h-24 bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] text-xl sm:text-3xl font-display uppercase transition-colors mb-12 flex items-center justify-center gap-4 shadow-[8px_8px_0px_0px_rgba(36,123,160,1)]">
              <Play size={32} /> INICIAR NOVA ENTREVISTA
            </button>

            <h2 className="font-display text-4xl text-white uppercase mb-8">Histórico</h2>
            {interviews.length === 0 ? (
              <p className="text-white/40 text-center py-10">Nenhuma entrevista ainda</p>
            ) : (
              <div className="space-y-4">
                {interviews.map((i: any) => (
                  <div key={i.id} className="bg-white/5 border-2 border-white/10 p-6 flex items-center justify-between hover:border-[#1B98E0] transition-colors">
                    <div>
                      <h3 className="font-display text-2xl text-white uppercase">{i.jobTitle}</h3>
                      <p className="text-white/40 text-sm">{i.company} — {new Date(i.createdAt).toLocaleDateString("pt-AO")}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {i.status === "completed" ? (
                        <span className="font-display text-3xl text-[#1B98E0]">{i.score}%</span>
                      ) : (
                        <span className="text-[#247BA0] font-bold uppercase text-sm"><Clock size={14} className="inline" /> Em curso</span>
                      )}
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
