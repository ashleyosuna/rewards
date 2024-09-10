import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateRewardForm from "@/components/CreateRewardForm";
import { getRewards, getRewards1 } from "@/dataAccess/rewards";
import RewardRow from "@/components/RewardRow";
import { IReward } from "@/models/Rewards";
import { colorOptions } from "@/lib/constants";

export default async function Page() {
  let rewards: { [key: string]: IReward[] } = {};

  const init = async function () {
    try {
      const rewardsRes = await getRewards1();
      rewards = rewardsRes;
    } catch (error) {
      console.error("Error fecthing rewards", error);
    }
  };

  await init();

  return (
    <div className="flex flex-col gap-6 my-6">
      {Object.entries(rewards).map(([key, rewards], index) => (
        <RewardRow
          rewards={rewards}
          key={key}
          tier={key}
          color={colorOptions[index % 3]}
        />
      ))}
      <Dialog>
        <DialogTrigger>
          <div className="bg-[#F3FFE1] px-2 py-1 font-bold border-2 rounded-lg border-[#DFFFD6] hover:scale-110 max-w-fit mx-auto self-center">
            New Reward
          </div>
        </DialogTrigger>
        <DialogContent className="bg-[--background]">
          <DialogHeader>
            <DialogTitle>New Reward</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CreateRewardForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
