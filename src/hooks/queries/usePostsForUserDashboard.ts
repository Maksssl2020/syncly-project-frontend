import { useQuery } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";
import { fetchPostsForUserDashboard } from "../../api/post.ts";

function usePostsForUserDashboard() {
  const { userId } = useAuthentication();

  const {
    data: postsForUserDashboard,
    isLoading: fetchingPostsForUserDashboard,
  } = useQuery({
    queryKey: ["postsForUserDashboard", userId],
    queryFn: () => {
      if (userId) {
        return fetchPostsForUserDashboard(userId);
      }
    },
    enabled: !!userId,
  });

  return { postsForUserDashboard, fetchingPostsForUserDashboard };
}

export default usePostsForUserDashboard;
