import { useMutation } from "@tanstack/react-query";
import { handleUnlikePost } from "../../api/likes.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useUnlikePostMutation(onSuccess?: () => void) {
  const { mutate: unlikePost, isPending: unlikingPost } = useMutation({
    mutationKey: ["unlikePost"],
    mutationFn: (postId: string | number) => handleUnlikePost(postId),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { unlikePost, unlikingPost };
}

export default useUnlikePostMutation;
