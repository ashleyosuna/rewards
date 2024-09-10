import mongoose, { Schema, models } from "mongoose";

export interface IHabit {
  _id?: string;
  title: string;
  points: number;
  completed: boolean;
}

const habitSchema = new Schema({
  title: { type: String, required: true },
  points: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
});

export const Habit = models.Habit || mongoose.model("Habit", habitSchema);
