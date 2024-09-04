import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import Coin from "./Coin";
import { IReward } from "@/models/Rewards";
import Icon from "./Icon";

export default function Reward({ reward }: { reward: IReward }) {
  return (
    <div className="border-4 rounded-lg p-4 flex flex-col gap-2 w-[175px] h-[200px] justify-end bg-[--purple-color] border-[--green-color]">
      {/* <FontAwesomeIcon icon={faMugHot} className="h-1/2" /> */}
      <Icon name={reward.icon} className="h-1/2" />
      <h2 className="text-center font-bold">{reward.title}</h2>
      <button className="border-2 rounded-xl flex flex-row justify-center py-1 gap-1 w-fit px-4 self-center hover:scale-110 bg-[--green-color]">
        <Coin size="sm" />
        {reward.price}
      </button>
    </div>
  );
}
