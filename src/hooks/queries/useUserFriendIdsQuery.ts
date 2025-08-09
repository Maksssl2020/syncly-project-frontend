import { useQuery } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";
import { fetchUserFriendIds } from "../../api/friends.ts";

function useUserFriendIdsQuery() {
  const { userId } = useAuthentication();

  const { data: userFriendIds, isLoading: fetchingUserFriendIds } = useQuery({
    queryKey: ["userFriendIdsData", userId],
    queryFn: () => fetchUserFriendIds(),
    enabled: !!userId,
  });

  return { userFriendIds, fetchingUserFriendIds };
}

export default useUserFriendIdsQuery;
