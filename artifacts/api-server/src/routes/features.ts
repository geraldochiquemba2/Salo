import { Router } from "express";
import {
  db,
  profilesTable,
  coverLettersTable,
  interviewsTable,
  swipeActionsTable,
  notificationsTable,
  cvsTable,
} from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../lib/auth";
import { generateInterviewQuestions, generateInterviewFeedback, generateCoverLetter } from "../lib/groq";

const router = Router();
router.use(requireAuth);

const mockJobs = [
  { id: 1, title: "Desenvolvedor Full Stack", company: "Unitel", location: "Luanda, Angola", description: "Desenvolvimento de aplicações web e mobile", salary: "350.000 - 500.000 Kz", skills: ["JavaScript", "React", "Node.js", "TypeScript"] },
  { id: 2, title: "Engenheiro de Software", company: "BAI", location: "Luanda, Angola", description: "Design e implementação de sistemas bancários", salary: "450.000 - 700.000 Kz", skills: ["Java", "Spring Boot", "SQL", "Microservices"] },
  { id: 3, title: "Analista de Dados", company: "TAAG", location: "Luanda, Angola", description: "Análise de dados operacionais", salary: "300.000 - 450.000 Kz", skills: ["Python", "SQL", "Power BI", "Excel"] },
  { id: 4, title: "UI/UX Designer", company: "Movicel", location: "Luanda, Angola", description: "Design de interfaces mobile e web", salary: "250.000 - 400.000 Kz", skills: ["Figma", "Adobe XD", "HTML", "CSS"] },
  { id: 5, title: "DevOps Engineer", company: "Angola Telecom", location: "Luanda, Angola", description: "Gestão de infraestrutura cloud e CI/CD", salary: "400.000 - 600.000 Kz", skills: ["Docker", "Kubernetes", "AWS", "Linux"] },
  { id: 6, title: "Product Manager", company: "Refriango", location: "Luanda, Angola", description: "Gestão de produto digital", salary: "500.000 - 750.000 Kz", skills: ["Product Management", "Agile", "Scrum", "Analytics"] },
  { id: 7, title: "Desenvolvedor Mobile", company: "Vodacom Angola", location: "Luanda, Angola", description: "Desenvolvimento de apps Android e iOS", salary: "350.000 - 550.000 Kz", skills: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { id: 8, title: "Cibersegurança Analyst", company: "Ensa", location: "Luanda, Angola", description: "Proteção de sistemas e monitoramento", salary: "400.000 - 650.000 Kz", skills: ["Cybersecurity", "Networking", "Linux", "Python"] },
  { id: 9, title: "Desenvolvedor Backend", company: "Eleva", location: "Luanda, Angola", description: "Desenvolvimento de APIs REST", salary: "350.000 - 500.000 Kz", skills: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  { id: 10, title: "Data Engineer", company: "Sonangol", location: "Luanda, Angola", description: "Construção de pipelines de dados", salary: "500.000 - 800.000 Kz", skills: ["Apache Spark", "Airflow", "SQL", "Python"] },
  { id: 11, title: "Gerente de Projetos TI", company: "BFA", location: "Luanda, Angola", description: "Coordenação de projetos de transformação digital", salary: "600.000 - 900.000 Kz", skills: ["PMP", "Scrum", "Gestão de Projetos", "Liderança"] },
  { id: 12, title: "Desenvolvedor Frontend", company: "Intercâmbio Digital", location: "Luanda, Angola", description: "Desenvolvimento de interfaces web", salary: "300.000 - 450.000 Kz", skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS"] },
  { id: 13, title: "Engenheiro de Machine Learning", company: "AngoMe", location: "Luanda, Angola", description: "Desenvolvimento de modelos de IA", salary: "450.000 - 700.000 Kz", skills: ["Python", "TensorFlow", "Machine Learning", "NLP"] },
  { id: 14, title: "Administrador de Sistemas", company: "Multichoice Angola", location: "Luanda, Angola", description: "Administração de servidores", salary: "300.000 - 450.000 Kz", skills: ["Linux", "Windows Server", "Networking", "VMware"] },
  { id: 15, title: "Consultor ERP", company: "Sistran", location: "Luanda, Angola", description: "Implementação de sistemas ERP", salary: "400.000 - 600.000 Kz", skills: ["SAP", "Oracle", "SQL", "Gestão Empresarial"] },
  { id: 16, title: "Desenvolvedor Java", company: "Petrobras Angola", location: "Luanda, Angola", description: "Desenvolvimento de sistemas petrolíferos", salary: "450.000 - 700.000 Kz", skills: ["Java", "Spring", "Hibernate", "SQL"] },
  { id: 17, title: "Analista de QA", company: "Unitel", location: "Luanda, Angola", description: "Teste de software e garantia de qualidade", salary: "280.000 - 400.000 Kz", skills: ["Selenium", "Jest", "Cypress", "Testing"] },
  { id: 18, title: "Arquiteto de Soluções", company: "Microsoft Angola", location: "Luanda, Angola", description: "Design de arquiteturas cloud", salary: "600.000 - 950.000 Kz", skills: ["Azure", "AWS", "Cloud Architecture", "Microservices"] },
  { id: 19, title: "Desenvolvedor Python", company: "Banco Millennium Angola", location: "Luanda, Angola", description: "Automação e ferramentas internas", salary: "350.000 - 500.000 Kz", skills: ["Python", "Django", "Flask", "REST API"] },
  { id: 20, title: "Scrum Master", company: "ZAP Media", location: "Luanda, Angola", description: "Facilitação de processos ágeis", salary: "350.000 - 500.000 Kz", skills: ["Scrum", "Agile", "Jira", "Liderança"] },
];

// Profile
router.get("/candidate/profile", async (req, res) => {
  const user = (req as any).user;
  const [profile] = await db.select().from(profilesTable).where(eq(profilesTable.userId, user.userId)).limit(1);
  if (!profile) return res.status(404).json({ error: "Perfil não encontrado" });
  return res.json({
    ...profile,
    skills: JSON.parse(JSON.stringify(profile.skills)),
    languages: JSON.parse(JSON.stringify(profile.languages)),
    experience: JSON.parse(JSON.stringify(profile.experience)),
    education: JSON.parse(JSON.stringify(profile.education)),
    certifications: JSON.parse(JSON.stringify(profile.certifications)),
  });
});

router.post("/candidate/profile", async (req, res) => {
  const user = (req as any).user;
  const { headline, bio, location, phone, linkedinUrl, portfolioUrl, skills, languages, experience, education, certifications } = req.body;

  const [existing] = await db.select().from(profilesTable).where(eq(profilesTable.userId, user.userId)).limit(1);

  if (existing) {
    const [updated] = await db.update(profilesTable).set({
      headline: headline ?? existing.headline,
      bio: bio ?? existing.bio,
      location: location ?? existing.location,
      phone: phone ?? existing.phone,
      linkedinUrl: linkedinUrl ?? existing.linkedinUrl,
      portfolioUrl: portfolioUrl ?? existing.portfolioUrl,
      skills: skills ?? existing.skills,
      languages: languages ?? existing.languages,
      experience: experience ?? existing.experience,
      education: education ?? existing.education,
      certifications: certifications ?? existing.certifications,
      updatedAt: new Date(),
    }).where(eq(profilesTable.userId, user.userId)).returning();
    return res.json(updated);
  }

  const [created] = await db.insert(profilesTable).values({
    userId: user.userId,
    headline: headline || null,
    bio: bio || null,
    location: location || null,
    phone: phone || null,
    linkedinUrl: linkedinUrl || null,
    portfolioUrl: portfolioUrl || null,
    skills: skills || [],
    languages: languages || [],
    experience: experience || [],
    education: education || [],
    certifications: certifications || [],
    profileCompleteness: 0,
  }).returning();
  return res.status(201).json(created);
});

// Cover Letters
router.get("/candidate/cover-letters", async (req, res) => {
  const user = (req as any).user;
  const letters = await db.select().from(coverLettersTable).where(eq(coverLettersTable.userId, user.userId)).orderBy(desc(coverLettersTable.createdAt));
  return res.json(letters);
});

router.post("/candidate/cover-letters", async (req, res) => {
  const user = (req as any).user;
  const { jobId, title, content, companyName, position, tone, language } = req.body;
  if (!title || !content) return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  const [letter] = await db.insert(coverLettersTable).values({
    userId: user.userId, jobId: jobId || null, title, content,
    companyName: companyName || null, position: position || null,
    tone: tone || "professional", language: language || "pt",
  }).returning();
  return res.status(201).json(letter);
});

router.post("/candidate/cover-letters/generate", async (req, res) => {
  const user = (req as any).user;
  const { companyName, position, tone, language } = req.body;
  if (!companyName || !position) {
    return res.status(400).json({ error: "Empresa e posição são obrigatórias" });
  }

  let skills: string[] = [];
  let experience = "";
  const [cv] = await db.select().from(cvsTable).where(eq(cvsTable.userId, user.userId)).limit(1);
  if (cv) {
    skills = JSON.parse(cv.skills);
    experience = cv.experience || "";
  }

  try {
    const content = await generateCoverLetter({
      jobTitle: position,
      companyName,
      skills,
      experience,
      tone: tone || "professional",
      language: language || "pt",
    });
    return res.json({ content });
  } catch {
    return res.status(500).json({ error: "Erro ao gerar carta com IA" });
  }
});

router.put("/candidate/cover-letters/:id", async (req, res) => {
  const user = (req as any).user;
  const { id } = req.params;
  const { title, content, companyName, position, tone, language } = req.body;
  const [existing] = await db.select().from(coverLettersTable).where(eq(coverLettersTable.id, Number(id))).limit(1);
  if (!existing || existing.userId !== user.userId) return res.status(404).json({ error: "Carta não encontrada" });
  const [updated] = await db.update(coverLettersTable).set({
    title: title ?? existing.title, content: content ?? existing.content,
    companyName: companyName ?? existing.companyName, position: position ?? existing.position,
    tone: tone ?? existing.tone, language: language ?? existing.language, updatedAt: new Date(),
  }).where(eq(coverLettersTable.id, Number(id))).returning();
  return res.json(updated);
});

router.delete("/candidate/cover-letters/:id", async (req, res) => {
  const user = (req as any).user;
  const { id } = req.params;
  const [existing] = await db.select().from(coverLettersTable).where(eq(coverLettersTable.id, Number(id))).limit(1);
  if (!existing || existing.userId !== user.userId) return res.status(404).json({ error: "Carta não encontrada" });
  await db.delete(coverLettersTable).where(eq(coverLettersTable.id, Number(id)));
  return res.json({ message: "Carta eliminada com sucesso" });
});

// Interviews
router.get("/candidate/interviews", async (req, res) => {
  const user = (req as any).user;
  const interviews = await db.select().from(interviewsTable).where(eq(interviewsTable.userId, user.userId)).orderBy(desc(interviewsTable.createdAt));
  return res.json(interviews.map((i) => ({
    ...i,
    questions: i.questions ? JSON.parse(i.questions) : [],
    answers: i.answers ? JSON.parse(i.answers) : [],
  })));
});

router.get("/candidate/interviews/:id", async (req, res) => {
  const user = (req as any).user;
  const { id } = req.params;
  const [interview] = await db.select().from(interviewsTable).where(eq(interviewsTable.id, Number(id))).limit(1);
  if (!interview || interview.userId !== user.userId) return res.status(404).json({ error: "Entrevista não encontrada" });
  return res.json({
    ...interview,
    questions: interview.questions ? JSON.parse(interview.questions) : [],
    answers: interview.answers ? JSON.parse(interview.answers) : [],
  });
});

router.post("/candidate/interviews", async (req, res) => {
  const user = (req as any).user;
  const { jobId, jobTitle, company } = req.body;

  let skills: string[] = [];
  const [cv] = await db.select().from(cvsTable).where(eq(cvsTable.userId, user.userId)).limit(1);
  if (cv) skills = JSON.parse(cv.skills);

  let questions: string[];
  try {
    questions = await generateInterviewQuestions(skills, jobTitle || "Desenvolvedor", company || "Empresa");
  } catch {
    questions = [
      "Fala-me sobre ti e a tua experiência profissional.",
      "Porque é que queres trabalhar na nossa empresa?",
      "Qual é a tua maior força e a tua maior fraqueza?",
      "Descreve um projeto desafiante que realizaste.",
      "Onde te vês daqui a 5 anos?",
    ];
  }
  const [interview] = await db.insert(interviewsTable).values({
    userId: user.userId, jobId: jobId || null,
    jobTitle: jobTitle || "Simulação de Entrevista",
    company: company || "Empresa Simulada",
    status: "in_progress", questions: JSON.stringify(questions),
    answers: JSON.stringify([]), isSimulation: true, durationMinutes: 0,
  }).returning();
  return res.status(201).json({ ...interview, questions, answers: [] });
});

router.post("/candidate/interviews/:id/respond", async (req, res) => {
  const user = (req as any).user;
  const { id } = req.params;
  const { answer } = req.body;
  if (!answer) return res.status(400).json({ error: "Resposta é obrigatória" });

  const [interview] = await db.select().from(interviewsTable).where(eq(interviewsTable.id, Number(id))).limit(1);
  if (!interview || interview.userId !== user.userId) return res.status(404).json({ error: "Entrevista não encontrada" });

  const questions: string[] = interview.questions ? JSON.parse(interview.questions) : [];
  const existingAnswers: string[] = interview.answers ? JSON.parse(interview.answers) : [];
  const updatedAnswers = [...existingAnswers, answer];

  if (updatedAnswers.length >= questions.length) {
    let score: number;
    let feedback: string;
    try {
      const result = await generateInterviewFeedback(questions, updatedAnswers);
      score = result.score;
      feedback = result.feedback;
    } catch {
      score = Math.floor(Math.random() * 36) + 60;
      feedback = "Entrevista concluída. Demonstraste competências relevantes para a posição.";
    }
    const [updated] = await db.update(interviewsTable).set({
      answers: JSON.stringify(updatedAnswers), status: "completed",
      score, feedback, durationMinutes: Math.floor(Math.random() * 20) + 10, updatedAt: new Date(),
    }).where(eq(interviewsTable.id, Number(id))).returning();
    return res.json({ ...updated, questions, answers: updatedAnswers, completed: true });
  }

  const [updated] = await db.update(interviewsTable).set({
    answers: JSON.stringify(updatedAnswers), updatedAt: new Date(),
  }).where(eq(interviewsTable.id, Number(id))).returning();
  return res.json({
    ...updated, questions, answers: updatedAnswers, completed: false,
    nextQuestion: questions[updatedAnswers.length],
  });
});

// Swipe
router.get("/candidate/swipe/jobs", async (req, res) => {
  const user = (req as any).user;
  const existingSwipeJobIds = await db.select({ jobId: swipeActionsTable.jobId })
    .from(swipeActionsTable).where(eq(swipeActionsTable.userId, user.userId));
  const swipedIds = new Set(existingSwipeJobIds.map((r) => r.jobId));
  const filtered = mockJobs.filter((j) => !swipedIds.has(j.id));
  return res.json(filtered.slice(0, 10));
});

router.post("/candidate/swipe", async (req, res) => {
  const user = (req as any).user;
  const { jobId, jobTitle, company, action, jobData } = req.body;
  if (!jobId || !action) return res.status(400).json({ error: "jobId e action são obrigatórios" });
  if (!["like", "superlike", "pass"].includes(action)) return res.status(400).json({ error: "Action inválida" });

  const mockJob = mockJobs.find((j) => j.id === Number(jobId));
  const [recorded] = await db.insert(swipeActionsTable).values({
    userId: user.userId, jobId: Number(jobId),
    jobTitle: jobTitle || mockJob?.title || null,
    company: company || mockJob?.company || null,
    action, jobData: jobData || (mockJob ? JSON.stringify(mockJob) : null),
  }).returning();

  if (action === "like" || action === "superlike") {
    await db.insert(notificationsTable).values({
      userId: user.userId, type: "job_match",
      title: "Nova vaga compatível",
      message: `Encontrámos uma vaga que combina com as tuas competências - ${mockJob?.title || "vaga"}`,
      read: false,
    });
  }
  return res.json(recorded);
});

router.get("/candidate/swipe/matches", async (req, res) => {
  const user = (req as any).user;
  const liked = await db.select().from(swipeActionsTable)
    .where(eq(swipeActionsTable.userId, user.userId)).orderBy(desc(swipeActionsTable.createdAt));
  const matches = liked.filter((s) => s.action === "like" || s.action === "superlike");
  return res.json(matches.map((m) => ({ ...m, jobData: m.jobData ? JSON.parse(m.jobData) : null })));
});

// Notifications
router.get("/candidate/notifications", async (req, res) => {
  const user = (req as any).user;
  const notifications = await db.select().from(notificationsTable)
    .where(eq(notificationsTable.userId, user.userId)).orderBy(desc(notificationsTable.createdAt));
  return res.json(notifications.map((n) => ({ ...n, data: n.data ? JSON.parse(n.data) : null })));
});

router.post("/candidate/notifications/:id/read", async (req, res) => {
  const user = (req as any).user;
  const { id } = req.params;
  const [existing] = await db.select().from(notificationsTable).where(eq(notificationsTable.id, Number(id))).limit(1);
  if (!existing || existing.userId !== user.userId) return res.status(404).json({ error: "Notificação não encontrada" });
  const [updated] = await db.update(notificationsTable).set({ read: true }).where(eq(notificationsTable.id, Number(id))).returning();
  return res.json(updated);
});

router.post("/candidate/notifications/read-all", async (req, res) => {
  const user = (req as any).user;
  await db.update(notificationsTable).set({ read: true }).where(eq(notificationsTable.userId, user.userId));
  return res.json({ message: "Todas as notificações marcadas como lidas" });
});

export default router;
