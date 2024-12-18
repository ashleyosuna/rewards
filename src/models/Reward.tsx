import { Schema, model, models } from "mongoose";

const rewardSchema = new Schema({
  description: { type: String, required: true },
  price: { type: Number, default: 0, min: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User", index: true },
});

const Reward = models.Reward || model("Reward", rewardSchema);
export default Reward;
