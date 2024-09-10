"use client";

import Coin from "./Coin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "./ui/checkbox";
import { IHabit } from "@/models/Habit";
import { deleteHabit, toggleCompleteHabit } from "@/dataAccess/habits";

export default function Habit({ habit }: { habit: IHabit }) {
  async function toggleComplete(e: any) {
    try {
      await toggleCompleteHabit(habit._id as string, e.target.checked);
    } catch (error) {
      console.error("Error toggling task completion", error);
    }
  }

  async function onDelete() {
    try {
      await deleteHabit(habit._id as string);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  }

  return (
    <>
      <td className="flex flex-col justify-center my-2">
        {/* <Checkbox onChange={toggleComplete} /> */}
        <input
          type="checkbox"
          onChange={toggleComplete}
          defaultChecked={habit.completed}
        />
      </td>
      <td>{habit.title}</td>
      <td className="flex flex-row justify-center gap-1">
        <Coin size="sm" />
        {habit.points}
      </td>
      <td>
        <button onClick={onDelete} className="hover:scale-110">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </>
  );
}
