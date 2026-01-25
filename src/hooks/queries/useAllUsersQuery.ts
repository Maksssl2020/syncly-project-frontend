import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../api/user.ts";

function useAllUsersQuery() {
  const { data: allUsersData, isLoading: fetchingAllUsersData } = useQuery({
    queryKey: ["allUsersData"],
    queryFn: () => fetchAllUsers(),
  });

  return { allUsersData, fetchingAllUsersData };
}

export default useAllUsersQuery;
