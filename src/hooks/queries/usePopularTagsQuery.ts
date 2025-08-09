import { useQuery } from "@tanstack/react-query";
import { fetchPopularTags } from "../../api/tag.ts";

function usePopularTagsQuery(limit: number) {
  const { data: popularTagsData, isLoading: fetchingPopularTags } = useQuery({
    queryKey: ["popularTags"],
    queryFn: () => fetchPopularTags(limit),
  });

  return { popularTagsData, fetchingPopularTags };
}

export default usePopularTagsQuery;
