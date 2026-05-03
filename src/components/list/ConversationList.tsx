import type { ConversationResponse, SelectedConversation } from "../../types/conversation.ts";
import ConversationCard from "../card/ConversationCard.tsx";
import { getConversationId } from "../../utils/conversationUtils.ts";

interface ConversationListProps {
  conversations: ConversationResponse[];
  selectedConversationId?: string | number;
  onSelect: (data: SelectedConversation) => void;
}

const ConversationList = ({
  conversations,
  onSelect,
  selectedConversationId,
}: ConversationListProps) => {
  const sortedConversations = [...conversations].sort(
    (a, b) =>
      new Date(b.lastMessageTimestamp).getTime() -
      new Date(a.lastMessageTimestamp).getTime(),
  );

  return (
    <div className={"flex flex-col gap-2"}>
      {sortedConversations.map((conversation) => {
        const isActive =
          selectedConversationId ===
          (getConversationId(
            conversation.senderUsername,
            conversation.recipientUsername,
          ) ||
            getConversationId(
              conversation.recipientUsername,
              conversation.senderUsername,
            ));

        return (
          <ConversationCard
            onSelect={onSelect}
            isActive={isActive}
            conversation={conversation}
          />
        );
      })}
    </div>
  );
};

export default ConversationList;
