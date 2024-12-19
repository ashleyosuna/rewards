"use client";

import { register } from "@/dataAccess/auth";
import { registerSchema } from "@/schemas";
import { Dispatch, SetStateAction, useState } from "react";

export default function Register({
  toSignIn,
}: {
  toSignIn: Dispatch<SetStateAction<"signIn" | "register">>;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const onSubmit = async function (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const authData = Object.fromEntries(new FormData(e.currentTarget));
    const parsedData = registerSchema.safeParse(authData);
    console.log(parsedData);
    if (parsedData.success) await register(parsedData.data);
    else setErrors(parsedData.error.flatten().fieldErrors as string[]);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border-2 border-[--default-btn-color] rounded-lg bg-[--default-btn-color] p-6 flex flex-col gap-4 w-1/2"
    >
      <h1 className="font-bold text-lg">Register</h1>
      <div>
        <div className="font-bold">Username</div>
        <input
          type="text"
          className="w-full p-1 rounded-md bg-[--background]"
          name="username"
        />
      </div>
      <div>
        <div className="font-bold">Password</div>
        <input
          type="password"
          className="w-full p-1 rounded-md bg-[--background]"
          name="password"
        />
      </div>
      <div>
        <div className="font-bold">Confirm Password</div>
        <input
          type="password"
          className="w-full p-1 rounded-md bg-[--background]"
          name="confirmPassword"
        />
      </div>
      <div className="text-sm">
        Already have an account? Sign in{" "}
        <span className="underline" onClick={() => toSignIn("signIn")}>
          here
        </span>
        .
      </div>
      <div className="flex justify-center">
        <button className="font-bold bg-[--title-border] px-4 py-1 border-4 border-[--darker-orange] rounded-lg">
          Register
        </button>
      </div>
    </form>
  );
}
