"use server";

import User from "@/models/User";
import connect from "./dbConnect";
import { getUserSession } from "./session";

export default async function getUser() {
  try {
    await connect();
    const id = await getUserSession();
    if (!id) throw Error("Error getting user session");
    const user = await User.findOne({ _id: id });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error getting user data", error);
    return;
  }
}
