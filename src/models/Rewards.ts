import mongoose, { Schema, models } from "mongoose";

export interface IReward {
  _id?: string;
  title: string;
  price: number;
  icon: string;
  bought: number;
}

const rewardSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  icon: { type: String, required: true },
  bought: { type: Number, required: true, default: 0 },
});

export const Reward = models.Reward || mongoose.model("Reward", rewardSchema);
