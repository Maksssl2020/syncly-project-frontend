import type {
  Conversation,
  ConversationUser,
} from "../../types/conversation.ts";
import { motion } from "framer-motion";
import Avatar from "../img/Avatar.tsx";
import { formatTimeAgo } from "../../utils/dateUtils.ts";
import { useNavigate } from "react-router-dom";

type ConversationCardProps = {
  conversation: Conversation;
  isActive: boolean;
  participant: ConversationUser;
};

const ConversationCard = ({
  conversation,
  isActive,
  participant,
}: ConversationCardProps) => {
  const navigate = useNavigate();
  const currentUserId = "1";

  return (
    <motion.div
      onClick={() => navigate(`/conversation/${conversation.id}`)}
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
        <Avatar size={"size-12"} />
        {participant.isActive && (
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
            {participant.username}
          </h3>
          <span className={"text-xs text-gray-400"}>
            {formatTimeAgo(conversation.updatedAt)}
          </span>
        </div>
        <div className={"flex justify-between items-center"}>
          <p
            className={`text-sm truncate ${
              conversation.unreadCount > 0
                ? "font-medium text-teal-200"
                : "text-gray-400"
            }`}
          >
            {" "}
            {conversation.lastMessage.senderId === currentUserId ? "You: " : ""}
            {conversation.lastMessage.content}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="bg-teal-100 text-white text-xs rounded-full min-w-5 min-h-5 flex items-center justify-center">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ConversationCard;
