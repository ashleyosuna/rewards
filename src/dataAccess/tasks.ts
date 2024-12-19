"use server";

import Task from "@/models/Task";
import User from "@/models/User";
import { TaskType } from "@/types";

export async function createTask(task: TaskType) {
  try {
    const taskDoc = await Task.create(task);
    return { status: 200, data: taskDoc };
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
  const session = await User.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    await User.updateOne(
      { _id: task.user },
      [
        {
          $set: {
            total: {
              $sum: ["$total", Number(completed ? task.price : -task.price)],
            },
          },
        },
      ],
      opts
    );
    await Task.updateOne({ _id: task._id }, { completed: completed }, opts);
    await session.commitTransaction();
    session.endSession();
    return { status: 200 };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error completing task", error);
    return { status: 500 };
  }
}

export async function deleteTask(taskId: string | undefined) {
  if (!taskId) return { status: 400 };
  try {
    await Task.deleteOne({ _id: taskId });
    return { status: 200 };
  } catch (error) {
    console.error("Error deleting task", error);
    return { status: 500 };
  }
}
