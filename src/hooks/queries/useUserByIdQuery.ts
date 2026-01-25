import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../../api/user.ts";

function useUserByIdQuery(userId?: string | number) {
  const { data: userDataById, isLoading: fetchingUserData } = useQuery({
    queryKey: ["userDataById", userId],
    queryFn: () => {
      if (userId) {
        return fetchUserById(userId);
      }
    },
    enabled: !!userId,
  });

  return { userDataById, fetchingUserData };
}

export default useUserByIdQuery;
