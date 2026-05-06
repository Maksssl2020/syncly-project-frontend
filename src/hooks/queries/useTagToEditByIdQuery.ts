import { useQuery } from "@tanstack/react-query";
import { fetchTagToEditById } from "../../api/tag.ts";

function useTagToEditByIdQuery(tagId?: string | number) {
  const { data: tagToEditData, isLoading: fetchingTagToEditData } = useQuery({
    queryKey: ["tagToEditData", tagId],
    queryFn: () => {
      if (tagId) {
        return fetchTagToEditById(tagId);
      }
    },
    enabled: !!tagId,
  });

  return { tagToEditData, fetchingTagToEditData };
}

export default useTagToEditByIdQuery;
