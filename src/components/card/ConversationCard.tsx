import type {
  ConversationResponse,
  SelectedConversation,
} from "../../types/conversation.ts";
import { motion } from "framer-motion";
import Avatar from "../img/Avatar.tsx";
import { format } from "date-fns";
import useAuthentication from "../../hooks/useAuthentication.ts";
import { useUserPresence } from "../../hooks/useUserPresence.ts";
import { usePresenceStore } from "../../store/presenceStore.ts";

type ConversationCardProps = {
  conversation: ConversationResponse;
  isActive: boolean;
  onSelect: (data: SelectedConversation) => void;
};

const ConversationCard = ({
  conversation,
  isActive,
  onSelect,
}: ConversationCardProps) => {
  const { userId } = useAuthentication();
  useUserPresence(conversation.recipientId);
  const userPresence = usePresenceStore(
    (state) => state.presenceMap[conversation.recipientId] || null,
  );

  console.log(conversation.lastMessageTimestamp);

  return (
    <motion.div
      onClick={() => {
        onSelect({
          conversationId: conversation.conversationId,
          recipientId: conversation.recipientId,
          recipientUsername: conversation.recipientUsername,
        });
      }}
      key={conversation.id}
      className={
        "flex items-center cursor-pointer gap-3 p-2 rounded-lg border-l-4 w-full h-auto"
      }
      whileHover={{
        backgroundColor: "#393939",
      }}
      animate={{
        backgroundColor: isActive ? "#393939" : "#222222",
        borderColor: isActive ? "#14b8a6" : "#222222",
      }}
    >
      <div className={"relative"}>
        <Avatar avatar={conversation.recipientAvatar} size={"size-12"} />
        {userPresence?.status && (
          <span
            className={
              "absolute bottom-0 right-0 size-3 rounded-full bg-teal-100 "
            }
          />
        )}
      </div>

      <div className={"flex flex-col gap-2 overflow-hidden"}>
        <div className={"flex justify-between items-baseline"}>
          <h3 className={"font-medium text-white-100 truncate"}>
            {conversation.recipientUsername}
          </h3>
          {conversation.lastMessageTimestamp && (
            <span className={"text-xs text-gray-400"}>
              {format(
                new Date(conversation.lastMessageTimestamp),
                "dd.MM.yyyy",
              )}
            </span>
          )}
        </div>
        <div className={"flex justify-between items-center"}>
          <p className={`text-sm truncate text-gray-400`}>
            {" "}
            {conversation.lastMessageSenderId === userId ? "You: " : ""}
            {conversation.lastMessageContent}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ConversationCard;
