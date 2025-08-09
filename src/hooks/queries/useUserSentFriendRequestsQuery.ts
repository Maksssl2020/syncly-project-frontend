import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchUserSentFriendRequests } from "../../api/friends.ts";

function useUserSentFriendRequestsQuery() {
  const { userId } = useAuthentication();

  const {
    data: userSentFriendRequests,
    isLoading: fetchingUserSentFriendRequests,
  } = useQuery({
    queryKey: ["userSentFriendRequestsData", userId],
    queryFn: () => fetchUserSentFriendRequests(),
  });

  return {
    userSentFriendRequests,
    fetchingUserSentFriendRequests,
  };
}

export default useUserSentFriendRequestsQuery;