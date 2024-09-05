import Habits from "@/components/Habits";
import Todos from "@/components/Todos";

export default function Page() {
  return (
    <div className="flex flex-row gap-8 justify-evenly p-12 h-[calc(100dvh-70px)]">
      <div className="w-1/2">
        <Todos />
      </div>
      <div className="w-1/2">
        <Habits />
      </div>
    </div>
  );
}
