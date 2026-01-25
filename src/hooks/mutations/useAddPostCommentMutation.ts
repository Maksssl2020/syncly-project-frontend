import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { handleAddComment } from "../../api/comment.ts";
import type { PostCommentRequest } from "../../types/comment.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";
import type { PostUnion } from "../../types/post.ts";

function useAddPostCommentMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync: addPostComment, isPending: addingPostComment } =
    useMutation({
      mutationKey: ["addPostComment"],
      mutationFn: (data: PostCommentRequest) => handleAddComment(data),
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
                    ? { ...post, commentsCount: post.commentsCount + 1 }
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
                    ? { ...post, commentsCount: post.commentsCount + 1 }
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

  return { addPostComment, addingPostComment };
}

export default useAddPostCommentMutation;
