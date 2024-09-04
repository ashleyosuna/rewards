import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import Coin from "./Coin";

export default function Reward() {
  const title = "Coffee";
  const price = 5;

  return (
    <div className="border-2 rounded-md p-4 flex flex-col gap-2 w-[175px] h-[200px] justify-center">
      <FontAwesomeIcon icon={faMugHot} className="h-1/2" />
      <h2 className="text-center font-bold">{title}</h2>
      <button className="border-2 rounded-xl flex flex-row justify-center py-1 gap-1 w-fit px-4 self-center">
        <Coin size="sm" />
        {price}
      </button>
    </div>
  );
}
