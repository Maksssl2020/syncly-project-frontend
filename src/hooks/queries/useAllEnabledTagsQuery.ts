import { useQuery } from "@tanstack/react-query";
import { fetchAllEnabledTags } from "../../api/tag.ts";

function useAllEnabledTagsQuery() {
  const { data: allEnabledTagsData, isLoading: fetchingAllEnabledTagsData } =
    useQuery({
      queryKey: ["allEnabledTagsData"],
      queryFn: () => fetchAllEnabledTags(),
    });

  return { allEnabledTagsData, fetchingAllEnabledTagsData };
}

export default useAllEnabledTagsQuery;
