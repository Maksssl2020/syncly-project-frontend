import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../api/user.ts";
import type { UserRole, UserStatus } from "../../types/user.ts";

function useAllUsersQuery(
  page: number = 0,
  size: number = 10,
  sortOption: "RECENT" | "OLDEST" = "RECENT",
  userRole?: UserRole,
  userStatus?: UserStatus,
  searchQuery?: string,
) {
  const { data: allUsersData, isLoading: fetchingAllUsersData } = useQuery({
    queryKey: [
      "allUsersData",
      page,
      size,
      sortOption,
      userRole,
      userStatus,
      searchQuery,
    ],
    queryFn: () =>
      fetchAllUsers(page, size, sortOption, userRole, userStatus, searchQuery),
  });

  return { allUsersData, fetchingAllUsersData };
}

export default useAllUsersQuery;
