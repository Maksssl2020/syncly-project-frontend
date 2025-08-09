import type { ConversationResponse } from "../../types/conversation.ts";
import ConversationCard from "../card/ConversationCard.tsx";

interface ConversationListProps {
  conversations: ConversationResponse[];
  activeConversationId?: string;
}

const ConversationList = ({
  activeConversationId,
  conversations,
}: ConversationListProps) => {
  const sortedConversations = [...conversations].sort(
    (a, b) =>
      new Date(b.lastMessageTimestamp).getTime() -
      new Date(a.lastMessageTimestamp).getTime(),
  );

  return (
    <div className={"flex flex-col gap-2"}>
      {sortedConversations.map((conversation) => {
        const isActive = activeConversationId === conversation.id;

        return (
          <ConversationCard isActive={isActive} conversation={conversation} />
        );
      })}
    </div>
  );
};

export default ConversationList;
