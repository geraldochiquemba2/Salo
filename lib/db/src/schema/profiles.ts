import { pgTable, serial, text, timestamp, json, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const profilesTable = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  headline: text("headline"),
  bio: text("bio"),
  location: text("location"),
  phone: text("phone"),
  linkedinUrl: text("linkedin_url"),
  portfolioUrl: text("portfolio_url"),
  skills: json("skills").$type<string[]>().default([]),
  languages: json("languages").$type<{ name: string; level: string }[]>().default([]),
  experience: json("experience").$type<{ title: string; company: string; period: string; description: string }[]>().default([]),
  education: json("education").$type<{ institution: string; degree: string; field: string; year: string }[]>().default([]),
  certifications: json("certifications").$type<{ name: string; issuer: string; year: string }[]>().default([]),
  profileCompleteness: integer("profile_completeness").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProfileSchema = createInsertSchema(profilesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profilesTable.$inferSelect;
