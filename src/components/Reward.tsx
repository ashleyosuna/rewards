"use client";

import { RewardType } from "@/types";
import { faGift, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type RewardProps = {
  reward: RewardType;
  index: number;
  onRewardsChange: (arg0: RewardType, arg1: number) => void;
  onRewardsDelete: (arg0: number) => void;
};

export default function Reward({
  reward,
  index,
  onRewardsChange,
  onRewardsDelete,
}: RewardProps) {
  const [edit, setEdit] = useState(false);
  const [thisReward, setThisReward] = useState(reward);

  const onRewardChange = function () {
    onRewardsChange(thisReward, index);
    setEdit(false);
  };

  const onBuy = function () {};

  return (
    <div className="bg-[--default-btn-color] border-2 rounded-lg border-[--title-border] flex flex-col py-4 items-center">
      <FontAwesomeIcon icon={faGift} className="sm:text-6xl text-4xl" />
      <input
        type="text"
        className="w-full text-center font-bold text-[--darker-orange] mt-2 mb-[-4px] bg-inherit focus:outline-none"
        value={thisReward.description}
        disabled={!edit}
        onChange={(e) =>
          setThisReward({ ...thisReward, description: e.target.value })
        }
      />
      <span className="flex gap-1 justify-center items-baseline">
        <p className="text-[--darker-orange] font-bold">$</p>
        <input
          type="number"
          className="w-10 text-center font-bold text-[--darker-orange] mb-2 bg-inherit focus:outline-none"
          value={thisReward.price}
          disabled={!edit}
          onChange={(e) =>
            setThisReward({ ...thisReward, price: Number(e.target.value) })
          }
        />
      </span>
      <button
        className="border-2 rounded-lg border-[--darker-orange] bg-[--darker-orange] text-white font-bold w-28"
        onClick={edit ? onRewardChange : onBuy}
      >
        {edit ? "Save" : "Buy"}
      </button>
      <span className="flex gap-2 justify-evenly w-28 mt-1">
        <button
          className="bg-[--darker-orange] border-2 rounded-lg w-full border-[--darker-orange] disabled:opacity-50"
          onClick={() => setEdit(true)}
          disabled={edit}
        >
          <FontAwesomeIcon icon={faPencil} className="text-white text-xs" />
        </button>
        <button
          className="bg-[--darker-orange] border-2 rounded-lg w-full border-[--darker-orange] disabled:opacity-50"
          disabled={edit}
          onClick={() => onRewardsDelete(index)}
        >
          <FontAwesomeIcon icon={faTrash} className="text-white text-xs" />
        </button>
      </span>
    </div>
  );
}
