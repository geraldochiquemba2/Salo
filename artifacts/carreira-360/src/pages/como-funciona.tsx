import { useState } from 'react';

const steps = [
  {
    num: '01',
    title: 'Crie seu Perfil',
    desc: 'Cadastre-se gratuitamente e crie um perfil completo com suas habilidades, experiência e formação.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    num: '02',
    title: 'Explore as Vagas',
    desc: 'Navegue por centenas de vagas filtradas por área, localização e nível de experiência.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
  },
  {
    num: '03',
    title: 'Candidate-se',
    desc: 'Envie sua candidatura com um clique. Acompanhe o status em tempo real no seu painel.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80',
  },
  {
    num: '04',
    title: 'Entrevista',
    desc: 'Seja selecionado para entrevista pelas empresas. Prepare-se com nossos recursos.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80',
  },
  {
    num: '05',
    title: 'Conecte-se',
    desc: 'Receba ofertas, negocie e inicie sua nova carreira com confiança.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
  },
];

const comparisons = [
  { feature: 'Tempo médio de busca', traditional: '3-6 meses', salo: '2-4 semanas' },
  { feature: 'Acesso a vagas', traditional: 'Limitado', salo: 'Centenas de vagas' },
  { feature: 'Custo', traditional: 'Agências caras', salo: 'Gratuito para candidatos' },
  { feature: 'Transparência', traditional: 'Baixa', salo: 'Alta - acompanhe tudo' },
  { feature: 'Feedback', traditional: 'Raro', salo: 'Sempre' },
];

const faqs = [
  { q: 'O SALO é gratuito?', a: 'Sim! Para candidatos, o SALO é 100% gratuito. Empresas pagam planos a partir de 150 000 Kz/mês.' },
  { q: 'Preciso ter experiência para me candidatar?', a: 'Não. Temos vagas para todos os níveis, desde estágios até posições de liderança.' },
  { q: 'Como recebo notificações de vagas?', a: 'Configure suas preferências de busca e receba alertas por email e notificações push.' },
  { q: 'As empresas são verificadas?', a: 'Sim. Todas as empresas passam por um processo de verificação antes de publicar vagas.' },
  { q: 'Posso editar meu perfil depois de criar?', a: 'Sim. Seu perfil pode ser atualizado a qualquer momento para refletir sua experiência atual.' },
];

