import { getRewards } from "@/dataAccess/rewards";
import { IReward } from "@/models/Rewards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Reward from "./Reward";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import CreateRewardForm from "./CreateRewardForm";

export default async function RewardRow({
  rewards,
  tier,
  color,
}: {
  rewards: IReward[];
  tier: string;
  color: string;
}) {
  return (
    <>
      <div className="w-full container">
        <Carousel opts={{ align: "center", loop: true }} className="px-8">
          <CarouselContent>
            {rewards.map((reward) => (
              <CarouselItem
                key={reward.title}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <Reward reward={reward} tier={tier} color={color} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-[20px]" />
          <CarouselNext className="mr-[20px]" />
        </Carousel>
      </div>
    </>
  );
}
