import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { signToken, requireAuth } from "../lib/auth";

const router = Router();

router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }
    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const [user] = await db.insert(usersTable).values({ email, name, passwordHash, role }).returning();
    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    return res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt },
      token,
    });
  } catch (err: any) {
    console.error("[Register Error]", err);
    return res.status(500).json({ error: err.message || "Erro interno do servidor" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const token = signToken({ userId: user.id, email: user.email, role: user.role });
    return res.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt },
      token,
    });
  } catch (err: any) {
    console.error("[Login Error]", err);
    return res.status(500).json({ error: err.message || "Erro interno do servidor" });
  }
});

router.get("/auth/me", requireAuth, async (req, res) => {
  const user = (req as any).user;
  const [dbUser] = await db.select().from(usersTable).where(eq(usersTable.id, user.userId)).limit(1);
  if (!dbUser) return res.status(401).json({ error: "User not found" });
  return res.json({ id: dbUser.id, email: dbUser.email, name: dbUser.name, role: dbUser.role, createdAt: dbUser.createdAt });
});

router.post("/auth/logout", (_req, res) => {
  return res.json({ ok: true });
});

export default router;
