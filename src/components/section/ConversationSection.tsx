import React, { useEffect, useRef, useState } from "react";
import ChatSection from "./ChatSection.tsx";
import { motion } from "framer-motion";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Send } from "lucide-react";
import useAuthentication from "../../hooks/useAuthentication.ts";
import type { ConversationMessage, ConversationRequest } from "../../types/conversation.ts";
import useConversationInfiniteQuery from "../../hooks/queries/useConversationInfiniteQuery.ts";
import Spinner from "../spinner/Spinner.tsx";
import { connectStomp, sendMessage, subscribeToMessages } from "../../config/stompClient.ts";

type ConversationSectionProps = {
  receiverId: string | number;
  receiverUsername: string;
};

const ConversationSection = ({
  receiverId,
  receiverUsername,
}: ConversationSectionProps) => {
  const { username, userId, accessToken } = useAuthentication();
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  const { fetchNextPage, data, isFetchingNextPage, hasNextPage, isLoading } =
    useConversationInfiniteQuery(20, receiverId);
  // @ts-ignore
  const allMessages = data?.pages?.flatMap((page) => page?.content);

  useEffect(() => {
    setMessages([]);
    setMessageText("");
  }, [receiverId]);

  useEffect(() => {
    if (!accessToken || !username) return;

    connectStomp(accessToken, username);

    const unsubscribe = subscribeToMessages((message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      unsubscribe();
    };
  }, [accessToken, username]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    if (!username || !receiverUsername || !userId || !receiverId) return;

    const messageToSend: ConversationRequest = {
      senderUsername: username,
      senderId: userId,
      recipientUsername: receiverUsername,
      recipientId: receiverId,
      message: messageText,
    };

    await sendMessage(messageToSend);
    setMessageText("");
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    const distanceFromBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight;

    setShouldScrollToBottom(distanceFromBottom < 150);

    if (target.scrollTop < 50 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!allMessages) {
    return (
      <div className={"w-full flex items-center h-full"}>
        <div className="flex-1 flex flex-col items-center p-4 max-md:min-h-[90vh]  overflow-y-auto">
          <div
            className={
              "w-auto flex flex-col items-center gap-4 p-12 bg-black-200 rounded-lg border-2 border-gray-600"
            }
          >
            <p className="text-white-100 text-xl font-bold">
              Conversation not found
            </p>
            <p className={"text-gray-400"}>Go to another conversation</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full min-h-0 flex">
      <main className="w-full h-full min-h-0 flex flex-col gap-4 p-4">
        <div
          ref={messagesContainerRef}
          className="flex-1 min-h-0 w-full bg-black-200 rounded-lg overflow-y-auto border-2 border-gray-600"
          onScroll={onScroll}
        >
          <ChatSection
            messages={[...allMessages, ...messages]}
            shouldScrollToBottom={shouldScrollToBottom}
          />
        </div>

        <div className="shrink-0 border-t-2 border-gray-600 pt-4">
          <div className="flex items-end">
            <div className="flex-1 relative">
              <motion.textarea
                whileFocus={{ borderColor: "#14b8a6" }}
                placeholder="Type a message..."
                className="w-full border-2 text-white-100 placeholder:text-gray-400 bg-black-200 border-gray-600 rounded-lg px-4 py-2 pr-12 focus:outline-none resize-none"
                rows={1}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                style={{ minHeight: "65px", maxHeight: "120px" }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSendMessage();
                  }
                }}
              />

              <div className="absolute right-5 bottom-5 flex gap-2">
                <AnimatedButton
                  bgColor="#222222"
                  borderColorHover="#222222"
                  borderColor="#222222"
                  bgColorHover="#222222"
                  textColorHover="#14b8a6"
                  className="p-1 rounded-full"
                  onClick={handleSendMessage}
                >
                  <Send className="size-6" />
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConversationSection;
