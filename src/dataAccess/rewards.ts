"use server";

import { Reward } from "@/models/Rewards";
import { dbConnection } from "./dbConnect";

export async function createReward(title: string, price: number, icon: string) {
  try {
    await dbConnection();
    await Reward.create({ title: title, price: price, icon: icon });
  } catch (error) {
    console.error("Error creating reward", error);
  }
}

export async function getRewards() {
  try {
    await dbConnection();
    const rewards = await Reward.find();
    return rewards;
  } catch (error) {
    console.error("Error fetching rewards", error);
    return [];
  }
}
