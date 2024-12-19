"use server";

import User from "@/models/User";
import { AuthType } from "@/types";
import bcryptjs from "bcryptjs";
import { clearSession, createSession } from "./session";
import { redirect } from "next/navigation";

export async function login(signInData: AuthType) {
  let success = false;
  const { username, password } = signInData;
  try {
    const userExists = await User.findOne({ username: username });
    if (!userExists) {
    } else {
      const passwordsMatch = await bcryptjs.compare(
        password,
        userExists.password
      );
      if (!passwordsMatch) {
      } else {
        await createSession(userExists._id);
        success = true;
      }
    }
  } catch (error) {
    console.error("Error logging in user", error);
  } finally {
    if (success) redirect("/home");
  }
}

export async function register(registerData: AuthType) {
  const { username, password } = registerData;
  const hashedPassword = await bcryptjs.hash(password, 10);
  let success = false;

  try {
    const user = await User.create({
      username: username,
      password: hashedPassword,
    });
    await createSession(user._id);
    success = true;
  } catch (error) {
    console.error("Error registering user", error);
  } finally {
    redirect("/home");
  }
}

export async function logout() {
  await clearSession();
  redirect("/auth");
}
