import { useQuery } from "@tanstack/react-query";
import { fetchTrendingTags } from "../../api/tag.ts";

function useTrendingTagsQuery(limit: number) {
  const { data: trendingTagsData, isLoading: fetchingTrendingTags } = useQuery({
    queryKey: ["trendingTags"],
    queryFn: () => fetchTrendingTags(limit),
  });

  return { trendingTagsData, fetchingTrendingTags };
}

export default useTrendingTagsQuery;
