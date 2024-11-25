"use client";

import Tasks from "@/components/Tasks";
import TabsContext from "@/contexts/tabsContext";
import { useContext } from "react";

export default function Home() {
  const { currTab } = useContext(TabsContext);
  return <>{currTab === "tasks" ? <Tasks /> : <p>Here</p>}</>;
}
