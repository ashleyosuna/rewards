"use client";

import { useState } from "react";
import Reward from "./Reward";
import { RewardType } from "@/types";

const testRewards = [
  { description: "Coffee", price: 8 },
  { description: "Watch a movie", price: 15 },
  { description: "Read", price: 10 },
];

export default function Rewards() {
  const [rewards, setRewards] = useState(testRewards);
  const [newReward, setNewReward] = useState(false);

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

  const onNewReward = function (newReward: RewardType) {
    const newArray = [...rewards, newReward];
    setRewards(newArray);
    setNewReward(false);
  };

  return (
    <div className="w-[95%] mx-auto grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-8">
      {rewards.map((reward, index) => (
        <Reward
          reward={reward}
          index={index}
          onRewardsChange={onRewardsChange}
          onRewardsDelete={onRewardsDelete}
        />
      ))}
      {!newReward ? (
        <div className="bg-[--default-btn-color] border-4 rounded-lg border-[--title-border] flex flex-col py-4 items-center justify-center min-h-56">
          <button
            className="border rounded-[100%] border-[--darker-orange] bg-[--darker-orange] text-white font-bold py-2 px-4 text-xl"
            onClick={() => setNewReward(true)}
          >
            +
          </button>
        </div>
      ) : (
        <Reward
          reward={{ description: "", price: 0 }}
          newReward={true}
          onNewReward={onNewReward}
        />
      )}
    </div>
  );
}
