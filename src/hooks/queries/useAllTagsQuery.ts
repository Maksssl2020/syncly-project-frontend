import { useQuery } from "@tanstack/react-query";
import { fetchAllTags } from "../../api/tag.ts";

function useAllTagsQuery(
  page: number = 0,
  size: number = 10,
  sortOption: "RECENT" | "OLDEST" = "RECENT",
  tagCategoryName?: string,
  trendingOnly?: boolean,
  searchQuery?: string,
) {
  const { data: allTagsData, isLoading: fetchingAllTagsData } = useQuery({
    queryKey: [
      "allTagsData",
      page,
      size,
      sortOption,
      tagCategoryName,
      trendingOnly,
      searchQuery,
    ],
    queryFn: () =>
      fetchAllTags(
        page,
        size,
        sortOption,
        tagCategoryName,
        trendingOnly,
        searchQuery,
      ),
  });

  return { allTagsData, fetchingAllTagsData };
}

export default useAllTagsQuery;
