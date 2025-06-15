import type { Conversation } from "../../types/conversation.ts";
import ConversationCard from "../card/ConversationCard.tsx";

interface ConversationListProps {
  conversations: Conversation[];
  currentUserId: string;
  activeConversationId?: string;
}

const ConversationList = ({
  activeConversationId,
  conversations,
  currentUserId,
}: ConversationListProps) => {
  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <div className={"flex flex-col gap-2"}>
      {sortedConversations.map((conversation) => {
        const participant = conversation.participants[0];
        const isActive = activeConversationId === conversation.id;

        return (
          <ConversationCard
            isActive={isActive}
            conversation={conversation}
            participant={participant}
          />
        );
      })}
    </div>
  );
};

export default ConversationList;
