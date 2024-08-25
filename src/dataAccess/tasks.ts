import Task from "@/models/Task";
import { dbConnection } from "./dbConnect";
import { httpResponse } from "@/lib/utils";

export async function createTask(title: string, points: number) {
  try {
    await dbConnection();
    await Task.create({ title: title, points: points });
    return httpResponse({ status: 200 });
  } catch (error) {
    console.error("Error creating task", error);
    return httpResponse({ status: 500 });
  }
}

export async function getTasks() {
  try {
    console.log("getting tasks");
    await dbConnection();
    const tasks = await Task.find({});
    return httpResponse({ status: 200, data: tasks });
  } catch (error) {
    console.error("Error fetching tasks", error);
    return httpResponse({ status: 500 });
  }
}

export async function toggleCompleteTask(taskId: string, completed: boolean) {
  try {
    await dbConnection();
    await Task.updateOne({ _id: taskId }, { completed: completed });
    return httpResponse({ status: 200 });
  } catch (error) {
    console.error("Error upading task", error);
    return httpResponse({ status: 500 });
  }
}
