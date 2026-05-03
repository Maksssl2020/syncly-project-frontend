import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { checkIsUserFollowedByUserProfileId } from "../../api/follow.ts";

function useIsUserFollowedByUserProfileIdQuery(
  userProfileId?: string | number,
) {
  const { userId } = useAuthentication();

  const { data: isUserFollowedData, isLoading: fetchingIsUserFollowed } =
    useQuery({
      queryKey: ["isUserFollowedData", userId, userProfileId],
      queryFn: () => {
        if (userProfileId) {
          return checkIsUserFollowedByUserProfileId(userProfileId);
        }
      },
      enabled: !!userProfileId && userId != userProfileId,
    });

  return { isUserFollowedData, fetchingIsUserFollowed };
}

export default useIsUserFollowedByUserProfileIdQuery;
