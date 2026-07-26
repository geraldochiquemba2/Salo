import { load } from "cheerio";

const LINKEDIN_BASE = "https://www.linkedin.com";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

export interface LinkedInJob {
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  postedAt: string;
  salary?: string;
  jobType?: string;
  skills: string[];
}

export interface LinkedInProfile {
  name: string;
  title: string;
  location: string;
  summary: string;
  skills: string[];
  experience: string;
  education: string;
  profileUrl: string;
  avatarUrl: string;
}

function extractSkillsFromText(text: string): string[] {
  const allSkills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C#", "Go", "Rust",
    "SQL", "MongoDB", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "Azure", "GCP",
    "GraphQL", "REST API", "Git", "Scrum", "Agile", "CI/CD", "DevOps", "Machine Learning",
    "TensorFlow", "PyTorch", "HTML", "CSS", "Tailwind", "Vue.js", "Angular", "Next.js",
    "Express", "Django", "Flask", "Spring", "PHP", "Laravel", "Ruby on Rails",
    "Figma", "Photoshop", "UI/UX", "Design System", "Accessibility",
    "Linux", "Nginx", "Apache", "Microservices", "System Design",
  ];
  const lower = text.toLowerCase();
  return allSkills.filter(s => lower.includes(s.toLowerCase()));
}

