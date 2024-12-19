"use server";

import Reward from "@/models/Reward";
import User from "@/models/User";
import { RewardType } from "@/types";

export async function fetchRewards(userId: string | undefined) {
  // bad request
  if (!userId) return { status: 400 };
  try {
    const rewards = await Reward.find().sort({ price: 1 });
    if (rewards.length)
      return { status: 200, data: JSON.parse(JSON.stringify(rewards)) };
    // not found
    else return { status: 404 };
  } catch (error) {
    console.error("Error fetching rewards", error);
  }
}

export async function createReward(reward: RewardType) {
  try {
    const rewardDoc = await Reward.create(reward);
    return { status: 200, data: JSON.parse(JSON.stringify(rewardDoc)) };
  } catch (error) {
    console.error("Error creating reward", error);
    return { status: 500 };
  }
}

export async function updateReward(reward: RewardType) {
  try {
    const updatedReward = await Reward.updateOne({ _id: reward._id }, reward);
    return { status: 200 };
  } catch (error) {
    console.error("Error updating reward", error);
    return { status: 500 };
  }
}

export async function deleteReward(rewardId: string | undefined) {
  // bad request
  if (!rewardId) return { status: 400 };
  try {
    await Reward.deleteOne({ _id: rewardId });
    return { status: 200 };
  } catch (error) {
    console.error("Error deleting reward", error);
    return { status: 500 };
  }
}

export async function buyReward(userId: string | undefined, price: number) {
  if (!userId || !price) return { status: 400 };
  try {
    await User.updateOne({ _id: userId }, [
      { $set: { total: { $subtract: ["$total", price] } } },
    ]);
    return { status: 200 };
  } catch (error) {
    console.error("Error buying reward", error);
    return { status: 500 };
  }
}
