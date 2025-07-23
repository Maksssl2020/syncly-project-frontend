import { useMutation } from "@tanstack/react-query";
import { checkEmailExists } from "../../api/authentication.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useEmailExistsMutation() {
  const { mutateAsync: emailExists, isPending: checkingEmailExists } =
    useMutation({
      mutationKey: ["emailExists"],
      mutationFn: (email: string) => checkEmailExists(email),
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { emailExists, checkingEmailExists };
}

export default useEmailExistsMutation;
