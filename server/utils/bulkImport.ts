import { db } from "../db";
import {
  users,
  participations,
  codingProfiles,
  analyticsSnapshots,
  userActivity,
  contests,
  submissions,
  groupMembers,
  bookmarks,
  leaderboard,
  enrollments,
  lessonProgress,
  typingScores,
  quizAttempts,
  teaserAttempts,
} from "../shared/schema";
import { eq, and, inArray, not } from "drizzle-orm";

/**
 * Process an array of student handle objects.
 * This replicates the existing bulk‑import‑handles logic, but is reusable for both
 * JSON and CSV imports.
 */
export async function processStudentHandles(students: any[]) {
  // Validate input
  if (!Array.isArray(students) || students.length === 0) {
    return { error: "Invalid or empty student data provided." };
  }

  let updatedCount = 0;
  const notFound: string[] = [];

  // Delete dummy users not present in the new list
  const validUsernames = students
    .map((s) => s.username?.trim())
    .filter(Boolean);
  if (validUsernames.length > 0) {
    // Delete dummy users not present in the new list
    const usersToDeleteRows = await db
      .select()
      .from(users)
      .where(and(eq(users.role, "user"), not(inArray(users.username, validUsernames))));
    const idsToDelete = usersToDeleteRows.map((u) => u.id);
    if (idsToDelete.length > 0) {
      // Delete dependent data in the correct order
      await db.delete(codingProfiles).where(inArray(codingProfiles.userId, idsToDelete));
      await db.delete(participations).where(inArray(participations.userId, idsToDelete));
      await db.delete(userActivity).where(inArray(userActivity.userId, idsToDelete));
      await db.delete(groupMembers).where(inArray(groupMembers.userId, idsToDelete));
      await db.delete(submissions).where(inArray(submissions.userId, idsToDelete));
      
      await db.delete(leaderboard).where(inArray(leaderboard.userId, idsToDelete));
      await db.delete(enrollments).where(inArray(enrollments.userId, idsToDelete));
      await db.delete(lessonProgress).where(inArray(lessonProgress.userId, idsToDelete));
      await db.delete(typingScores).where(inArray(typingScores.userId, idsToDelete));
      await db.delete(quizAttempts).where(inArray(quizAttempts.userId, idsToDelete));
      await db.delete(teaserAttempts).where(inArray(teaserAttempts.userId, idsToDelete));
      await db.delete(users).where(inArray(users.id, idsToDelete));
    }
  }

  // Upsert each student record
  for (const data of students) {
    const { username, cfHandle, lcHandle, ccHandle, atHandle, hrHandle, gfgHandle } = data;
    if (!username) continue;

    const existingUser = await db
      .select()
      .from(users)
 .where(eq(users.username, username.trim()))
 .limit(1);

    let targetUserId: string;
    if (existingUser.length === 0) {
      // Create new user with a default password hash (same as previous logic)
      const defaultPasswordHash =
        "a4c184f42d3bfd59c6e36e4b1010cbd0fbfc84641e48adb72541c2d347667deca59b1124dd3f6d2c56475cdcb9f39611c1fc2926e7c957a0642b88768ae57f42.somesalt";
      const [newUser] = await db
        .insert(users)
        .values({
          username: username.trim(),
          password: defaultPasswordHash,
          cfHandle: cfHandle ? String(cfHandle).trim() : null,
          lcHandle: lcHandle ? String(lcHandle).trim() : null,
          ccHandle: ccHandle ? String(ccHandle).trim() : null,
          atHandle: atHandle ? String(atHandle).trim() : null,
          hrHandle: hrHandle ? String(hrHandle).trim() : null,
          gfgHandle: gfgHandle ? String(gfgHandle).trim() : null,
        } as any)
        .returning({ id: users.id });
      targetUserId = newUser.id;
      updatedCount++;
      continue;
    } else {
      targetUserId = existingUser[0].id;
    }

    // Update handles for existing user
    await db
      .update(users)
      .set({
        cfHandle: cfHandle ? String(cfHandle).trim() : null,
        lcHandle: lcHandle ? String(lcHandle).trim() : null,
        ccHandle: ccHandle ? String(ccHandle).trim() : null,
        atHandle: atHandle ? String(atHandle).trim() : null,
        hrHandle: hrHandle ? String(hrHandle).trim() : null,
        gfgHandle: gfgHandle ? String(gfgHandle).trim() : null,
      } as any)
      .where(eq(users.id, targetUserId));
    updatedCount++;
  }

  return {
    message: `Successfully imported handles for ${updatedCount} students.`,
    updated: updatedCount,
    notFound,
  };
}
