import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUserProfileDataUpdate } from "../../api/userProfile.ts";
import type { UserProfileUpdateRequest } from "../../types/userProfile.ts";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";

function useUpdateUserProfileMutation() {
  const queryClient = useQueryClient();

  const { mutate: updateUserProfile, isPending: updatingUserProfile } =
    useMutation({
      mutationKey: ["userProfileUpdate"],
      mutationFn: (data: UserProfileUpdateRequest) =>
        handleUserProfileDataUpdate(data),
      onSuccess: (_, variables) => {
        toast.success("Profile updated successfully!");

        queryClient.invalidateQueries({
          queryKey: ["userProfile", variables.userId],
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { updateUserProfile, updatingUserProfile };
}

export default useUpdateUserProfileMutation;
