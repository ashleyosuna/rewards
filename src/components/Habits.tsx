import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function Habits() {
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
          </tbody>
        </table>
      </div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-[--pink-color] px-2 py-1 font-bold self-center border-2 rounded-lg border-[--purple-color] hover:scale-110 max-w-fit mx-auto">
            New Task
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
