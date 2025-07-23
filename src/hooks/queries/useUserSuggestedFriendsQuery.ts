import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchUserSuggestedFriends } from "../../api/friends.ts";

function useUserSuggestedFriendsQuery() {
  const { userId } = useAuthentication();

  const {
    data: userSuggestedFriendsData,
    isLoading: fetchingUserSuggestedFriendsData,
  } = useQuery({
    queryKey: ["userSuggestedFriendsData", userId],
    queryFn: () => fetchUserSuggestedFriends(),
  });

  return { userSuggestedFriendsData, fetchingUserSuggestedFriendsData };
}

export default useUserSuggestedFriendsQuery;
