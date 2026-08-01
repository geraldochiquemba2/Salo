import { useState } from "react";
import { BookOpen, ExternalLink, Clock, Award, Star, Sparkles, SlidersHorizontal } from "lucide-react";
import { useHasCv } from "@/hooks/use-has-cv";

const allCourses = [
  // INEFOP — Instituto Nacional de Emprego e Formação Profissional (Governo, Gratuito)
  { id: 1, skill: "Soldadura", title: "Soldadura e Corte Industrial", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true, angolan: true },
  { id: 2, skill: "Electricidade", title: "Electricidade Geral e Instalações", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "4 meses", level: "Técnico", free: true, angolan: true },
  { id: 3, skill: "Mecânica", title: "Mecânica Automóvel e Diesel", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "6 meses", level: "Técnico", free: true, angolan: true },
  { id: 4, skill: "Informática", title: "Manutenção de Computadores e Redes", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true, angolan: true },
  { id: 5, skill: "Redes", title: "Configuração de Redes e Wi-Fi", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true, angolan: true },
  { id: 6, skill: "Hardware", title: "Hardware e Manutenção de Computadores", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true, angolan: true },
  { id: 7, skill: "Suporte", title: "Suporte Técnico de Informática", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true, angolan: true },
  { id: 8, skill: "CCTV", title: "Instalação de Sistemas CCTV e Segurança", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "2 meses", level: "Técnico", free: true, angolan: true },
  { id: 9, skill: "PLC", title: "Programação de PLCs e Automação", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "4 meses", level: "Técnico", free: true, angolan: true },
  { id: 10, skill: "Cabeleireiro", title: "Cabeleireiro e Estética", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", level: "Técnico", free: true, angolan: true },
  { id: 11, skill: "Costura", title: "Costura e Confeção", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "4 meses", level: "Técnico", free: true, angolan: true },

  // INESCOI — Compliance, Riscos, Banca, Cibersegurança
  { id: 12, skill: "Cibersegurança", title: "Cibersegurança e Firewalls", provider: "INESCOI", url: "https://www.inescoi.ao", duration: "40 horas", level: "Avançado", free: false, angolan: true },
  { id: 13, skill: "Firewall", title: "Administração de Firewalls", provider: "INESCOI", url: "https://www.inescoi.ao", duration: "30 horas", level: "Avançado", free: false, angolan: true },
  { id: 14, skill: "Segurança", title: "Segurança da Informação", provider: "INESCOI", url: "https://www.inescoi.ao", duration: "40 horas", level: "Avançado", free: false, angolan: true },
  { id: 15, skill: "Cloud", title: "Cloud Computing e Virtualização", provider: "INESCOI", url: "https://www.inescoi.ao", duration: "30 horas", level: "Avançado", free: false, angolan: true },
  { id: 16, skill: "Compliance", title: "Compliance Officer", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/Compliance-Officer", duration: "40 horas", level: "Avançado", free: false, angolan: true },
  { id: 17, skill: "Gestão de Riscos", title: "Gestão de Riscos Corporativos", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/gestao-de-riscos", duration: "40 horas", level: "Avançado", free: false, angolan: true },
  { id: 18, skill: "Auditoria", title: "Controlo Interno e Auditoria", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/controlo-interno-e-auditoria", duration: "40 horas", level: "Avançado", free: false, angolan: true },
  { id: 19, skill: "Banca", title: "Banca e Sistema Financeiro", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/banca-e-sistema-financeiro", duration: "20 horas", level: "Avançado", free: false, angolan: true },
  { id: 20, skill: "AML", title: "Prevenção do Branqueamento de Capitais", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/prevencao-do-branqueamento-de-capitais-bcft", duration: "20 horas", level: "Avançado", free: false, angolan: true },
  { id: 21, skill: "ESG", title: "ESG e Sustentabilidade Corporativa", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/esg-e-sustentabilidade-corporativa", duration: "40 horas", level: "Avançado", free: false, angolan: true },

  // CursosAngola — Plataforma online
  { id: 22, skill: "Excel", title: "Excel em 1 Hora — Fórmulas Essenciais", provider: "CursosAngola", url: "https://cursosangola.com/curso/0c34615a-cbea-4ac0-a3da-0d0fa6720123", duration: "1h", level: "Iniciante", free: true, angolan: true },
  { id: 23, skill: "PowerPoint", title: "PowerPoint — Apresentações Profissionais", provider: "CursosAngola", url: "https://cursosangola.com", duration: "1h", level: "Iniciante", free: true, angolan: true },
  { id: 24, skill: "Python", title: "Python Fundamentos", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", level: "Iniciante", free: true, angolan: true },
  { id: 25, skill: "SQL", title: "Base de Dados e SQL", provider: "CursosAngola", url: "https://cursosangola.com", duration: "2h", level: "Iniciante", free: true, angolan: true },
  { id: 26, skill: "JavaScript", title: "JavaScript Essencial", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", level: "Iniciante", free: true, angolan: true },
  { id: 27, skill: "React", title: "React — Desenvolvimento Web", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", level: "Intermédio", free: true, angolan: true },
  { id: 28, skill: "Node.js", title: "Node.js e APIs REST", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", level: "Intermédio", free: true, angolan: true },
  { id: 29, skill: "TypeScript", title: "TypeScript para Developers", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", level: "Intermédio", free: true, angolan: true },
  { id: 30, skill: "Java", title: "Java Fundamentos", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", level: "Iniciante", free: true, angolan: true },
  { id: 31, skill: "WordPress", title: "WordPress com Elementor", provider: "CursosAngola", url: "https://cursosangola.com/curso/4b8460de-fd27-4295-ab41-7e523df632c9", duration: "3h 41min", level: "Iniciante", free: true, angolan: true },
  { id: 32, skill: "Figma", title: "Design de Interfaces com Figma", provider: "CursosAngola", url: "https://cursosangola.com", duration: "2h", level: "Iniciante", free: true, angolan: true },
  { id: 33, skill: "Inteligência Artificial", title: "Produtos Digitais com IA + Canva", provider: "CursosAngola", url: "https://cursosangola.com/curso/13371045-c871-49e3-bd51-8ab58a85388e", duration: "15min", level: "Iniciante", free: true, angolan: true },
  { id: 34, skill: "AWS", title: "AWS Cloud Concepts", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", level: "Iniciante", free: true, angolan: true },
  { id: 35, skill: "Docker", title: "Docker e Containers", provider: "CursosAngola", url: "https://cursosangola.com", duration: "2h", level: "Intermédio", free: true, angolan: true },
  { id: 36, skill: "Power BI", title: "Power BI — Dashboards e Relatórios", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", level: "Intermédio", free: true, angolan: true },
  { id: 37, skill: "Golang", title: "Go (Golang) Fundamentos", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", level: "Intermédio", free: true, angolan: true },
  { id: 38, skill: "DevOps", title: "DevOps e CI/CD", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", level: "Avançado", free: true, angolan: true },
  { id: 39, skill: "Microserviços", title: "Arquitectura de Microserviços", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", level: "Avançado", free: true, angolan: true },
  { id: 40, skill: "Análise de Dados", title: "Análise de Dados com Python e SQL", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", level: "Intermédio", free: true, angolan: true },

  // NEP Training — Formação Profissional
  { id: 41, skill: "HSE", title: "HSE — Higiene, Segurança e Ambiente", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "40 horas", level: "Profissional", free: false, angolan: true },
  { id: 42, skill: "Gestão de Projectos", title: "Gestão de Projectos (PMP)", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "40 horas", level: "Avançado", free: false, angolan: true },
  { id: 43, skill: "Liderança", title: "Liderança e Gestão de Equipas", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "20 horas", level: "Intermédio", free: false, angolan: true },
  { id: 44, skill: "Scrum", title: "Scrum e Metodologias Ágeis", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "20 horas", level: "Intermédio", free: false, angolan: true },
  { id: 45, skill: "Comunicação", title: "Comunicação Efectiva no Trabalho", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "16 horas", level: "Básico", free: false, angolan: true },
  { id: 46, skill: "Inglês", title: "Inglês para Negócios", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "3 meses", level: "Intermédio", free: false, angolan: true },
  { id: 47, skill: "Resolução de Problemas", title: "Resolução Analítica de Problemas", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "16 horas", level: "Intermédio", free: false, angolan: true },
  { id: 48, skill: "Trabalho em Equipa", title: "Trabalho em Equipa e Colaboração", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "12 horas", level: "Básico", free: false, angolan: true },
  { id: 49, skill: "Redes", title: "Administração de Redes (CCNA)", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "3 meses", level: "Profissional", free: false, angolan: true },

  // ISPA — Instituto Superior Politécnico Atlântida
  { id: 50, skill: "Engenharia Informática", title: "Engenharia Informática", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 51, skill: "Gestão", title: "Gestão e Liderança Empresarial", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "1 ano", level: "Pós-Graduação", free: false, angolan: true },
  { id: 52, skill: "Direito", title: "Direito", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 53, skill: "Contabilidade", title: "Gestão Financeira e Contabilidade", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 54, skill: "Arquitetura", title: "Arquitetura e Urbanismo", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "5 anos", level: "Licenciatura", free: false, angolan: true },

  // IMETRO
  { id: 55, skill: "Direito", title: "Direito", provider: "IMETRO", url: "http://imetroangola.com/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 56, skill: "Gestão", title: "Administração e Gestão", provider: "IMETRO", url: "http://imetroangola.com/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 57, skill: "Contabilidade", title: "Contabilidade", provider: "IMETRO", url: "http://imetroangola.com/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 58, skill: "Relações Públicas", title: "Relações Públicas e Comunicação", provider: "IMETRO", url: "http://imetroangola.com/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },

  // UnIA — Universidade Independente de Angola
  { id: 59, skill: "Engenharia Informática", title: "Engenharia Informática", provider: "UnIA", url: "https://unia.ao/licenciaturas/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },
  { id: 60, skill: "Gestão", title: "Gestão e Negócios Internacionais", provider: "UnIA", url: "https://unia.ao/licenciaturas/", duration: "4 anos", level: "Licenciatura", free: false, angolan: true },

  // UAN — Universidade Agostinho Neto
  { id: 61, skill: "Engenharia Civil", title: "Engenharia Civil", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", level: "Licenciatura", free: true, angolan: true },
  { id: 62, skill: "Engenharia Electrónica", title: "Engenharia Electrónica e Telecomunicações", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", level: "Licenciatura", free: true, angolan: true },
  { id: 63, skill: "Engenharia Mecânica", title: "Engenharia Mecânica", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", level: "Licenciatura", free: true, angolan: true },
  { id: 64, skill: "Engenharia de Minas", title: "Engenharia de Minas", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", level: "Licenciatura", free: true, angolan: true },

  // GetTraining Angola
  { id: 65, skill: "Formação Profissional", title: "Formações Empresariais", provider: "GetTraining", url: "https://get-ao.com/cursos", duration: "Variável", level: "Profissional", free: false, angolan: true },
];

const skillCategories = ["Todos", "Informática", "Redes", "Cibersegurança", "Python", "JavaScript", "React", "SQL", "AWS", "Docker", "Excel", "Power BI", "Figma", "WordPress", "Inteligência Artificial", "Engenharia", "Gestão", "Direito", "Contabilidade", "HSE", "Compliance", "Banca", "ESG", "Costura", "Soldadura", "Electricidade", "Mecânica", "Cabeleireiro", "Liderança", "Scrum", "Gestão de Projectos", "AML", "Auditoria", "Arquitetura", "Relações Públicas", "Inglês", "Comunicação"];

function CourseCard({ c }: { c: typeof allCourses[0] }) {
  return (
    <a key={c.id} href={c.url} target="_blank" rel="noopener"
      className="block bg-[#13293D]/90 backdrop-blur-sm border-2 border-white/20 p-4 sm:p-8 hover:border-[#1B98E0] transition-colors group relative shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
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
  const [filtersOpen, setFiltersOpen] = useState(false);

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
            <div className="mb-6 bg-[#13293D]/90 backdrop-blur-sm border-2 border-[#1B98E0] p-6 shadow-[8px_8px_0px_0px_rgba(36,123,160,0.3)]">
              <p className="text-[#1B98E0] text-sm uppercase font-bold tracking-widest mb-3">Baseado nas tuas competências:</p>
              <div className="flex flex-wrap gap-2">
                {cvSkills.map((s, i) => (
                  <span key={i} className="bg-[#1B98E0]/10 border border-[#1B98E0]/30 text-[#1B98E0] px-3 py-1.5 text-sm font-bold uppercase">{s}</span>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommended.map(c => <CourseCard key={c.id} c={c} />)}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <button onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 px-5 py-2.5 font-bold text-sm uppercase tracking-wider bg-white/5 text-white/60 hover:text-white border border-white/10 transition-colors md:hidden">
                <SlidersHorizontal size={16} /> Filtros {skill !== "Todos" && <span className="bg-[#1B98E0] text-[#13293D] px-2 py-0.5 text-xs">{skill}</span>}
              </button>
              <div className={`${filtersOpen ? "block" : "hidden"} md:block mt-3`}>
                <p className="text-white/40 text-sm uppercase font-bold tracking-widest mb-3">Filtrar por área</p>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.map(s => (
                    <button key={s} onClick={() => { setSkill(s); if (window.innerWidth < 768) setFiltersOpen(false); }}
                      className={`px-5 py-2.5 font-bold text-sm uppercase tracking-wider transition-colors ${skill === s ? "bg-[#1B98E0] text-[#13293D]" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
                      {s}
                    </button>
                  ))}
                </div>
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
