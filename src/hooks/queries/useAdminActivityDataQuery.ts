import { useQuery } from "@tanstack/react-query";
import { fetchAdminActivityData } from "../../api/admin.ts";
import type {
  ActivityActionType,
  ActivityTargetType,
} from "../../types/admin.ts";

function useAdminActivityDataQuery(
  page: number = 0,
  size: number = 10,
  sortOption: "RECENT" | "OLDEST" = "RECENT",
  actionType?: ActivityActionType,
  targetType?: ActivityTargetType,
  searchQuery?: string,
) {
  const { data: adminActivityData, isLoading: fetchingAdminActivityData } =
    useQuery({
      queryKey: [
        "adminActivityData",
        page,
        size,
        sortOption,
        actionType,
        targetType,
        searchQuery,
      ],
      queryFn: () =>
        fetchAdminActivityData(
          page,
          size,
          sortOption,
          actionType,
          targetType,
          searchQuery,
        ),
    });

  return { adminActivityData, fetchingAdminActivityData };
}

export default useAdminActivityDataQuery;
