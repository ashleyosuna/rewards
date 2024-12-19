"use client";

import Navbar from "@/components/Navbar";
import TabsContext from "@/contexts/tabsContext";
import UserContext from "@/contexts/userContext";
import getUser from "@/dataAccess/user";
import { User } from "@/types";
import { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currTab, setTab] = useState<"tasks" | "rewards">("tasks");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const init = async function () {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        console.error("Error getting user information", error);
      }
    };
    init();
  }, []);
  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <TabsContext.Provider value={{ currTab: currTab, setTab: setTab }}>
        <div className="">
          <Navbar />
          {children}
        </div>
      </TabsContext.Provider>
    </UserContext.Provider>
  );
}
