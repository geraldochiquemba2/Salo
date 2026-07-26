import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const interviewsTable = pgTable("interviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  jobId: integer("job_id"),
  jobTitle: text("job_title"),
  company: text("company"),
  status: text("status").notNull().default("pending"),
  questions: text("questions"),
  answers: text("answers"),
  feedback: text("feedback"),
  score: integer("score"),
  durationMinutes: integer("duration_minutes"),
  isSimulation: boolean("is_simulation").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertInterviewSchema = createInsertSchema(interviewsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertInterview = z.infer<typeof insertInterviewSchema>;
export type Interview = typeof interviewsTable.$inferSelect;

export const swipeActionsTable = pgTable("swipe_actions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  jobId: integer("job_id").notNull(),
  jobTitle: text("job_title"),
  company: text("company"),
  action: text("action").notNull(),
  jobData: text("job_data"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSwipeActionSchema = createInsertSchema(swipeActionsTable).omit({ id: true, createdAt: true });
export type InsertSwipeAction = z.infer<typeof insertSwipeActionSchema>;
export type SwipeAction = typeof swipeActionsTable.$inferSelect;

export const notificationsTable = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id),
  type: text("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  data: text("data"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertNotificationSchema = createInsertSchema(notificationsTable).omit({ id: true, createdAt: true });
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notificationsTable.$inferSelect;
