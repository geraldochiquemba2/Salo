import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ThumbsUp, X, MapPin, Briefcase, DollarSign } from "lucide-react";

export default function CandidatoSwipe() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);

  useEffect(() => {
    apiFetch("/api/candidate/swipe/jobs").then(setJobs).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const currentJob = jobs[currentIndex];

  async function handleSwipe(action: "like" | "superlike" | "pass") {
    if (!currentJob || swiping) return;
    setSwiping(true);
    try {
      await apiFetch("/api/candidate/swipe", {
        method: "POST",
        body: JSON.stringify({ jobId: currentJob.id, action }),
      });
      if (action !== "pass") {
        toast({ title: action === "superlike" ? "SUPER LIKE!" : "GOSTASTE!", description: `${currentJob.title} @ ${currentJob.company}` });
      }
      setCurrentIndex(prev => prev + 1);
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    } finally {
      setSwiping(false);
    }
  }

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><p className="font-display text-4xl text-[#FACC15] animate-pulse">A CARREGAR...</p></div>;

  if (!currentJob) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="text-center">
        <p className="font-display text-5xl text-[#FACC15] mb-4">ACABASTE!</p>
        <p className="text-white/50 text-xl">Não há mais vagas para swipar.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 md:p-12 flex flex-col items-center">
      <h1 className="font-display text-6xl md:text-8xl text-white uppercase mb-8 self-start max-w-[1400px] w-full mx-auto">
        Swipe <span className="text-[#FACC15]">Vagas</span>
      </h1>

      <div className="w-full max-w-lg mx-auto mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentJob.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 border-2 border-white/10 p-8 shadow-[8px_8px_0px_0px_rgba(249,115,22,0.5)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Briefcase size={24} className="text-[#FACC15]" />
              <span className="text-white/40 text-sm uppercase">{currentJob.company}</span>
            </div>
            <h2 className="font-display text-5xl text-white uppercase mb-4">{currentJob.title}</h2>
            <div className="flex items-center gap-2 text-white/50 mb-4">
              <MapPin size={16} /> {currentJob.location}
            </div>
            {currentJob.salary && (
              <div className="flex items-center gap-2 text-[#FACC15] mb-6">
                <DollarSign size={16} /> <span className="font-bold">{currentJob.salary}</span>
              </div>
            )}
            <p className="text-white/60 mb-6">{currentJob.description}</p>
            <div className="flex flex-wrap gap-2">
              {(currentJob.skills || []).map((s: string) => (
                <span key={s} className="text-xs border border-[#FACC15] text-[#FACC15] px-3 py-1 uppercase font-bold">{s}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-6 mt-8">
          <button onClick={() => handleSwipe("pass")} disabled={swiping}
            className="w-20 h-20 border-2 border-[#F97316] text-[#F97316] flex items-center justify-center hover:bg-[#F97316] hover:text-white transition-colors disabled:opacity-50">
            <X size={32} />
          </button>
          <button onClick={() => handleSwipe("superlike")} disabled={swiping}
            className="w-20 h-20 border-2 border-[#FACC15] text-[#FACC15] flex items-center justify-center hover:bg-[#FACC15] hover:text-[#0A0A0A] transition-colors disabled:opacity-50">
            <ThumbsUp size={32} />
          </button>
          <button onClick={() => handleSwipe("like")} disabled={swiping}
            className="w-20 h-20 border-2 border-green-500 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors disabled:opacity-50">
            <Heart size={32} />
          </button>
        </div>
        <p className="text-center text-white/30 text-sm mt-4 uppercase">{currentIndex + 1} / {jobs.length}</p>
      </div>
    </div>
  );
}
