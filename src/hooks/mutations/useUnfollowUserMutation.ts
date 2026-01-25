import useAuthentication from "../useAuthentication.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUnfollowUser } from "../../api/follow.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useUnfollowUserMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: unfollowUser, isPending: unfollowingUser } = useMutation({
    mutationKey: ["unfollowTag"],
    mutationFn: async (followedUserId: string | number) =>
      handleUnfollowUser(followedUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["followedUsers", userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followedUsersIds", userId],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { unfollowUser, unfollowingUser };
}

export default useUnfollowUserMutation;
