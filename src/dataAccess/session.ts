"use server";

import { SessionPayload } from "@/types";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Error decrypting session", error);
  }
}

export async function clearSession() {
  cookies().delete("session");
}

export async function getUserSession() {
  try {
    const session = cookies().get("session")?.value;
    const decrypted = await decrypt(session);
    return decrypted?.userId;
  } catch (error) {
    console.error("Error getting user session", error);
  }
}
