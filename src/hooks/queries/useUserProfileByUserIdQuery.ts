import { useQuery } from "@tanstack/react-query";
import { fetchUserProfileByUserId } from "../../api/userProfile.ts";

function useUserProfileByUserIdQuery(userId: string | number | undefined) {
  const { data: userProfile, isLoading: fetchingUserProfile } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => {
      if (userId) {
        return fetchUserProfileByUserId(userId);
      }
    },
    enabled: !!userId,
  });

  return { userProfile, fetchingUserProfile };
}

export default useUserProfileByUserIdQuery;
