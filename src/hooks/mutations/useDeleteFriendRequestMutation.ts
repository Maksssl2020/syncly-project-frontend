import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeleteFriendRequest } from "../../api/friends.ts";
import useAuthentication from "../useAuthentication.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useDeleteFriendRequestMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: deleteFriendRequest, isPending: deletingFriendRequest } =
    useMutation({
      mutationKey: ["deleteFriendRequest"],
      mutationFn: (receiverId: string | number) =>
        handleDeleteFriendRequest(receiverId),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["friendRequestStatus", userId, variables],
        });
        queryClient.invalidateQueries({
          queryKey: ["userPendingFriendRequestsData", variables],
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { deleteFriendRequest, deletingFriendRequest };
}

export default useDeleteFriendRequestMutation;
