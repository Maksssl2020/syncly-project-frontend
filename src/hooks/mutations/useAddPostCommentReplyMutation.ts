import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PostCommentReplyRequest } from "../../types/comment.ts";
import { handleAddCommentReply } from "../../api/comment.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useAddPostCommentReplyMutation() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: addPostCommentReply,
    isPending: addingPostCommentReply,
  } = useMutation({
    mutationKey: ["addPostCommentReply"],
    mutationFn: ({
      // @ts-ignore
      postId,
      data,
    }: {
      postId: number | string;
      data: PostCommentReplyRequest;
    }) => handleAddCommentReply(data),
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

  return { addPostCommentReply, addingPostCommentReply };
}

export default useAddPostCommentReplyMutation;
