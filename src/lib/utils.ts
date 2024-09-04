import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Response {
  status: number;
  data?: any;
  message?: string;
}

export function httpResponse(response: Response) {
  return {
    status: response.status,
    data: response.data ?? null,
    message: response.message ?? "",
  };
}
