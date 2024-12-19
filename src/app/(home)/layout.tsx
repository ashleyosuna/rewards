"use client";

import Navbar from "@/components/Navbar";
import TabsContext from "@/contexts/tabsContext";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currTab, setTab] = useState<"tasks" | "rewards">("tasks");
  return (
    <TabsContext.Provider value={{ currTab: currTab, setTab: setTab }}>
      <div className="">
        <Navbar />
        {children}
      </div>
    </TabsContext.Provider>
  );
}
