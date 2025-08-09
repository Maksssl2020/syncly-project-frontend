import useAuthentication from "../useAuthentication.ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsForUserDashboardInfinity } from "../../api/post.ts";

function usePostsForUserDashboardInfiniteQuery() {
  const { userId } = useAuthentication();

  return useInfiniteQuery({
    queryKey: ["dashboardPostsForUser", userId],
    queryFn: ({ pageParam = 0 }) => {
      if (!userId) return Promise.resolve([]);
      return fetchPostsForUserDashboardInfinity(userId, pageParam, 10);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 10 ? undefined : allPages.length;
    },
    initialPageParam: 0,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

export default usePostsForUserDashboardInfiniteQuery;