"use server";

import { Task } from "@/models/Task";
import { dbConnection } from "./dbConnect";
import { httpResponse } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createTask(title: string, points: number) {
  try {
    await dbConnection();
    await Task.create({ title: title, points: points });
    revalidatePath("/home");
    return httpResponse({ status: 200 });
  } catch (error) {
    console.error("Error creating task", error);
    return httpResponse({ status: 500 });
  }
}

export async function getTasks() {
  try {
    await dbConnection();
    const tasks = await Task.find();
    return httpResponse({
      status: 200,
      data: JSON.parse(JSON.stringify(tasks)),
    });
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

export async function deleteTask(taskID: string) {
  try {
    await dbConnection();
    await Task.deleteOne({ _id: taskID });
    revalidatePath("/home");
  } catch (error) {
    console.error("Error deleting task", error);
  }
}
