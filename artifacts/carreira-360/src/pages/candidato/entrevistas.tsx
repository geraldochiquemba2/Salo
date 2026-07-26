import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Mic, Play, CheckCircle, Clock, Award } from "lucide-react";

export default function CandidatoEntrevistas() {
  const { toast } = useToast();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeInterview, setActiveInterview] = useState<any>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = () => apiFetch("/api/candidate/interviews").then(setInterviews).catch(() => {});
  useEffect(() => { load().finally(() => setLoading(false)); }, []);

  async function handleStart() {
    try {
      const data = await apiFetch("/api/candidate/interviews", { method: "POST", body: JSON.stringify({ jobTitle: "Entrevista Simulada", company: "SALO" }) });
      setActiveInterview(data);
      setCurrentQ(0);
      toast({ title: "ENTREVISTA INICIADA", description: "Responde a cada pergunta." });
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

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><p className="font-display text-4xl text-[#FACC15] animate-pulse">A CARREGAR...</p></div>;

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 md:p-12">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-display text-6xl md:text-8xl text-white uppercase mb-12">
          Entrevistas <span className="text-[#FACC15]">IA</span>
        </h1>

        {activeInterview ? (
          <div>
            {activeInterview.status === "completed" ? (
              <div className="bg-white/5 border-2 border-[#FACC15] p-8 shadow-[8px_8px_0px_0px_rgba(249,115,22,0.5)]">
                <CheckCircle size={48} className="text-green-500 mb-6" />
                <h2 className="font-display text-5xl text-white uppercase mb-4">Entrevista Concluída!</h2>
                <div className="flex items-center gap-4 mb-6">
                  <Award size={32} className="text-[#FACC15]" />
                  <span className="font-display text-6xl text-[#FACC15]">{activeInterview.score}%</span>
                </div>
                <p className="text-white/70 whitespace-pre-wrap mb-8">{activeInterview.feedback}</p>
                <button onClick={() => setActiveInterview(null)} className="h-14 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] px-8 font-display uppercase">VOLTAR</button>
              </div>
            ) : (
              <div className="bg-white/5 border-2 border-white/10 p-8 shadow-[8px_8px_0px_0px_rgba(249,115,22,0.3)]">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-white/50 font-bold uppercase">Pergunta {(activeInterview.answers?.length || 0) + 1} de {activeInterview.questions?.length || 5}</p>
                  <div className="h-2 flex-1 mx-6 bg-white/10"><div className="h-full bg-[#FACC15]" style={{ width: `${((activeInterview.answers?.length || 0) / (activeInterview.questions?.length || 5)) * 100}%` }} /></div>
                </div>
                <h2 className="font-display text-4xl text-white uppercase mb-8">{activeInterview.questions?.[currentQ] || "A carregar pergunta..."}</h2>
                <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={6} placeholder="Escreve a tua resposta..."
                  className="w-full bg-white/5 border-2 border-white/20 text-white px-6 py-4 text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30 resize-none mb-6" />
                <button onClick={handleRespond} disabled={submitting || !answer.trim()}
                  className="h-16 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] text-xl font-display uppercase transition-colors disabled:opacity-50 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
                  {submitting ? "A ENVIAR..." : "ENVIAR RESPOSTA"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={handleStart} className="w-full h-24 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] text-3xl font-display uppercase transition-colors mb-12 flex items-center justify-center gap-4 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
              <Play size={32} /> INICIAR NOVA ENTREVISTA
            </button>

            <h2 className="font-display text-4xl text-white uppercase mb-8">Histórico</h2>
            {interviews.length === 0 ? (
              <p className="text-white/40 text-center py-10">Nenhuma entrevista ainda</p>
            ) : (
              <div className="space-y-4">
                {interviews.map((i: any) => (
                  <div key={i.id} className="bg-white/5 border-2 border-white/10 p-6 flex items-center justify-between hover:border-[#FACC15] transition-colors">
                    <div>
                      <h3 className="font-display text-2xl text-white uppercase">{i.jobTitle}</h3>
                      <p className="text-white/40 text-sm">{i.company} — {new Date(i.createdAt).toLocaleDateString("pt-AO")}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {i.status === "completed" ? (
                        <span className="font-display text-3xl text-[#FACC15]">{i.score}%</span>
                      ) : (
                        <span className="text-[#F97316] font-bold uppercase text-sm"><Clock size={14} className="inline" /> Em curso</span>
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
  );
}
