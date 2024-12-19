"use client";

import UserContext from "@/contexts/userContext";
import { useContext } from "react";

export default function Total() {
  const { user } = useContext(UserContext);

  return (
    <div className="rounded-xl border-4 border-[--darker-orange] bg-[--default-btn-color] w-fit py-1 px-4 text-[--darker-orange] font-bold">
      ${user?.total?.toString() ?? 0}
    </div>
  );
}
