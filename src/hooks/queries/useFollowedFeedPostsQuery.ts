import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchFollowedFeedPosts } from "../../api/post.ts";

function useFollowedFeedPostsQuery() {
  const { userId } = useAuthentication();

  const { data: followedFeedPosts, isLoading: fetchingFollowedFeedPosts } =
    useQuery({
      queryKey: ["followedFeedPosts", userId],
      queryFn: () => {
        if (userId) {
          return fetchFollowedFeedPosts(userId);
        }
      },
      enabled: !!userId,
    });

  return { followedFeedPosts, fetchingFollowedFeedPosts };
}

export default useFollowedFeedPostsQuery;
