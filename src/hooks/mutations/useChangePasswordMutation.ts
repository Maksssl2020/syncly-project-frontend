import { useMutation } from "@tanstack/react-query";
import type { ChangePasswordRequest } from "../../types/authentication.ts";
import { handleChangePassword } from "../../api/authentication.ts";
import useAuthentication from "../useAuthentication.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useChangePasswordMutation() {
  const { userId } = useAuthentication();

  const { mutate: changePassword, isPending: changingPassword } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data: ChangePasswordRequest) => {
      if (userId) {
        return await handleChangePassword(userId, data);
      }
    },
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { changePassword, changingPassword };
}

export default useChangePasswordMutation;
