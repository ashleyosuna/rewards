import { z } from "zod";

export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerSchema = z
  .object({
    username: z.string().min(1),
    password: z.coerce.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
  });
