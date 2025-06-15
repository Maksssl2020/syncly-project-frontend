import type { ConversationUser, Message } from "../../types/conversation.ts";
import Avatar from "../img/Avatar.tsx";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  messages: Message[];
  isCurrentUser: boolean;
  participant: ConversationUser;
}

const MessageBubble = ({
  messages,
  isCurrentUser,
  participant,
}: MessageBubbleProps) => {
  if (!messages.length) return null;
  const lastMessage = messages[messages.length - 1];

  return (
    <div className={`flex ${isCurrentUser ? "justify-end " : "justify-start"}`}>
      <div className={"flex gap-2"}>
        {!isCurrentUser && <Avatar size={"size-10"} />}

        <div
          className={`max-w-xs md:max-w-md space-y-1 ${isCurrentUser ? "order-first mr-2" : ""} `}
        >
          {messages.map((message, index) => (
            <div
              key={message.id + index}
              className={`px-4 py-2 rounded-2xl ${index === 0 ? "" : "mt-1"} ${isCurrentUser ? "bg-cyan-200 text-black-100 rounded-br-none" : "bg-teal-200 text-black-100 rounded-bl-none"}`}
            >
              {message.content}
            </div>
          ))}

          <div
            className={`flex items-center text-xs ${isCurrentUser ? "justify-end" : "justify-start"}`}
          >
            {" "}
            <span className={"text-gray-400"}>
              {format(new Date(lastMessage.timestamp), "h:mm a")}
            </span>
            {isCurrentUser && (
              <span className="ml-1">
                {lastMessage.read ? (
                  <CheckCheck className="size-3.5 text-teal-100" />
                ) : (
                  <Check className="size-3.5 text-gray-400" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
