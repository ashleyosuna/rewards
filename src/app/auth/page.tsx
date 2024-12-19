"use client";

import Register from "@/components/Register";
import SignIn from "@/components/SignIn";
import { useState } from "react";

export default function AuthPage() {
  const [form, setForm] = useState<"signIn" | "register">("signIn");

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {form === "signIn" ? (
        <SignIn toRegister={setForm} />
      ) : (
        <Register toSignIn={setForm} />
      )}
    </div>
  );
}