export default function ComoFunciona() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] font-display">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-[#FACC15]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-3xl font-black tracking-tighter text-[#FACC15]">SALO</a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/vagas" className="text-[#F5F0E8] hover:text-[#FACC15] transition-colors font-medium">Vagas</a>
            <a href="/empresas" className="text-[#F5F0E8] hover:text-[#FACC15] transition-colors font-medium">Empresas</a>
            <a href="/como-funciona" className="text-[#FACC15] font-bold border-b-2 border-[#FACC15]">Como Funciona</a>
            <a href="/entrar" className="text-[#F5F0E8] hover:text-[#FACC15] transition-colors font-medium">Entrar</a>
            <a href="/comecar" className="bg-[#FACC15] text-[#0A0A0A] px-6 py-3 font-black uppercase tracking-wider hover:bg-[#F97316] hover:text-[#F5F0E8] transition-colors">Começar</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#FACC15] text-2xl font-black">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0A0A0A] border-t border-[#FACC15]/20 px-6 py-4 flex flex-col gap-4">
            <a href="/vagas" className="text-[#F5F0E8] font-medium">Vagas</a>
            <a href="/empresas" className="text-[#F5F0E8] font-medium">Empresas</a>
            <a href="/como-funciona" className="text-[#FACC15] font-bold">Como Funciona</a>
            <a href="/entrar" className="text-[#F5F0E8] font-medium">Entrar</a>
            <a href="/comecar" className="bg-[#FACC15] text-[#0A0A0A] px-6 py-3 font-black uppercase tracking-wider text-center">Começar</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-24">
        <div className="relative h-[500px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80" alt="Team collaboration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6">
            <p className="text-[#FACC15] uppercase tracking-[0.3em] font-bold text-sm mb-4">Como Funciona</p>
            <h1 className="text-5xl md:text-7xl font-black text-center leading-[0.9] mb-6">
              Seu Caminho para a<br /><span className="text-[#FACC15]">Próxima Carreira</span>
            </h1>
            <p className="text-[#F5F0E8]/70 text-lg max-w-xl text-center mb-8">Em 5 passos simples, do perfil à contratação.</p>
            <a href="#steps" className="bg-[#F97316] text-[#F5F0E8] px-10 py-4 font-black uppercase tracking-wider text-lg hover:bg-[#FACC15] hover:text-[#0A0A0A] transition-colors">Ver Passos</a>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#F97316] uppercase tracking-[0.3em] font-bold text-sm mb-4">Processo</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">5 passos para<br /><span className="text-[#FACC15]">sua nova carreira</span></h2>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-8 border-2 border-[#FACC15]/20 p-8 hover:border-[#FACC15] transition-colors">
                <div className="flex-1">
                  <span className="text-6xl font-black text-[#F97316]/30">{step.num}</span>
                  <h3 className="text-2xl font-black text-[#FACC15] uppercase mt-2 mb-4">{step.title}</h3>
                  <p className="text-[#F5F0E8]/70 leading-relaxed text-lg">{step.desc}</p>
                </div>
                <div className="w-full md:w-80 h-56 overflow-hidden border-2 border-[#FACC15]/30 flex-shrink-0">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#F97316] uppercase tracking-[0.3em] font-bold text-sm mb-4">Comparação</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">SALO vs<br /><span className="text-[#FACC15]">Método Tradicional</span></h2>
          <div className="border-2 border-[#FACC15]/30 overflow-hidden">
            <div className="grid grid-cols-3 bg-[#FACC15]/10 border-b-2 border-[#FACC15]/30">
              <div className="p-4 font-black text-[#FACC15] uppercase text-sm">Funcionalidade</div>
              <div className="p-4 font-black text-[#F5F0E8]/60 uppercase text-sm text-center">Tradicional</div>
              <div className="p-4 font-black text-[#FACC15] uppercase text-sm text-center">SALO</div>
            </div>
            {comparisons.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-[#0A0A0A]' : 'bg-[#FACC15]/5'} border-b border-[#FACC15]/10`}>
                <div className="p-4 text-[#F5F0E8]/80 font-medium">{row.feature}</div>
                <div className="p-4 text-[#F5F0E8]/50 text-center">{row.traditional}</div>
                <div className="p-4 text-[#FACC15] font-bold text-center">{row.salo}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#F97316] uppercase tracking-[0.3em] font-bold text-sm mb-4">Dúvidas</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">Perguntas<br /><span className="text-[#FACC15]">Frequentes</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-2 border-[#FACC15]/20">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[#FACC15]/5 transition-colors"
                >
                  <span className="font-black text-lg text-[#F5F0E8]">{faq.q}</span>
                  <span className={`text-[#FACC15] text-2xl font-black transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 border-t border-[#FACC15]/10 pt-4">
                    <p className="text-[#F5F0E8]/70 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#FACC15]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black text-[#0A0A0A] mb-6 leading-tight">Pronto para<br />começar?</h2>
            <p className="text-[#0A0A0A]/70 text-lg mb-8 max-w-md">Crie seu perfil agora e dê o primeiro passo para sua próxima oportunidade profissional.</p>
            <a href="/comecar" className="inline-block bg-[#0A0A0A] text-[#FACC15] px-12 py-5 font-black uppercase tracking-wider text-lg hover:bg-[#F97316] hover:text-[#F5F0E8] transition-colors">Começar Agora</a>
          </div>
          <div className="w-full md:w-96 h-72 overflow-hidden border-4 border-[#0A0A0A]">
            <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80" alt="CTA" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-[#FACC15]/20 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <p className="text-3xl font-black text-[#FACC15] mb-4">SALO</p>
            <p className="text-[#F5F0E8]/60 leading-relaxed">A plataforma de emprego que conecta talentos angolanos às melhores oportunidades.</p>
          </div>
          <div>
            <p className="font-black text-[#F97316] uppercase tracking-wider mb-4">Plataforma</p>
            <div className="flex flex-col gap-2">
              <a href="/vagas" className="text-[#F5F0E8]/60 hover:text-[#FACC15] transition-colors">Vagas</a>
              <a href="/empresas" className="text-[#F5F0E8]/60 hover:text-[#FACC15] transition-colors">Empresas</a>
              <a href="/como-funciona" className="text-[#F5F0E8]/60 hover:text-[#FACC15] transition-colors">Como Funciona</a>
            </div>
          </div>
          <div>
            <p className="font-black text-[#F97316] uppercase tracking-wider mb-4">Suporte</p>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[#F5F0E8]/60 hover:text-[#FACC15] transition-colors">FAQ</a>
              <a href="#" className="text-[#F5F0E8]/60 hover:text-[#FACC15] transition-colors">Contato</a>
              <a href="#" className="text-[#F5F0E8]/60 hover:text-[#FACC15] transition-colors">Termos</a>
            </div>
          </div>
          <div>
            <p className="font-black text-[#F97316] uppercase tracking-wider mb-4">Contacto</p>
            <p className="text-[#F5F0E8]/60 leading-relaxed">Luanda, Angola<br />info@salo.ao<br />+244 900 000 000</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#FACC15]/10 text-center">
          <p className="text-[#F5F0E8]/40 text-sm">&copy; 2026 SALO. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
