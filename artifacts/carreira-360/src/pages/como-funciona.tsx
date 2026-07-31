import { useState } from 'react';
import { Link } from 'wouter';

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
  { feature: 'Tempo médio de busca', traditional: '3-6 meses', talentos: '2-4 semanas' },
  { feature: 'Acesso a vagas', traditional: 'Limitado', talentos: 'Centenas de vagas' },
  { feature: 'Custo', traditional: 'Agências caras', talentos: 'Gratuito para candidatos' },
  { feature: 'Transparência', traditional: 'Baixa', talentos: 'Alta - acompanhe tudo' },
  { feature: 'Feedback', traditional: 'Raro', talentos: 'Sempre' },
];

const faqs = [
  { q: 'O TALENTOS é gratuito?', a: 'Sim! Para candidatos, o TALENTOS é 100% gratuito. Empresas pagam planos a partir de 150 000 Kz/mês.' },
  { q: 'Preciso ter experiência para me candidatar?', a: 'Não. Temos vagas para todos os níveis, desde estágios até posições de liderança.' },
  { q: 'Como recebo notificações de vagas?', a: 'Configure suas preferências de busca e receba alertas por email e notificações push.' },
  { q: 'As empresas são verificadas?', a: 'Sim. Todas as empresas passam por um processo de verificação antes de publicar vagas.' },
  { q: 'Posso editar meu perfil depois de criar?', a: 'Sim. Seu perfil pode ser atualizado a qualquer momento para refletir sua experiência atual.' },
];

