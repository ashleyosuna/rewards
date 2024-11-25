const tasks = [
  { description: "Go for a run", coins: 15, completed: false },
  { description: "Go gift shopping", coins: 10, completed: true },
];

export default function Tasks() {
  const DEFAULT_LINES = 15;
  const remaining_lines = [];

  for (let i = 0; i < DEFAULT_LINES - tasks.length; i++)
    remaining_lines.push(i);

  return (
    <div className="w-[95%] sm:w-3/4 md:w-2/3 lg:1/2 mx-auto my-8 rounded-lg h-[80dvh] min-h-fit border-[--title-border] border-4">
      <div className="bg-[--title-background] py-2 font-bold text-xl border-b-4 border-[--title-border] text-center">
        To-do list
      </div>
      <div className="py-2 px-4 bg-[--default-btn-color] h-full">
        {tasks.map((task, i) => (
          <div className="flex gap-4 h-8 align-bottom" key={`task${i}`}>
            {/* <input
              type="checkbox"
              defaultChecked={task.completed}
              className="accent-[--title-border] scale-150 border border-[--title-border]"
            ></input> */}
            <div className="flex">
              <input
                type="checkbox"
                className="peer relative appearance-none w-5 h-5 
                          border rounded-md border-[--title-border] 
                          cursor-pointer  
                          checked:bg-[--title-background]"
                defaultChecked={task.completed}
                id="circular-checkbox"
              />

              {/* <label
                htmlFor="circular-checkbox"
                className="ms-2 text-sm font-medium "
              ></label> */}
            </div>
            <div className="border-b-2 border-[--title-border] w-full flex flex-col justify-end font-bold text-[--darker-orange]">
              {task.description}
            </div>
          </div>
        ))}
        {remaining_lines.map((_, i) => (
          <div className="flex gap-4 h-8" key={`line${i}`}>
            <input
              type="checkbox"
              defaultChecked={false}
              className="scale-150"
              disabled={true}
            ></input>
            <span className="border-b-2 border-[--title-border] w-full"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
