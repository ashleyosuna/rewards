import { Dispatch, SetStateAction, createContext } from "react";

type tabsContext = {
  currTab: "tasks" | "rewards";
  setTab: Dispatch<SetStateAction<"tasks" | "rewards">>;
};

const TabsContext = createContext<tabsContext>({
  currTab: "tasks",
  setTab: () => {},
});
export default TabsContext;
