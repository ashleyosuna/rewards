"use client";

import { useContext, useEffect, useState } from "react";
import Reward from "./Reward";
import { RewardType } from "@/types";
import UserContext from "@/contexts/userContext";
import {
  createReward,
  deleteReward,
  fetchRewards,
  updateReward,
} from "@/dataAccess/reward";

export default function Rewards() {
  const [rewards, setRewards] = useState<RewardType[]>([]);
  const [newReward, setNewReward] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const initRewards = async function () {
      try {
        const rewards = await fetchRewards(user?._id);
        if (rewards?.status === 200) setRewards(rewards.data);
        else if (rewards?.status === 500) throw Error();
      } catch (error) {
        console.error("Error fetching rewards", error);
      }
    };

    initRewards();
  }, []);

  const onRewardsChange = async function (
    newReward: RewardType,
    index: number
  ) {
    try {
      const res = await updateReward(newReward);
    } catch (error) {
      console.error("Error updating reward", error);
    }
  };

  const onRewardsDelete = async function (index: number) {
    try {
      const rewardId = rewards.at(index)?._id;
      const res = await deleteReward(rewardId);
      if (res.status === 200) {
        const newArray = rewards.toSpliced(index, 1);
        setRewards(newArray);
      } else {
        throw Error();
      }
    } catch (error) {
      console.error("Error deleting reward", error);
    }
  };

  const onNewReward = async function (newReward: RewardType) {
    try {
      const reward = { ...newReward, user: user?._id };
      const res = await createReward(reward);
      if (res.status === 500) throw Error();
      const newRewards = [...rewards, res.data];
      setRewards(newRewards);
    } catch (error) {
      console.error("Error creating new reward", error);
    }
  };

  return (
    <div className="w-[95%] mx-auto grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-8">
      {rewards.map((reward, index) => (
        <Reward
          key={reward._id}
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
