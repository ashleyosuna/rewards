import mongoose from "mongoose";
import { Schema, models } from "mongoose";

export interface ITask {
  _id?: string;
  title: string;
  points: number;
  completed: boolean;
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  points: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
});

export const Task = models.Task || mongoose.model("Task", taskSchema);
