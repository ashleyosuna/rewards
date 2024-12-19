import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  total: { type: Number, default: 0 },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  password: { type: String, required: true },
});

const User = models.User || model("User", userSchema);
export default User;
