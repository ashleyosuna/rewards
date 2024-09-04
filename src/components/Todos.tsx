import { getTasks } from "@/dataAccess/tasks";
import { ITask } from "@/models/Task";
import Todo from "./Todo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import CreateTaskForm from "./CreateTaskForm";

export default async function Todos() {
  const res = await getTasks();
  const tasks = res.status === 200 ? res.data : [];

  return (
    <div className="flex flex-col justify-evenly gap-4 p-6 rounded-md border border-[#FFD3E8] bg-[#FFD3E8] h-full">
      <div className="bg-[#F3FFE1] border-[#DFFFD6] p-2">
        <h1>Today's Todos</h1>
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
            {tasks.map((task: ITask) => (
              <tr key={task._id}>
                <Todo task={task} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-[#F3FFE1] px-2 py-1 font-bold self-center border-2 rounded-lg border-[#DFFFD6] hover:scale-110 max-w-fit mx-auto">
            New Task
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <CreateTaskForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
