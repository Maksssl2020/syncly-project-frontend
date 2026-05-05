import { useQuery } from "@tanstack/react-query";
import { fetchAdminMostRecentActivityData } from "../../api/admin.ts";

function useAdminMostRecentActivityDataQuery() {
  const {
    data: adminMostRecentActivityData,
    isLoading: fetchingAdminMostRecentActivityData,
  } = useQuery({
    queryKey: ["adminMostRecentActivityData"],
    queryFn: () => fetchAdminMostRecentActivityData(),
  });

  return { adminMostRecentActivityData, fetchingAdminMostRecentActivityData };
}

export default useAdminMostRecentActivityDataQuery;
