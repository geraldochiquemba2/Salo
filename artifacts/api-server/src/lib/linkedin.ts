import { groqChat } from "./groq";

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

export async function generateRealisticJobs(keywords: string, location?: string): Promise<LinkedInJob[]> {
  const prompt = `Gera 10 vagas de emprego realistas para Angola baseadas nas seguintes palavras-chave: "${keywords}"${location ? ` na localização: "${location}"` : ""}.

Cada vaga deve ter:
- title: cargo realista em português
- company: empresa angolana realista (ex: Unitel, BAI, Sonangol, Vodacom, etc.)
- location: cidade em Angola (Luanda, Benguela, Lubango, Huambo, etc.)
- description: descrição curta do cargo (1-2 frases)
- url: URL de pesquisa no LinkedIn (formato: https://www.linkedin.com/jobs/search/?keywords=TITULO_DA_VAGA&location=LUANDA+ANGOLA)
- postedAt: data nos últimos 30 dias (formato YYYY-MM-DD)
- salary: salário em Kwanzas (formato: "XXX.000 - YYY.000 Kz")
- jobType: CLT, Prestação de Serviços, Estágio, Freelancer ou Tempo Integral
- skills: array de 3-5 competências técnicas relevantes

Responde APENAS com um JSON array, sem markdown, sem explicações.
Exemplo: [{"title": "...", "company": "...", ...}]`;

  try {
    const response = await groqChat([
      { role: "system", content: "És um especialista em recrutamento em Angola. Gera vagas realistas e específicas para o mercado angolano." },
      { role: "user", content: prompt },
    ]);

    const cleaned = response.replace(/```json\n?|\n?```/g, "").trim();
    const jobs = JSON.parse(cleaned);

    if (Array.isArray(jobs) && jobs.length > 0) {
      return jobs.map((j: any, i: number) => ({
        title: j.title || "Vaga",
        company: j.company || "Empresa",
        location: j.location || (location || "Luanda, Angola"),
        description: j.description || "",
        url: j.url || `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(j.title || keywords)}&location=${encodeURIComponent("Luanda, Angola")}`,
        postedAt: j.postedAt || new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        salary: j.salary || "",
        jobType: j.jobType || "Tempo Integral",
        skills: Array.isArray(j.skills) ? j.skills : [],
      }));
    }
  } catch (err) {
    console.error("[generateRealisticJobs] IA falhou, usando fallback:", err);
  }

  // Fallback: vagas básicas se IA falhar
  return [
    { title: "Desenvolvedor Full Stack", company: "Unitel", location: location || "Luanda, Angola", description: "Desenvolvimento de aplicações web e mobile utilizando tecnologias modernas.", url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Desenvolvedor Full Stack")}&location=${encodeURIComponent("Luanda, Angola")}`, postedAt: new Date().toISOString().split("T")[0], salary: "300.000 - 500.000 Kz", jobType: "Tempo Integral", skills: ["JavaScript", "React", "Node.js", "TypeScript"] },
    { title: "Analista de Dados", company: "BAI", location: location || "Luanda, Angola", description: "Análise e modelagem de dados para apoio à tomada de decisões.", url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Analista de Dados")}&location=${encodeURIComponent("Luanda, Angola")}`, postedAt: new Date().toISOString().split("T")[0], salary: "250.000 - 400.000 Kz", jobType: "Tempo Integral", skills: ["SQL", "Python", "Power BI"] },
    { title: "Engenheiro DevOps", company: "Sonangol", location: location || "Luanda, Angola", description: "Gestão de infraestrutura cloud e pipelines de CI/CD.", url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Engenheiro DevOps")}&location=${encodeURIComponent("Luanda, Angola")}`, postedAt: new Date().toISOString().split("T")[0], salary: "400.000 - 600.000 Kz", jobType: "Tempo Integral", skills: ["Docker", "AWS", "Kubernetes", "Linux"] },
    { title: "Desenvolvedor Mobile", company: "Vodacom", location: location || "Luanda, Angola", description: "Desenvolvimento de aplicações mobile para Android e iOS.", url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Desenvolvedor Mobile")}&location=${encodeURIComponent("Luanda, Angola")}`, postedAt: new Date().toISOString().split("T")[0], salary: "280.000 - 450.000 Kz", jobType: "Tempo Integral", skills: ["React Native", "Flutter", "JavaScript"] },
    { title: "Designer UI/UX", company: "Movitel", location: location || "Luanda, Angola", description: "Design de interfaces de utilizador e experiência do utilizador.", url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Designer UI UX")}&location=${encodeURIComponent("Luanda, Angola")}`, postedAt: new Date().toISOString().split("T")[0], salary: "200.000 - 350.000 Kz", jobType: "Tempo Integral", skills: ["Figma", "Adobe XD", "CSS", "Prototyping"] },
    { title: "Administrador de Base de Dados", company: "TAAG", location: location || "Luanda, Angola", description: "Administração e otimização de bases de dados empresariais.", url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent("Administrador Base Dados")}&location=${encodeURIComponent("Luanda, Angola")}`, postedAt: new Date().toISOString().split("T")[0], salary: "350.000 - 550.000 Kz", jobType: "Tempo Integral", skills: ["PostgreSQL", "MySQL", "Oracle", "SQL"] },
  ];
}

export async function generateRealisticProfiles(keywords: string, location?: string): Promise<LinkedInProfile[]> {
  const prompt = `Gera 5 perfis profissionais realistas para Angola baseados nas palavras-chave: "${keywords}"${location ? ` na localização: "${location}"` : ""}.

Cada perfil deve ter:
- name: nome completo angolano
- title: cargo profissional
- location: cidade em Angola
- summary: resumo profissional (2 frases)
- skills: array de 3-5 competências
- experience: tempo de experiência
- education: formação académica
- profileUrl: URL de perfil no LinkedIn (formato: https://www.linkedin.com/in/NOME-DO-PERFIL)
- avatarUrl: URL de avatar (use photos.unsplash.com)

Responde APENAS com um JSON array, sem markdown, sem explicações.`;

  try {
    const response = await groqChat([
      { role: "system", content: "És um especialista em recrutamento em Angola. Gera perfis profissionais realistas." },
      { role: "user", content: prompt },
    ]);

    const cleaned = response.replace(/```json\n?|\n?```/g, "").trim();
    const profiles = JSON.parse(cleaned);

    if (Array.isArray(profiles) && profiles.length > 0) {
      return profiles.map((p: any, i: number) => ({
        name: p.name || "Profissional",
        title: p.title || keywords,
        location: p.location || (location || "Luanda, Angola"),
        summary: p.summary || "",
        skills: Array.isArray(p.skills) ? p.skills : [],
        experience: p.experience || "3 anos",
        education: p.education || "Engenharia Informática",
        profileUrl: p.profileUrl || `https://www.linkedin.com/in/${(p.name || "user").toLowerCase().replace(/ /g, "-")}`,
        avatarUrl: p.avatarUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop`,
      }));
    }
  } catch {}

  return [];
}
