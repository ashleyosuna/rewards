export interface Response {
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
