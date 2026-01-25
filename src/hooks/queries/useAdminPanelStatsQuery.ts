import { useQuery } from "@tanstack/react-query";
import { fetchAdminPanelStatistics } from "../../api/admin.ts";

function useAdminPanelStatsQuery() {
  const { data: adminPanelStats, isLoading: fetchingAdminPanelStats } =
    useQuery({
      queryKey: ["adminPanelStatsData"],
      queryFn: () => fetchAdminPanelStatistics(),
    });

  return { adminPanelStats, fetchingAdminPanelStats };
}

export default useAdminPanelStatsQuery;
