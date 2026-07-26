import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const cvsTable = pgTable("cvs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  content: text("content").notNull(),
  skills: text("skills").notNull().default("[]"),
  experience: text("experience").notNull().default(""),
  education: text("education").notNull().default(""),
  summary: text("summary"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCvSchema = createInsertSchema(cvsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertCv = z.infer<typeof insertCvSchema>;
export type Cv = typeof cvsTable.$inferSelect;
