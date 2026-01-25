import { useQuery } from "@tanstack/react-query";
import { fetchTrendingSearches } from "../../api/search.ts";

function useTrendingSearchesQuery() {
  const { data: trendingSearches, isLoading: fetchingTrendingSearches } =
    useQuery({
      queryKey: ["trendingSearches"],
      queryFn: () => fetchTrendingSearches(),
    });

  return { trendingSearches, fetchingTrendingSearches };
}

export default useTrendingSearchesQuery;
