import { useQuery } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";
import { fetchAllSavedPostsByUser } from "../../api/post.ts";

function useUserSavedPostsQuery() {
  const { userId } = useAuthentication();

  const { data: savedPostsByUser, isLoading: fetchingSavedPostsByUser } =
    useQuery({
      queryKey: ["allSavedPostsByUserData", userId],
      queryFn: () => {
        if (userId) {
          return fetchAllSavedPostsByUser(userId);
        }
      },
      enabled: !!userId,
    });

  return { savedPostsByUser, fetchingSavedPostsByUser };
}

export default useUserSavedPostsQuery;
