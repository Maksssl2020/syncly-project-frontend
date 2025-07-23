import { useQuery } from "@tanstack/react-query";
import { fetchTagsByQuery } from "../../api/tag.ts";

function useSearchTagsQuery(query: string) {
  const { data: searchedTags, isLoading: searchingTags } = useQuery({
    queryKey: ["searchedTags", query],
    queryFn: () => {
      if (query !== "") {
        return fetchTagsByQuery(query);
      }
    },
    enabled: query !== "",
  });

  return { searchedTags, searchingTags };
}

export default useSearchTagsQuery;
