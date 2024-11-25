import TabsContext from "@/contexts/tabsContext";
import { useContext } from "react";

export default function Navbar() {
  const { currTab, setTab } = useContext(TabsContext);

  return (
    <div className="w-full flex flex-row justify-center gap-6 py-2">
      <button
        className={`text-xl py-2 px-4 rounded-lg font-bold ${
          currTab === "tasks" ? "bg-[--default-btn-color]" : "hover:bg-gray-200"
        }`}
        onClick={() => setTab("tasks")}
      >
        TASKS
      </button>
      <button
        className={`text-xl py-2 px-4 rounded-lg font-bold ${
          currTab === "rewards"
            ? "bg-[--default-btn-color]"
            : "hover:bg-gray-200"
        }`}
        onClick={() => setTab("rewards")}
      >
        REWARDS
      </button>
    </div>
  );
}
