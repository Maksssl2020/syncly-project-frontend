import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUnsharePost } from "../../api/share.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useUnsharePostMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: unsharePost, isPending: unsharingPost } = useMutation({
    mutationKey: ["unsharePost"],
    mutationFn: (postId: string | number) => handleUnsharePost(postId),
    onSuccess: () => {
      onSuccess?.();

      queryClient.invalidateQueries({
        queryKey: ["sharedPostsByUserId"],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { unsharePost, unsharingPost };
}

export default useUnsharePostMutation;
