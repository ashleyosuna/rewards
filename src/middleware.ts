import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./dataAccess/session";

const protectedRoutes = ["/home"];
const publicRoutes = ["/auth"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session")?.value;
  const decrypted = await decrypt(cookie);

  if (isProtectedRoute && !decrypted?.userId) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  } else if (isPublicRoute && decrypted?.userId) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  return NextResponse.next();
}
