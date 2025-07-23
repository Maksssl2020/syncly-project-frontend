import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TagCategoryRequest } from "../../types/tagCategory.ts";
import { handleCreateTagCategory } from "../../api/tagCategory.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useCreateTagCategoryMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: createTagCategory, isPending: creatingTagCategory } =
    useMutation({
      mutationKey: ["createTagCategory"],
      mutationFn: (data: TagCategoryRequest) => handleCreateTagCategory(data),
      onSuccess: () => {
        toast.success("Created tag category successfully.");
        onSuccess?.();

        queryClient.invalidateQueries({
          queryKey: ["tagCategoriesData"],
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { createTagCategory, creatingTagCategory };
}

export default useCreateTagCategoryMutation;
