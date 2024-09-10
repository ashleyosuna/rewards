"use client";

import { deleteTask, toggleCompleteTask } from "@/dataAccess/tasks";
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

  async function onDelete() {
    try {
      await deleteTask(task._id as string);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  }

  return (
    <>
      <td className="flex flex-col justify-center my-2">
        <input
          type="checkbox"
          onChange={toggleComplete}
          defaultChecked={task.completed}
        />
      </td>
      <td>{task.title}</td>
      <td className="flex flex-row justify-center gap-1">
        <Coin size="sm" />
        {task.points}
      </td>
      <td>
        <button onClick={onDelete} className="hover:scale-110">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </>
  );
}
