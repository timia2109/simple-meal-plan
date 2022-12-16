import { DateTime } from "luxon";
import type { NextApiRequest, NextApiResponse } from "next";
import { createContext } from "../../server/trpc/context";
import { mealPlanRouter } from "../../server/trpc/router/mealPlan";

const mealPlanHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await createContext({ req, res });
  const caller = mealPlanRouter.createCaller(ctx);

  switch (req.method) {
    case "GET":
      let { date } = req.query;
      if (Array.isArray(date)) date = date[0];

      const result = await caller.getMealPlanFor({
        date: date ?? DateTime.now().toISO(),
      });

      res.status(200).json(result);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
};

export default mealPlanHandler;
