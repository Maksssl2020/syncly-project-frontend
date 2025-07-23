import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchUserPendingFriendRequests } from "../../api/friends.ts";

function useUserPendingFriendRequests() {
  const { userId } = useAuthentication();

  const {
    data: userPendingFriendRequestsData,
    isLoading: fetchingUserPendingFriendRequestsData,
  } = useQuery({
    queryKey: ["userPendingFriendRequestsData", userId],
    queryFn: () => fetchUserPendingFriendRequests(),
  });

  return {
    userPendingFriendRequestsData,
    fetchingUserPendingFriendRequestsData,
  };
}

export default useUserPendingFriendRequests;
