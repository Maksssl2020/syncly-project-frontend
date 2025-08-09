import useAuthentication from "../useAuthentication.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleFollowUser } from "../../api/follow.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useFollowUserMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: followUser, isPending: followingUser } = useMutation({
    mutationKey: ["followUser"],
    mutationFn: async (followedUserId: string | number) =>
      handleFollowUser(followedUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["followedUsers", userId],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { followUser, followingUser };
}

export default useFollowUserMutation;
