import { useQuery } from "@tanstack/react-query";
import { fetchTagsAdminStats } from "../../api/tag.ts";

function useTagsAdminStatsQuery() {
  const { data: tagsAdminStatsData, isLoading: fetchingTagsAdminStats } =
    useQuery({
      queryKey: ["tagsAdminStatsData"],
      queryFn: () => fetchTagsAdminStats(),
    });

  return { tagsAdminStatsData, fetchingTagsAdminStats };
}

export default useTagsAdminStatsQuery;
