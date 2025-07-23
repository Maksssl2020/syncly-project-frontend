import { useQuery } from "@tanstack/react-query";
import useAuthentication from "../useAuthentication.ts";
import { fetchAllPostCollectionsByUserId } from "../../api/postCollection.ts";

function useUserPostCollectionsQuery() {
  const { userId } = useAuthentication();

  const { data: userPostCollections, isLoading: fetchingUserPostCollections } =
    useQuery({
      queryKey: ["userPostCollectionsData", userId],
      queryFn: () => {
        if (userId) {
          return fetchAllPostCollectionsByUserId(userId);
        }
      },
      enabled: !!userId,
    });

  return { userPostCollections, fetchingUserPostCollections };
}

export default useUserPostCollectionsQuery;
