import { useState } from 'react';
import { Link } from 'wouter';
import { Search, BarChart3, Building2, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    price: '150 000',
    period: 'Kz/mês',
    features: ['10 buscas/mês', '50 candidatos', 'Perfil básico da empresa', 'Suporte por email'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    accent: 'border-[#1B98E0]',
    popular: false,
  },
  {
    name: 'Profissional',
    price: '350 000',
    period: 'Kz/mês',
    features: ['Buscas ilimitadas', '200 candidatos', 'Analytics avançado', 'Perfil destacado', 'Suporte prioritário'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    accent: 'border-[#247BA0]',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '750 000',
    period: 'Kz/mês',
    features: ['Tudo do Profissional', 'Candidatos ilimitados', 'API dedicada', 'Suporte 24/7', 'Integração customizada', 'Account manager'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    accent: 'border-[#1B98E0]',
    popular: false,
  },
];

const features = [
  { title: 'Busca de Talentos', desc: 'Encontre profissionais qualificados com filtros avançados.', icon: Search },
  { title: 'Analytics', desc: 'Acompanhe métricas de suas vagas e candidatos em tempo real.', icon: BarChart3 },
  { title: 'Marca Empregadora', desc: 'Destaque sua empresa e atraia os melhores candidatos.', icon: Building2 },
  { title: 'API Dedicada', desc: 'Integre o TALENTOS diretamente nos seus sistemas internos.', icon: Zap },
];

export default function Empresas() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#13293D] text-[#E8F1F2] font-display">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#13293D]/90 backdrop-blur-sm border-b border-[#1B98E0]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl font-black tracking-tighter text-[#1B98E0]">TALENTOS</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/vagas" className="text-[#E8F1F2] hover:text-[#1B98E0] transition-colors font-medium">Vagas</Link>
            <Link href="/empresas" className="text-[#1B98E0] font-bold border-b-2 border-[#1B98E0]">Empresas</Link>
            <Link href="/como-funciona" className="text-[#E8F1F2] hover:text-[#1B98E0] transition-colors font-medium">Como Funciona</Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#1B98E0] text-2xl font-black">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#13293D] border-t border-[#1B98E0]/20 px-6 py-4 flex flex-col gap-4">
            <Link href="/vagas" className="text-[#E8F1F2] font-medium">Vagas</Link>
            <Link href="/empresas" className="text-[#1B98E0] font-bold">Empresas</Link>
            <Link href="/como-funciona" className="text-[#E8F1F2] font-medium">Como Funciona</Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-24">
        <div className="relative h-[300px] sm:h-[500px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80" alt="Modern office" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13293D] via-[#13293D]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6">
            <p className="text-[#1B98E0] uppercase tracking-[0.3em] font-bold text-sm mb-4">Para Empresas</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-center leading-[0.9] mb-6">
              Encontre os Melhores<br /><span className="text-[#1B98E0]">Talentos de Angola</span>
            </h1>
            <a href="#pricing" className="bg-[#247BA0] text-[#E8F1F2] px-10 py-4 font-black uppercase tracking-wider text-lg hover:bg-[#1B98E0] hover:text-[#13293D] transition-colors">Começar Agora</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#247BA0] uppercase tracking-[0.3em] font-bold text-sm mb-4">Recursos</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">Tudo que sua empresa<br /><span className="text-[#1B98E0]">precisa</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="border-2 border-[#1B98E0]/30 p-8 hover:border-[#1B98E0] transition-colors group">
                  <Icon size={32} className="text-[#1B98E0] mb-4" />
                  <h3 className="text-xl font-black text-[#1B98E0] mb-3 uppercase">{f.title}</h3>
                  <p className="text-[#E8F1F2]/70 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#13293D]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#247BA0] uppercase tracking-[0.3em] font-bold text-sm mb-4">Planos</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16 leading-tight">Escolha o plano<br /><span className="text-[#1B98E0]">ideal</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div key={i} className={`border-2 ${plan.accent} relative overflow-hidden ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}>
                {plan.popular && (
                  <div className="bg-[#247BA0] text-[#E8F1F2] text-center py-2 font-black uppercase tracking-wider text-sm">Mais Popular</div>
                )}
                <div className="h-48 overflow-hidden">
                  <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-[#1B98E0] uppercase mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-black">{plan.price}</span>
                    <span className="text-[#E8F1F2]/60 ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <span className="text-[#1B98E0] font-bold">→</span>
                        <span className="text-[#E8F1F2]/80">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/cadastro" className={`block text-center py-4 font-black uppercase tracking-wider transition-colors ${plan.popular ? 'bg-[#247BA0] text-[#E8F1F2] hover:bg-[#1B98E0] hover:text-[#13293D]' : 'border-2 border-[#1B98E0] text-[#1B98E0] hover:bg-[#1B98E0] hover:text-[#13293D]'}`}>Começar Agora</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#1B98E0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#13293D] mb-6 leading-tight">Pronto para encontrar<br />os melhores talentos?</h2>
          <p className="text-[#13293D]/70 text-lg mb-10 max-w-xl mx-auto">Junte-se a centenas de empresas que já usam o TALENTOS para contratar profissionais excepcionais.</p>
          <Link href="/cadastro" className="inline-block bg-[#13293D] text-[#1B98E0] px-6 sm:px-12 py-3 sm:py-5 font-black uppercase tracking-wider text-base sm:text-lg hover:bg-[#247BA0] hover:text-[#E8F1F2] transition-colors">Começar Agora</Link>
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
