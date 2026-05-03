import { useQuery } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";
import { checkIsUserFriend } from "../../api/friends.ts";

function useIsFriendQuery(userIdToCheck?: string | number) {
  const { userId } = useAuthentication();

  const { data: isFriend, isLoading: checkingIsFriend } = useQuery({
    queryKey: ["isFriendData", userId, userIdToCheck],
    queryFn: () => {
      if (userIdToCheck) {
        return checkIsUserFriend(userIdToCheck);
      }
    },
    enabled: !!userIdToCheck && userId != userIdToCheck,
  });

  return { isFriend, checkingIsFriend };
}

export default useIsFriendQuery;
