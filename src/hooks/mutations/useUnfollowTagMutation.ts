import useAuthentication from "../useAuthentication.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUnfollowTag } from "../../api/usersTags.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useUnfollowTagMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: unfollowTag, isPending: unfollowingTag } = useMutation({
    mutationKey: ["followTag"],
    mutationFn: async (tagId: string | number) => {
      if (userId) {
        return await handleUnfollowTag(userId, tagId);
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

  return { unfollowTag, unfollowingTag };
}

export default useUnfollowTagMutation;
