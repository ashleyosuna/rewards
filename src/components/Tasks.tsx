"use client";

import { useState } from "react";
import Checkbox from "./Checkbox";

const testTasks = [
  { description: "Go for a run", coins: 15, completed: false },
  { description: "Go gift shopping", coins: 10, completed: true },
];

export default function Tasks() {
  const DEFAULT_LINES = 15;

  const [tasks, setTasks] = useState(testTasks);
  const [showInput, setShowInput] = useState(false);
  const [remainingLines, setRemainingLines] = useState(
    new Array(DEFAULT_LINES).fill(0)
  );

  const addTask = function (e) {
    e.preventDefault();
    console.log(e.target.description.value);
    const newTask = {
      description: e.target.description.value,
      coins: e.target.coins.value,
      completed: false,
    };
    setRemainingLines(new Array(DEFAULT_LINES).fill(0));
    setTasks([...tasks, newTask]);
    setShowInput(false);
  };

  return (
    <div className="w-[95%] sm:w-3/4 md:w-2/3 lg:1/2 mx-auto my-8 rounded-lg min-h-fit border-[--title-border] border-4">
      <div className="bg-[--title-background] py-2 font-bold text-xl border-b-4 border-[--title-border] text-center">
        To-do list
      </div>
      <div className="pt-2 pb-4 px-4 bg-[--default-btn-color] h-full">
        {tasks.map((task, i) => (
          <div className="flex gap-4 h-8 align-bottom mb-2" key={`task${i}`}>
            <Checkbox checked={task.completed} />
            <div className="border-b-2 border-[--title-border] w-full flex flex-col justify-end font-bold text-[--darker-orange]">
              <span className="flex">
                <p className="grow">{task.description}</p>
                <p>(${task.coins})</p>
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
                  <input type="text" className="grow" name="description" />
                  <span className="text-[--darker-orange] font-bold">
                    $ <input type="number" className="w-14" name="coins" />
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
