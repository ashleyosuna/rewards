"use client";
import { Dispatch, SetStateAction } from "react";

export default function SignIn({
  toRegister,
}: {
  toRegister: Dispatch<SetStateAction<"signIn" | "register">>;
}) {
  return (
    <form className="border-2 border-[--default-btn-color] rounded-lg bg-[--default-btn-color] p-6 flex flex-col gap-4 w-1/2">
      <h1 className="font-bold text-lg">Sign In</h1>
      <div>
        <div className="font-bold">Username</div>
        <input
          type="text"
          className="w-full p-1 rounded-md bg-[--background]"
        />
      </div>
      <div>
        <div className="font-bold">Password</div>
        <input
          type="password"
          className="w-full p-1 rounded-md bg-[--background]"
        />
      </div>
      <div className="text-sm">
        Don't have an account? Register{" "}
        <span className="underline" onClick={() => toRegister("register")}>
          here
        </span>
        .
      </div>
      <div className="flex justify-center">
        <button className="font-bold bg-[--title-border] px-4 py-1 border-4 border-[--darker-orange] rounded-lg">
          Sign In
        </button>
      </div>
    </form>
  );
}
