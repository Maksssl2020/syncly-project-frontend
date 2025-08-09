import { useQuery } from "@tanstack/react-query";
import { fetchAllConversationsByUser } from "../../api/conversation.ts";

function useAllConversationsByUserQuery() {
  const {
    data: allConversationsByUserData,
    isLoading: fetchingAllConversationsByUser,
  } = useQuery({
    queryKey: ["allConversationsByUser"],
    queryFn: () => fetchAllConversationsByUser(),
  });

  return { allConversationsByUserData, fetchingAllConversationsByUser };
}

export default useAllConversationsByUserQuery;
