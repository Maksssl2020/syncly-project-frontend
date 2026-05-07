import { useQuery } from "@tanstack/react-query";
import { fetchTagCategoriesNames } from "../../api/tagCategory.ts";

function useTagCategoriesNamesQuery() {
  const {
    data: tagCategoriesNamesData,
    isLoading: fetchingTagCategoriesNamesData,
  } = useQuery({
    queryKey: ["tagCategoriesNamesData"],
    queryFn: () => fetchTagCategoriesNames(),
  });

  return { tagCategoriesNamesData, fetchingTagCategoriesNamesData };
}

export default useTagCategoriesNamesQuery;
