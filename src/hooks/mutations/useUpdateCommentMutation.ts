import { useMutation } from "@tanstack/react-query";
import type { UpdateCommentRequest } from "../../types/comment.ts";
import { handleUpdateComment } from "../../api/comment.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useUpdateCommentMutation(
  onSuccess?: (commentId: string | number, commentContent: string) => void,
) {
  const { mutate: updateComment, isPending: updatingComment } = useMutation({
    mutationKey: ["updateComment"],
    mutationFn: (data: UpdateCommentRequest) => handleUpdateComment(data),
    onSuccess: (_, variables) => {
      onSuccess?.(variables.commentId, variables.content);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { updateComment, updatingComment };
}

export default useUpdateCommentMutation;
