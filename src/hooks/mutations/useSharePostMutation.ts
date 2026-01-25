import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleSharePost } from "../../api/share.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";
import useAuthentication from "../useAuthentication.ts";

function useSharePostMutation(onSuccess?: () => void) {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: sharePost, isPending: sharingPost } = useMutation({
    mutationKey: ["sharePost"],
    mutationFn: (postId: string | number) => handleSharePost(postId),
    onSuccess: () => {
      onSuccess?.();

      queryClient.invalidateQueries({
        queryKey: ["sharedPostsByUserId", userId],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { sharePost, sharingPost };
}

export default useSharePostMutation;
