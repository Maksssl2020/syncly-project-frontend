import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MainTagRequest } from "../../types/tags.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";
import { handleCreateMainTag } from "../../api/tag.ts";

function useCreateMainTagMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: createMainTag, isPending: creatingMainTag } = useMutation({
    mutationKey: ["createMainTag"],
    mutationFn: (data: MainTagRequest) => handleCreateMainTag(data),
    onSuccess: () => {
      toast.success("Created new tag!");
      onSuccess?.();

      queryClient.invalidateQueries({
        queryKey: ["allTagsData"],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { createMainTag, creatingMainTag };
}

export default useCreateMainTagMutation;
