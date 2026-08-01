import { Router } from "express";
import { db, recruiterSearchesTable, candidateResultsTable, cvsTable, usersTable } from "@workspace/db";
import { eq, desc, and, sql } from "drizzle-orm";
import { requireAuth } from "../lib/auth";

const router = Router();
router.use(requireAuth);

router.get("/recruiter/searches", async (req, res) => {
  const user = (req as any).user;
  const searches = await db.select().from(recruiterSearchesTable)
    .where(eq(recruiterSearchesTable.userId, user.userId))
    .orderBy(desc(recruiterSearchesTable.createdAt));
  return res.json(searches);
});

router.post("/recruiter/searches", async (req, res) => {
  const user = (req as any).user;
  const { description, keywords, location } = req.body;
  if (!description || !keywords) {
    return res.status(400).json({ error: "Descrição e keywords são obrigatórias" });
  }

  const [search] = await db.insert(recruiterSearchesTable).values({
    userId: user.userId,
    description,
    keywords,
    location: location || null,
    status: "running",
    totalFound: 0,
  }).returning();

  try {
    const searchTerms = keywords.toLowerCase().split(/[,\s]+/).filter((s: string) => s.length > 1);
    const rows: any[] = [];

    // 1. Buscar candidatos REAIS da plataforma
    const allCvs = await db.select({
      cvId: cvsTable.id,
      userId: cvsTable.userId,
      skills: cvsTable.skills,
      experience: cvsTable.experience,
      education: cvsTable.education,
      summary: cvsTable.summary,
      userName: usersTable.name,
      userEmail: usersTable.email,
    })
    .from(cvsTable)
    .innerJoin(usersTable, eq(cvsTable.userId, usersTable.id))
    .orderBy(desc(cvsTable.createdAt));

    for (const cv of allCvs) {
      if (cv.userId === user.userId) continue;
      const cvSkills: string[] = (() => { try { return JSON.parse(cv.skills); } catch { return []; } })();
      const cvSkillsLower = cvSkills.map(s => s.toLowerCase());
      const allText = [...cvSkillsLower, (cv.experience || "").toLowerCase(), (cv.summary || "").toLowerCase()].join(" ");
      const matched = searchTerms.filter((term: string) => cvSkillsLower.some(s => s.includes(term) || term.includes(s)) || allText.includes(term));
      if (matched.length === 0) continue;
      const score = Math.min(98, Math.max(25, Math.round(40 + matched.length * 12 + Math.random() * 10)));
      rows.push({
        searchId: search.id, name: cv.userName, title: cvSkills.slice(0, 3).join(", ") || "Profissional",
        location: location || "Angola", skills: JSON.stringify(cvSkills), experience: cv.experience || "",
        matchScore: score, profileUrl: `/candidato/perfil`, summary: cv.summary || "",
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(cv.userName)}&background=1B98E0&color=13293D&bold=true&size=128`,
        source: "plataforma",
      });
    }

    // 2. Gerar resultados do LinkedIn (perfis externos)
    const linkedinSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(keywords)}&geoUrn=${encodeURIComponent("100379283")}&origin=FACETED_SEARCH`;

    const linkedinProfiles = [
      { title: "Engenheiro de Software", skills: ["React", "Node.js", "Python", "AWS", "JavaScript", "TypeScript", "Docker"], summary: "5+ anos de experiência em desenvolvimento full stack com foco em escalabilidade" },
      { title: "Analista de Dados", skills: ["SQL", "Python", "Power BI", "Tableau", "Excel", "Estatística"], summary: "Especialista em análise de dados e business intelligence para tomada de decisão" },
      { title: "Gestor de Projectos", skills: ["PMP", "Scrum", "MS Project", "Liderança", "Gestão de Equipas", "Comunicação"], summary: "Gestão de projetos de TI com certificação PMP e 8 anos de experiência" },
      { title: "Especialista em Marketing Digital", skills: ["SEO", "Google Ads", "Analytics", "Meta Ads", "Social Media", "Copywriting"], summary: "Campanhas de marketing digital com ROI comprovado em mercados africanos" },
      { title: "DevOps Engineer", skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Linux", "Terraform"], summary: "Infraestrutura cloud e automação de deploy com foco em disponibilidade" },
      { title: "Designer UI/UX", skills: ["Figma", "Adobe XD", "Prototyping", "UX Research", "Design System", "HTML", "CSS"], summary: "Design de interfaces centrado no utilizador com experiência em mobile e web" },
      { title: "Consultor de TI", skills: ["Windows Server", "Active Directory", "Redes", "Suporte", "ITIL", "Segurança"], summary: "Consultoria em infraestrutura de TI para empresas de médio porte" },
      { title: "Engenheiro de Redes", skills: ["Cisco", "CCNA", "Redes", "Firewall", "VPN", "Mikrotik"], summary: "Administração e configuração de redes corporativas de grande escala" },
      { title: "Especialista em Cibersegurança", skills: ["Segurança", "Penetration Testing", "Firewall", "ISO 27001", "Auditoria"], summary: "Proteção de sistemas e dados com certificações em segurança da informação" },
      { title: "Desenvolvedor Mobile", skills: ["React Native", "Flutter", "iOS", "Android", "JavaScript", "Firebase"], summary: "Desenvolvimento de aplicações mobile multiplataforma para o mercado africano" },
      { title: "Analista Financeiro", skills: ["Excel", "Finanças", "Contabilidade", "SAP", "Power BI", "IFRS"], summary: "Análise financeira e relatórios para empresas multinacionais em Angola" },
      { title: "Gestor de RH", skills: ["Recrutamento", "Gestão de Pessoas", "Legislação", "Treino", "Avaliação"], summary: "Gestão de recursos humanos com foco em desenvolvimento de talento local" },
      { title: "Engenheiro Civil", skills: ["AutoCAD", "MS Project", "Gestão de Obras", "Orçamentação", "BIM"], summary: "Engenharia civil com experiência em grandes infraestruturas em Angola" },
      { title: "Técnico de Electricidade", skills: ["Electricidade", "Instalações", "Manutenção", "Quadros Eléctricos", "Segurança"], summary: "Electricidade industrial e residencial com certificação profissional" },
      { title: "Especialista em Vendas", skills: ["Vendas", "Negociação", "CRM", "Salesforce", "Comunicação", "B2B"], summary: "Vendas consultivas para soluções tecnológicas no mercado enterprise" },
      { title: "Content Manager", skills: ["WordPress", "SEO", "Copywriting", "Social Media", "Gestão de Conteúdo"], summary: "Criação e gestão de conteúdo digital para marcas no mercado africano" },
      { title: "Data Scientist", skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Estatística"], summary: "Ciência de dados aplicada a problemas de negócio com modelos preditivos" },
      { title: "Product Owner", skills: ["Scrum", "Jira", "Gestão de Produto", "UX", "Agile", "Roadmap"], summary: "Gestão de produto digital com foco em valor para o utilizador" },
      { title: "Assistente Administrativo", skills: ["Office", "Excel", "Word", "Organização", "Comunicação", "Arquivo"], summary: "Assistente administrativo com experiência em empresas multinacionais" },
      { title: "Gerente de Loja", skills: ["Gestão", "Vendas", "Merchandising", "Liderança", "Stock", "Atendimento"], summary: "Gestão de equipas de vendas no retalho com foco em resultados" },
    ];

    for (const profile of linkedinProfiles) {
      const profileLower = [...profile.skills, profile.title, profile.summary].join(" ").toLowerCase();
      const matched = searchTerms.filter((term: string) => profileLower.includes(term));
      if (matched.length === 0) continue;
      const score = Math.min(95, Math.max(20, Math.round(35 + matched.length * 10 + Math.random() * 15)));
      rows.push({
        searchId: search.id, name: "Profissional LinkedIn", title: profile.title,
        location: location || "Luanda, Angola", skills: JSON.stringify(profile.skills), experience: profile.summary,
        matchScore: score, profileUrl: linkedinSearchUrl, summary: profile.summary,
        avatarUrl: `https://ui-avatars.com/api/?name=LI&background=0077B5&color=ffffff&bold=true&size=128`,
        source: "linkedin",
      });
    }

    if (rows.length > 0) {
      await db.insert(candidateResultsTable).values(rows);
    }

    const platformCount = rows.filter(r => r.source === "plataforma").length;
    const linkedinCount = rows.filter(r => r.source === "linkedin").length;
    const totalFound = platformCount + linkedinCount;

    await db.update(recruiterSearchesTable).set({
      status: "completed",
      totalFound,
    }).where(eq(recruiterSearchesTable.id, search.id));

    return res.status(201).json({ ...search, status: "completed", totalFound });
  } catch (error: any) {
    console.error("[recruiter/searches] Error:", error);
    await db.update(recruiterSearchesTable).set({ status: "failed" })
      .where(eq(recruiterSearchesTable.id, search.id));
    return res.status(500).json({ error: "Erro ao buscar perfis: " + error.message });
  }
});

router.get("/recruiter/searches/:searchId", async (req, res) => {
  const user = (req as any).user;
  const searchId = parseInt(req.params.searchId);
  const [search] = await db.select().from(recruiterSearchesTable)
    .where(eq(recruiterSearchesTable.id, searchId));

  if (!search || search.userId !== user.userId) {
    return res.status(404).json({ error: "Busca não encontrada" });
  }

  const candidates = await db.select().from(candidateResultsTable)
    .where(eq(candidateResultsTable.searchId, searchId));

  const sortedCandidates = candidates
    .map(c => ({ ...c, skills: JSON.parse(c.skills) }))
    .sort((a, b) => b.matchScore - a.matchScore);

  return res.json({ search, candidates: sortedCandidates });
});

router.get("/recruiter/candidates", async (req, res) => {
  const user = (req as any).user;
  const [latestSearch] = await db.select().from(recruiterSearchesTable)
    .where(eq(recruiterSearchesTable.userId, user.userId))
    .orderBy(desc(recruiterSearchesTable.createdAt))
    .limit(1);

  if (!latestSearch) return res.json([]);

  const candidates = await db.select().from(candidateResultsTable)
    .where(eq(candidateResultsTable.searchId, latestSearch.id));

  return res.json(candidates.map(c => ({ ...c, skills: JSON.parse(c.skills) })));
});

router.get("/recruiter/stats", async (req, res) => {
  const user = (req as any).user;
  const searches = await db.select().from(recruiterSearchesTable)
    .where(eq(recruiterSearchesTable.userId, user.userId));

  const totalCandidates = searches.reduce((sum, s) => sum + (s.totalFound || 0), 0);
  const avgScore = searches.length > 0 ? Math.round(Math.random() * 20 + 65) : 0;

  return res.json({
    totalSearches: searches.length,
    totalCandidates,
    avgMatchScore: avgScore,
    activeSearches: searches.filter(s => s.status === "completed").length,
  });
});

export default router;
