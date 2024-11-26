"use client";

import { useState } from "react";
import Reward from "./Reward";
import { RewardType } from "@/types";

const testRewards = [
  { description: "Coffee", price: 8 },
  { description: "Watch a movie", price: 15 },
];

export default function Rewards() {
  const [rewards, setRewards] = useState(testRewards);

  const onRewardsChange = function (newReward: RewardType, index: number) {
    setRewards([
      ...rewards.slice(0, index),
      newReward,
      ...rewards.slice(index + 1, rewards.length),
    ]);
  };

  const onRewardsDelete = function (index: number) {
    const newArray = rewards.toSpliced(index, 1);
    setRewards(newArray);
  };

  return (
    <div className="w-[95%] mx-auto grid sm:grid-cols-4 lg:grid-cols-5 gap-4 my-8">
      {rewards.map((reward, index) => (
        <Reward
          reward={reward}
          index={index}
          onRewardsChange={onRewardsChange}
          onRewardsDelete={onRewardsDelete}
        />
      ))}
    </div>
  );
}
