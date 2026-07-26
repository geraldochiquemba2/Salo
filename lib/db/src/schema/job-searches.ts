import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const jobSearchesTable = pgTable("job_searches", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  keywords: text("keywords").notNull(),
  location: text("location"),
  status: text("status").notNull().default("completed"),
  totalFound: integer("total_found"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const matchedJobsTable = pgTable("matched_jobs", {
  id: serial("id").primaryKey(),
  searchId: integer("search_id").notNull().references(() => jobSearchesTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  matchScore: integer("match_score").notNull().default(0),
  skillsRequired: text("skills_required").notNull().default("[]"),
  skillsGap: text("skills_gap").notNull().default("[]"),
  skillsMatched: text("skills_matched").notNull().default("[]"),
  url: text("url").notNull(),
  postedAt: text("posted_at"),
});

export const insertJobSearchSchema = createInsertSchema(jobSearchesTable).omit({ id: true, createdAt: true });
export type InsertJobSearch = z.infer<typeof insertJobSearchSchema>;
export type JobSearch = typeof jobSearchesTable.$inferSelect;
export type MatchedJob = typeof matchedJobsTable.$inferSelect;
