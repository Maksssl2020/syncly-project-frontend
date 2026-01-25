import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowedUsersIds } from "../../api/follow.ts";

function useFollowedUsersIdsQuery() {
  const { userId } = useAuthentication();

  const { data: followedUsersIds, isLoading: fetchingFollowedUsersIds } =
    useQuery({
      queryKey: ["followedUsersIds", userId],
      queryFn: () => {
        if (userId) {
          return fetchFollowedUsersIds(userId);
        }
      },
      enabled: !!userId,
    });

  return { followedUsersIds, fetchingFollowedUsersIds };
}

export default useFollowedUsersIdsQuery;
