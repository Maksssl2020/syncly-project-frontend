import { useMutation } from "@tanstack/react-query";
import { handleLikePost } from "../../api/likes.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useLikePostMutation(onSuccess?: () => void) {
  const { mutate: likePost, isPending: likingPost } = useMutation({
    mutationKey: ["likePost"],
    mutationFn: (postId: string | number) => handleLikePost(postId),
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

  return { likePost, likingPost };
}

export default useLikePostMutation;
