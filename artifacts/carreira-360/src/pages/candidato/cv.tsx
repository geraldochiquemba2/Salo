import { useEffect, useState, useRef } from "react";
import { apiFetch } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, FileUp, Loader2, CheckCircle2, Pencil } from "lucide-react";

export default function CandidatoCv() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [hasCv, setHasCv] = useState(false);
  const [fileName, setFileName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    apiFetch("/api/candidate/cv").then((cv) => {
      setHasCv(true);
      setFileName(cv.fileName || "");
      setSkills(Array.isArray(cv.skills) ? cv.skills : []);
      setExperience(cv.experience || "");
      setEducation(cv.education || "");
      setSummary(cv.summary || "");
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Erro ao ler o ficheiro"));
      reader.readAsText(file);
    });
  }

  async function handleFileUpload(file: File) {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    const validExtensions = [".txt", ".md", ".csv", ".pdf", ".docx", ".doc"];
    if (!validExtensions.includes(ext)) {
      toast({ title: "Formato não suportado", description: "Use ficheiros .txt, .pdf ou .docx", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      let content: string;
      if (ext === ".pdf" || ext === ".docx" || ext === ".doc") {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        content = btoa(binary);
      } else {
        content = await readFileAsText(file);
      }

      toast({ title: "A analisar CV com IA...", description: "A extrair competências, experiência e formação." });

      const result = await apiFetch("/api/candidate/cv/upload", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, content }),
      });

      setHasCv(true);
      setFileName(result.fileName || file.name);
      setSkills(Array.isArray(result.skills) ? result.skills : []);
      setExperience(result.experience || "");
      setEducation(result.education || "");
      setSummary(result.summary || "");

      toast({ title: "CV ANALISADO", description: "A IA extraiu as informações do teu CV." });
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await apiFetch("/api/candidate/cv", {
        method: "POST",
        body: JSON.stringify({ fileName, content: `${summary}\n\n${experience}\n\n${education}`, skills, experience, education, summary }),
      });
      toast({ title: "CV GUARDADO", description: "O teu CV foi guardado com sucesso." });
    } catch (err: any) {
      toast({ title: "ERRO", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="min-h-screen bg-[#13293D] flex items-center justify-center"><p className="font-display text-4xl text-[#1B98E0] animate-pulse">A CARREGAR...</p></div>;

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            {hasCv ? <FileText size={48} className="text-[#1B98E0]" /> : <Upload size={48} className="text-[#247BA0]" />}
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase">
              {hasCv ? "Meu " : "Upload "}<span className="text-[#1B98E0]">CV</span>
            </h1>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`mb-10 border-4 border-dashed cursor-pointer transition-all duration-300 py-16 px-8 text-center ${
              dragOver ? "border-[#1B98E0] bg-[#1B98E0]/10" : "border-white/20 hover:border-[#247BA0] hover:bg-white/5"
            } ${uploading ? "pointer-events-none opacity-60" : ""}`}
          >
            <input ref={fileInputRef} type="file" accept=".txt,.md,.csv,.pdf,.docx,.doc" className="hidden"
              onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(file); e.target.value = ""; }} />
            {uploading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 size={64} className="text-[#1B98E0] animate-spin" />
                <p className="font-display text-2xl text-[#1B98E0] uppercase">A analisar CV com IA...</p>
                <p className="text-white/50 text-sm">A extrair competências, experiência e formação</p>
              </div>
            ) : hasCv ? (
              <div className="flex flex-col items-center gap-4">
                <CheckCircle2 size={64} className="text-green-500" />
                <p className="font-display text-2xl text-white uppercase">CV carregado</p>
                <p className="text-white/40 text-sm">{fileName}</p>
                <p className="text-[#1B98E0] text-xs">Clica ou arrasta outro ficheiro para atualizar</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <FileUp size={64} className="text-[#247BA0]" />
                <p className="font-display text-2xl text-white uppercase">Arrasta o teu CV aqui</p>
                <p className="text-white/50 text-sm">ou clica para selecionar ficheiro</p>
                <p className="text-white/30 text-xs mt-2">Formatos: TXT, PDF, DOCX</p>
                <p className="text-[#1B98E0]/70 text-xs mt-1">A IA extrai automaticamente tudo</p>
              </div>
            )}
          </div>

          {hasCv && (
            <div className="space-y-8">
              <div>
                <p className="text-[#1B98E0] uppercase tracking-widest font-bold text-sm mb-3">NOME DO FICHEIRO</p>
                <p className="w-full bg-white/5 border-2 border-white/20 text-white px-6 py-4 text-lg">{fileName}</p>
              </div>
              <div>
                <p className="text-[#1B98E0] uppercase tracking-widest font-bold text-sm mb-3">COMPETÊNCIAS</p>
                <div className="flex flex-wrap gap-2">
                  {skills.length > 0 ? skills.map((s, i) => (
                    <span key={i} className="text-sm border border-[#1B98E0] text-[#1B98E0] px-3 py-1 uppercase font-bold">{s}</span>
                  )) : <p className="text-white/30">Nenhuma competência extraída</p>}
                </div>
              </div>
              {experience && (
                <div>
                  <p className="text-[#1B98E0] uppercase tracking-widest font-bold text-sm mb-3">EXPERIÊNCIA PROFISSIONAL</p>
                  <p className="w-full bg-white/5 border-2 border-white/20 text-white/80 px-6 py-4 text-lg whitespace-pre-wrap">{experience}</p>
                </div>
              )}
              {education && (
                <div>
                  <p className="text-[#1B98E0] uppercase tracking-widest font-bold text-sm mb-3">FORMAÇÃO</p>
                  <p className="w-full bg-white/5 border-2 border-white/20 text-white/80 px-6 py-4 text-lg whitespace-pre-wrap">{education}</p>
                </div>
              )}
              {summary && (
                <div>
                  <p className="text-[#1B98E0] uppercase tracking-widest font-bold text-sm mb-3">RESUMO</p>
                  <p className="w-full bg-white/5 border-2 border-white/20 text-white/80 px-6 py-4 text-lg whitespace-pre-wrap">{summary}</p>
                </div>
              )}

              <button onClick={handleSave} disabled={saving}
                className="w-full h-14 sm:h-20 bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] text-lg sm:text-2xl font-display uppercase transition-colors disabled:opacity-50 shadow-[8px_8px_0px_0px_rgba(36,123,160,1)]">
                {saving ? "A GUARDAR..." : "GUARDAR CV"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
