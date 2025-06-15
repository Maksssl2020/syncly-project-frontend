import { useEffect, useRef } from "react";
import type { ConversationUser, Message } from "../../types/conversation.ts";
import MessageBubble from "../bubble/MessageBubble.tsx";

interface ChatSectionProps {
  messages: Message[];
  currentUserId: string;
  participant: ConversationUser;
}

const ChatSection = ({
  messages,
  currentUserId,
  participant,
}: ChatSectionProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach((message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  const groupConsecutiveMessages = (messages: Message[]) => {
    const groups: Message[][] = [];
    let currentGroup: Message[] = [];
    let currentSender: string | null = null;

    messages.forEach((message) => {
      if (message.senderId !== currentSender) {
        if (currentGroup.length > 0) {
          groups.push([...currentGroup]);
        }
        currentGroup = [message];
        currentSender = message.senderId;
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  };

  return (
    <div className={"overflow-y-auto p-4 flex flex-gol gap-4 w-full"}>
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className={"flex flex-col gap-4 w-full "}>
          <div className={"flex justify-center"}>
            <span
              className={
                "px-3 h-[25px] flex items-center justify-center bg-teal-100 rounded-full text-xs text-black-100"
              }
            >
              {" "}
              {date}
            </span>
          </div>

          {groupConsecutiveMessages(dateMessages).map((group, groupIndex) => (
            <div key={groupIndex} className=" flex flex-col gap-2 ">
              <MessageBubble
                messages={group}
                isCurrentUser={group[0].senderId === currentUserId}
                participant={participant}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatSection;
