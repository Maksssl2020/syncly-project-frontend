import type { ConversationResponse, SelectedConversation } from "../../types/conversation.ts";
import ConversationCard from "../card/ConversationCard.tsx";

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
  const getTime = (value?: string | null) => {
    if (!value) return 0;
    const time = new Date(value).getTime();
    return Number.isNaN(time) ? 0 : time;
  };

  const sortedConversations = [...conversations].sort(
    (a, b) => getTime(b.lastMessageTimestamp) - getTime(a.lastMessageTimestamp),
  );

  return (
    <div className={"flex flex-col gap-2"}>
      {sortedConversations.map((conversation) => {
        const isActive = selectedConversationId === conversation.conversationId;

        return (
          <ConversationCard
            key={conversation.conversationId}
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
