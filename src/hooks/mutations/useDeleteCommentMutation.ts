import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { handleDeleteComment } from "../../api/comment.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";
import type { PostUnion } from "../../types/post.ts";

function useDeleteCommentMutation() {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending: deletingComment } = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: ({
      // @ts-ignore
      postId,
      commentId,
    }: {
      postId: string | number;
      commentId: string | number;
    }) => handleDeleteComment(commentId),
    onSuccess: (_, variables) => {
      const { postId } = variables;

      queryClient.invalidateQueries({
        queryKey: ["postComments", postId],
      });

      queryClient.setQueriesData(
        {
          queryKey: ["dashboardPostsForUser"],
        },
        (oldData: InfiniteData<PostUnion[]> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: PostUnion[]) =>
              page.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      commentsCount: Math.max(0, post.commentsCount - 1),
                    }
                  : post,
              ),
            ),
          };
        },
      );

      queryClient.setQueriesData(
        {
          queryKey: ["dashboardPostsForUserFollowed"],
        },
        (oldData: InfiniteData<PostUnion[]> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: PostUnion[]) =>
              page.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      commentsCount: Math.max(0, post.commentsCount - 1),
                    }
                  : post,
              ),
            ),
          };
        },
      );
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { deleteComment, deletingComment };
}

export default useDeleteCommentMutation;
