"use server";

import { Task } from "@/models/Task";
import { dbConnection } from "./dbConnect";
import { Habit } from "@/models/Habit";
import { Reward } from "@/models/Rewards";

export async function calculatePoints() {
  try {
    await dbConnection();
    const pipeline = [
      {
        $match: { completed: true },
      },
      {
        $group: { _id: null, total: { $sum: "$points" } },
      },
    ];
    const taskResult = await Task.aggregate(pipeline);
    const habitsResult = await Habit.aggregate(pipeline);
    const total =
      (taskResult?.at(0)?.total ?? 0) + (habitsResult?.at(0)?.total ?? 0);

    const boughtPipeline = [
      {
        $project: {
          spent: {
            $multiply: ["$price", "$bought"],
          },
        },
      },
      {
        $group: { _id: null, totalSpent: { $sum: "$spent" } },
      },
    ];
    const spentResult = await Reward.aggregate(boughtPipeline);
    const totalSpent = spentResult?.at(0)?.totalSpent ?? 0;
    return total - totalSpent;
  } catch (error) {
    console.error("Error calculating points", error);
    return 0;
  }
}
