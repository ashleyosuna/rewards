"use client";

import Coin from "./Coin";
import { IReward } from "@/models/Rewards";
import Icon from "./Icon";
import { useContext } from "react";
import { PointsContext } from "@/app/(main-pages)/layout";
import { buyReward } from "@/dataAccess/rewards";

export default function Reward({
  reward,
  tier,
  color,
}: {
  reward: IReward;
  tier: string;
  color: string;
}) {
  const { points, setPoints } = useContext(PointsContext);

  const onBuy = async function () {
    try {
      if (reward.price > points) return;
      await buyReward(reward._id as string);
      setPoints(points - reward.price);
    } catch (error) {
      console.error("Error buying reward", error);
    }
  };

  return (
    <div
      className={
        "border-4 rounded-lg p-4 flex flex-col gap-2 w-[175px] h-[200px] justify-end bg-[" +
        color +
        "] border-[" +
        color +
        "]"
      }
    >
      <Icon name={reward.icon} className="h-1/3 my-2" />
      <h2 className="text-center font-bold">{reward.title}</h2>
      <button
        className={`border-2 rounded-xl flex flex-row justify-center py-1 gap-1 w-fit px-4 self-center ${
          reward.price > points
            ? "bg-gray-300 border-gray-300 opacity-50"
            : color === "--green-color"
            ? "bg-[--purple-color] border-[--purple-color] hover:scale-110"
            : "bg-[--green-color] border-[--green-color] hover:scale-110"
        }`}
        disabled={reward.price > points}
        onClick={onBuy}
      >
        <Coin size="sm" />
        {reward.price}
      </button>
    </div>
  );
}
