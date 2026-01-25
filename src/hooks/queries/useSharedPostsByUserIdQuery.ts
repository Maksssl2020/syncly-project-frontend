import { useQuery } from "@tanstack/react-query";
import { fetchSharedPostsByUserId } from "../../api/share.ts";

function useSharedPostsByUserIdQuery(userId?: string | number | undefined) {
  const { data: sharedPostsByUserId, isLoading: fetchingSharedPostsByUserId } =
    useQuery({
      queryKey: ["sharedPostsByUserId", userId],
      queryFn: () => {
        if (userId) {
          return fetchSharedPostsByUserId(userId);
        }
      },
      enabled: !!userId,
    });

  return { sharedPostsByUserId, fetchingSharedPostsByUserId };
}

export default useSharedPostsByUserIdQuery;
