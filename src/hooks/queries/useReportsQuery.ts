import { useQuery } from "@tanstack/react-query";
import { fetchAllReports } from "../../api/report.ts";

function useReportsQuery() {
  const { data: reportsData, isLoading: fetchingReportsData } = useQuery({
    queryKey: ["reportsData"],
    queryFn: () => fetchAllReports(),
  });

  return { reportsData, fetchingReportsData };
}

export default useReportsQuery;