export default function ComoFunciona() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#13293D] text-[#E8F1F2] font-display">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#13293D]/90 backdrop-blur-sm border-b border-[#1B98E0]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl font-black tracking-tighter text-[#1B98E0]">TALENTOS</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/vagas" className="text-[#E8F1F2] hover:text-[#1B98E0] transition-colors font-medium">Vagas</Link>
            <Link href="/empresas" className="text-[#E8F1F2] hover:text-[#1B98E0] transition-colors font-medium">Empresas</Link>
            <Link href="/como-funciona" className="text-[#1B98E0] font-bold border-b-2 border-[#1B98E0]">Como Funciona</Link>
            <Link href="/login" className="text-[#E8F1F2] hover:text-[#1B98E0] transition-colors font-medium">Entrar</Link>
            <Link href="/cadastro" className="bg-[#1B98E0] text-[#13293D] px-6 py-3 font-black uppercase tracking-wider hover:bg-[#247BA0] hover:text-[#E8F1F2] transition-colors">Começar</Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#1B98E0] text-2xl font-black">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#13293D] border-t border-[#1B98E0]/20 px-6 py-4 flex flex-col gap-4">
            <Link href="/vagas" className="text-[#E8F1F2] font-medium">Vagas</Link>
            <Link href="/empresas" className="text-[#E8F1F2] font-medium">Empresas</Link>
            <Link href="/como-funciona" className="text-[#1B98E0] font-bold">Como Funciona</Link>
            <Link href="/login" className="text-[#E8F1F2] font-medium">Entrar</Link>
            <Link href="/cadastro" className="bg-[#1B98E0] text-[#13293D] px-6 py-3 font-black uppercase tracking-wider text-center">Começar</Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-24">
        <div className="relative h-[300px] sm:h-[500px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80" alt="Team collaboration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13293D] via-[#13293D]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6">
            <p className="text-[#1B98E0] uppercase tracking-[0.3em] font-bold text-sm mb-4">Como Funciona</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-center leading-[0.9] mb-6">
              Seu Caminho para a<br /><span className="text-[#1B98E0]">Próxima Carreira</span>
            </h1>
            <p className="text-[#E8F1F2]/70 text-lg max-w-xl text-center mb-8">Em 5 passos simples, do perfil à contratação.</p>
            <a href="#steps" className="bg-[#247BA0] text-[#E8F1F2] px-10 py-4 font-black uppercase tracking-wider text-lg hover:bg-[#1B98E0] hover:text-[#13293D] transition-colors">Ver Passos</a>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#247BA0] uppercase tracking-[0.3em] font-bold text-sm mb-4">Processo</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">5 passos para<br /><span className="text-[#1B98E0]">sua nova carreira</span></h2>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-8 border-2 border-[#1B98E0]/20 p-8 hover:border-[#1B98E0] transition-colors">
                <div className="flex-1">
                  <span className="text-6xl font-black text-[#247BA0]/30">{step.num}</span>
                  <h3 className="text-2xl font-black text-[#1B98E0] uppercase mt-2 mb-4">{step.title}</h3>
                  <p className="text-[#E8F1F2]/70 leading-relaxed text-lg">{step.desc}</p>
                </div>
                <div className="w-full md:w-80 h-56 overflow-hidden border-2 border-[#1B98E0]/30 flex-shrink-0">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-6 bg-[#13293D]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#247BA0] uppercase tracking-[0.3em] font-bold text-sm mb-4">Comparação</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">TALENTOS vs<br /><span className="text-[#1B98E0]">Método Tradicional</span></h2>
          <div className="border-2 border-[#1B98E0]/30 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-3 min-w-[600px] bg-[#1B98E0]/10 border-b-2 border-[#1B98E0]/30">
                <div className="p-4 font-black text-[#1B98E0] uppercase text-sm">Funcionalidade</div>
                <div className="p-4 font-black text-[#E8F1F2]/60 uppercase text-sm text-center">Tradicional</div>
                <div className="p-4 font-black text-[#1B98E0] uppercase text-sm text-center">TALENTOS</div>
              </div>
              {comparisons.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 min-w-[600px] ${i % 2 === 0 ? 'bg-[#13293D]' : 'bg-[#1B98E0]/5'} border-b border-[#1B98E0]/10`}>
                  <div className="p-4 text-[#E8F1F2]/80 font-medium">{row.feature}</div>
                  <div className="p-4 text-[#E8F1F2]/50 text-center">{row.traditional}</div>
                  <div className="p-4 text-[#1B98E0] font-bold text-center">{row.talentos}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#247BA0] uppercase tracking-[0.3em] font-bold text-sm mb-4">Dúvidas</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">Perguntas<br /><span className="text-[#1B98E0]">Frequentes</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-2 border-[#1B98E0]/20">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[#1B98E0]/5 transition-colors"
                >
                  <span className="font-black text-lg text-[#E8F1F2]">{faq.q}</span>
                  <span className={`text-[#1B98E0] text-2xl font-black transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 border-t border-[#1B98E0]/10 pt-4">
                    <p className="text-[#E8F1F2]/70 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-[#1B98E0]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black text-[#13293D] mb-6 leading-tight">Pronto para<br />começar?</h2>
            <p className="text-[#13293D]/70 text-lg mb-8 max-w-md">Crie seu perfil agora e dê o primeiro passo para sua próxima oportunidade profissional.</p>
            <Link href="/cadastro" className="inline-block bg-[#13293D] text-[#1B98E0] px-6 sm:px-12 py-3 sm:py-5 font-black uppercase tracking-wider text-base sm:text-lg hover:bg-[#247BA0] hover:text-[#E8F1F2] transition-colors">Começar Agora</Link>
          </div>
          <div className="w-full md:w-96 h-72 overflow-hidden border-4 border-[#13293D]">
            <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80" alt="CTA" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#13293D] border-t border-[#1B98E0]/20 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <p className="text-3xl font-black text-[#1B98E0] mb-4">TALENTOS</p>
            <p className="text-[#E8F1F2]/60 leading-relaxed">A plataforma de emprego que conecta talentos angolanos às melhores oportunidades.</p>
          </div>
          <div>
            <p className="font-black text-[#247BA0] uppercase tracking-wider mb-4">Plataforma</p>
            <div className="flex flex-col gap-2">
              <Link href="/vagas" className="text-[#E8F1F2]/60 hover:text-[#1B98E0] transition-colors">Vagas</Link>
              <Link href="/empresas" className="text-[#E8F1F2]/60 hover:text-[#1B98E0] transition-colors">Empresas</Link>
              <Link href="/como-funciona" className="text-[#E8F1F2]/60 hover:text-[#1B98E0] transition-colors">Como Funciona</Link>
            </div>
          </div>
          <div>
            <p className="font-black text-[#247BA0] uppercase tracking-wider mb-4">Suporte</p>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-[#E8F1F2]/60 hover:text-[#1B98E0] transition-colors">FAQ</a>
              <a href="#" className="text-[#E8F1F2]/60 hover:text-[#1B98E0] transition-colors">Contato</a>
              <a href="#" className="text-[#E8F1F2]/60 hover:text-[#1B98E0] transition-colors">Termos</a>
            </div>
          </div>
          <div>
            <p className="font-black text-[#247BA0] uppercase tracking-wider mb-4">Contacto</p>
            <p className="text-[#E8F1F2]/60 leading-relaxed">Luanda, Angola<br />info@talentos.ao<br />+244 900 000 000</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#1B98E0]/10 text-center">
          <p className="text-[#E8F1F2]/40 text-sm">&copy; 2026 TALENTOS. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
