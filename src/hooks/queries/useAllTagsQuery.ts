import { useQuery } from "@tanstack/react-query";
import { fetchAllTags } from "../../api/tag.ts";

function useAllTagsQuery() {
  const { data: allTagsData, isLoading: fetchingAllTagsData } = useQuery({
    queryKey: ["allTagsData"],
    queryFn: () => fetchAllTags(),
  });

  return { allTagsData, fetchingAllTagsData };
}

export default useAllTagsQuery;
