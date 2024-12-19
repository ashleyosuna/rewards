"use client";

import Rewards from "@/components/Rewards";
import Tasks from "@/components/Tasks";
import TabsContext from "@/contexts/tabsContext";
import { useContext } from "react";

export default function Home() {
  const { currTab } = useContext(TabsContext);
  return <>{currTab === "tasks" ? <Tasks /> : <Rewards />}</>;
}
