import CreateTaskForm from "@/components/CreateTaskForm";
import Todos from "@/components/Todos";

export default function Page() {
  return (
    <div className="flex flex-row gap-8 justify-evenly h-screen">
      <div className="w-1/2 p-12">
        <Todos />
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}
