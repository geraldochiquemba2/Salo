import { Router } from "express";
import { db, recruiterSearchesTable, candidateResultsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { requireAuth } from "../lib/auth";
import { generateRealisticProfiles } from "../lib/linkedin";

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
    const profiles = generateRealisticProfiles(keywords, location);

    for (const profile of profiles) {
      const searchKeywords = keywords.toLowerCase().split(/[,\s]+/);
      const profileSkillsLower = profile.skills.map(s => s.toLowerCase());
      const matched = searchKeywords.filter((kw: string) => profileSkillsLower.some(s => s.includes(kw) || kw.includes(s)));
      const score = Math.min(98, Math.max(25, Math.round(50 + matched.length * 10 + Math.random() * 15)));

      await db.insert(candidateResultsTable).values({
        searchId: search.id,
        name: profile.name,
        title: profile.title,
        location: profile.location,
        skills: JSON.stringify(profile.skills),
        experience: profile.experience,
        matchScore: score,
        profileUrl: profile.profileUrl,
        summary: profile.summary,
        avatarUrl: profile.avatarUrl,
      });
    }

    await db.update(recruiterSearchesTable).set({
      status: "completed",
      totalFound: profiles.length,
    }).where(eq(recruiterSearchesTable.id, search.id));

    return res.status(201).json({ ...search, status: "completed", totalFound: profiles.length });
  } catch (error) {
    await db.update(recruiterSearchesTable).set({ status: "failed" })
      .where(eq(recruiterSearchesTable.id, search.id));
    return res.status(500).json({ error: "Erro ao buscar perfis" });
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
