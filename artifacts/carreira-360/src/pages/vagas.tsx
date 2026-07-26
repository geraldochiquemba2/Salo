import { useState } from "react";
import { Link } from "wouter";
import { Search, MapPin, Building2, Clock, Briefcase, ChevronRight } from "lucide-react";

const allJobs = [
  { id: 1, title: "Engenheiro de Software Sénior", company: "Unitel", location: "Luanda", type: "Presencial", category: "Tecnologia", salary: "350 000 – 500 000 Kz", skills: ["React", "Node.js", "PostgreSQL"], featured: true, logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80" },
  { id: 2, title: "Analista de Dados", company: "Banco BFA", location: "Luanda", type: "Híbrido", category: "Finanças", salary: "280 000 – 380 000 Kz", skills: ["Python", "SQL", "Power BI"], featured: false, logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=100&q=80" },
  { id: 3, title: "Gestor de Projecto", company: "Odebrecht Angola", location: "Cabinda", type: "Presencial", category: "Construção", salary: "400 000 – 600 000 Kz", skills: ["PMP", "MS Project", "Liderança"], featured: true, logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=100&q=80" },
  { id: 4, title: "Designer de Produto", company: "AfriTech", location: "Luanda", type: "Remoto", category: "Tecnologia", salary: "220 000 – 320 000 Kz", skills: ["Figma", "UX Research", "Design System"], featured: false, logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80" },
  { id: 5, title: "Engenheiro Petrolífero", company: "Sonangol", location: "Soyo", type: "Presencial", category: "Petróleo & Gás", salary: "800 000 – 1 200 000 Kz", skills: ["Reservoir Eng.", "Drilling", "HSE"], featured: true, logo: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=100&q=80" },
  { id: 6, title: "Especialista em Telecomunicações", company: "Angola Telecom", location: "Huambo", type: "Presencial", category: "Telecomunicações", salary: "300 000 – 420 000 Kz", skills: ["Redes 5G", "Fibra Óptica", "VoIP"], featured: false, logo: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=100&q=80" },
  { id: 7, title: "Responsável de Marketing Digital", company: "Multichoice Angola", location: "Luanda", type: "Híbrido", category: "Media", salary: "240 000 – 340 000 Kz", skills: ["SEO", "Meta Ads", "Conteúdo"], featured: false, logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80" },
  { id: 8, title: "Gestor Financeiro", company: "Grupo Zahara", location: "Luanda", type: "Presencial", category: "Finanças", salary: "500 000 – 700 000 Kz", skills: ["IFRS", "Controlo de Gestão", "Excel"], featured: false, logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80" },
  { id: 9, title: "Arquitecto de Software", company: "iGrow", location: "Luanda", type: "Remoto", category: "Tecnologia", salary: "450 000 – 650 000 Kz", skills: ["AWS", "Microserviços", "Golang"], featured: true, logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80" },
];

const categories = ["Todos", "Tecnologia", "Finanças", "Construção", "Petróleo & Gás", "Telecomunicações", "Media"];
const workTypes = ["Todos", "Presencial", "Híbrido", "Remoto"];

export default function Vagas() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [workType, setWorkType] = useState("Todos");

  const filtered = allJobs.filter(job => {
    const matchSearch = !search || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase()) || job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "Todos" || job.category === category;
    const matchType = workType === "Todos" || job.type === workType;
    return matchSearch && matchCat && matchType;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-display text-3xl text-[#FACC15] hover:text-[#F97316] transition-colors font-black italic tracking-tighter">SALO</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/vagas" className="text-[#FACC15] font-bold text-sm uppercase tracking-wider border-b-2 border-[#FACC15] pb-1">Vagas</Link>
            <Link href="/" className="text-white hover:text-[#FACC15] font-bold text-sm uppercase tracking-wider transition-colors">Empresas</Link>
            <Link href="/" className="text-white hover:text-[#FACC15] font-bold text-sm uppercase tracking-wider transition-colors">Como Funciona</Link>
            <Link href="/login" className="text-white hover:text-[#FACC15] font-bold text-sm uppercase tracking-wider transition-colors">Entrar</Link>
            <Link href="/cadastro" className="bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] px-8 py-3 font-bold text-sm uppercase tracking-wider transition-colors shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]">Começar</Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* HERO IMAGE */}
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80" alt="Carreiras" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-[1400px] mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#FACC15]/10 border border-[#FACC15]/30 text-[#FACC15] px-4 py-2 font-bold text-sm uppercase tracking-wider mb-4">
              <Briefcase size={16} /> {allJobs.length} oportunidades activas
            </div>
            <h1 className="font-display text-[3rem] md:text-[6rem] uppercase leading-[0.85] mb-4">
              As Melhores<br /><span className="text-[#FACC15]">Vagas</span> de Angola.
            </h1>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 pb-20">
          {/* SEARCH */}
          <div className="relative mb-8">
            <Search size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cargo, empresa ou competência…"
              className="w-full bg-white/5 border-2 border-white/10 text-white h-18 pl-16 pr-6 text-lg focus:border-[#FACC15] focus:outline-none rounded-none placeholder:text-white/30" />
          </div>

          {/* FILTERS */}
          <div className="mb-4">
            <p className="text-white/40 text-sm uppercase font-bold tracking-widest mb-3">Profissionais angolanos</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-5 py-2.5 font-bold text-sm uppercase tracking-wider transition-colors ${category === c ? "bg-[#FACC15] text-[#0A0A0A]" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {workTypes.map(w => (
                <button key={w} onClick={() => setWorkType(w)}
                  className={`px-5 py-2.5 font-bold text-sm uppercase tracking-wider transition-colors ${workType === w ? "bg-[#F97316] text-white" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* RESULTS COUNT */}
          <p className="text-white/40 text-sm mb-8 font-bold">{filtered.length} vagas encontradas</p>

          {/* JOB CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {filtered.map(job => (
              <div key={job.id} className="bg-white/5 border-2 border-white/10 p-6 hover:border-[#FACC15] transition-colors group relative flex flex-col">
                {job.featured && (
                  <div className="absolute top-0 right-0 bg-[#FACC15] text-[#0A0A0A] px-4 py-1 font-bold text-xs uppercase tracking-widest">Destaque</div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                  <div>
                    <span className="text-white/80 text-sm font-bold block">{job.company}</span>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#F97316]">{job.category}</span>
                  </div>
                </div>
                <h3 className="font-display text-2xl uppercase mb-2 group-hover:text-[#FACC15] transition-colors">{job.title}</h3>
                <div className="flex items-center gap-4 text-white/40 text-sm mb-3">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                </div>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider ${job.type === "Remoto" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : job.type === "Híbrido" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30"}`}>{job.type}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map(s => (
                    <span key={s} className="text-xs border border-white/20 text-white/60 px-3 py-1 uppercase font-bold">{s}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <p className="font-display text-lg text-[#FACC15]">{job.salary}</p>
                  <button className="bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] px-6 py-2.5 font-bold text-sm uppercase transition-colors shadow-[3px_3px_0px_0px_rgba(249,115,22,1)]">
                    Candidatar-me
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RECRUITER CTA */}
          <section className="bg-white/5 border-2 border-white/10 p-12 md:p-16 text-center shadow-[12px_12px_0px_0px_rgba(249,115,22,0.3)]">
            <h2 className="font-display text-[4rem] md:text-[5rem] uppercase leading-[0.85] mb-4">
              Para <span className="text-[#FACC15]">Recrutadores</span>
            </h2>
            <p className="font-display text-3xl text-white/40 uppercase mb-2">Publique a Sua Vaga.</p>
            <p className="font-display text-3xl text-[#F97316] uppercase mb-8">Encontre o Talento Certo.</p>
            <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">Acesso imediato à maior rede de talentos qualificados de Angola.</p>
            <Link href="/cadastro" className="inline-flex items-center gap-3 bg-[#FACC15] hover:bg-[#F97316] text-[#0A0A0A] px-12 py-5 font-display text-2xl uppercase transition-colors shadow-[6px_6px_0px_0px_rgba(249,115,22,1)]">
              Saber Mais <ChevronRight size={24} />
            </Link>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] py-12 px-6 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="font-display text-4xl text-[#FACC15] mb-4 font-black italic tracking-tighter">SALO</div>
              <p className="text-white/40 text-sm leading-relaxed">Plataforma inteligente de recrutamento que conecta talentos e empresas usando monitorização em tempo real.</p>
            </div>
            <div>
              <h4 className="font-display text-lg uppercase mb-4 text-[#FACC15]">Plataforma</h4>
              <div className="space-y-2">
                <Link href="/vagas" className="block text-white/40 text-sm hover:text-white">Vagas</Link>
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Empresas</p>
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Como Funciona</p>
              </div>
            </div>
            <div>
              <h4 className="font-display text-lg uppercase mb-4 text-[#FACC15]">Empresa</h4>
              <div className="space-y-2">
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Sobre</p>
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Blog</p>
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Contacto</p>
              </div>
            </div>
            <div>
              <h4 className="font-display text-lg uppercase mb-4 text-[#FACC15]">Legal</h4>
              <div className="space-y-2">
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Privacidade</p>
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Termos</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/30 text-sm">© 2026 SALO. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
