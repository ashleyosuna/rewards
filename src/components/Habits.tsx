import { getHabits } from "@/dataAccess/habits";
import CreateHabitForm from "./CreateHabitForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { IHabit } from "@/models/Habit";
import Habit from "./Habit";

export default async function Habits() {
  const habits = await getHabits();

  return (
    <div className="bg-[--green-color] flex flex-col justify-evenly gap-4 p-6 rounded-md border-4 border-[--pink-color] h-full">
      <div className="bg-[--pink-color] p-2">
        <h1>Other to-dos and daily habits</h1>
      </div>
      <div className="h-4/5 min-w-full">
        <table className="min-w-full">
          <tbody>
            <tr>
              <th></th>
              <th className="text-left">Task</th>
              <th className="">Points</th>
              <th></th>
            </tr>
            {habits.map((habit: IHabit) => (
              <tr key={habit._id}>
                <Habit habit={habit} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-[--pink-color] px-2 py-1 font-bold self-center border-2 rounded-lg border-[--purple-color] hover:scale-110 max-w-fit mx-auto">
            New Habit
          </div>
        </DialogTrigger>
        <DialogContent className="bg-[--background]">
          <DialogHeader>
            <DialogTitle>New Habit</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CreateHabitForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
