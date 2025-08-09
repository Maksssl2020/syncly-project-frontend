import useAuthentication from "../useAuthentication.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleFollowTag } from "../../api/follow.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useFollowTagMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: followTag, isPending: followingTag } = useMutation({
    mutationKey: ["followTag"],
    mutationFn: async (tagId: string | number) => {
      if (userId) {
        return await handleFollowTag(userId, tagId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["followedTags", userId],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { followTag, followingTag };
}

export default useFollowTagMutation;
