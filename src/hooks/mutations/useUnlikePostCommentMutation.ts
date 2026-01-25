import { useMutation } from "@tanstack/react-query";
import { handleUnlikeComment } from "../../api/likes.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useUnlikePostCommentMutation(onSuccess?: () => void) {
  const { mutate: unlikePostComment, isPending: unlikingPostComment } =
    useMutation({
      mutationKey: ["unlikePostComment"],
      mutationFn: (postCommentId: string | number) =>
        handleUnlikeComment(postCommentId),
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

  return { unlikePostComment, unlikingPostComment };
}

export default useUnlikePostCommentMutation;
