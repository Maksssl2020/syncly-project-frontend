import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchUserFollowedUsers } from "../../api/follow.ts";

function useFollowedUsersQuery() {
  const { userId } = useAuthentication();

  const { data: followedUsers, isLoading: fetchingFollowedUsers } = useQuery({
    queryKey: ["followedUsers", userId],
    queryFn: () => {
      if (userId) {
        return fetchUserFollowedUsers(userId);
      }
    },
    enabled: !!userId,
  });

  return { followedUsers, fetchingFollowedUsers };
}

export default useFollowedUsersQuery;
