import useAuthentication from "../useAuthentication.ts";
import { fetchFollowedFeedPostsInfinity } from "../../api/post.ts";
import { useInfiniteQuery } from "@tanstack/react-query";

function usePostsForDashboardByFollowedInfiniteQuery() {
  const { userId } = useAuthentication();

  return useInfiniteQuery({
    queryKey: ["dashboardPostsForUserFollowed", userId],
    queryFn: ({ pageParam = 0 }) => {
      if (!userId) return Promise.resolve([]);
      return fetchFollowedFeedPostsInfinity(userId, pageParam, 10);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 10 ? undefined : allPages.length;
    },
    initialPageParam: 0,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

export default usePostsForDashboardByFollowedInfiniteQuery;
