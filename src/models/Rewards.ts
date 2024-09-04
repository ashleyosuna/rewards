import mongoose, { Schema, models } from "mongoose";

export interface IReward {
  id?: string;
  title: string;
  price: number;
}

const rewardSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Reward = models.Reward || mongoose.model("Reward", rewardSchema);
