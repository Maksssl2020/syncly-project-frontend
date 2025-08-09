import { useMutation } from "@tanstack/react-query";
import { handleLikeComment } from "../../api/likes.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useLikePostCommentMutation(onSuccess?: () => void) {
  const { mutate: likePostComment, isPending: likingPostComment } = useMutation(
    {
      mutationKey: ["likePost"],
      mutationFn: (commentId: string | number) => handleLikeComment(commentId),
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    },
  );

  return { likePostComment, likingPostComment };
}

export default useLikePostCommentMutation;
