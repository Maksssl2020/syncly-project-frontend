import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserSettings } from "../../types/userSettings.ts";
import { handleUserSettingsUpdate } from "../../api/userSettings.ts";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../../types/types.ts";
import toast from "react-hot-toast";
import useAuthentication from "../useAuthentication.ts";

function useUpdateUserSettingsMutation() {
  const { userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: updateUserSettings, isPending: updatingUserSettings } =
    useMutation({
      mutationKey: ["userSettingsUpdate"],
      mutationFn: (data: UserSettings) => handleUserSettingsUpdate(data),
      onSuccess: () => {
        toast.success("Settings updated successfully.");
        queryClient.invalidateQueries({
          queryKey: ["userSettings", userId],
        });
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      },
    });

  return { updateUserSettings, updatingUserSettings };
}

export default useUpdateUserSettingsMutation;
