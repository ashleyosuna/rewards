"use server";

import { IReward, Reward } from "@/models/Rewards";
import { dbConnection } from "./dbConnect";
import { revalidatePath } from "next/cache";

export async function createReward(title: string, price: number, icon: string) {
  try {
    await dbConnection();
    await Reward.create({ title: title, price: price, icon: icon });
    revalidatePath("/reward-store");
  } catch (error) {
    console.error("Error creating reward", error);
  }
}

export async function getRewards(min: number, max: number) {
  try {
    await dbConnection();
    const rewards = await Reward.find({ price: { $gte: min, $lt: max } });
    return JSON.parse(JSON.stringify(rewards));
  } catch (error) {
    console.error("Error fetching rewards", error);
    return [];
  }
}

export async function getRewards1() {
  try {
    await dbConnection();
    const rewards = await Reward.find().sort({ price: 1 });
    const rewardsDict: { [key: number]: IReward[] } = {};

    for (const reward of rewards) {
      const tier = Math.floor(reward.price / 10);
      rewardsDict[tier]
        ? rewardsDict[tier].push(reward)
        : (rewardsDict[tier] = [reward]);
    }
    return JSON.parse(JSON.stringify(rewardsDict));
  } catch (error) {
    console.error("Error fetching rewards", error);
    return {};
  }
}

export async function deleteReward(rewardID: string) {
  try {
    await dbConnection();
    await Reward.deleteOne({ _id: rewardID });
    revalidatePath("/home");
  } catch (error) {
    console.error("Error deleting task", error);
  }
}

export async function buyReward(rewardID: string) {
  try {
    await dbConnection();
    await Reward.updateOne({ _id: rewardID }, { $inc: { bought: 1 } });
  } catch (error) {
    console.error("Error buying reward", error);
  }
}
