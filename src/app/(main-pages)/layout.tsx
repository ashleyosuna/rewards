"use client";

import Menu from "@/components/Menu";
import { calculatePoints } from "@/dataAccess/stats";
import { createContext, useEffect, useState } from "react";

export const PointsContext = createContext({
  points: 0,
  setPoints: (arg: number) => {},
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    async function init() {
      try {
        const points = await calculatePoints();
        console.log("points are", points);
        setPoints(points);
      } catch (error) {
        console.error("Error calculating points", error);
      }
    }

    init();
  }, []);

  return (
    <PointsContext.Provider value={{ points, setPoints }}>
      <div className="flex flex-col">
        <Menu />
        {children}
      </div>
    </PointsContext.Provider>
  );
}
