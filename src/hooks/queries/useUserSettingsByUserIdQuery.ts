import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchUserSettingsByUserId } from "../../api/userSettings.ts";

function useUserSettingsByUserIdQuery() {
  const { userId } = useAuthentication();

  const { data: userSettings, isLoading: fetchingUserSettings } = useQuery({
    queryKey: ["userSettings", userId],
    queryFn: () => {
      if (userId) {
        return fetchUserSettingsByUserId(userId);
      }
    },
    enabled: !!userId,
  });

  return { userSettings, fetchingUserSettings };
}

export default useUserSettingsByUserIdQuery;
