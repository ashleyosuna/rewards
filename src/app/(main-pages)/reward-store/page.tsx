import Reward from "@/components/Reward";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateRewardForm from "@/components/CreateRewardForm";
import { getRewards } from "@/dataAccess/rewards";

export default async function Page() {
  const rewards = await getRewards();
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
                <Reward reward={reward} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-[20px]" />
          <CarouselNext className="mr-[20px]" />
        </Carousel>
      </div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-[#F3FFE1] px-2 py-1 font-bold self-center border-2 rounded-lg border-[#DFFFD6] hover:scale-110 max-w-fit mx-auto">
            New Reward
          </div>
        </DialogTrigger>
        <DialogContent className="bg-[--background]">
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CreateRewardForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
