import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, Upload, Search, BarChart3, BookOpen, Users, Target, Briefcase, ChevronRight, Star } from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-[100dvh] bg-[#13293D] font-sans text-white overflow-x-hidden selection:bg-[#1B98E0] selection:text-[#13293D]">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#13293D]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-display text-3xl text-[#1B98E0] hover:text-[#247BA0] transition-colors">TALENTOS</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/vagas" className="text-white hover:text-[#1B98E0] font-bold text-sm uppercase tracking-wider transition-colors">Vagas</Link>
            <Link href="/como-funciona" className="text-white hover:text-[#1B98E0] font-bold text-sm uppercase tracking-wider transition-colors">Como Funciona</Link>
            <Link href="/empresas" className="text-white hover:text-[#1B98E0] font-bold text-sm uppercase tracking-wider transition-colors">Empresas</Link>
            <Link href="/login" className="text-white hover:text-[#1B98E0] font-bold text-sm uppercase tracking-wider transition-colors">Entrar</Link>
            <Link href="/cadastro" className="bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] px-8 py-3 font-bold text-sm uppercase tracking-wider transition-colors shadow-[4px_4px_0px_0px_rgba(36,123,160,1)]">Começar</Link>
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#13293D] border-t border-white/10 p-6 flex flex-col gap-4">
            <Link href="/vagas" className="text-left text-2xl font-display uppercase text-white hover:text-[#1B98E0]">Vagas</Link>
            <Link href="/como-funciona" className="text-left text-2xl font-display uppercase text-white hover:text-[#1B98E0]">Como Funciona</Link>
            <Link href="/empresas" className="text-left text-2xl font-display uppercase text-white hover:text-[#1B98E0]">Empresas</Link>
            <Link href="/login" className="text-left text-2xl font-display uppercase text-[#1B98E0]">Entrar</Link>
            <Link href="/cadastro" className="text-left text-2xl font-display uppercase bg-[#1B98E0] text-[#13293D] px-6 py-3 mt-2">Começar</Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="min-h-[100dvh] flex items-center pt-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80"
            alt="Profissionais a trabalhar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#13293D] via-[#13293D]/85 to-[#13293D]/40"></div>
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#1B98E0]/8 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#247BA0]/8 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-[1400px] w-full mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="font-display text-[2.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] leading-[0.85] uppercase mb-6">
                Conectando <span className="text-[#1B98E0]">Talentos</span> e Oportunidades
              </h1>
              <p className="text-lg sm:text-2xl text-white/80 mb-10 max-w-xl leading-relaxed">
                Monitoriza vagas em tempo real. Compara CVs com vagas reais, calcula match %, identifica skill gaps e recomenda cursos.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-12">
                <Link href="/cadastro?role=candidate" className="bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] px-6 sm:px-10 py-3 sm:py-5 font-display text-lg sm:text-2xl uppercase transition-colors shadow-[6px_6px_0px_0px_rgba(36,123,160,1)]">
                  Sou Candidato
                </Link>
                <Link href="/cadastro?role=recruiter" className="border-2 border-[#247BA0] text-[#247BA0] hover:bg-[#247BA0] hover:text-white px-6 sm:px-10 py-3 sm:py-5 font-display text-lg sm:text-2xl uppercase transition-colors">
                  Sou Recrutador
                </Link>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-[#1B98E0]/20 border-2 border-[#13293D] flex items-center justify-center text-xs font-bold text-[#1B98E0]">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-display text-2xl text-[#1B98E0]">+2.500</p>
                  <p className="text-white/40 text-sm uppercase tracking-wider">profissionais na plataforma</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-[#1B98E0] py-5 overflow-hidden flex whitespace-nowrap border-y-4 border-[#247BA0]">
        <motion.div className="flex whitespace-nowrap text-[#13293D] font-display text-2xl uppercase tracking-widest"
          animate={{ x: [0, -2000] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>
          {Array(12).fill("●VAGAS EM TEMPO REAL●MATCH INTELIGENTE●SCRAPING LINKEDIN●SKILL GAP ANALYSIS●CURSOS RECOMENDADOS●").map((t, i) => (
            <span key={i} className="mx-6">{t}</span>
          ))}
        </motion.div>
      </div>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-16 sm:py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="font-display text-[3rem] sm:text-[6rem] md:text-[8rem] uppercase leading-[0.85]">
              Como <span className="text-[#1B98E0]">Funciona</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-0">
            {[
              { step: "01", title: "Upload do CV", desc: "Faz upload do teu CV ou preenche o teu perfil profissional na plataforma.", icon: Upload, color: "#1B98E0", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80" },
              { step: "02", title: "Análise Inteligente", desc: "O nosso sistema monitoriza vagas em tempo real no LinkedIn, encontrando oportunidades compatíveis.", icon: Search, color: "#247BA0", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" },
              { step: "03", title: "Match & Análise", desc: "Comparamos o teu perfil com cada vaga, calculamos match % e identificamos skill gaps.", icon: BarChart3, color: "#1B98E0", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="border border-white/10 hover:bg-white/5 transition-colors group relative overflow-hidden">
                  <div className="h-48 w-full overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13293D] via-[#13293D]/60 to-transparent"></div>
                  </div>
                  <div className="relative z-10 p-10">
                    <span className="absolute -top-6 -right-4 font-display text-[8rem] text-white/[0.03] group-hover:text-[#1B98E0]/[0.05] transition-colors leading-none">{item.step}</span>
                    <div className="relative z-10">
                      <div className="w-16 h-16 flex items-center justify-center mb-6" style={{ backgroundColor: `${item.color}15`, border: `2px solid ${item.color}40` }}>
                        <Icon size={28} style={{ color: item.color }} />
                      </div>
                      <p className="font-display text-[#1B98E0] text-lg mb-2">{item.step}</p>
                      <h3 className="font-display text-3xl uppercase mb-4 group-hover:text-[#1B98E0] transition-colors">{item.title}</h3>
                      <p className="text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CANDIDATOS */}
      <section id="candidatos" className="py-16 sm:py-32 px-6 bg-[#E8F1F2] text-[#13293D]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-[2.5rem] sm:text-[5rem] md:text-[7rem] uppercase leading-[0.85] mb-6">
                Para <span className="text-[#247BA0]">Candidatos</span>
              </h2>
              <p className="text-lg sm:text-2xl text-[#13293D]/60 mb-12 max-w-md">Seu CV encontra a vaga perfeita. Faz upload do teu CV e a plataforma faz o trabalho pesado.</p>

              <div className="space-y-8">
                {[
                  { icon: Search, title: "Monitorização em Tempo Real", desc: "A plataforma monitoriza vagas reais no LinkedIn, extraindo requisitos atualizados do mercado." },
                  { icon: Target, title: "Match Inteligente", desc: "Comparamos o teu CV com cada vaga, calculando percentual de compatibilidade e skills que faltam." },
                  { icon: BookOpen, title: "Cursos Recomendados", desc: "Identificamos os teus gaps de skills e recomendamos cursos para preencher as lacunas." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex gap-6 group">
                      <div className="w-14 h-14 bg-[#1B98E0] flex items-center justify-center shrink-0 group-hover:bg-[#247BA0] transition-colors shadow-[4px_4px_0px_0px_rgba(36,123,160,0.5)]">
                        <Icon size={24} className="text-[#13293D]" />
                      </div>
                      <div>
                        <h4 className="font-display text-2xl uppercase mb-2 group-hover:text-[#247BA0] transition-colors">{item.title}</h4>
                        <p className="text-[#13293D]/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                alt="Person at desk"
                className="w-full h-[300px] sm:h-[500px] object-cover border-2 border-[#13293D] shadow-[12px_12px_0px_0px_rgba(36,123,160,0.5)]"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#13293D] text-white p-6 shadow-[4px_4px_0px_0px_rgba(36,123,160,0.5)]">
                <div className="flex items-center gap-3">
                  <Star size={20} className="text-[#1B98E0]" />
                  <span className="font-display text-lg">+2.500 perfis activos</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* RECRUTADORES */}
      <section id="recrutadores" className="py-16 sm:py-32 px-6 bg-[#13293D]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
                alt="Team meeting"
                className="w-full h-[500px] object-cover border-2 border-white/10 shadow-[12px_12px_0px_0px_rgba(36,123,160,0.3)]"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <h2 className="font-display text-[2.5rem] sm:text-[5rem] md:text-[7rem] uppercase leading-[0.85] mb-6">
                Para <span className="text-[#1B98E0]">Recrutadores</span>
              </h2>
              <p className="text-lg sm:text-2xl text-white/60 mb-12 max-w-md">Encontre o talento certo. Descreve o perfil em linguagem natural e recebe um ranking de candidatos.</p>

              <div className="space-y-8">
                {[
                  { icon: Search, title: "Análise de Perfis", desc: "Analisamos perfis públicos no LinkedIn com base nas palavras-chave que descreveres." },
                  { icon: Users, title: "Ranking de Candidatos", desc: "Sistema de análise dos perfis capturados e entrega um ranking dos melhores candidatos." },
                  { icon: Target, title: "Match Preciso", desc: "Cada candidato é pontuado por compatibilidade técnica, experiência e fit cultural." },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex gap-6 group">
                      <div className="w-14 h-14 bg-[#247BA0] flex items-center justify-center shrink-0 group-hover:bg-[#1B98E0] transition-colors shadow-[4px_4px_0px_0px_rgba(36,123,160,0.5)]">
                        <Icon size={24} className="text-white group-hover:text-[#13293D]" />
                      </div>
                      <div>
                        <h4 className="font-display text-2xl uppercase mb-2 group-hover:text-[#1B98E0] transition-colors">{item.title}</h4>
                        <p className="text-white/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#13293D] via-[#0d2e4a] to-[#13293D] border-y-4 border-[#247BA0]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Vagas do LinkedIn" },
            { value: "2.500+", label: "Talentos Activos" },
            { value: "1.200+", label: "Matches Feitos" },
            { value: "92%", label: "Taxa de Precisão" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center">
              <p className="font-display text-[4rem] md:text-[5rem] text-[#1B98E0] leading-none">{stat.value}</p>
              <p className="text-white/60 font-bold text-sm uppercase tracking-widest mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            alt="Equipa a trabalhar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#13293D]/80"></div>
        </div>
        <div className="max-w-[800px] mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-[5rem] md:text-[7rem] uppercase leading-[0.85] mb-8">
              Comece <span className="text-[#1B98E0]">Agora</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-lg mx-auto">
              Junte-se a milhares de profissionais encontrando suas oportunidades. Monitorização em tempo real, matching inteligente e análise de skills.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/cadastro?role=candidate" className="bg-[#1B98E0] hover:bg-[#247BA0] text-[#13293D] px-12 py-6 font-display text-3xl uppercase transition-colors shadow-[8px_8px_0px_0px_rgba(36,123,160,1)]">
                Encontrar Emprego
              </Link>
              <Link href="/cadastro?role=recruiter" className="border-2 border-[#247BA0] text-[#247BA0] hover:bg-[#247BA0] hover:text-white px-12 py-6 font-display text-3xl uppercase transition-colors shadow-[8px_8px_0px_0px_rgba(36,123,160,0.3)]">
                Contratar Talentos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#13293D] py-12 px-6 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="font-display text-4xl text-[#1B98E0] mb-4">TALENTOS</div>
              <p className="text-white/40 text-sm leading-relaxed">Plataforma inteligente de recrutamento com monitorização em tempo real.</p>
            </div>
            <div>
              <h4 className="font-display text-lg uppercase mb-4 text-[#1B98E0]">Plataforma</h4>
              <div className="space-y-2">
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Para Candidatos</p>
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Para Empresas</p>
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Preços</p>
              </div>
            </div>
            <div>
              <h4 className="font-display text-lg uppercase mb-4 text-[#1B98E0]">Empresa</h4>
              <div className="space-y-2">
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Sobre</p>
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Blog</p>
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Contacto</p>
              </div>
            </div>
            <div>
              <h4 className="font-display text-lg uppercase mb-4 text-[#1B98E0]">Legal</h4>
              <div className="space-y-2">
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Privacidade</p>
                <p className="text-white/40 text-sm hover:text-white cursor-pointer">Termos</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/30 text-sm">© 2026 TALENTOS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
