import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleChangeTagCategory } from "../../api/tag.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useChangeTagCategoryMutation() {
  const queryClient = useQueryClient();

  const { mutate: changeTagCategory, isPending: changingTagCategory } =
    useMutation({
      mutationKey: ["changeTagCategory"],
      mutationFn: ({
        tagId,
        categoryId,
      }: {
        tagId: string | number;
        categoryId: string | number;
      }) => handleChangeTagCategory(tagId, categoryId),
      onSuccess: () => {
        toast.success("Successfully changed tag category.");

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

  return { changeTagCategory, changingTagCategory };
}

export default useChangeTagCategoryMutation;
