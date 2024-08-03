import { getUserId } from "@/functions/user/getUserId";
import { prisma } from "@/server/db/client";

export async function getMealPlanUsers(
  mealPlanId: string,
  excludeCurrentUser: boolean = false
) {
  const excludeUserId = excludeCurrentUser ? await getUserId(true) : "";

  const assignments = await prisma?.user.findMany({
    where: {
      mealPlanAssignments: {
        some: {
          mealPlanId,
        },
      },
      NOT: {
        id: excludeUserId,
      },
    },
  });

  return assignments;
}
