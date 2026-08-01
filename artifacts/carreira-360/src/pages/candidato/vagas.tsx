import { useState } from "react";
import { Search, MapPin, Sparkles, Brain, Zap, Loader2, CheckCircle, XCircle, BookOpen, ExternalLink } from "lucide-react";
import { useHasCv } from "@/hooks/use-has-cv";
import { apiFetch } from "@/lib/auth";

export function linkedInSearchUrl(title: string, company: string): string {
  return `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(title + " " + company)}&location=Angola&geoUrn=100379283&f_TPR=r604800`;
}

const companyCareerUrls: Record<string, string> = {
  "Unitel": "https://www.unitel.ao/empresas",
  "Banco BFA": "https://www.bfa.ao/carreiras",
  "Banco BAI": "https://www.bancobai.ao/pt/carreiras",
  "Banco BIC": "https://www.bancobic.ao/carreiras",
  "Access Bank Angola": "https://www.accessbankplc.com/careers",
  "Sonangol": "https://www.sonangol.co.ao/carreiras",
  "Sonangol P&P": "https://www.sonangol.co.ao/carreiras",
  "Chevron Angola": "https://careers.chevron.com/",
  "TotalEnergies": "https://www.totalenergies.com/en/careers",
  "BP Angola": "https://www.bp.com/en_ao/careers.html",
  "Angola Telecom": "https://www.angolatelecom.ao",
  "Movicel": "https://www.movicel.ao",
  "Grupo Mota-Engil": "https://www.mota-engil.pt/en/careers",
  "Odebrecht Angola": "https://www.notredameintermed.com/careers",
  "NVS Energy": "https://www.nvsenergy.com",
  "Endiama": "https://www.endiama.co.ao",
  "iGrow": "https://www.linkedin.com/jobs/search/?keywords=iGrow+Angola",
  "AfriTech": "https://www.linkedin.com/jobs/search/?keywords=AfriTech+Angola",
  "Multichoice Angola": "https://www.multichoice.com/careers/",
  "Hospital da Luz": "https://www.hospitaldaluz.pt/angola",
  "Clínica Girassol": "https://www.linkedin.com/jobs/search/?keywords=Clinica+Girassol+Luanda",
  "Grupo Zahara": "https://www.linkedin.com/jobs/search/?keywords=Grupo+Zahara+Angola",
  "Grupo Nzerembwe": "https://www.linkedin.com/jobs/search/?keywords=Grupo+Nzerembwe",
  "STA Seguros": "https://www.linkedin.com/jobs/search/?keywords=STA+Seguros+Angola",
  "Webmasters": "https://www.linkedin.com/jobs/search/?keywords=Webmasters+Angola",
  "PEP Angola": "https://www.pepstores.com/careers",
  "Nelt Angola": "https://www.nelt.co.rs/en/careers/",
  "Kero Supermercado": "https://www.kero.ao/carreiras",
  "Coca-Cola Angola": "https://www.coca-colacompany.com/careers",
  "CNI": "https://www.linkedin.com/jobs/search/?keywords=CNI+Angola",
  "CNI Centro de Negócios": "https://www.linkedin.com/jobs/search/?keywords=CNI+Centro+de+Negocios",
  "Training Key": "https://www.linkedin.com/jobs/search/?keywords=Training+Key+Angola",
  "Reis International": "https://www.linkedin.com/jobs/search/?keywords=Reis+International+Angola",
  "Reis International School": "https://www.linkedin.com/jobs/search/?keywords=Reis+International+School",
  "Twala Technology": "https://www.linkedin.com/jobs/search/?keywords=Twala+Technology+Angola",
  "Mitrelli": "https://www.mitrelli.com/careers",
  "Teixeira Duarte": "https://www.teixeiraduarte.com/en/careers",
  "Lancet Angola": "https://www.lancet.co.za/careers",
  "Expertise France": "https://www.expertisefrance.fr/en/careers",
  "ISPOCA": "https://www.linkedin.com/jobs/search/?keywords=ISPOCA+Angola",
  "TPA": "https://www.tpa.ao",
  "TV Zimbo": "https://www.tvzimbo.ao",
  "Quinta de Jugais": "https://www.linkedin.com/jobs/search/?keywords=Quinta+de+Jugais",
  "Don Gal Hotel": "https://www.linkedin.com/jobs/search/?keywords=Don+Gal+Hotel+Luanda",
  "Hotel Epicur": "https://www.linkedin.com/jobs/search/?keywords=Hotel+Epicur+Luanda",
  "Talatona Convention": "https://www.linkedin.com/jobs/search/?keywords=Talatona+Convention+Luanda",
  "Hotel Infotur": "https://www.linkedin.com/jobs/search/?keywords=Hotel+Infotur+Lubango",
  "Chivava Beach Hotel": "https://www.linkedin.com/jobs/search/?keywords=Chivava+Beach+Hotel",
  "Hotel Kito": "https://www.linkedin.com/jobs/search/?keywords=Hotel+Kito+Huambo",
  "Farmácia Modelo": "https://www.linkedin.com/jobs/search/?keywords=Farmacia+Modelo+Angola",
  "Farmácia Central": "https://www.linkedin.com/jobs/search/?keywords=Farmacia+Central+Lubango",
  "HRM Consulting": "https://www.linkedin.com/jobs/search/?keywords=HRM+Consulting+Angola",
  "Universidade Católica de Angola": "https://www.ucan.ao",
  "MM Oliveira": "https://www.linkedin.com/jobs/search/?keywords=MM+Oliveira+Angola",
  "WSTP": "https://www.linkedin.com/jobs/search/?keywords=WSTP+Angola",
  "Kept People": "https://www.linkedin.com/jobs/search/?keywords=Kept+People+Angola",
  "CRHESCER": "https://www.linkedin.com/jobs/search/?keywords=CRHESCER+Angola",
  "Transpt": "https://www.linkedin.com/jobs/search/?keywords=Transpt+Angola",
  "Novagest": "https://www.linkedin.com/jobs/search/?keywords=Novagest+Angola",
  "ACQUA Global": "https://www.linkedin.com/jobs/search/?keywords=ACQUA+Global+Angola",
  "Escola Camilo Castelo Branco": "https://www.linkedin.com/jobs/search/?keywords=Escola+Camilo+Castelo+Branco",
  "Liceu Kakulo": "https://www.linkedin.com/jobs/search/?keywords=Liceu+Kakulo+Benguela",
  "Liceu Municipal": "https://www.linkedin.com/jobs/search/?keywords=Liceu+Municipal+Huambo",
};

export function getJobUrl(title: string, company: string): string {
  return companyCareerUrls[company] || linkedInSearchUrl(title, company);
}

