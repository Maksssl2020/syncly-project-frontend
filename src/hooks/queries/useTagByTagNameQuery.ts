import { useQuery } from "@tanstack/react-query";
import { fetchTagByName } from "../../api/tag.ts";

function useTagByTagNameQuery(tagName?: string) {
  const { data: tagDataByTagName, isLoading: fetchingTagDataByTagName } =
    useQuery({
      queryKey: ["tagDataByTagName", tagName],
      queryFn: () => {
        if (tagName) {
          return fetchTagByName(tagName);
        }
      },
      enabled: !!tagName,
    });

  return { tagDataByTagName, fetchingTagDataByTagName };
}

export default useTagByTagNameQuery;
