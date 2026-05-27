import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUnblockUser } from "../../api/admin.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useUnblockUserMutation() {
  const queryClient = useQueryClient();

  const { mutate: unblockUser, isPending: unblockingUser } = useMutation({
    mutationKey: ["unblockUser"],
    mutationFn: (userId: string | number) => handleUnblockUser(userId),
    onSuccess: () => {
      toast.success("Unblocked user successfully.");

      queryClient.invalidateQueries({
        queryKey: ["allUsersData"],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { unblockUser, unblockingUser };
}

export default useUnblockUserMutation;
