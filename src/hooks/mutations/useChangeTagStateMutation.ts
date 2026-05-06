import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleChangeTagState } from "../../api/tag.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useChangeTagStateMutation() {
  const queryClient = useQueryClient();

  const { mutate: changeTagState, isPending: changingTagState } = useMutation({
    mutationKey: ["changeTagState"],
    mutationFn: (tagId: string | number) => handleChangeTagState(tagId),
    onSuccess: () => {
      toast.success("Successfully changed tag state.");

      queryClient.invalidateQueries({
        queryKey: ["allTagsData"],
      });
      queryClient.invalidateQueries({
        queryKey: ["allEnabledTagsData"],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { changeTagState, changingTagState };
}

export default useChangeTagStateMutation;
