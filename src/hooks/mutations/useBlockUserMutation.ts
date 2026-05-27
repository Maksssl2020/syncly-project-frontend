import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleBlockUser } from "../../api/admin.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useBlockUserMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: blockUser, isPending: blockingUser } = useMutation({
    mutationKey: ["blockUser"],
    mutationFn: (userId: string | number) => handleBlockUser(userId),
    onSuccess: () => {
      toast.success("Blocked user successfully.");

      queryClient.invalidateQueries({
        queryKey: ["allUsersData"],
      });

      onSuccess?.();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { blockUser, blockingUser };
}

export default useBlockUserMutation;
