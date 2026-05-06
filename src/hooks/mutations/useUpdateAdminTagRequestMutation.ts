import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdminTagUpdateRequest } from "../../types/tags.ts";
import { handleUpdateTag } from "../../api/tag.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useUpdateAdminTagRequestMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: updateTag, isPending: updatingTag } = useMutation({
    mutationKey: ["updateAdminTag"],
    mutationFn: (data: AdminTagUpdateRequest) => handleUpdateTag(data),
    onSuccess: () => {
      toast.success("Successfully updated tag.");
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

  return { updateTag, updatingTag };
}

export default useUpdateAdminTagRequestMutation;
