import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const recruiterSearchesTable = pgTable("recruiter_searches", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  keywords: text("keywords").notNull(),
  location: text("location"),
  status: text("status").notNull().default("completed"),
  totalFound: integer("total_found"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const candidateResultsTable = pgTable("candidate_results", {
  id: serial("id").primaryKey(),
  searchId: integer("search_id").notNull().references(() => recruiterSearchesTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  skills: text("skills").notNull().default("[]"),
  experience: text("experience"),
  matchScore: integer("match_score").notNull().default(0),
  profileUrl: text("profile_url").notNull(),
  summary: text("summary"),
  avatarUrl: text("avatar_url"),
  source: text("source").notNull().default("plataforma"),
});

export const coursesTable = pgTable("courses", {
  id: serial("id").primaryKey(),
  skill: text("skill").notNull(),
  title: text("title").notNull(),
  provider: text("provider").notNull(),
  url: text("url").notNull(),
  duration: text("duration"),
  level: text("level").notNull().default("intermediate"),
  free: integer("free").notNull().default(0),
});

export const insertRecruiterSearchSchema = createInsertSchema(recruiterSearchesTable).omit({ id: true, createdAt: true });
export type InsertRecruiterSearch = z.infer<typeof insertRecruiterSearchSchema>;
export type RecruiterSearch = typeof recruiterSearchesTable.$inferSelect;
export type CandidateResult = typeof candidateResultsTable.$inferSelect;
export type Course = typeof coursesTable.$inferSelect;
