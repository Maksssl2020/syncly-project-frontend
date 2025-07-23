import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAddComment } from "../../api/comment.ts";
import type { PostCommentRequest } from "../../types/comment.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useAddPostCommentMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync: addPostComment, isPending: addingPostComment } =
    useMutation({
      mutationKey: ["addPostComment"],
      mutationFn: (data: PostCommentRequest) => handleAddComment(data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["postComments", variables.postId],
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { addPostComment, addingPostComment };
}

export default useAddPostCommentMutation;
