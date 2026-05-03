import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCreateCommonTag } from "../../api/tag.ts";
import type { CommonTagRequest } from "../../types/tags.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useCreateCommonTagMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutateAsync: createCommonTag, isPending: creatingCommonTag } =
    useMutation({
      mutationKey: ["createCommonTag"],
      mutationFn: (data: CommonTagRequest) => handleCreateCommonTag(data),
      onSuccess: () => {
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

  return { createCommonTag, creatingCommonTag };
}

export default useCreateCommonTagMutation;
