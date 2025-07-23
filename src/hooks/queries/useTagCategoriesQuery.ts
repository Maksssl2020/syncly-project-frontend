import { useQuery } from "@tanstack/react-query";
import { fetchTagCategories } from "../../api/tagCategory.ts";

function useTagCategoriesQuery() {
  const { data: tagCategories, isLoading: fetchingTagCategories } = useQuery({
    queryKey: ["tagCategoriesData"],
    queryFn: () => fetchTagCategories(),
  });

  return { tagCategories, fetchingTagCategories };
}

export default useTagCategoriesQuery;
