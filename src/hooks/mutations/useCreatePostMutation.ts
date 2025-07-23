import useAuthentication from "../useAuthentication.ts";
import { useMutation } from "@tanstack/react-query";
import type {
  AudioPostRequest,
  LinkPostRequest,
  PhotoPostRequest,
  PostType,
  QuotePostRequest,
  TextPostRequest,
  VideoPostRequest,
} from "../../types/post.ts";
import { handleCreatePost } from "../../api/post.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useCreatePostMutation<
  T extends
    | TextPostRequest
    | QuotePostRequest
    | PhotoPostRequest
    | VideoPostRequest
    | AudioPostRequest
    | LinkPostRequest,
>() {
  const { userId } = useAuthentication();

  const { mutate: createPost, isPending: creatingPost } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async ({ data, type }: { data: T; type: PostType }) => {
      if (userId) {
        return await handleCreatePost<T>(userId, data, type);
      }
    },
    onSuccess: () => {
      toast.success("Created post successfully!");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { createPost, creatingPost };
}

export default useCreatePostMutation;
