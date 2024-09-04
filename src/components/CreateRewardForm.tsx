"use client";

import { useState } from "react";
import Icon from "./Icon";
import { createReward } from "@/dataAccess/rewards";
const iconOptions = [
  "coffee",
  "clothes",
  "music",
  "trip",
  "heart",
  "book",
  "shopping",
  "treat",
];

export default function CreateRewardForm() {
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0]);

  async function submitReward(formData: FormData) {
    try {
      const title = formData.get("title") as string;
      const price = formData.get("price") as unknown as number;
      if (title && price) await createReward(title, price, selectedIcon);
    } catch (error) {
      console.error("Error creating task", error);
    }
  }

  return (
    <form action={submitReward} className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 justify-evenly">
        <label className="w-1/6 py-1">Title:</label>
        <input
          type="text"
          name="title"
          className="w-5/6 border rounded-md border-gray-300 px-2 py-1"
        ></input>
      </div>
      <div className="flex flex-row gap-2 justify-evenly">
        <label className="w-1/6 py-1">Price:</label>
        <input
          type="number"
          name="price"
          className="w-5/6 border rounded-md border-gray-300 px-2 py-1"
        ></input>
      </div>
      <div className="flex flex-row gap-2 justify-evenly">
        <label>Icon:</label>
        <div className="flex flex-row gap-2 container">
          {iconOptions.map((icon) => (
            <div
              key={icon}
              className={`border-2 rounded-md flex flex-col justify-center p-1 ${
                icon === selectedIcon
                  ? "border-[--pink-color] bg-[--pink-color]"
                  : "border-gray-100"
              }`}
              onClick={() => setSelectedIcon(icon)}
            >
              <Icon name={icon} className="w-[25px]" />
            </div>
          ))}
        </div>
      </div>
      <button className="border-2 rounded-md w-fit self-center shadow-md px-8 font-bold py-1 hover:scale-110 border-[#FFD3E8] bg-[#FFD3E8]">
        Create
      </button>
    </form>
  );
}
