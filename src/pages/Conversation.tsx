import Page from "../animation/Page.tsx";
import ConversationsSidebar from "../components/sidebar/ConversationsSidebar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { Send } from "lucide-react";
import ChatSection from "../components/section/ChatSection.tsx";
import useConversationInfiniteQuery from "../hooks/queries/useConversationInfiniteQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import { useEffect, useMemo, useState } from "react";
import useAuthentication from "../hooks/useAuthentication.ts";
import useAllConversationsByUserQuery from "../hooks/queries/useAllConversationsByUserQuery.ts";
import type { ConversationMessage, ConversationRequest } from "../types/conversation.ts";
import { useInView } from "react-intersection-observer";
import { getConversationId, uniqueMessages } from "../utils/conversationUtils.ts";
import { connectStomp, sendMessage, subscribeToMessages } from "../config/stompClient.ts";
import { useQueryClient } from "@tanstack/react-query";

export const Conversation = () => {
  const { inView } = useInView();
  const { username, userId, accessToken } = useAuthentication();
  const { receiverId, receiverUsername } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [messageText, setMessageText] = useState("");

  const { fetchNextPage, data, isFetchingNextPage, hasNextPage, isLoading } =
    useConversationInfiniteQuery(20, receiverId);

  const allMessages = data?.pages?.flatMap((page) => page?.content ?? []) ?? [];

  const { allConversationsByUserData, fetchingAllConversationsByUser } =
    useAllConversationsByUserQuery();

  useEffect(() => {
    if (!accessToken || !username) return;

    connectStomp(accessToken, username);
  }, [accessToken, username]);

  useEffect(() => {
    setMessages([]);
  }, [receiverId]);

  useEffect(() => {
    if (!receiverId) return;

    return subscribeToMessages((message: ConversationMessage) => {
      console.log("MESSAGE RECEIVED IN COMPONENT:", message);

      const currentConversationId = getConversationId(
        username ?? "",
        receiverUsername ?? "",
      );
      const isCurrentConversation =
        message.conversationId === currentConversationId;

      queryClient.invalidateQueries({
        queryKey: ["allConversationsByUser"],
      });

      if (!isCurrentConversation) return;

      setMessages((prev) => uniqueMessages([...prev, message]));
    });
  }, [receiverId, queryClient, username, receiverUsername]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    if (!username || !receiverUsername || !userId || !receiverId) return;

    const messageToSend: ConversationRequest = {
      senderUsername: username,
      senderId: userId,
      recipientUsername: receiverUsername,
      recipientId: receiverId,
      message: messageText.trim(),
    };

    await sendMessage(messageToSend);

    setMessageText("");
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  const mergedMessages = useMemo(() => {
    return uniqueMessages([...allMessages, ...messages]);
  }, [allMessages, messages]);

  if (isLoading || fetchingAllConversationsByUser) {
    return <Spinner />;
  }

  if (!allMessages) {
    return (
      <Page className={"w-full flex items-center h-full"}>
        <ConversationsSidebar
          conversationsData={allConversationsByUserData ?? []}
          selectedConversationId={receiverId}
          onSelect={(data) =>
            navigate(
              `/conversation/${data.recipientId}/${data.recipientUsername}`,
            )
          }
        />

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
      </Page>
    );
  }

  return (
    <Page className={"w-full flex  items-center h-full"}>
      <ConversationsSidebar
        conversationsData={allConversationsByUserData ?? []}
        selectedConversationId={getConversationId(
          username ?? "",
          receiverUsername ?? "",
        )}
        onSelect={(data) =>
          navigate(
            `/conversation/${data.recipientId}/${data.recipientUsername}`,
          )
        }
      />

      <main className="flex-1 flex flex-col gap-4 p-4 max-md:min-h-[90vh]  overflow-y-auto">
        <div
          className={
            "flex min-h-[76vh] w-full h-full bg-black-200 rounded-lg overflow-y-auto border-2 border-gray-600"
          }
          onScroll={onScroll}
        >
          <ChatSection messages={mergedMessages} />
        </div>

        <div className={"border-t-2 border-gray-600 bg-200 pt-4"}>
          <div className={"flex items-end"}>
            <div className={"flex-1 relative"}>
              <motion.textarea
                id={"chat-textarea"}
                value={messageText}
                whileFocus={{ borderColor: "#14b8a6" }}
                placeholder="Type a message...1"
                className="w-full border-2 text-white-100 placeholder:text-gray-400 bg-black-200 border-gray-600 rounded-lg px-4 py-2 pr-12 focus:outline-none resize-none"
                rows={1}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    console.log("enter");
                    event.preventDefault();
                    handleSendMessage();
                  }
                }}
                style={{ minHeight: "65px", maxHeight: "120px" }}
              />
              <div className={"absolute right-5 bottom-5 flex gap-2"}>
                <AnimatedButton
                  bgColor={"#222222"}
                  borderColorHover={"#222222"}
                  borderColor={"#222222"}
                  bgColorHover={"#222222"}
                  textColorHover={"#14b8a6"}
                  className={"p-1 rounded-full"}
                  onClick={handleSendMessage}
                >
                  <Send className={"size-6"} />
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
};
