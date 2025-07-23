import { useQuery } from "@tanstack/react-query";
import { fetchUsersByQuery } from "../../api/user.ts";

function useSearchUsersByQuery(query: string) {
  const { data: searchedUsers, isLoading: searchingUsers } = useQuery({
    queryKey: ["searchUsersByQuery", query],
    queryFn: () => {
      if (query !== "") {
        return fetchUsersByQuery(query);
      }
    },
    enabled: query !== "",
  });

  return { searchedUsers, searchingUsers };
}

export default useSearchUsersByQuery;
