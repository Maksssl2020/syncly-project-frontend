import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleSendFriendRequest } from "../../api/friends.ts";
import useAuthentication from "../useAuthentication.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useSendFriendRequestMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: sendFriendRequest, isPending: sendingFriendRequest } =
    useMutation({
      mutationKey: ["sendFriendRequest"],
      mutationFn: async (receiverId: string | number) => {
        if (userId) {
          return await handleSendFriendRequest(userId, receiverId);
        }
      },
      onSuccess: (_, variables) => {
        toast.success("Friend request sent successfully.");

        queryClient.invalidateQueries({
          queryKey: ["userFriendIdsData", userId],
        });
        queryClient.invalidateQueries({
          queryKey: ["friendRequestStatus", userId, variables],
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { sendFriendRequest, sendingFriendRequest };
}

export default useSendFriendRequestMutation;
