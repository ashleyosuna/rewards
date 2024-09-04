"use client";

import { toggleCompleteTask } from "@/dataAccess/tasks";
import { ITask } from "@/models/Task";
import Coin from "./Coin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "./ui/checkbox";

export default function Todo({ task }: { task: ITask }) {
  async function toggleComplete(e: any) {
    try {
      await toggleCompleteTask(task._id as string, e.target.checked);
    } catch (error) {
      console.error("Error toggling task completion", error);
    }
  }

  async function deleteTask() {
    return;
  }

  return (
    <>
      <td className="flex flex-col justify-center my-2">
        <Checkbox onChange={toggleComplete} />
      </td>
      <td>{task.title}</td>
      <td className="flex flex-row justify-center gap-1">
        <Coin size="sm" />
        {task.points}
      </td>
      <td>
        <button onClick={deleteTask} className="hover:scale-110">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </>
  );
}
