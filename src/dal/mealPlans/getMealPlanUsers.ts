import { getUserId } from "@/functions/user/getUserId";
import { db } from "@/server/db";
import { users, mealPlanAssignments } from "@/server/db/schema";
import { eq, and, ne, inArray } from "drizzle-orm";

export async function getMealPlanUsers(
  mealPlanId: string,
  excludeCurrentUser: boolean = false
) {
  const excludeUserId = excludeCurrentUser ? await getUserId(true) : "";

  const userIdsInPlan = await db
    .select({ userId: mealPlanAssignments.userId })
    .from(mealPlanAssignments)
    .where(eq(mealPlanAssignments.mealPlanId, mealPlanId));

  const userIds = userIdsInPlan.map((a) => a.userId);

  if (userIds.length === 0) {
    return [];
  }

  const assignments = await db
    .select()
    .from(users)
    .where(
      and(
        inArray(users.id, userIds),
        excludeUserId ? ne(users.id, excludeUserId) : undefined
      )
    );

  return assignments;
}
