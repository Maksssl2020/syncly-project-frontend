import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeletePost } from "../../api/post.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useDeletePostMutation() {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: deletingPost } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: ({
      postId,
      // @ts-ignore
      authorId,
    }: {
      postId: string | number;
      authorId: string | number;
    }) => handleDeletePost(postId),
    onSuccess: (_, variables) => {
      toast.success("Post deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["userPosts", variables.authorId],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { deletePost, deletingPost };
}

export default useDeletePostMutation;
