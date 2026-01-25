import { useQuery } from "@tanstack/react-query";
import { fetchUserProfileAvatarByUserId } from "../../api/userProfile.ts";

function useUserProfileAvatarByUserIdQuery(
  userId: string | number | undefined,
) {
  const { data: userProfileAvatar, isLoading: fetchingUserProfileAvatar } =
    useQuery({
      queryKey: ["userProfileAvatarByUserId", userId],
      queryFn: () => {
        if (userId) {
          return fetchUserProfileAvatarByUserId(userId);
        }
      },
      enabled: !!userId,
    });

  return { userProfileAvatar, fetchingUserProfileAvatar };
}

export default useUserProfileAvatarByUserIdQuery;
