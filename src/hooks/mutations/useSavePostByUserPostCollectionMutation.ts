import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";
import useAuthentication from "../useAuthentication.ts";
import { handleSavePostByPostCollection } from "../../api/postCollection.ts";

function useSavePostByUserPostCollectionMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: savePost, isPending: savingPost } = useMutation({
    mutationKey: ["savePostByUser"],
    mutationFn: async ({
      postCollectionId,
      postId,
    }: {
      postCollectionId: string | number;
      postId: string | number;
    }) => handleSavePostByPostCollection(postCollectionId, postId),
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

  return { savePost, savingPost };
}

export default useSavePostByUserPostCollectionMutation;
