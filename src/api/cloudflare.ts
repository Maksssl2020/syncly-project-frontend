import axiosConfig from "../config/axiosConfig.ts";
import type { TurnstileResponse } from "../types/cloudflare.ts";

export async function handleVerifyTurnstile(token: string) {
  const response = await axiosConfig.post<TurnstileResponse>(
    "/authentication/verify-turnstile",
    null,
    {
      params: {
        token,
      },
    },
  );

  return response.data;
}
