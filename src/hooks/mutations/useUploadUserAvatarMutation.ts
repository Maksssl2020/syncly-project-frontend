import useAuthentication from "../useAuthentication.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUploadUserAvatar } from "../../api/userProfile.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useUploadUserAvatarMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: uploadAvatar, isPending: uploadingAvatar } = useMutation({
    mutationKey: ["uploadUserAvatar"],
    mutationFn: async (data: string) => {
      if (userId) {
        return await handleUploadUserAvatar(userId, data);
      }
    },
    onSuccess: () => {
      toast.success("Avatar uploaded successfully!");
      queryClient.invalidateQueries({
        queryKey: ["userProfile", userId],
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    },
  });

  return { uploadAvatar, uploadingAvatar };
}

export default useUploadUserAvatarMutation;
