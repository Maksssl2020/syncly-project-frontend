import { handleVerifyTurnstile } from "../../api/cloudflare.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

function useVerifyTurnstileMutation(onError?: () => void) {
  const { mutateAsync: verifyTurnstile, isPending: verifyingTurnstile } =
    useMutation({
      mutationKey: ["verifyTurnstile"],
      mutationFn: (token: string) => handleVerifyTurnstile(token),
      onError: (error: AxiosError<ApiErrorResponse>) => {
        onError?.();
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { verifyTurnstile, verifyingTurnstile };
}

export default useVerifyTurnstileMutation;
