"use client";

import Coin from "./Coin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculatePoints } from "@/dataAccess/stats";
import { useContext, useEffect, useState } from "react";
import { PointsContext } from "@/app/(main-pages)/layout";

export default function Menu() {
  const pathname = usePathname();
  const { points, setPoints } = useContext(PointsContext);

  return (
    <div className="flex flex-row justify-end px-8 gap-4 bg-[--purple-color] h-[65px]">
      <div className="flex flex-row border-2 rounded-xl py-1 px-2 gap-1 bg-[--green-color] my-auto">
        <Coin size="sm" />
        {points}
      </div>
      <div className="flex flex-row border-2 rounded-xl py-1 px-2 bg-[--green-color] hover:scale-110 my-auto">
        <Link href={pathname === "/home" ? "/reward-store" : "/home"}>
          <FontAwesomeIcon
            icon={pathname === "/home" ? faGift : faHouse}
            className="self-center mr-1 max-w-[20px]"
          />
          {pathname === "/home" ? "Reward Store" : "Home"}
        </Link>
      </div>
    </div>
  );
}
