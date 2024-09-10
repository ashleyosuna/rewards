import { createHabit } from "@/dataAccess/habits";

export default async function CreateHabitForm() {
  async function submitTask(formData: FormData) {
    "use server";
    try {
      const title = formData.get("title") as string;
      const points = formData.get("points") as unknown as number;
      if (title && points) await createHabit(title, points);
    } catch (error) {
      console.error("Error creating task", error);
    }
  }

  return (
    <form action={submitTask} className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 justify-evenly">
        <label className="w-1/6 py-1">Title:</label>
        <input
          type="text"
          name="title"
          className="w-5/6 border rounded-md border-gray-300 px-2 py-1"
        ></input>
      </div>
      <div className="flex flex-row gap-2 justify-evenly">
        <label className="w-1/6 py-1">Points:</label>
        <input
          type="number"
          name="points"
          className="w-5/6 border rounded-md border-gray-300 px-2 py-1"
        ></input>
      </div>
      <button className="border-2 rounded-md w-fit self-center shadow-md px-8 font-bold py-1 hover:scale-110 border-[#FFD3E8] bg-[#FFD3E8]">
        Create
      </button>
    </form>
  );
}
