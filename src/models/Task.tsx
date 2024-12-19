import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  description: { type: String, required: true },
  price: { type: Number, default: 0, min: 0 },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User", index: true },
});

const Task = models.Task || model("Task", taskSchema);
export default Task;
