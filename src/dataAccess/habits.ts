"use server";

import { Habit } from "@/models/Habit";
import { dbConnection } from "./dbConnect";
import { revalidatePath } from "next/cache";

export async function createHabit(title: string, points: number) {
  try {
    console.log("here");
    await dbConnection();
    await Habit.create({ title: title, points: points });
    revalidatePath("/home");
  } catch (error) {
    console.error("Error creating habit", error);
  }
}

export async function getHabits() {
  try {
    await dbConnection();
    const habits = await Habit.find();
    return JSON.parse(JSON.stringify(habits));
  } catch (error) {
    console.error("Error fetching habits", error);
    return [];
  }
}

export async function toggleCompleteHabit(habitID: string, completed: boolean) {
  try {
    await dbConnection();
    await Habit.updateOne({ _id: habitID }, { completed: completed });
  } catch (error) {
    console.error("Error upading task", error);
  }
}

export async function deleteHabit(habitID: string) {
  try {
    await dbConnection();
    await Habit.deleteOne({ _id: habitID });
    revalidatePath("/home");
  } catch (error) {
    console.error("Error deleting habit", error);
  }
}
