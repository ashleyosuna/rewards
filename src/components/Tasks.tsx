"use client";

import { useContext, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { TaskType } from "@/types";
import {
  completeTask,
  createTask,
  deleteTask,
  getUserTasks,
  updateTask,
} from "@/dataAccess/tasks";
import UserContext from "@/contexts/userContext";
import { useDebouncedCallback } from "use-debounce";

const testTasks = [
  { description: "Go for a run", coins: 15, completed: false },
  { description: "Go gift shopping", coins: 10, completed: true },
];

export default function Tasks() {
  const DEFAULT_LINES = 15;
  const { user, setUser } = useContext(UserContext);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [remainingLines, setRemainingLines] = useState(
    new Array(DEFAULT_LINES).fill(0)
  );

  useEffect(() => {
    const loadTasks = async function () {
      try {
        const tasks = await getUserTasks(user?._id);
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    loadTasks();
  }, [user]);

  const addTask = async function (e: any) {
    e.preventDefault();
    const description = e.target.description.value;
    if (description.length && user?._id) {
      const newTask = {
        description: description,
        price: e.target.coins.value ?? 0,
        completed: false,
        user: user?._id,
      };
      setRemainingLines(new Array(DEFAULT_LINES).fill(0));
      try {
        const res = await createTask(newTask);
        if (res.status === 200) setTasks([...tasks, res.data]);
      } catch (error) {
        console.error("Error creating task", error);
      }
    }
    setShowInput(false);
  };

  const handleTaskChange = useDebouncedCallback(async function (
    newDescription: string,
    index: number
  ) {
    if (newDescription.length) {
      try {
        const updatedTask: TaskType = {
          ...tasks[index],
          description: newDescription,
        };
        await updateTask(updatedTask);
      } catch (error) {
        console.error("Error updating task", error);
      }
    } else {
      try {
        const res = await deleteTask(tasks[index]._id);
        if (res.status === 200) {
          const splicedTasks = tasks.toSpliced(index, 1);
          setTasks(splicedTasks);
        }
      } catch (error) {
        console.error("Error deleting task", error);
      }
    }
  },
  1000);

  const handleTaskPriceChange = useDebouncedCallback(async function (
    newPrice: string,
    index: number
  ) {
    try {
      const updatedTask: TaskType = {
        ...tasks[index],
        price: Number(newPrice),
      };
      await updateTask(updatedTask);
    } catch (error) {
      console.error("Error updating task", error);
    }
  },
  1000);

  const handleCompleteTask = async function (
    index: number,
    completed: boolean
  ) {
    try {
      const task = tasks[index];
      const res = await completeTask(task, completed);
      if (res.status === 200 && user) {
        tasks[index].completed = completed;
        const updatedUser = {
          ...user,
          total:
            user.total + (completed ? tasks[index].price : -tasks[index].price),
        };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="w-[95%] sm:w-3/4 md:w-2/3 lg:1/2 mx-auto my-8 rounded-lg min-h-fit border-[--title-border] border-4">
      <div className="bg-[--title-background] py-2 font-bold text-xl border-b-4 border-[--title-border] text-center">
        To-do list
      </div>
      <div className="pt-2 pb-4 px-4 bg-[--default-btn-color] h-full">
        {tasks.map((task, i) => (
          <div className="flex gap-4 h-8 align-bottom mb-2" key={`task${i}`}>
            <Checkbox
              checked={task.completed}
              onChange={(checked: boolean) => handleCompleteTask(i, checked)}
            />
            <div className="border-b-2 border-[--title-border] w-full flex flex-col justify-end font-bold text-[--darker-orange]">
              <span className="flex">
                <input
                  type="text"
                  className="grow bg-[--default-button-color] focus:outline-none px-1"
                  defaultValue={task.description}
                  onChange={(e) => {
                    handleTaskChange(e.target.value, i);
                  }}
                ></input>
                <span>
                  $
                  <input
                    type="number"
                    className="bg-[--default-button-color] w-14 focus:outline-none px-1"
                    defaultValue={task.price}
                    onChange={(e) => handleTaskPriceChange(e.target.value, i)}
                  ></input>
                </span>
              </span>
            </div>
          </div>
        ))}
        {remainingLines.map((_, i) => (
          <div className="flex gap-4 h-8 mb-2 relative" key={`line${i}`}>
            {i === 0 && !showInput ? (
              <div className="flex absolute justify-center w-full">
                <button
                  className="px-2 bg-[--title-border] text-white rounded-md font-bold"
                  onClick={() => setShowInput(true)}
                >
                  +
                </button>
              </div>
            ) : (
              <></>
            )}
            <Checkbox disabled={true} />
            <span className="border-b-2 border-[--title-border] w-full">
              {i === 0 && showInput ? (
                <form className="flex flex-row gap-4" onSubmit={addTask}>
                  <input
                    type="text"
                    className="grow focus:outline-none px-1 bg-[--default-btn-color] text-[--darker-orange] font-bold"
                    name="description"
                  />
                  <span className="text-[--darker-orange] font-bold">
                    ${" "}
                    <input
                      type="number"
                      className="w-14 focus:outline-none px-1 bg-[--default-btn-color] text-[--darker-orange] font-bold"
                      name="coins"
                    />
                  </span>
                  <button
                    className="h-6 w-6 bg-[--title-border] text-white rounded-md font-bold relative"
                    type="submit"
                  >
                    <svg
                      className="absolute h-4 w-4 pointer-events-none top-1 left-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                </form>
              ) : (
                <></>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
