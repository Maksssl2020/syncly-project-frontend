import useAuthentication from "../useAuthentication.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import { handleUnsavePostByPostCollection } from "../../api/postCollection.ts";

function useUnsavePostByUserPostCollectionMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: unsavePost, isPending: unsavingPost } = useMutation({
    mutationKey: ["unsavePostByUser"],
    mutationFn: async ({
      postCollectionId,
      postId,
    }: {
      postCollectionId: string | number;
      postId: string | number;
    }) => handleUnsavePostByPostCollection(postCollectionId, postId),
    onSuccess: () => {
      toast.success("Post saved successfully.");

      queryClient.invalidateQueries({
        queryKey: ["allSavedPostsByUserData", userId],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { unsavePost, unsavingPost };
}

export default useUnsavePostByUserPostCollectionMutation;
