import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";
import { checkUsernameExists } from "../../api/authentication.ts";

function useUsernameExistsMutation() {
  const { mutateAsync: usernameExists, isPending: checkingUsernameExists } =
    useMutation({
      mutationKey: ["usernameExists"],
      mutationFn: (username: string) => checkUsernameExists(username),
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { usernameExists, checkingUsernameExists };
}

export default useUsernameExistsMutation;
