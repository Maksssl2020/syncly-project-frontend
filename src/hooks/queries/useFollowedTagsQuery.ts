import { useQuery } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";
import { fetchUserFollowedTags } from "../../api/follow.ts";

function useFollowedTagsQuery() {
  const { userId } = useAuthentication();

  const { data: followedTags, isLoading: fetchingFollowedTags } = useQuery({
    queryKey: ["followedTags", userId],
    queryFn: () => {
      if (userId) {
        return fetchUserFollowedTags(userId);
      }
    },
    enabled: !!userId,
  });

  return { followedTags, fetchingFollowedTags };
}

export default useFollowedTagsQuery;
