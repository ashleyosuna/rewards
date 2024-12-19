"use client";
import { login } from "@/dataAccess/auth";
import { signInSchema } from "@/schemas";
import { Dispatch, SetStateAction, useState } from "react";

export default function SignIn({
  toRegister,
}: {
  toRegister: Dispatch<SetStateAction<"signIn" | "register">>;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const onSubmit = async function (e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const authData = Object.fromEntries(new FormData(e.currentTarget));
    const parsedData = signInSchema.safeParse(authData);
    if (parsedData.success) await login(parsedData.data);
    else setErrors(parsedData.error.flatten().fieldErrors as string[]);
  };

  return (
    <form
      className="border-2 border-[--default-btn-color] rounded-lg bg-[--default-btn-color] p-6 flex flex-col gap-4 w-1/2"
      onSubmit={onSubmit}
    >
      <h1 className="font-bold text-lg">Sign In</h1>
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
