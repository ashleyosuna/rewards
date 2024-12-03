"use server";

import Task from "@/models/Task";
import User from "@/models/User";
import { TaskType } from "@/types";

export async function createTask(task: TaskType) {
  try {
    await Task.create(task);
    return { status: 200 };
  } catch (error) {
    console.error("Error creating new task", error);
    return { status: 500 };
  }
}

export async function getUserTasks(userId?: string) {
  if (!userId) return [];
  try {
    const userTasks = await Task.find({ user: userId });
    return JSON.parse(JSON.stringify(userTasks));
  } catch (error) {
    console.error("Error getting user tasks", error);
    return [];
  }
}

export async function updateTask(task: TaskType) {
  if (!task._id) return { status: 400 };
  try {
    await Task.updateOne({ _id: task._id }, task);
    return { status: 200 };
  } catch (error) {
    console.error("Error updating task", error);
    return { status: 500 };
  }
}

export async function completeTask(task: TaskType, completed: boolean) {
  if (!task._id) return { status: 400 };
  try {
    await Task.updateOne({ _id: task._id }, { completed: completed });
    await User.updateOne({ _id: task.user }, [
      {
        $set: {
          total: {
            $sum: ["$total", Number(completed ? task.price : -task.price)],
          },
        },
      },
    ]);
    return { status: 200 };
  } catch (error) {
    console.error("Error completing task", error);
    return { status: 500 };
  }
}
