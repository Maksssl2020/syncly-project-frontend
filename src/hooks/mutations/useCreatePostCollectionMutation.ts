import useAuthentication from "../useAuthentication.ts";
import { useMutation } from "@tanstack/react-query";
import type { PostCollectionRequest } from "../../types/postCollection.ts";
import { handleCreatePostCollection } from "../../api/postCollection.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useCreatePostCollectionMutation() {
  const { userId } = useAuthentication();

  const { mutate: createPostCollection, isPending: creatingPostCollection } =
    useMutation({
      mutationKey: ["createPostCollection"],
      mutationFn: async (data: PostCollectionRequest) => {
        if (userId) {
          return await handleCreatePostCollection(userId, data);
        }
      },
      onSuccess: () => {
        toast.success("Post collection created successfully.");
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { createPostCollection, creatingPostCollection };
}

export default useCreatePostCollectionMutation;
