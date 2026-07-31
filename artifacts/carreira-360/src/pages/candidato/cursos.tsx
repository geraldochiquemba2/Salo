import { useState } from "react";
import { BookOpen, ExternalLink, Clock, Award, Star, Sparkles } from "lucide-react";
import { useHasCv } from "@/hooks/use-has-cv";

const allCourses = [
  // INEFOP — Instituto Nacional de Emprego e Formação Profissional (Governo, Gratuito)
  { id: 1, skill: "Soldadura", title: "Soldadura e Corte Industrial", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true, angolan: true },
  { id: 2, skill: "Electricidade", title: "Electricidade Geral e Instalações", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "4 meses", level: "Técnico", free: true, angolan: true },
  { id: 3, skill: "Mecânica", title: "Mecânica Automóvel e Diesel", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "6 meses", level: "Técnico", free: true, angolan: true },
  { id: 4, skill: "Informática", title: "Manutenção de Computadores e Redes", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true, angolan: true },
  { id: 5, skill: "Cabeleireiro", title: "Cabeleireiro e Estética", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true, angolan: true },
  { id: 6, skill: "Costura", title: "Costura e Confeção", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "4 meses", level: "Técnico", free: true, angolan: true },

  // INESCOI — Compliance, Riscos, Banca
  { id: 7, skill: "Compliance", title: "Compliance Officer", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/Compliance-Officer", duration: "40 horas", level: "Avançado", free: false, angolan: true },
  { id: 8, skill: "Gestão de Riscos", title: "Gestão de Riscos Corporativos", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/gestao-de-riscos", duration: "40 horas", level: "Avançado", free: false, angolan: true },
  { id: 9, skill: "Auditoria", title: "Controlo Interno e Auditoria", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/controlo-interno-e-auditoria", duration: "40 horas", level: "Avançado", free: false, angolan: true },
  { id: 10, skill: "Banca", title: "Banca e Sistema Financeiro", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/banca-e-sistema-financeiro", duration: "20 horas", level: "Avançado", free: false, angolan: true },
  { id: 11, skill: "AML", title: "Prevenção do Branqueamento de Capitais", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/prevencao-do-branqueamento-de-capitais-bcft", duration: "20 horas", level: "Avançado", free: false, angolan: true },
  { id: 12, skill: "ESG", title: "ESG e Sustentabilidade Corporativa", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/esg-e-sustentabilidade-corporativa", duration: "40 horas", level: "Avançado", free: false, angolan: true },

  // CursosAngola — Plataforma online
  { id: 13, skill: "Excel", title: "Excel em 1 Hora — Fórmulas Essenciais", provider: "CursosAngola", url: "https://cursosangola.com/curso/0c34615a-cbea-4ac0-a3da-0d0fa6720123", duration: "1h", level: "Iniciante", free: true, angolan: true },
  { id: 14, skill: "WordPress", title: "WordPress com Elementor", provider: "CursosAngola", url: "https://cursosangola.com/curso/4b8460de-fd27-4295-ab41-7e523df632c9", duration: "3h 41min", level: "Iniciante", free: true, angolan: true },
  { id: 15, skill: "Inteligência Artificial", title: "Produtos Digitais com IA + Canva", provider: "CursosAngola", url: "https://cursosangola.com/curso/13371045-c871-49e3-bd51-8ab58a85388e", duration: "15min", level: "Iniciante", free: true, angolan: true },

  // ISPA — Instituto Superior Politécnico Atlântida
  { id: 16, skill: "Engenharia Informática", title: "Engenharia Informática", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 17, skill: "Gestão", title: "Gestão de Empresas", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 18, skill: "Direito", title: "Direito", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 19, skill: "Contabilidade", title: "Gestão Financeira e Contabilidade", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 20, skill: "Arquitetura", title: "Arquitetura e Urbanismo", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "5 anos", level: "Licenciatura", free: false, angolan: true },

  // IMETRO — Instituto Superior Politécnico Metropolitano
  { id: 21, skill: "Direito", title: "Direito", provider: "IMETRO", url: "http://imetroangola.com/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 22, skill: "Gestão", title: "Administração e Gestão", provider: "IMETRO", url: "http://imetroangola.com/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 23, skill: "Contabilidade", title: "Contabilidade", provider: "IMETRO", url: "http://imetroangola.com/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 24, skill: "Relações Públicas", title: "Relações Públicas e Comunicação", provider: "IMETRO", url: "http://imetroangola.com/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },

  // NEP Training — Formação Profissional
  { id: 25, skill: "HSE", title: "HSE — Higiene, Segurança e Ambiente", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "40 horas", level: "Profissional", free: false, angolan: true },
  { id: 26, skill: "Gestão de Projectos", title: "Gestão de Projectos (PMP)", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "40 horas", level: "Avançado", free: false, angolan: true },
  { id: 27, skill: "Liderança", title: "Liderança e Gestão de Equipas", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "20 horas", level: "Intermédio", free: false, angolan: true },

  // UnIA — Universidade Independente de Angola
  { id: 28, skill: "Engenharia Informática", title: "Engenharia Informática", provider: "UnIA", url: "https://unia.ao/licenciaturas/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 29, skill: "Gestão", title: "Gestão e Negócios Internacionais", provider: "UnIA", url: "https://unia.ao/licenciaturas/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 30, skill: "Direito", title: "Direito", provider: "UnIA", url: "https://unia.ao/licenciaturas/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },

  // UAN — Universidade Agostinho Neto
  { id: 31, skill: "Engenharia Civil", title: "Engenharia Civil", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", level: "Licenciatura", free: true, angolan: true },
  { id: 32, skill: "Engenharia Electrónica", title: "Engenharia Electrónica e Telecomunicações", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", level: "Licenciatura", free: true, angolan: true },
  { id: 33, skill: "Engenharia Mecânica", title: "Engenharia Mecânica", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", level: "Licenciatura", free: true, angolan: true },
  { id: 34, skill: "Engenharia de Minas", title: "Engenharia de Minas", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", level: "Licenciatura", free: true, angolan: true },

  // GetTraining Angola
  { id: 35, skill: "Formação Profissional", title: "Formações Empresariais", provider: "GetTraining", url: "https://get-ao.com/cursos", duration: "Variável", level: "Profissional", free: false, angolan: true },
];

const skillCategories = ["Todos", "Informática", "Engenharia", "Gestão", "Direito", "Contabilidade", "HSE", "Compliance", "Banca", "ESG", "Excel", "WordPress", "Inteligência Artificial", "Costura", "Soldadura", "Electricidade", "Mecânica", "Cabeleireiro", "Liderança", "Gestão de Projectos", "AML", "Auditoria", "Arquitetura", "Relações Públicas", "Banca"];

function CourseCard({ c }: { c: typeof allCourses[0] }) {
  return (
    <a key={c.id} href={c.url} target="_blank" rel="noopener"
      className="block bg-white/5 border-2 border-white/10 p-4 sm:p-8 hover:border-[#1B98E0] transition-colors group relative">
      {c.angolan && (
        <div className="absolute top-0 right-0 bg-[#247BA0] text-white px-3 py-1 font-bold text-xs uppercase tracking-widest flex items-center gap-1">
          <Star size={10} fill="currentColor" /> Angola
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs border border-[#1B98E0] text-[#1B98E0] px-3 py-1 uppercase font-bold">{c.skill}</span>
        {c.free ? <span className="text-xs bg-green-500 text-white px-3 py-1 uppercase font-bold">GRATUITO</span> : null}
      </div>
      <h3 className="font-display text-xl sm:text-3xl text-white group-hover:text-[#1B98E0] uppercase mb-2">{c.title}</h3>
      <p className="text-[#247BA0] font-bold uppercase text-sm mb-4">{c.provider}</p>
      <div className="flex items-center gap-4 text-white/50 text-sm">
        <span className="flex items-center gap-1"><Clock size={14} /> {c.duration}</span>
        <span className="flex items-center gap-1"><Award size={14} /> {c.level}</span>
      </div>
      <div className="mt-6 flex items-center gap-2 text-[#247BA0] font-bold text-sm uppercase group-hover:text-[#1B98E0]">
        <ExternalLink size={14} /> Ver Curso
      </div>
    </a>
  );
}

export default function CandidatoCursos() {
  const { hasCv, cvSkills } = useHasCv();
  const [skill, setSkill] = useState("Todos");
  const [showSection, setShowSection] = useState<"all" | "recommended">("all");

  const filtered = allCourses.filter(c => skill === "Todos" || c.skill === skill);

  const recommended = hasCv && cvSkills.length > 0
    ? allCourses.filter(c => {
        const courseWords = `${c.title} ${c.skill} ${c.provider}`.toLowerCase();
        return cvSkills.some(s => courseWords.includes(s.toLowerCase()) || s.toLowerCase().includes(c.skill.toLowerCase()));
      })
    : [];

  const hasRecommendations = recommended.length > 0;

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/50"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-4">
          Cursos <span className="text-[#1B98E0]">& Formação</span>
        </h1>
        <p className="text-white/40 text-lg mb-6 font-bold">{allCourses.length} cursos — Instituições reais de Angola</p>

        {hasCv && hasRecommendations && (
          <div className="flex gap-3 mb-8">
            <button onClick={() => setShowSection("recommended")}
              className={`flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-colors ${showSection === "recommended" ? "bg-[#1B98E0] text-[#13293D]" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
              <Sparkles size={16} /> Recomendados ({recommended.length})
            </button>
            <button onClick={() => setShowSection("all")}
              className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-colors ${showSection === "all" ? "bg-[#247BA0] text-white" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
              Todos ({allCourses.length})
            </button>
          </div>
        )}

        {showSection === "recommended" && hasCv && hasRecommendations ? (
          <div>
            <div className="mb-6">
              <p className="text-[#1B98E0] text-sm uppercase font-bold tracking-widest mb-3">Baseado nas tuas competências: {cvSkills.join(", ")}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommended.map(c => <CourseCard key={c.id} c={c} />)}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <p className="text-white/40 text-sm uppercase font-bold tracking-widest mb-3">Filtrar por área</p>
              <div className="flex flex-wrap gap-2">
                {skillCategories.map(s => (
                  <button key={s} onClick={() => setSkill(s)}
                    className={`px-5 py-2.5 font-bold text-sm uppercase tracking-wider transition-colors ${skill === s ? "bg-[#1B98E0] text-[#13293D]" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-white/40 text-sm mb-8 font-bold">{filtered.length} cursos encontrados</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(c => <CourseCard key={c.id} c={c} />)}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