export const allJobs = [
  // TECNOLOGIA
  { id: 1, title: "Engenheiro de Software Sénior", company: "Unitel", location: "Luanda", type: "Híbrido", category: "Tecnologia", salary: "350 000 – 500 000 Kz", skills: ["React", "Node.js", "PostgreSQL"], featured: true, logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80" },
  { id: 2, title: "Analista de Dados", company: "Banco BFA", location: "Luanda", type: "Híbrido", category: "Tecnologia", salary: "280 000 – 380 000 Kz", skills: ["Python", "SQL", "Power BI"], featured: false, logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=100&q=80" },
  { id: 4, title: "Designer de Produto", company: "AfriTech", location: "Luanda", type: "Remoto", category: "Tecnologia", salary: "220 000 – 320 000 Kz", skills: ["Figma", "UX Research", "Design System"], featured: false, logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80" },
  { id: 9, title: "Arquitecto de Software", company: "iGrow", location: "Luanda", type: "Remoto", category: "Tecnologia", salary: "450 000 – 650 000 Kz", skills: ["AWS", "Microserviços", "Golang"], featured: true, logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80" },
  { id: 30, title: "Gestor de TI", company: "Webmasters", location: "Luanda", type: "Presencial", category: "Tecnologia", salary: "300 000 – 450 000 Kz", skills: ["Gestão de TI", "Cloud", "Infraestrutura"], featured: false, logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=100&q=80" },
  { id: 32, title: "Desenvolvedor Full Stack", company: "Unitel", location: "Luanda", type: "Híbrido", category: "Tecnologia", salary: "280 000 – 400 000 Kz", skills: ["React", "Node.js", "TypeScript"], featured: false, logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80" },
  { id: 33, title: "Especialista em Cibersegurança", company: "Banco BAI", location: "Luanda", type: "Presencial", category: "Tecnologia", salary: "350 000 – 500 000 Kz", skills: ["Cibersegurança", "Firewall", "Auditoria"], featured: true, logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=100&q=80" },
  { id: 300, title: "Técnico de Informática", company: "Universidade Católica de Angola", location: "Luanda", type: "Presencial", category: "Tecnologia", salary: "200 000 – 300 000 Kz", skills: ["Redes", "Suporte", "Windows Server"], featured: false, logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=100&q=80" },
  { id: 301, title: "DevOps Engineer", company: "iGrow", location: "Luanda", type: "Remoto", category: "Tecnologia", salary: "350 000 – 500 000 Kz", skills: ["Docker", "Kubernetes", "CI/CD"], featured: true, logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=100&q=80" },
  { id: 302, title: "Técnico de Redes", company: "Unitel", location: "Benguela", type: "Presencial", category: "Tecnologia", salary: "200 000 – 280 000 Kz", skills: ["Redes", "Cisco", "4G"], featured: false, logo: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=100&q=80" },
  { id: 303, title: "Suporte Técnico", company: "Angola Telecom", location: "Huambo", type: "Presencial", category: "Tecnologia", salary: "150 000 – 220 000 Kz", skills: ["Suporte", "Redes", "Telecomunicações"], featured: false, logo: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=100&q=80" },

  // FINANÇAS
  { id: 8, title: "Gestor Financeiro", company: "Grupo Zahara", location: "Luanda", type: "Presencial", category: "Finanças", salary: "500 000 – 700 000 Kz", skills: ["IFRS", "Controlo de Gestão", "Excel"], featured: false, logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80" },
  { id: 34, title: "Contabilista Sénior", company: "Grupo Nzerembwe", location: "Luanda", type: "Presencial", category: "Finanças", salary: "250 000 – 350 000 Kz", skills: ["Contabilidade", "Saft", "IGAC"], featured: false, logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80" },
  { id: 35, title: "Técnico de Reconciliações", company: "Access Bank Angola", location: "Luanda", type: "Presencial", category: "Finanças", salary: "280 000 – 380 000 Kz", skills: ["Reconciliação Bancária", "IFRS", "Excel"], featured: false, logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=100&q=80" },
  { id: 36, title: "Diretor Financeiro", company: "Transpt", location: "Luanda", type: "Híbrido", category: "Finanças", salary: "800 000 – 1 200 000 Kz", skills: ["CFO", "IFRS", "Gestão Financeira"], featured: true, logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80" },
  { id: 37, title: "Analista Financeiro", company: "Banco BIC", location: "Luanda", type: "Presencial", category: "Finanças", salary: "200 000 – 300 000 Kz", skills: ["Análise Financeira", "Power BI", "SQL"], featured: false, logo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=100&q=80" },
  { id: 38, title: "Técnico de Auditoria", company: "STA Seguros", location: "Luanda", type: "Presencial", category: "Finanças", salary: "300 000 – 420 000 Kz", skills: ["Auditoria Interna", "Controlo Interno", "COSO"], featured: false, logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80" },
  { id: 340, title: "Contabilista", company: "Banco BAI", location: "Benguela", type: "Presencial", category: "Finanças", salary: "180 000 – 260 000 Kz", skills: ["Contabilidade", "Saft", "Excel"], featured: false, logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80" },
  { id: 341, title: "Caixa Bancário", company: "Banco BIC", location: "Huambo", type: "Presencial", category: "Finanças", salary: "120 000 – 180 000 Kz", skills: ["Caixa", "Atendimento", "Banca"], featured: false, logo: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=100&q=80" },
  { id: 342, title: "Gestor de Contas", company: "Access Bank Angola", location: "Lubango", type: "Presencial", category: "Finanças", salary: "220 000 – 320 000 Kz", skills: ["Gestão de Contas", "Banca", "Vendas"], featured: false, logo: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=100&q=80" },
  { id: 343, title: "Técnico Financeiro", company: "Sonangol", location: "Soyo", type: "Presencial", category: "Finanças", salary: "250 000 – 350 000 Kz", skills: ["Finanças", "IFRS", "Controlo"], featured: false, logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=100&q=80" },

  // CONSTRUÇÃO
  { id: 3, title: "Gestor de Projecto", company: "Odebrecht Angola", location: "Cabinda", type: "Presencial", category: "Construção", salary: "400 000 – 600 000 Kz", skills: ["PMP", "MS Project", "Liderança"], featured: true, logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=100&q=80" },
  { id: 39, title: "Engenheiro Civil", company: "MM Oliveira", location: "Luanda", type: "Presencial", category: "Construção", salary: "350 000 – 500 000 Kz", skills: ["Engenharia Civil", "AutoCAD", "Orçamento"], featured: false, logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=100&q=80" },
  { id: 40, title: "Encarregado de Obra", company: "WSTP", location: "Luanda", type: "Presencial", category: "Construção", salary: "200 000 – 300 000 Kz", skills: ["Gestão de Obra", "HSE", "Construção Civil"], featured: false, logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=100&q=80" },
  { id: 41, title: "Diretor Geral Construção", company: "Kept People", location: "Luanda", type: "Presencial", category: "Construção", salary: "600 000 – 900 000 Kz", skills: ["Liderança", "Infraestruturas", "Gestão"], featured: true, logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=100&q=80" },
  { id: 42, title: "Enfermeiro de Obra", company: "Grupo Mota-Engil", location: "Luanda", type: "Presencial", category: "Construção", salary: "180 000 – 250 000 Kz", skills: ["Enfermagem", "Primeiros Socorros", "HSE"], featured: false, logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=100&q=80" },
  { id: 390, title: "Engenheiro Civil Sénior", company: "Grupo Mota-Engil", location: "Benguela", type: "Presencial", category: "Construção", salary: "400 000 – 550 000 Kz", skills: ["Engenharia Civil", "AutoCAD", "Gestão de Obra"], featured: false, logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=100&q=80" },
  { id: 391, title: "Técnico de Construção", company: "Odebrecht Angola", location: "Cabinda", type: "Presencial", category: "Construção", salary: "200 000 – 300 000 Kz", skills: ["Construção Civil", "Topografia", "AutoCAD"], featured: false, logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=100&q=80" },
  { id: 392, title: "Mestre de Obras", company: "Endiama", location: "Lunda Norte", type: "Presencial", category: "Construção", salary: "180 000 – 280 000 Kz", skills: ["Construção Civil", "Liderança", "Materiais"], featured: false, logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=100&q=80" },
  { id: 393, title: "Topógrafo", company: "Empresa de Obras", location: "Huambo", type: "Presencial", category: "Construção", salary: "180 000 – 260 000 Kz", skills: ["Topografia", "GPS", "AutoCAD"], featured: false, logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=100&q=80" },

  // PETRÓLEO & GÁS
  { id: 5, title: "Engenheiro Petrolífero", company: "Sonangol", location: "Soyo", type: "Presencial", category: "Petróleo & Gás", salary: "800 000 – 1 200 000 Kz", skills: ["Reservoir Eng.", "Drilling", "HSE"], featured: true, logo: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=100&q=80" },
  { id: 43, title: "Técnico Operações Offshore", company: "Chevron Angola", location: "Cabinda", type: "Presencial", category: "Petróleo & Gás", salary: "500 000 – 750 000 Kz", skills: ["Offshore", "Drilling", "HSE"], featured: false, logo: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=100&q=80" },
  { id: 44, title: "Engenheiro de Produção", company: "TotalEnergies", location: "Luanda", type: "Presencial", category: "Petróleo & Gás", salary: "600 000 – 900 000 Kz", skills: ["Produção", "Engenharia", "HSE"], featured: true, logo: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=100&q=80" },
  { id: 45, title: "Assistente de Logística", company: "NVS Energy", location: "Luanda", type: "Presencial", category: "Petróleo & Gás", salary: "200 000 – 280 000 Kz", skills: ["Logística", "Armazém", "Fornecimento"], featured: false, logo: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=100&q=80" },
  { id: 430, title: "Técnico de Perfuração", company: "Sonangol P&P", location: "Soyo", type: "Presencial", category: "Petróleo & Gás", salary: "350 000 – 500 000 Kz", skills: ["Perfuração", "Drilling", "HSE"], featured: false, logo: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=100&q=80" },
  { id: 431, title: "Engenheiro de Reservatórios", company: "BP Angola", location: "Luanda", type: "Presencial", category: "Petróleo & Gás", salary: "700 000 – 1 000 000 Kz", skills: ["Reservatórios", "Simulação", "Geologia"], featured: false, logo: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=100&q=80" },

  // TELECOMUNICAÇÕES
  { id: 6, title: "Especialista Telecomunicações", company: "Angola Telecom", location: "Huambo", type: "Presencial", category: "Telecomunicações", salary: "300 000 – 420 000 Kz", skills: ["Redes 5G", "Fibra Óptica", "VoIP"], featured: false, logo: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=100&q=80" },
  { id: 47, title: "Engenheiro Telecomunicações", company: "Movicel", location: "Luanda", type: "Presencial", category: "Telecomunicações", salary: "300 000 – 450 000 Kz", skills: ["Telecomunicações", "Radiofrequência", "Engenharia"], featured: false, logo: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=100&q=80" },
  { id: 470, title: "Técnico de Fibra Óptica", company: "Angola Telecom", location: "Lubango", type: "Presencial", category: "Telecomunicações", salary: "180 000 – 260 000 Kz", skills: ["Fibra Óptica", "Redes", "Instalação"], featured: false, logo: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=100&q=80" },
  { id: 471, title: "Técnico de Telecomunicações", company: "Unitel", location: "Benguela", type: "Presencial", category: "Telecomunicações", salary: "200 000 – 280 000 Kz", skills: ["Redes", "Antenas", "4G"], featured: false, logo: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=100&q=80" },

  // MEDIA & MARKETING
  { id: 7, title: "Resp. Marketing Digital", company: "Multichoice Angola", location: "Luanda", type: "Híbrido", category: "Media", salary: "240 000 – 340 000 Kz", skills: ["SEO", "Meta Ads", "Conteúdo"], featured: false, logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80" },
  { id: 48, title: "Gestor Marketing Digital", company: "Twala Technology", location: "Luanda", type: "Presencial", category: "Media", salary: "200 000 – 300 000 Kz", skills: ["Marketing Digital", "Google Ads", "Analytics"], featured: false, logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80" },
  { id: 49, title: "Diretor de Marketing", company: "Quinta de Jugais", location: "Icolo e Bengo", type: "Presencial", category: "Media", salary: "350 000 – 500 000 Kz", skills: ["Direção", "Branding", "Estratégia"], featured: true, logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80" },
  { id: 50, title: "Resp. Redes Sociais", company: "Quinta de Jugais", location: "Luanda", type: "Presencial", category: "Media", salary: "150 000 – 220 000 Kz", skills: ["Redes Sociais", "Conteúdo", "Community"], featured: false, logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80" },
  { id: 51, title: "Fotógrafo", company: "Quinta de Jugais", location: "Luanda", type: "Presencial", category: "Media", salary: "150 000 – 220 000 Kz", skills: ["Fotografia", "Edição", "Lightroom"], featured: false, logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80" },
  { id: 480, title: "Jornalista", company: "TPA", location: "Luanda", type: "Presencial", category: "Media", salary: "180 000 – 260 000 Kz", skills: ["Jornalismo", "Comunicação", "Redação"], featured: false, logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80" },
  { id: 481, title: "Apresentador de TV", company: "TV Zimbo", location: "Luanda", type: "Presencial", category: "Media", salary: "300 000 – 450 000 Kz", skills: ["Apresentação", "Comunicação", "Mídia"], featured: false, logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80" },

  // SAÚDE
  { id: 52, title: "Enfermeiro(a) Geral", company: "Hospital da Luz", location: "Luanda", type: "Presencial", category: "Saúde", salary: "180 000 – 280 000 Kz", skills: ["Enfermagem", "Cuidados Gerais", "Triagem"], featured: false, logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=100&q=80" },
  { id: 53, title: "Médico(a) Generalista", company: "Clínica Girassol", location: "Luanda", type: "Presencial", category: "Saúde", salary: "500 000 – 800 000 Kz", skills: ["Medicina Geral", "Diagnóstico", "Clínica"], featured: true, logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=100&q=80" },
  { id: 54, title: "Farmacêutico(a)", company: "Farmácia Modelo", location: "Luanda", type: "Presencial", category: "Saúde", salary: "200 000 – 300 000 Kz", skills: ["Farmácia", "Dispensação", "Saúde Pública"], featured: false, logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=100&q=80" },
  { id: 55, title: "Técnico de Laboratório", company: "Lancet Angola", location: "Luanda", type: "Presencial", category: "Saúde", salary: "180 000 – 250 000 Kz", skills: ["Laboratório", "Análises Clínicas", "Bioquímica"], featured: false, logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=100&q=80" },
  { id: 520, title: "Enfermeiro(a)", company: "Hospital Provincial de Benguela", location: "Benguela", type: "Presencial", category: "Saúde", salary: "150 000 – 220 000 Kz", skills: ["Enfermagem", "Triagem", "Urgências"], featured: false, logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=100&q=80" },
  { id: 521, title: "Médico(a)", company: "Hospital Central do Huambo", location: "Huambo", type: "Presencial", category: "Saúde", salary: "350 000 – 500 000 Kz", skills: ["Medicina", "Clínica Geral", "Urgências"], featured: false, logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=100&q=80" },
  { id: 522, title: "Técnico de Enfermagem", company: "Hospital da Catumbela", location: "Benguela", type: "Presencial", category: "Saúde", salary: "120 000 – 180 000 Kz", skills: ["Enfermagem", "Cuidados", "Saneamento"], featured: false, logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=100&q=80" },
  { id: 523, title: "Farmacêutico(a)", company: "Farmácia Central", location: "Lubango", type: "Presencial", category: "Saúde", salary: "180 000 – 250 000 Kz", skills: ["Farmácia", "Dispensação", "Medicamentos"], featured: false, logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=100&q=80" },

  // EDUCAÇÃO
  { id: 56, title: "Professor(a) de Informática", company: "ISPOCA", location: "Luanda", type: "Presencial", category: "Educação", salary: "200 000 – 300 000 Kz", skills: ["Informática", "Ensino", "Programação"], featured: false, logo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=100&q=80" },
  { id: 57, title: "Formador(a) Profissional", company: "Training Key", location: "Luanda", type: "Presencial", category: "Educação", salary: "180 000 – 280 000 Kz", skills: ["Formação", "Ensino", "Competências"], featured: false, logo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=100&q=80" },
  { id: 58, title: "Coordenador(a) Pedagógico(a)", company: "Reis International", location: "Luanda", type: "Presencial", category: "Educação", salary: "250 000 – 350 000 Kz", skills: ["Coordenação", "Gestão Escolar", "Ensino"], featured: false, logo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=100&q=80" },
  { id: 560, title: "Professor(a) de Matemática", company: "Escola Camilo Castelo Branco", location: "Luanda", type: "Presencial", category: "Educação", salary: "150 000 – 220 000 Kz", skills: ["Matemática", "Ensino", "Didática"], featured: false, logo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=100&q=80" },
  { id: 561, title: "Professor(a) de Português", company: "Liceu Kakulo", location: "Benguela", type: "Presencial", category: "Educação", salary: "150 000 – 220 000 Kz", skills: ["Português", "Ensino", "Linguística"], featured: false, logo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=100&q=80" },
  { id: 562, title: "Professor(a) de Inglês", company: "Reis International School", location: "Luanda", type: "Presencial", category: "Educação", salary: "180 000 – 280 000 Kz", skills: ["Inglês", "Ensino", "ESL"], featured: false, logo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=100&q=80" },
  { id: 563, title: "Professor(a) de Ciências", company: "Liceu Municipal", location: "Huambo", type: "Presencial", category: "Educação", salary: "140 000 – 200 000 Kz", skills: ["Ciências", "Ensino", "Biologia"], featured: false, logo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=100&q=80" },
  { id: 564, title: "Formador(a) de Informática", company: "CNI Centro de Negócios", location: "Luanda", type: "Contrato", category: "Educação", salary: "180 000 – 260 000 Kz", skills: ["Informática", "Formação", "Office"], featured: false, logo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=100&q=80" },

  // HOSPITALIDADE
  { id: 59, title: "Recepcionista de Hotel", company: "Don Gal Hotel", location: "Luanda", type: "Presencial", category: "Hotelaria", salary: "120 000 – 180 000 Kz", skills: ["Receção", "Hospitalidade", "Inglês"], featured: false, logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&q=80" },
  { id: 60, title: "Chef de Cozinha", company: "Hotel Epicur", location: "Luanda", type: "Presencial", category: "Hotelaria", salary: "250 000 – 400 000 Kz", skills: ["Culinária", "Gestão de Cozinha", "HACCP"], featured: false, logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&q=80" },
  { id: 61, title: "Gestor de Eventos", company: "Talatona Convention", location: "Luanda", type: "Presencial", category: "Hotelaria", salary: "280 000 – 400 000 Kz", skills: ["Eventos", "Logística", "Comunicação"], featured: false, logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&q=80" },
  { id: 590, title: "Recepcionista", company: "Hotel Infotur", location: "Lubango", type: "Presencial", category: "Hotelaria", salary: "100 000 – 150 000 Kz", skills: ["Receção", "Hospitalidade", "Atendimento"], featured: false, logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&q=80" },
  { id: 591, title: "Camareiro(a)", company: "Chivava Beach Hotel", location: "Benguela", type: "Presencial", category: "Hotelaria", salary: "80 000 – 120 000 Kz", skills: ["Restauração", "Atendimento", "Hospitalidade"], featured: false, logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&q=80" },
  { id: 592, title: "Gestor de Hotel", company: "Hotel Kito", location: "Huambo", type: "Presencial", category: "Hotelaria", salary: "250 000 – 380 000 Kz", skills: ["Gestão Hotel", "Liderança", "Receita"], featured: false, logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&q=80" },

  // LOGÍSTICA
  { id: 62, title: "Gestor de Logística", company: "Teixeira Duarte", location: "Luanda", type: "Presencial", category: "Logística", salary: "250 000 – 380 000 Kz", skills: ["Logística", "Cadeia de Abastecimento", "Armazém"], featured: false, logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80" },
  { id: 63, title: "Motorista Pesado", company: "HRM Consulting", location: "Luanda", type: "Presencial", category: "Logística", salary: "120 000 – 180 000 Kz", skills: ["Condução Pesada", "CNH", "Logística"], featured: false, logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80" },
  { id: 64, title: "Oficial de Logística", company: "Expertise France", location: "Luanda", type: "Contrato", category: "Logística", salary: "200 000 – 300 000 Kz", skills: ["Logística", "Compras", "Stock"], featured: false, logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80" },
  { id: 620, title: "Almoxarife", company: "Sonangol", location: "Soyo", type: "Presencial", category: "Logística", salary: "120 000 – 180 000 Kz", skills: ["Armazém", "Almoxarifado", "Stock"], featured: false, logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80" },
  { id: 621, title: "Motorista Leve", company: "Nelt Angola", location: "Benguela", type: "Presencial", category: "Logística", salary: "100 000 – 150 000 Kz", skills: ["Condução", "Distribuição", "CNH"], featured: false, logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80" },
  { id: 622, title: "Encarregado de Armazém", company: "Grupo Nzerembwe", location: "Huambo", type: "Presencial", category: "Logística", salary: "150 000 – 220 000 Kz", skills: ["Armazém", "Gestão de Stock", "Logística"], featured: false, logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80" },

  // COMÉRCIO
  { id: 65, title: "Gestor de Canal Grossista", company: "Nelt Angola", location: "Luanda", type: "Presencial", category: "Comércio", salary: "250 000 – 380 000 Kz", skills: ["FMCG", "Canais", "Vendas"], featured: false, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80" },
  { id: 67, title: "Gerente de Loja", company: "PEP Angola", location: "Benguela", type: "Presencial", category: "Comércio", salary: "200 000 – 300 000 Kz", skills: ["Gestão de Loja", "Retalho", "Liderança"], featured: false, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80" },
  { id: 670, title: "Gerente de Loja", company: "PEP Angola", location: "Uíge", type: "Presencial", category: "Comércio", salary: "180 000 – 260 000 Kz", skills: ["Retalho", "Gestão", "Vendas"], featured: false, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80" },
  { id: 671, title: "Gerente de Loja", company: "PEP Angola", location: "Dundo", type: "Presencial", category: "Comércio", salary: "180 000 – 260 000 Kz", skills: ["Retalho", "Gestão", "Liderança"], featured: false, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80" },
  { id: 68, title: "Assistente de Loja", company: "PEP Angola", location: "Luanda", type: "Presencial", category: "Comércio", salary: "100 000 – 150 000 Kz", skills: ["Atendimento", "Retalho", "Caixa"], featured: false, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80" },
  { id: 69, title: "Supervisor Comercial", company: "ACQUA Global", location: "Huíla", type: "Presencial", category: "Comércio", salary: "220 000 – 320 000 Kz", skills: ["Comercial", "Vendas", "Água"], featured: false, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80" },
  { id: 650, title: "Vendedor(a)", company: "Coca-Cola Angola", location: "Luanda", type: "Presencial", category: "Comércio", salary: "100 000 – 160 000 Kz", skills: ["Vendas", "Distribuição", "FMCG"], featured: false, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80" },
  { id: 651, title: "Comercial", company: "Novagest", location: "Luanda", type: "Presencial", category: "Comércio", salary: "120 000 – 200 000 Kz", skills: ["Vendas", "Prospecção", "Negociação"], featured: false, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80" },
  { id: 652, title: "Operador de Caixa", company: "Kero Supermercado", location: "Benguela", type: "Presencial", category: "Comércio", salary: "80 000 – 120 000 Kz", skills: ["Caixa", "Atendimento", "Retalho"], featured: false, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80" },

  // RH & ADMINISTRAÇÃO
  { id: 70, title: "Gestor de RH", company: "Grupo Sonangol", location: "Luanda", type: "Presencial", category: "Recursos Humanos", salary: "350 000 – 500 000 Kz", skills: ["Gestão de RH", "Recrutamento", "Formação"], featured: false, logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=100&q=80" },
  { id: 71, title: "Técnico de Administração", company: "CNI", location: "Luanda", type: "Contrato", category: "Recursos Humanos", salary: "150 000 – 220 000 Kz", skills: ["Administração", "Documentos", "Office"], featured: false, logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=100&q=80" },
  { id: 72, title: "Assistente Administrativo", company: "Grupo Zahara", location: "Luanda", type: "Presencial", category: "Recursos Humanos", salary: "120 000 – 180 000 Kz", skills: ["Administração", "Arquivo", "Atendimento"], featured: false, logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=100&q=80" },
  { id: 700, title: "Assistente Administrativo", company: "Banco BAI", location: "Huambo", type: "Presencial", category: "Recursos Humanos", salary: "130 000 – 200 000 Kz", skills: ["Administração", "Office", "Atendimento"], featured: false, logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=100&q=80" },
  { id: 701, title: "Secretário(a) Executivo(a)", company: "Sonangol", location: "Luanda", type: "Presencial", category: "Recursos Humanos", salary: "180 000 – 260 000 Kz", skills: ["Secretariado", "Organização", "Inglês"], featured: false, logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=100&q=80" },

  // ENGENHARIA
  { id: 73, title: "Engenheiro Eléctrico", company: "CRHESCER", location: "Luanda", type: "Presencial", category: "Engenharia", salary: "300 000 – 450 000 Kz", skills: ["Eléctrica", "Instalações", "Projectos"], featured: false, logo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=100&q=80" },
  { id: 74, title: "Engenheiro Mecânico", company: "CRHESCER", location: "Luanda", type: "Presencial", category: "Engenharia", salary: "300 000 – 450 000 Kz", skills: ["Mecânica", "Manutenção", "Projectos"], featured: false, logo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=100&q=80" },
  { id: 75, title: "PMO", company: "Mitrelli", location: "Luanda", type: "Presencial", category: "Engenharia", salary: "400 000 – 600 000 Kz", skills: ["PMO", "Projectos", "Engenharia Civil"], featured: true, logo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=100&q=80" },
  { id: 730, title: "Engenheiro Civil", company: "Grupo Mota-Engil", location: "Benguela", type: "Presencial", category: "Engenharia", salary: "350 000 – 500 000 Kz", skills: ["Engenharia Civil", "AutoCAD", "Obras"], featured: false, logo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=100&q=80" },
  { id: 731, title: "Engenheiro Electricista", company: "Endiama", location: "Lunda Norte", type: "Presencial", category: "Engenharia", salary: "300 000 – 450 000 Kz", skills: ["Eléctrica", "Mineração", "Projectos"], featured: false, logo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=100&q=80" },
  { id: 732, title: "Engenheiro de Minas", company: "Endiama", location: "Lunda Sul", type: "Presencial", category: "Engenharia", salary: "400 000 – 600 000 Kz", skills: ["Mineração", "Geologia", "Engenharia"], featured: true, logo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=100&q=80" },

  // NEGÓCIOS
  { id: 77, title: "Técnico de Negócios", company: "STA Seguros", location: "Luanda", type: "Presencial", category: "Negócios", salary: "200 000 – 300 000 Kz", skills: ["Negócios", "Redes Comerciais", "Seguros"], featured: false, logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { id: 78, title: "Director de Negócios", company: "STA Seguros", location: "Luanda", type: "Presencial", category: "Negócios", salary: "400 000 – 600 000 Kz", skills: ["Direção", "Estratégia", "B2B"], featured: true, logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { id: 79, title: "Gestor Comercial", company: "Empresa Angolana", location: "Luanda", type: "Presencial", category: "Negócios", salary: "250 000 – 400 000 Kz", skills: ["Comercial", "Retalho", "Liderança"], featured: false, logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { id: 770, title: "Business Developer", company: "Clan", location: "Luanda", type: "Presencial", category: "Negócios", salary: "250 000 – 380 000 Kz", skills: ["Desenvolvimento", "Vendas", "B2B"], featured: false, logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },

  // ALIMENTAÇÃO
  { id: 80, title: "Operador de Caixa", company: "HRM Consulting", location: "Luanda", type: "Presencial", category: "Alimentação", salary: "80 000 – 120 000 Kz", skills: ["Caixa", "Atendimento", "Retalho"], featured: false, logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80" },
  { id: 81, title: "Desmanchador de Carnes", company: "HRM Consulting", location: "Luanda", type: "Presencial", category: "Alimentação", salary: "100 000 – 150 000 Kz", skills: ["Açougue", "Carnes", "Alimentação"], featured: false, logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80" },
  { id: 800, title: "Padaria e Pastelaria", company: "Dangereux", location: "Luanda", type: "Contrato", category: "Alimentação", salary: "80 000 – 120 000 Kz", skills: ["Padaria", "Pastelaria", "Confeitaria"], featured: false, logo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80" },

  // ELÉCTRICA & MECÂNICA
  { id: 82, title: "Electricista Industrial", company: "HRM Consulting", location: "Luanda", type: "Presencial", category: "Elétrica", salary: "150 000 – 220 000 Kz", skills: ["Electricidade", "Manutenção", "Quadros"], featured: false, logo: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=100&q=80" },
  { id: 83, title: "Electricista Auto", company: "MECAUTO", location: "Luanda", type: "Presencial", category: "Elétrica", salary: "120 000 – 180 000 Kz", skills: ["Electricidade Auto", "Mecânica", "Estação"], featured: false, logo: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=100&q=80" },
  { id: 820, title: "Mecânico Industrial", company: "Refriango", location: "Luanda", type: "Presencial", category: "Elétrica", salary: "150 000 – 220 000 Kz", skills: ["Mecânica", "Manutenção", "Indústria"], featured: false, logo: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=100&q=80" },

  // OPERAÇÕES
  { id: 84, title: "Operador de Máquinas", company: "HRM Consulting", location: "Luanda", type: "Presencial", category: "Operações", salary: "120 000 – 180 000 Kz", skills: ["Máquinas", "Produção", "Indústria"], featured: false, logo: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=100&q=80" },

  // SOCIAL
  { id: 85, title: "Community Liaison", company: "C4 EcoSolutions", location: "Luena", type: "Presencial", category: "Social", salary: "200 000 – 300 000 Kz", skills: ["Gestão Comunitária", "Responsabilidade Social"], featured: false, logo: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=100&q=80" },
  { id: 86, title: "Técnico de Monitorização", company: "Expertise France", location: "Luanda", type: "Contrato", category: "Social", salary: "250 000 – 350 000 Kz", skills: ["Monitorização", "Avaliação", "MAR"], featured: false, logo: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=100&q=80" },
  { id: 850, title: "Assistente Social", company: "UNICEF Angola", location: "Luanda", type: "Contrato", category: "Social", salary: "200 000 – 300 000 Kz", skills: ["Assistência Social", "Crianças", "Protecção"], featured: false, logo: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=100&q=80" },

  // TRANSPORTE
  { id: 87, title: "Motorista de Triciclo", company: "Golungos21", location: "Luanda", type: "Presencial", category: "Transporte", salary: "80 000 – 120 000 Kz", skills: ["Condução", "Triciclo", "Transporte"], featured: false, logo: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=100&q=80" },
  { id: 870, title: "Motorista Particular", company: "Família Particular", location: "Luanda", type: "Presencial", category: "Transporte", salary: "100 000 – 150 000 Kz", skills: ["Condução", "Luanda", "CNH"], featured: false, logo: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=100&q=80" },

  // BANCA
  { id: 88, title: "Técnico de Cash Center", company: "NOX Angola", location: "Luanda", type: "Presencial", category: "Banca", salary: "150 000 – 220 000 Kz", skills: ["Cash Management", "Banca", "Caixa"], featured: false, logo: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=100&q=80" },
  { id: 89, title: "Gestor(a) de Clientes", company: "Access Bank", location: "Luanda", type: "Presencial", category: "Banca", salary: "250 000 – 380 000 Kz", skills: ["Gestão de Clientes", "Banca", "Vendas"], featured: false, logo: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=100&q=80" },
  { id: 880, title: "Caixa Bancário", company: "Banco BFA", location: "Luanda", type: "Presencial", category: "Banca", salary: "120 000 – 180 000 Kz", skills: ["Caixa", "Atendimento", "Banca"], featured: false, logo: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=100&q=80" },

  // OPERADOR DE AVIAÇÃO
  { id: 900, title: "Operador de Aviação", company: "TAAG", location: "Luanda", type: "Presencial", category: "Logística", salary: "200 000 – 300 000 Kz", skills: ["Aviação", "Operações", "Logística"], featured: false, logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80" },
  { id: 901, title: "Gestor de Armazém", company: "Sonangol", location: "Luanda", type: "Presencial", category: "Logística", salary: "200 000 – 300 000 Kz", skills: ["Armazém", "Gestão", "Stock"], featured: false, logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=100&q=80" },
  { id: 902, title: "Encarregado de Produção", company: "Refriango", location: "Luanda", type: "Presencial", category: "Operações", salary: "150 000 – 220 000 Kz", skills: ["Produção", "Indústria", "Liderança"], featured: false, logo: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=100&q=80" },
  { id: 903, title: "Técnico Agrícola", company: "AGRANGOL", location: "Huambo", type: "Presencial", category: "Operações", salary: "150 000 – 220 000 Kz", skills: ["Agricultura", "Técnico", "Produção"], featured: false, logo: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=100&q=80" },
  { id: 904, title: "Pescador Profissional", company: "Embalangola", location: "Namibe", type: "Presencial", category: "Operações", salary: "100 000 – 160 000 Kz", skills: ["Pesca", "Marítimo", "Produção"], featured: false, logo: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=100&q=80" },
];

const provinces = ["Todas", "Luanda", "Benguela", "Huambo", "Cabinda", "Lubango", "Soyo", "Namibe", "Luena", "Dundo", "Uíge", "Huíla", "Icolo e Bengo", "Lunda Norte", "Lunda Sul", "Malanje", "Moxico", "Bié", "Cunene", "Zaire"];
const categories = ["Todos", "Tecnologia", "Finanças", "Construção", "Petróleo & Gás", "Telecomunicações", "Media", "Saúde", "Educação", "Hotelaria", "Logística", "Comércio", "Recursos Humanos", "Engenharia", "Negócios", "Alimentação", "Elétrica", "Operações", "Social", "Transporte", "Banca"];
const workTypes = ["Todos", "Presencial", "Híbrido", "Remoto"];

const miniCourses = [
  { id: 1, skill: "Informática", title: "Manutenção de Computadores e Redes", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", free: true },
  { id: 2, skill: "Electricidade", title: "Electricidade Geral e Instalações", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "4 meses", free: true },
  { id: 3, skill: "Mecânica", title: "Mecânica Automóvel e Diesel", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "6 meses", free: true },
  { id: 4, skill: "Cibersegurança", title: "Cibersegurança e Firewalls", provider: "INESCOI", url: "https://www.inescoi.ao", duration: "40 horas", free: false },
  { id: 5, skill: "Compliance", title: "Compliance Officer", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/Compliance-Officer", duration: "40 horas", free: false },
  { id: 6, skill: "Gestão de Riscos", title: "Gestão de Riscos Corporativos", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/gestao-de-riscos", duration: "40 horas", free: false },
  { id: 7, skill: "Auditoria", title: "Controlo Interno e Auditoria", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/controlo-interno-e-auditoria", duration: "40 horas", free: false },
  { id: 8, skill: "Banca", title: "Banca e Sistema Financeiro", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/banca-e-sistema-financeiro", duration: "20 horas", free: false },
  { id: 9, skill: "AML", title: "Prevenção do Branqueamento de Capitais", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/prevencao-do-branqueamento-de-capitais-bcft", duration: "20 horas", free: false },
  { id: 10, skill: "ESG", title: "ESG e Sustentabilidade Corporativa", provider: "INESCOI", url: "https://www.inescoi.ao/formacoes/esg-e-sustentabilidade-corporativa", duration: "40 horas", free: false },
  { id: 11, skill: "Excel", title: "Excel em 1 Hora — Fórmulas Essenciais", provider: "CursosAngola", url: "https://cursosangola.com", duration: "1h", free: true },
  { id: 12, skill: "WordPress", title: "WordPress com Elementor", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h 41min", free: true },
  { id: 13, skill: "Inteligência Artificial", title: "Produtos Digitais com IA + Canva", provider: "CursosAngola", url: "https://cursosangola.com", duration: "15min", free: true },
  { id: 14, skill: "HSE", title: "HSE — Higiene, Segurança e Ambiente", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "40 horas", free: false },
  { id: 15, skill: "Gestão de Projectos", title: "Gestão de Projectos (PMP)", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "40 horas", free: false },
  { id: 16, skill: "Liderança", title: "Liderança e Gestão de Equipas", provider: "NEP Training", url: "http://www.neptraining.ao/", duration: "20 horas", free: false },
  { id: 17, skill: "Engenharia Informática", title: "Engenharia Informática", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", free: false },
  { id: 18, skill: "Gestão", title: "Gestão de Empresas", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", free: false },
  { id: 19, skill: "Direito", title: "Direito", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", free: false },
  { id: 20, skill: "Contabilidade", title: "Gestão Financeira e Contabilidade", provider: "ISPA", url: "https://ispatlantida.co.ao/", duration: "4 anos", free: false },
  { id: 21, skill: "Engenharia Civil", title: "Engenharia Civil", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", free: true },
  { id: 22, skill: "Engenharia Electrónica", title: "Engenharia Electrónica e Telecomunicações", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", free: true },
  { id: 23, skill: "Engenharia Mecânica", title: "Engenharia Mecânica", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", free: true },
  { id: 24, skill: "Engenharia de Minas", title: "Engenharia de Minas", provider: "UAN", url: "https://fe.uan.ao/", duration: "5 anos", free: true },
  { id: 25, skill: "Direito", title: "Direito", provider: "UnIA", url: "https://unia.ao/licenciaturas/", duration: "4 anos", free: false },
  { id: 26, skill: "Gestão", title: "Gestão e Negócios Internacionais", provider: "UnIA", url: "https://unia.ao/licenciaturas/", duration: "4 anos", free: false },
  { id: 27, skill: "Relações Públicas", title: "Relações Públicas e Comunicação", provider: "IMETRO", url: "http://imetroangola.com/", duration: "4 anos", free: false },
  { id: 28, skill: "Contabilidade", title: "Contabilidade", provider: "IMETRO", url: "http://imetroangola.com/", duration: "4 anos", free: false },
  { id: 29, skill: "Redes", title: "Manutenção de Computadores e Redes", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", free: true },
  { id: 30, skill: "Suporte", title: "Suporte Técnico de Informática", provider: "INEFOP", url: "https://www.inefop.gov.ao", duration: "3 meses", free: true },
  { id: 31, skill: "SQL", title: "Base de Dados e SQL", provider: "CursosAngola", url: "https://cursosangola.com", duration: "2h", free: true },
  { id: 32, skill: "Python", title: "Python Fundamentos", provider: "CursosAngola", url: "https://cursosangola.com", duration: "4h", free: true },
  { id: 33, skill: "Power BI", title: "Power BI — Dashboards e Relatórios", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", free: true },
  { id: 34, skill: "Figma", title: "Design de Interfaces com Figma", provider: "CursosAngola", url: "https://cursosangola.com", duration: "2h", free: true },
  { id: 35, skill: "AWS", title: "AWS Cloud Concepts", provider: "CursosAngola", url: "https://cursosangola.com", duration: "3h", free: true },
  { id: 36, skill: "Docker", title: "Docker e Containers", provider: "CursosAngola", url: "https://cursosangola.com", duration: "2h", free: true },
  { id: 37, skill: "Formação Profissional", title: "Formações Empresariais", provider: "GetTraining", url: "https://get-ao.com/cursos", duration: "Variável", free: false },
  { id: 38, skill: "Contabilidade", title: "Contabilidade", provider: "Universidade Católica de Angola", url: "https://www.ucan.ao", duration: "4 anos", free: false },
  { id: 39, skill: "Gestão", title: "Administração e Gestão", provider: "Universidade Lusíada de Angola", url: "https://www.ulusiana.ao", duration: "4 anos", free: false },
  { id: 40, skill: "Engenharia Informática", title: "Engenharia Informática", provider: "Universidade Lusíada de Angola", url: "https://www.ulusiana.ao", duration: "4 anos", free: false },
];

function matchJobSkills(cvSkills: string[], jobSkills: string[]) {
  const matched: string[] = [];
  const gaps: string[] = [];
  for (const js of jobSkills) {
    const found = cvSkills.some(cs =>
      cs.toLowerCase().includes(js.toLowerCase()) ||
      js.toLowerCase().includes(cs.toLowerCase()) ||
      cs.toLowerCase() === js.toLowerCase()
    );
    if (found) matched.push(js);
    else gaps.push(js);
  }
  return { matched, gaps };
}

function findCourses(gaps: string[]) {
  const found: typeof miniCourses = [];
  for (const gap of gaps) {
    for (const c of miniCourses) {
      if ((c.skill.toLowerCase().includes(gap.toLowerCase()) || gap.toLowerCase().includes(c.skill.toLowerCase()) || c.title.toLowerCase().includes(gap.toLowerCase())) && !found.find(f => f.id === c.id)) {
        found.push(c);
      }
    }
  }
  return found;
}

interface AiMatch {
  title: string;
  company: string;
  matchScore: number;
  reason: string;
  strengths: string[];
  gaps: string[];
}

interface AiAnalysis {
  title: string;
  company: string;
  demandScore: number;
  trend: string;
  salaryInsight: string;
  topSkills: string[];
}

function AiMatchCard({ match }: { match: AiMatch }) {
  const job = allJobs.find(j => j.title === match.title && j.company === match.company);
  return (
    <div className="bg-[#13293D]/90 backdrop-blur-sm border-2 border-white/20 p-6 hover:border-[#1B98E0] transition-colors group relative flex flex-col shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]">
      <div className="flex items-center gap-3 mb-4">
        {job && <img src={job.logo} alt={match.company} className="w-12 h-12 rounded-lg object-cover border border-white/10" />}
        <div>
          <span className="text-white text-sm font-bold block">{match.company}</span>
          <span className={`text-xs font-bold px-2 py-0.5 ${match.matchScore >= 70 ? "bg-emerald-500/20 text-emerald-400" : match.matchScore >= 40 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>
            {match.matchScore}% match
          </span>
        </div>
      </div>
      <h3 className="font-display text-xl uppercase mb-2 group-hover:text-[#1B98E0] transition-colors">{match.title}</h3>
      <p className="text-white/50 text-sm mb-3">{match.reason}</p>
      {match.strengths.length > 0 && (
        <div className="mb-3">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Competências fortes</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {match.strengths.map(s => (
              <span key={s} className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5">{s}</span>
            ))}
          </div>
        </div>
      )}
      {match.gaps.length > 0 && (
        <div className="mb-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">A desenvolver</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {match.gaps.map(s => (
              <span key={s} className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5">{s}</span>
            ))}
          </div>
        </div>
      )}
      <div className="mt-auto">
        <a href={getJobUrl(match.title, match.company)} target="_blank" rel="noopener noreferrer"
          className="block w-full bg-[#1B98E0] hover:bg-[#247BA0] text-white px-4 py-2 font-bold text-xs uppercase transition-colors shadow-[3px_3px_0px_0px_rgba(36,123,160,1)] text-center">
          <ExternalLink size={12} className="inline mr-1" /> Candidatar-me
        </a>
      </div>
    </div>
  );
}

function AiAnalysisCard({ analysis }: { analysis: AiAnalysis }) {
  const job = allJobs.find(j => j.title === analysis.title && j.company === analysis.company);
  return (
    <div className="bg-[#13293D]/90 backdrop-blur-sm border-2 border-white/20 p-6 hover:border-[#1B98E0] transition-colors group relative flex flex-col shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]">
      {job?.featured && (
        <div className="absolute top-0 right-0 bg-[#1B98E0] text-[#13293D] px-4 py-1 font-bold text-xs uppercase tracking-widest">Destaque</div>
      )}
      <div className="flex items-center gap-3 mb-4">
        {job && <img src={job.logo} alt={analysis.company} className="w-12 h-12 rounded-lg object-cover border border-white/10" />}
        <div>
          <span className="text-white text-sm font-bold block">{analysis.company}</span>
          <span className={`text-xs font-bold px-2 py-0.5 ${analysis.demandScore >= 70 ? "bg-emerald-500/20 text-emerald-400" : analysis.demandScore >= 40 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>
            {analysis.trend}
          </span>
        </div>
      </div>
      <h3 className="font-display text-xl uppercase mb-2 group-hover:text-[#1B98E0] transition-colors">{analysis.title}</h3>
      <div className="flex items-center gap-2 text-white/40 text-sm mb-3">
        <MapPin size={14} /> {job?.location}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">Demanda:</span>
          <span className="text-[#1B98E0] font-bold text-sm">{analysis.demandScore}/100</span>
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 ${analysis.salaryInsight.includes("Acima") ? "bg-emerald-500/20 text-emerald-400" : analysis.salaryInsight.includes("Baixo") ? "bg-red-500/20 text-red-400" : "bg-[#247BA0]/20 text-[#247BA0]"}`}>
          {analysis.salaryInsight}
        </span>
      </div>
      {analysis.topSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {analysis.topSkills.map(s => (
            <span key={s} className="text-xs border border-[#1B98E0] text-[#1B98E0] px-2 py-1 uppercase font-bold">{s}</span>
          ))}
        </div>
      )}
      <div className="mt-auto">
        <a href={getJobUrl(analysis.title, analysis.company)} target="_blank" rel="noopener noreferrer"
          className="block w-full bg-[#1B98E0] hover:bg-[#247BA0] text-white px-4 py-2 font-bold text-xs uppercase transition-colors shadow-[3px_3px_0px_0px_rgba(36,123,160,1)] text-center">
          <ExternalLink size={12} className="inline mr-1" /> Candidatar-me
        </a>
      </div>
    </div>
  );
}

export default function CandidatoVagas() {
  const { hasCv, cvSkills } = useHasCv();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [workType, setWorkType] = useState("Todos");
  const [province, setProvince] = useState("Todas");
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  const [aiMode, setAiMode] = useState<"idle" | "cv" | "general">("idle");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiMatchResults, setAiMatchResults] = useState<AiMatch[]>([]);
  const [aiAnalysisResults, setAiAnalysisResults] = useState<AiAnalysis[]>([]);

  const filtered = allJobs.filter(job => {
    const matchSearch = !search || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase()) || job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "Todos" || job.category === category;
    const matchType = workType === "Todos" || job.type === workType;
    const matchProv = province === "Todas" || job.location === province;
    return matchSearch && matchCat && matchType && matchProv;
  });

  const handleAiMatch = async () => {
    if (!hasCv) return;
    setAiMode("cv");
    setAiLoading(true);
    setAiError(null);
    setAiAnalysisResults([]);
    try {
      const data = await apiFetch("/api/candidate/jobs/ai-match", {
        method: "POST",
        body: JSON.stringify({ jobs: allJobs.map(j => ({ title: j.title, company: j.company, skills: j.skills, salary: j.salary, location: j.location, category: j.category })) }),
      });
      setAiMatchResults(data);
    } catch (err: any) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiGeneral = async () => {
    setAiMode("general");
    setAiLoading(true);
    setAiError(null);
    setAiMatchResults([]);
    try {
      const data = await apiFetch("/api/candidate/jobs/ai-analyze", {
        method: "POST",
        body: JSON.stringify({ jobs: allJobs.map(j => ({ title: j.title, company: j.company, skills: j.skills, salary: j.salary, location: j.location, category: j.category })) }),
      });
      setAiAnalysisResults(data);
    } catch (err: any) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleBackToManual = () => {
    setAiMode("idle");
    setAiMatchResults([]);
    setAiAnalysisResults([]);
    setAiError(null);
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#13293D]/70"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12 pt-24 sm:pt-28">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl text-white uppercase mb-4">
          Buscar <span className="text-[#1B98E0]">Vagas</span>
        </h1>
        <p className="text-white/40 text-lg mb-6 font-bold">{allJobs.length} oportunidades — {provinces.length - 1} províncias — {categories.length - 1} categorias</p>

        {/* AI BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-8">
          {hasCv && (
            <button
              onClick={handleAiMatch}
              disabled={aiLoading}
              className={`flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-colors ${aiMode === "cv" ? "bg-[#1B98E0] text-[#13293D]" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}
            >
              <Brain size={16} /> Com base no CV
            </button>
          )}
          <button
            onClick={handleAiGeneral}
            disabled={aiLoading}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm uppercase tracking-wider transition-colors ${aiMode === "general" ? "bg-[#247BA0] text-white" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}
          >
            <Zap size={16} /> Geral
          </button>
          {aiMode !== "idle" && (
            <button
              onClick={handleBackToManual}
              className="px-6 py-3 font-bold text-sm uppercase tracking-wider bg-white/5 text-white/60 hover:text-white border border-white/10 transition-colors"
            >
              Manual
            </button>
          )}
        </div>

        {/* AI LOADING */}
        {aiLoading && (
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-8 mb-8">
            <Loader2 size={32} className="animate-spin text-[#1B98E0]" />
            <div>
              <p className="text-white font-bold uppercase">IA a analisar {allJobs.length} vagas...</p>
              <p className="text-white/40 text-sm">Isto pode demorar alguns segundos</p>
            </div>
          </div>
        )}

        {/* AI ERROR */}
        {aiError && (
          <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/20 p-6 mb-8">
            <XCircle size={24} className="text-red-400" />
            <div>
              <p className="text-red-400 font-bold uppercase">{aiError}</p>
              <button onClick={handleBackToManual} className="text-white/60 hover:text-white text-sm underline mt-1">Voltar à pesquisa manual</button>
            </div>
          </div>
        )}

        {/* AI RESULTS: CV-BASED */}
        {aiMode === "cv" && !aiLoading && aiMatchResults.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle size={20} className="text-emerald-400" />
              <p className="text-[#1B98E0] text-sm uppercase font-bold tracking-widest">Análise IA — {aiMatchResults.length} vagas avaliadas com base no teu perfil</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiMatchResults.map((m, i) => <AiMatchCard key={`${m.title}-${m.company}-${i}`} match={m} />)}
            </div>
          </div>
        )}

        {/* AI RESULTS: GENERAL */}
        {aiMode === "general" && !aiLoading && aiAnalysisResults.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle size={20} className="text-emerald-400" />
              <p className="text-[#247BA0] text-sm uppercase font-bold tracking-widest">Análise IA — {aiAnalysisResults.length} vagas avaliadas (mercado geral)</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiAnalysisResults.map((a, i) => <AiAnalysisCard key={`${a.title}-${a.company}-${i}`} analysis={a} />)}
            </div>
          </div>
        )}

        {/* MANUAL MODE (no AI selected) */}
        {aiMode === "idle" && (
          <div>
            <div className="relative mb-8">
              <Search size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cargo, empresa ou competência…"
                className="w-full bg-white/5 border-2 border-white/10 text-white h-16 pl-16 pr-6 text-lg focus:border-[#1B98E0] focus:outline-none rounded-none placeholder:text-white/30" />
            </div>

            <div className="mb-4">
              <p className="text-white/40 text-sm uppercase font-bold tracking-widest mb-3">Província</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {provinces.map(p => (
                  <button key={p} onClick={() => setProvince(p)}
                    className={`px-4 py-2 font-bold text-xs uppercase tracking-wider transition-colors ${province === p ? "bg-emerald-600 text-white" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-white/40 text-sm uppercase font-bold tracking-widest mb-3">Categoria</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className={`px-4 py-2 font-bold text-xs uppercase tracking-wider transition-colors ${category === c ? "bg-[#1B98E0] text-[#13293D]" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-white/40 text-sm uppercase font-bold tracking-widest mb-3">Tipo de Trabalho</p>
              <div className="flex flex-wrap gap-2">
                {workTypes.map(w => (
                  <button key={w} onClick={() => setWorkType(w)}
                    className={`px-5 py-2.5 font-bold text-sm uppercase tracking-wider transition-colors ${workType === w ? "bg-[#247BA0] text-white" : "bg-white/5 text-white/60 hover:text-white border border-white/10"}`}>
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-white/40 text-sm mb-8 font-bold">{filtered.length} vagas encontradas</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(job => {
                const { matched, gaps } = hasCv && cvSkills.length > 0 ? matchJobSkills(cvSkills, job.skills) : { matched: [], gaps: [] };
                const matchPercent = job.skills.length > 0 ? Math.round((matched.length / job.skills.length) * 100) : 0;
                const courses = gaps.length > 0 ? findCourses(gaps) : [];
                const isExpanded = expandedJobId === job.id;

                return (
                <div key={job.id} className="bg-[#13293D]/90 backdrop-blur-sm border-2 border-white/20 p-6 hover:border-[#1B98E0] transition-colors group relative flex flex-col shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]">
                  {job.featured && (
                    <div className="absolute top-0 right-0 bg-white text-[#13293D] px-4 py-1 font-bold text-xs uppercase tracking-widest">Destaque</div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg object-cover border border-white/20" />
                    <div>
                      <span className="text-white text-sm font-bold block">{job.company}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-bold tracking-wider text-white/70">{job.category}</span>
                        {hasCv && cvSkills.length > 0 && (
                          <span className={`text-xs font-bold px-2 py-0.5 ${matchPercent >= 70 ? "bg-emerald-500/20 text-emerald-400" : matchPercent >= 40 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`}>
                            {matchPercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display text-xl uppercase mb-2 text-white transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                    <MapPin size={14} /> {job.location}
                  </div>
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider ${job.type === "Remoto" ? "bg-emerald-400/20 text-white border border-white/20" : job.type === "Híbrido" ? "bg-white/20 text-white border border-white/20" : "bg-white/10 text-white border border-white/20"}`}>{job.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map(s => {
                      const isMatched = matched.includes(s);
                      const isGap = gaps.includes(s);
                      return (
                        <span key={s} className={`text-xs px-2 py-1 uppercase font-bold border ${
                          isMatched ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" :
                          isGap ? "border-red-500/50 text-red-400 bg-red-500/10" :
                          "border-white/30 text-white"
                        }`}>
                          {isMatched && <CheckCircle size={10} className="inline mr-0.5" />}
                          {isGap && <XCircle size={10} className="inline mr-0.5" />}
                          {s}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-auto flex items-center justify-between mb-3">
                    <p className="font-display text-sm text-white font-bold">{job.salary}</p>
                    {hasCv && cvSkills.length > 0 && (matched.length > 0 || gaps.length > 0) && (
                      <button onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                        className="text-[#247BA0] hover:text-[#1B98E0] text-xs font-bold uppercase flex items-center gap-1 transition-colors">
                        <Sparkles size={12} /> {isExpanded ? "Fechar" : "Análise"}
                      </button>
                    )}
                  </div>
                  <a href={getJobUrl(job.title, job.company)} target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-[#1B98E0] hover:bg-[#247BA0] text-white px-4 py-2 font-bold text-xs uppercase transition-colors shadow-[3px_3px_0px_0px_rgba(36,123,160,1)] text-center">
                    <ExternalLink size={12} className="inline mr-1" /> Candidatar-me
                  </a>

                  {isExpanded && hasCv && cvSkills.length > 0 && (matched.length > 0 || gaps.length > 0) && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                      {matched.length > 0 && (
                        <div>
                          <p className="text-emerald-400 text-xs font-bold uppercase mb-1">Competências que tens ({matched.length})</p>
                          <div className="flex flex-wrap gap-1">
                            {matched.map(s => (
                              <span key={s} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 text-xs font-bold uppercase">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {gaps.length > 0 && (
                        <div>
                          <p className="text-red-400 text-xs font-bold uppercase mb-1">Em falta ({gaps.length})</p>
                          <div className="flex flex-wrap gap-1">
                            {gaps.map(s => (
                              <span key={s} className="bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 text-xs font-bold uppercase">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {courses.length > 0 && (
                        <div>
                          <p className="text-[#1B98E0] text-xs font-bold uppercase mb-1 flex items-center gap-1"><BookOpen size={10} /> Cursos recomendados</p>
                          <div className="space-y-1">
                            {courses.slice(0, 3).map(c => (
                              <a key={c.id} href={c.url} target="_blank" rel="noopener"
                                className="flex items-center justify-between bg-[#13293D]/80 border border-white/10 p-2 hover:border-[#1B98E0] transition-colors group/course">
                                <div>
                                  <p className="text-white text-xs font-bold group-hover/course:text-[#1B98E0]">{c.title}</p>
                                  <p className="text-white/30 text-[10px]">{c.provider} — {c.duration} {c.free && "• GRATUITO"}</p>
                                </div>
                                <ExternalLink size={10} className="text-[#247BA0] shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}