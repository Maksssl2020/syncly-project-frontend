import useAuthentication from "../useAuthentication.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeleteFriend } from "../../api/friends.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useDeleteFriendMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: deleteFriend, isPending: deletingFriend } = useMutation({
    mutationKey: ["deleteFriendMutation"],
    mutationFn: async (friendId: string | number) => {
      if (userId) {
        return await handleDeleteFriend(userId, friendId);
      }
    },
    onSuccess: (_, variables) => {
      toast.success("Deleted friend successfully.");

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

  return { deleteFriend, deletingFriend };
}

export default useDeleteFriendMutation;
