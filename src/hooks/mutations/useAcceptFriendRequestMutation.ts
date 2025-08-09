import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAcceptFriendRequest } from "../../api/friends.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";
import useAuthentication from "../useAuthentication.ts";

function useAcceptFriendRequestMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: acceptFriendRequest, isPending: acceptingFriendRequest } =
    useMutation({
      mutationKey: ["acceptFriendRequest"],
      mutationFn: (requestId: string | number) =>
        handleAcceptFriendRequest(requestId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["userFriendsData", userId],
        });
        queryClient.invalidateQueries({
          queryKey: ["userPendingFriendRequestsData", userId],
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { acceptFriendRequest, acceptingFriendRequest };
}

export default useAcceptFriendRequestMutation;
