"use server";

import User from "@/models/User";
import connect from "./dbConnect";

export default async function getUser() {
  try {
    await connect();
    const user = await User.findOne();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error getting user data", error);
    return;
  }
}
