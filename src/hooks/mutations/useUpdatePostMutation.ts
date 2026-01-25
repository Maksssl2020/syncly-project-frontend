import { useMutation } from "@tanstack/react-query";
import { handleUpdatePost } from "../../api/post.ts";
import type { PostType, UpdateRequestByType } from "../../types/post.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";

function useUpdatePostMutation<T extends PostType>(onSuccess?: () => void) {
  // const queryClient = useQueryClient();

  const { mutate: updatePost, isPending: updatingPost } = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: ({
      type,
      updateRequest,
    }: {
      type: T;
      updateRequest: UpdateRequestByType[T];
    }) => handleUpdatePost(type, updateRequest),
    onSuccess: () => {
      toast.success("Updated post successfully.");
      onSuccess?.();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { updatePost, updatingPost };
}

export default useUpdatePostMutation;
