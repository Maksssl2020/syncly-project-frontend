import { useEffect, useRef } from "react";
import type { ConversationMessage } from "../../types/conversation.ts";
import MessageBubble from "../bubble/MessageBubble.tsx";
import useAuthentication from "../../hooks/useAuthentication.ts";
import useUserProfileAvatarByUserIdQuery from "../../hooks/queries/useUserProfileAvatarByUserIdQuery.ts";

interface ChatSectionProps {
  messages: ConversationMessage[];
}

const ChatSection = ({ messages }: ChatSectionProps) => {
  const { userId } = useAuthentication();
  const chatBoxRef = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const foundId = messages
    .map((message) => message.senderUserId)
    .find((id) => id !== userId);

  const { userProfileAvatar } = useUserProfileAvatarByUserIdQuery(foundId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  const groupedMessages: { [date: string]: ConversationMessage[] } = {};

  sortedMessages.forEach((message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groupedMessages[date]) groupedMessages[date] = [];
    groupedMessages[date].push(message);
  });

  const groupConsecutiveMessages = (messages: ConversationMessage[]) => {
    const groups: ConversationMessage[][] = [];
    let currentGroup: ConversationMessage[] = [];

    messages.forEach((message, index) => {
      if (
        index === 0 ||
        message.senderUserId === messages[index - 1].senderUserId
      ) {
        currentGroup.push(message);
      } else {
        groups.push(currentGroup);
        currentGroup = [message];
      }
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  };

  // useEffect(() => {
  //   if (chatBoxRef.current) {
  //     chatBoxRef.current.scroll({
  //       top: chatBoxRef.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [messages]);

  return (
    <div
      ref={chatBoxRef}
      className={"overflow-y-auto p-4 flex flex-col gap-4 w-full h-[731px]"}
    >
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
                messageAvatar={userProfileAvatar}
                messages={group}
                isCurrentUser={group[0].senderUserId === userId}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatSection;
