import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../api/user.ts";
import type { UserRole, UserStatus } from "../../types/user.ts";

function useAllUsersQuery(
  page: number = 0,
  size: number = 10,
  sortBy?: string,
  sortDirection: "asc" | "desc" = "desc",
  userRole?: UserRole,
  userStatus?: UserStatus,
  searchQuery?: string,
) {
  const { data: allUsersData, isLoading: fetchingAllUsersData } = useQuery({
    queryKey: [
      "allUsersData",
      page,
      size,
      sortBy,
      sortDirection,
      userRole,
      userStatus,
      searchQuery,
    ],
    queryFn: () =>
      fetchAllUsers(
        page,
        size,
        sortBy,
        sortDirection,
        userRole,
        userStatus,
        searchQuery,
      ),
  });

  return { allUsersData, fetchingAllUsersData };
}

export default useAllUsersQuery;
