import TabsContext from "@/contexts/tabsContext";
import { useContext } from "react";
import Total from "./Total";
import UserContext from "@/contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { logout } from "@/dataAccess/auth";

export default function Navbar() {
  const { currTab, setTab } = useContext(TabsContext);

  const onLogout = async function () {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging user out", error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-row justify-center gap-6 py-2 relative">
        <button
          className={`text-xl py-2 px-4 rounded-lg font-bold ${
            currTab === "tasks"
              ? "bg-[--default-btn-color]"
              : "hover:bg-gray-200"
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
        <button
          className="absolute right-4 h-full flex flex-col justify-center"
          onClick={onLogout}
        >
          <FontAwesomeIcon icon={faSignOut} />
        </button>
      </div>
      <div className="text-right pr-6 flex justify-end">
        <Total />
      </div>
    </>
  );
}
