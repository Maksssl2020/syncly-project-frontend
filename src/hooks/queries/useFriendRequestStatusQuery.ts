import { fetchFriendRequestStatus } from "../../api/friends.ts";
import { useQuery } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";

function useFriendRequestStatusQuery(receiverId?: string | number) {
  const { userId } = useAuthentication();

  const { data: friendRequestStatus, isLoading: fetchingFriendRequestStatus } =
    useQuery({
      queryKey: ["friendRequestStatus", userId, receiverId],
      queryFn: () => {
        if (receiverId) {
          return fetchFriendRequestStatus(receiverId);
        }
      },
      enabled: !!receiverId && !!userId,
    });

  return { friendRequestStatus, fetchingFriendRequestStatus };
}

export default useFriendRequestStatusQuery;
