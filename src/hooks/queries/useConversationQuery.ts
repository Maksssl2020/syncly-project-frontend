import useAuthentication from "../useAuthentication.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchConversation } from "../../api/conversation.ts";

function useConversationQuery(recipientId?: string | number) {
  const { userId } = useAuthentication();

  const { data: conversationData, isLoading: fetchingConversationData } =
    useQuery({
      queryKey: ["conversation", userId, recipientId],
      queryFn: () => {
        if (recipientId) {
          return fetchConversation(recipientId);
        }
      },
      enabled: !!recipientId,
    });

  return { conversationData, fetchingConversationData };
}

export default useConversationQuery;
