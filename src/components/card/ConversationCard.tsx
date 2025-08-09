import type { ConversationResponse } from "../../types/conversation.ts";
import { motion } from "framer-motion";
import Avatar from "../img/Avatar.tsx";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import useAuthentication from "../../hooks/useAuthentication.ts";

type ConversationCardProps = {
  conversation: ConversationResponse;
  isActive: boolean;
};

const ConversationCard = ({
  conversation,
  isActive,
}: ConversationCardProps) => {
  const { userId } = useAuthentication();
  const navigate = useNavigate();

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
        {/*{participant.isActive && (*/}
        {/*  <span*/}
        {/*    className={*/}
        {/*      "absolute bottom-0 right-0 size-3 rounded-full bg-teal-100 "*/}
        {/*    }*/}
        {/*  />*/}
        {/*)}*/}
      </div>

      <div className={"flex flex-col gap-2 overflow-hidden"}>
        <div className={"flex justify-between items-baseline"}>
          <h3 className={"font-medium text-white-100 truncate"}>
            {conversation.recipientUsername}
          </h3>
          <span className={"text-xs text-gray-400"}>
            {format(new Date(conversation.lastMessageTimestamp), "dd.MM.yyyy")}
          </span>
        </div>
        <div className={"flex justify-between items-center"}>
          <p className={`text-sm truncate text-gray-400`}>
            {" "}
            {conversation.lastMessageSenderId === userId ? "You: " : ""}
            {conversation.lastMessageContent}
          </p>
          {/*{conversation.unreadCount > 0 && (*/}
          {/*  <span className="bg-teal-100 text-white text-xs rounded-full min-w-5 min-h-5 flex items-center justify-center">*/}
          {/*    {conversation.unreadCount}*/}
          {/*  </span>*/}
          {/*)}*/}
        </div>
      </div>
    </motion.div>
  );
};

export default ConversationCard;