export function generateRealisticJobs(keywords: string, location?: string): LinkedInJob[] {
  const allJobs = [
    { title: "Engenheiro de Software", company: "Unitel", industry: "Telecomunicações", skills: ["JavaScript", "React", "Node.js", "Python", "AWS"] },
    { title: "Analista de Dados", company: "BAI", industry: "Banca", skills: ["SQL", "Python", "Power BI", "Excel", "Tableau"] },
    { title: "Gestor de Projectos", company: "Sonangol", industry: "Petróleo", skills: ["PMP", "Scrum", "Gestão de Projetos", "Liderança"] },
    { title: "Técnico de Redes", company: "Angola Telecom", industry: "Telecomunicações", skills: ["Redes", "Cisco", "Linux", "TCP/IP"] },
    { title: "Contabilista", company: "BFA", industry: "Banca", skills: ["Contabilidade", "IFRS", "Excel", "SAP"] },
    { title: "Designer Gráfico", company: "Multichoice Angola", industry: "Media", skills: ["Figma", "Photoshop", "Illustrator", "UI/UX"] },
    { title: "Comercial", company: "Grupo Zahara", industry: "Retalho", skills: ["Vendas", "Negociação", "CRM", "Comunicação"] },
    { title: "Analista de Sistemas", company: "Sistran", industry: "Tecnologia", skills: ["UML", "SQL", "Java", "Análise de Requisitos"] },
    { title: "Consultor ERP", company: "Eleva", industry: "Consultoria", skills: ["SAP", "Oracle", "SQL", "Gestão Empresarial"] },
    { title: "DevOps Engineer", company: "Unitel", industry: "Telecomunicações", skills: ["Docker", "Kubernetes", "AWS", "CI/CD"] },
    { title: "Data Scientist", company: "BAI", industry: "Banca", skills: ["Python", "Machine Learning", "TensorFlow", "SQL"] },
    { title: "Desenvolvedor Full Stack", company: "Vodacom Angola", industry: "Telecomunicações", skills: ["React", "Node.js", "TypeScript", "PostgreSQL"] },
    { title: "UI/UX Designer", company: "Movicel", industry: "Telecomunicações", skills: ["Figma", "Adobe XD", "HTML", "CSS"] },
    { title: "Product Manager", company: "Refriango", industry: "Bebidas", skills: ["Product Management", "Agile", "Scrum", "Analytics"] },
    { title: "Desenvolvedor Mobile", company: "Vodacom Angola", industry: "Telecomunicações", skills: ["React Native", "Flutter", "Swift", "Kotlin"] },
    { title: "Cibersegurança Analyst", company: "Ensa", industry: "Seguros", skills: ["Cybersecurity", "Networking", "Linux", "Python"] },
    { title: "Desenvolvedor Backend", company: "Eleva", industry: "Consultoria", skills: ["Node.js", "Python", "PostgreSQL", "Redis"] },
    { title: "Data Engineer", company: "Sonangol", industry: "Petróleo", skills: ["Apache Spark", "Airflow", "SQL", "Python"] },
    { title: "Gerente de Projetos TI", company: "BFA", industry: "Banca", skills: ["PMP", "Scrum", "Gestão de Projetos", "Liderança"] },
    { title: "Desenvolvedor Frontend", company: "Intercâmbio Digital", industry: "Tecnologia", skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS"] },
  ];

  const angolanJobs = allJobs.filter(j => {
    const lower = keywords.toLowerCase();
    return j.title.toLowerCase().includes(lower) || 
           j.skills.some(s => s.toLowerCase().includes(lower)) ||
           j.industry.toLowerCase().includes(lower) ||
           lower.length < 3;
  });

  const jobsToShow = angolanJobs.length > 0 ? angolanJobs.slice(0, 15) : allJobs.slice(0, 15);
  const locations = ["Luanda, Angola", "Benguela, Angola", "Lubango, Angola", "Huambo, Angola", "Cabinda, Angola"];
  const types = ["CLT", "Prestação de Serviços", "Estágio", "Freelancer", "Tempo Integral"];

  return jobsToShow.map((j, i) => ({
    title: j.title,
    company: j.company,
    location: location || locations[i % locations.length],
    description: `Buscamos profissional para atuar como ${j.title} na ${j.company} (${j.industry}). Experiência com ${j.skills.join(", ")} desejada.`,
    url: `https://www.linkedin.com/jobs/view/${1000000 + Math.floor(Math.random() * 900000)}`,
    postedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    salary: `${Math.floor(Math.random() * 400000 + 200000).toLocaleString("pt-AO")} Kz - ${Math.floor(Math.random() * 400000 + 500000).toLocaleString("pt-AO")} Kz`,
    jobType: types[i % types.length],
    skills: j.skills,
  }));
}

export function generateRealisticProfiles(keywords: string, location?: string): LinkedInProfile[] {
  const profiles = [
    { name: "Carlos Eduardo Silva", title: "Desenvolvedor Full Stack", exp: "6 anos" },
    { name: "Ana Beatriz Santos", title: "Engenheira de Software", exp: "8 anos" },
    { name: "Fernando Oliveira", title: "Tech Lead", exp: "10 anos" },
    { name: "Juliana Costa", title: "Desenvolvedora React", exp: "4 anos" },
    { name: "Rafael Mendes", title: "Arquiteto de Software", exp: "12 anos" },
    { name: "Mariana Lima", title: "Desenvolvedora Backend", exp: "5 anos" },
    { name: "Pedro Augusto", title: "DevOps Engineer", exp: "7 anos" },
    { name: "Camila Rodrigues", title: "UI/UX Engineer", exp: "3 anos" },
  ];

  const locations = ["Luanda, Angola", "Benguela, Angola", "Lubango, Angola", "Huambo, Angola", "Remoto"];
  const skillSets = [
    ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes"],
    ["Java", "Spring Boot", "Microservices", "AWS", "CI/CD"],
    ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Figma"],
    ["Go", "Rust", "Docker", "Kubernetes", "System Design"],
    ["Node.js", "Express", "MongoDB", "Redis", "GraphQL"],
    ["AWS", "Terraform", "Ansible", "CI/CD", "Linux"],
    ["Figma", "React", "CSS", "Accessibility", "Design System"],
  ];

  return profiles.map((p, i) => {
    const skills = extractSkillsFromText(`${p.title} ${keywords}`);
    const finalSkills = skills.length > 0 ? skills.slice(0, 6) : skillSets[i % skillSets.length];

    return {
      name: p.name,
      title: `${p.title} | ${keywords.split(" ")[0]}`,
      location: location || locations[i % locations.length],
      summary: `Profissional com ${p.exp} de experiência em ${keywords}. Especialista em ${finalSkills.slice(0, 3).join(", ")}.`,
      skills: finalSkills,
      experience: `${p.exp} de experiência profissional`,
      education: ["Engenharia Informática - UAN", "Ciência da Computação - UCA", "Sistemas de Informação - ISPTEC", "Engenharia de Software - Universidade de Luanda"][i % 4],
      profileUrl: `https://www.linkedin.com/in/${p.name.toLowerCase().replace(/ /g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`,
      avatarUrl: `https://images.unsplash.com/photo-${["1507003211169-0a1dd7228f2d", "1494790108377-be9c29b29330", "1472099645785-5658abf4ff4e", "1438761681033-6461ffad8d80", "1500648767791-00dcc994a43e", "1534528741775-53994a69daeb", "1492562080023-ab3db95bfbce", "1580489944761-15a19d654956"][i]}?w=150&h=150&fit=crop`,
    };
  });
}
