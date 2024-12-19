"use client";

import UserContext from "@/contexts/userContext";
import { buyReward } from "@/dataAccess/reward";
import { RewardType } from "@/types";
import { faGift, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

type RewardProps = {
  reward: RewardType;
  index?: number;
  onRewardsChange?: (arg0: RewardType, arg1: number) => void;
  onRewardsDelete?: (arg0: number) => void;
  onNewReward?: (org0: RewardType) => void;
  newReward?: boolean;
};

export default function Reward({
  reward,
  index,
  onRewardsChange,
  onRewardsDelete,
  onNewReward,
  newReward,
}: RewardProps) {
  const [edit, setEdit] = useState(newReward ?? false);
  const [thisReward, setThisReward] = useState(reward);
  const { user, setUser } = useContext(UserContext);

  const onRewardChange = function () {
    if (!newReward && onRewardsChange && index != void 0) {
      onRewardsChange(thisReward, index);
    } else if (newReward && onNewReward) {
      onNewReward(thisReward);
      // reset placeholder reward values
      setThisReward({ description: "", price: 0 });
    }
    setEdit(false);
  };

  const onBuy = async function () {
    try {
      const res = await buyReward(user?._id, reward.price);
      if (res.status === 200 && user) {
        const updatedUser = { ...user, total: user.total - reward.price };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error buying reward", error);
    }
  };

  return (
    <div className="bg-[--default-btn-color] border-4 rounded-lg border-[--title-border] flex flex-col py-4 items-center min-h-56">
      <FontAwesomeIcon
        icon={faGift}
        className="sm:text-6xl text-4xl text-[--darker-orange]"
      />
      <input
        type="text"
        className="w-full text-center font-bold text-[--darker-orange] mt-2 mb-[-4px] bg-inherit focus:outline-none placeholder:text-[--darker-orange] placeholder:opacity-60"
        defaultValue={thisReward.description ?? ""}
        placeholder={!thisReward.description ? "New Reward" : ""}
        disabled={!edit}
        onChange={(e) =>
          setThisReward({ ...thisReward, description: e.target.value })
        }
      />
      <span className="flex gap-1 justify-center items-baseline">
        <p className="text-[--darker-orange] font-bold">$</p>
        <input
          type="number"
          className="w-10 text-center font-bold text-[--darker-orange] mb-2 bg-inherit focus:outline-none placeholder:text-[--darker-orange] placeholder:opacity-60"
          defaultValue={thisReward.price != 0 ? thisReward.price : ""}
          placeholder={!thisReward.price ? "0" : ""}
          disabled={!edit}
          onChange={(e) =>
            setThisReward({ ...thisReward, price: Number(e.target.value) })
          }
        />
      </span>
      <button
        className="border-2 rounded-lg border-[--darker-orange] bg-[--darker-orange] text-white font-bold w-28 disabled:opacity-50"
        disabled={!edit && (!user || user.total < reward.price)}
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
          onClick={() => {
            if (onRewardsDelete && index != void 0) onRewardsDelete(index);
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="text-white text-xs" />
        </button>
      </span>
    </div>
  );
}
