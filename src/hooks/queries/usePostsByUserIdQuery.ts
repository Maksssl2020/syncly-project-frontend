import { useQuery } from "@tanstack/react-query";
import { fetchAllPostsByUserId } from "../../api/post.ts";

function usePostsByUserIdQuery(userId: string | number | undefined) {
  const { data: userPosts, isLoading: fetchingUserPosts } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => {
      if (userId) {
        return fetchAllPostsByUserId(userId);
      }
    },
    enabled: !!userId,
  });

  return { userPosts, fetchingUserPosts };
}

export default usePostsByUserIdQuery;
