import useAuthentication from "../useAuthentication.ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchConversation } from "../../api/conversation.ts";

function useConversationInfiniteQuery(
  size: number = 20,
  recipientId?: string | number,
) {
  const { userId } = useAuthentication();

  return useInfiniteQuery({
    queryKey: ["conversation", userId, recipientId],
    queryFn: ({ pageParam = 0 }) => {
      if (!recipientId) {
        return Promise.resolve({
          content: [],
          totalElements: 0,
          totalPages: 0,
          number: 0,
        });
      }

      return fetchConversation(recipientId, pageParam as number, size);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.totalPages) {
        return allPages.length;
      }

      return undefined;
    },
    initialPageParam: 0,
    enabled: !!userId && !!recipientId,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
}

export default useConversationInfiniteQuery;
