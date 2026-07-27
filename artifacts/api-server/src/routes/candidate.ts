import { Router } from "express";
import { db, cvsTable, jobSearchesTable, matchedJobsTable, coursesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../lib/auth";
import { generateRealisticJobs } from "../lib/linkedin";
import { analyzeSkills } from "../lib/groq";

const router = Router();
router.use(requireAuth);

router.get("/candidate/cv", async (req, res) => {
  const user = (req as any).user;
  const [cv] = await db.select().from(cvsTable).where(eq(cvsTable.userId, user.userId)).orderBy(desc(cvsTable.createdAt)).limit(1);
  if (!cv) return res.status(404).json({ error: "CV não encontrado" });
  return res.json({ ...cv, skills: JSON.parse(cv.skills) });
});

router.post("/candidate/cv", async (req, res) => {
  const user = (req as any).user;
  const { fileName, content, skills, experience, education, summary } = req.body;
  if (!fileName || !content || !skills || !experience || !education) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }
  const skillsJson = JSON.stringify(skills);
  await db.delete(cvsTable).where(eq(cvsTable.userId, user.userId));
  const [cv] = await db.insert(cvsTable).values({
    userId: user.userId,
    fileName,
    content,
    skills: skillsJson,
    experience,
    education,
    summary: summary || null,
  }).returning();
  return res.status(201).json({ ...cv, skills });
});

router.get("/candidate/jobs", async (req, res) => {
  const user = (req as any).user;
  const searches = await db.select().from(jobSearchesTable).where(eq(jobSearchesTable.userId, user.userId)).orderBy(desc(jobSearchesTable.createdAt)).limit(3);
  if (searches.length === 0) return res.json([]);
  const allJobs = await db.select().from(matchedJobsTable).where(eq(matchedJobsTable.searchId, searches[0].id));
  const jobs = allJobs.map(j => ({
    ...j,
    skillsRequired: JSON.parse(j.skillsRequired),
    skillsGap: JSON.parse(j.skillsGap),
    skillsMatched: JSON.parse(j.skillsMatched),
  }));
  return res.json(jobs);
});

router.post("/candidate/jobs/search", async (req, res) => {
  const user = (req as any).user;
  const { keywords, location } = req.body;
  if (!keywords) return res.status(400).json({ error: "Keywords são obrigatórias" });

  const [search] = await db.insert(jobSearchesTable).values({
    userId: user.userId,
    keywords,
    location: location || null,
    status: "running",
    totalFound: 0,
  }).returning();

  try {
    const linkedinJobs = await generateRealisticJobs(keywords, location);

    let cvSkills: string[] = [];
    const [cv] = await db.select().from(cvsTable).where(eq(cvsTable.userId, user.userId)).limit(1);
    if (cv) {
      cvSkills = JSON.parse(cv.skills);
    }

    for (const job of linkedinJobs) {
      const matched = cvSkills.filter(s =>
        job.skills.some(js => js.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(js.toLowerCase()))
      );
      const gap = job.skills.filter(s => !matched.some(m => m.toLowerCase() === s.toLowerCase()));
      const score = job.skills.length > 0 ? Math.round((matched.length / job.skills.length) * 100) : Math.floor(Math.random() * 60 + 30);

      await db.insert(matchedJobsTable).values({
        searchId: search.id,
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        matchScore: score,
        skillsRequired: JSON.stringify(job.skills),
        skillsGap: JSON.stringify(gap),
        skillsMatched: JSON.stringify(matched),
        url: job.url,
        postedAt: job.postedAt,
      });
    }

    await db.update(jobSearchesTable).set({
      status: "completed",
      totalFound: linkedinJobs.length,
    }).where(eq(jobSearchesTable.id, search.id));

    return res.status(201).json({ ...search, status: "completed", totalFound: linkedinJobs.length });
  } catch (error) {
    await db.update(jobSearchesTable).set({
      status: "failed",
    }).where(eq(jobSearchesTable.id, search.id));
    return res.status(500).json({ error: "Erro ao buscar vagas" });
  }
});

router.get("/candidate/analysis", async (req, res) => {
  const user = (req as any).user;
  const [cv] = await db.select().from(cvsTable).where(eq(cvsTable.userId, user.userId)).limit(1);
  if (!cv) return res.status(404).json({ error: "CV não encontrado" });
  const skills: string[] = JSON.parse(cv.skills);

  try {
    const analysis = await analyzeSkills(skills);
    return res.json({ cvId: cv.id, ...analysis });
  } catch {
    return res.status(500).json({ error: "Erro ao analisar competências. Verifica a conexão com a IA." });
  }
});

router.get("/candidate/courses", async (_req, res) => {
  const courses = await db.select().from(coursesTable).limit(12);
  return res.json(courses.map(c => ({ ...c, free: c.free === 1 })));
});

router.get("/candidate/stats", async (req, res) => {
  const user = (req as any).user;
  const searches = await db.select().from(jobSearchesTable).where(eq(jobSearchesTable.userId, user.userId));
  const allJobs = searches.length > 0
    ? await db.select().from(matchedJobsTable).where(eq(matchedJobsTable.searchId, searches[0].id))
    : [];
  const courses = await db.select().from(coursesTable);

  const avgScore = allJobs.length > 0
    ? Math.round(allJobs.reduce((sum, j) => sum + j.matchScore, 0) / allJobs.length)
    : 0;

  return res.json({
    totalJobsFound: allJobs.length,
    avgMatchScore: avgScore,
    topSkillsMatched: allJobs.filter(j => j.matchScore >= 70).length,
    coursesRecommended: courses.length,
    lastSearchAt: searches.length > 0 ? searches[0].createdAt : null,
  });
});

export default router;
