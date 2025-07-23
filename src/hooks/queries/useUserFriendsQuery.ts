import { useQuery } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";
import { fetchUserFriends } from "../../api/friends.ts";

function useUserFriendsQuery() {
  const { userId } = useAuthentication();

  const { data: userFriendsData, isLoading: fetchingUserFriendsData } =
    useQuery({
      queryKey: ["userFriendsData", userId],
      queryFn: () => fetchUserFriends(),
    });

  return { userFriendsData, fetchingUserFriendsData };
}

export default useUserFriendsQuery;
