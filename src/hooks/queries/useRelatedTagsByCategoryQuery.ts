import { useQuery } from "@tanstack/react-query";
import { fetchRelatedTagsByTagCategory } from "../../api/tag.ts";

function useRelatedTagsByCategoryQuery(category?: string) {
  const {
    data: relatedTagsByCategory,
    isLoading: fetchingRelatedTagsByCategory,
  } = useQuery({
    queryKey: ["relatedTagsByCategory", category],
    queryFn: () => {
      if (category) {
        return fetchRelatedTagsByTagCategory(category);
      }
    },
    enabled: !!category,
  });

  return { relatedTagsByCategory, fetchingRelatedTagsByCategory };
}

export default useRelatedTagsByCategoryQuery;
