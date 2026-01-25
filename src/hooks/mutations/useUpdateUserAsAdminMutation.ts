import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUserAsAdminRequest } from "../../types/admin.ts";
import { handleUpdateUserAsAdmin } from "../../api/admin.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useUpdateUserAsAdminMutation() {
  const queryClient = useQueryClient();

  const { mutate: updateUserAsAdmin, isPending: updatingUserAsAdmin } =
    useMutation({
      mutationKey: ["updateUserAsAdmin"],
      mutationFn: (data: UpdateUserAsAdminRequest) =>
        handleUpdateUserAsAdmin(data),
      onSuccess: (_, variables) => {
        toast.success("User updated successfully!");
        queryClient.invalidateQueries({
          queryKey: ["userDataById", variables.userId],
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { updateUserAsAdmin, updatingUserAsAdmin };
}

export default useUpdateUserAsAdminMutation;
