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
    // @ts-ignore
    queryFn: ({ pageParam = 0 }) => {
      if (!recipientId) return Promise.resolve({ content: [], totalPages: 0 });
      return fetchConversation(recipientId, pageParam, size);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.totalPages) {
        return allPages.length;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!recipientId,
    staleTime: 1000 * 60 * 5,
  });
}

export default useConversationInfiniteQuery;
