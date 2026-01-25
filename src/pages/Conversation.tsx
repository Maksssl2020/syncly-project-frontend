import Page from "../animation/Page.tsx";
import ConversationsSidebar from "../components/sidebar/ConversationsSidebar.tsx";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { Send, Smile } from "lucide-react";
import ChatSection from "../components/section/ChatSection.tsx";
import useConversationInfiniteQuery from "../hooks/queries/useConversationInfiniteQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import { useEffect, useState } from "react";
import useAuthentication from "../hooks/useAuthentication.ts";
import useAllConversationsByUserQuery from "../hooks/queries/useAllConversationsByUserQuery.ts";
import type {
  ConversationMessage,
  ConversationRequest,
} from "../types/conversation.ts";
import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useInView } from "react-intersection-observer";

export const Conversation = () => {
  const { inView } = useInView();
  const { receiverId, receiverUsername } = useParams();
  const { username, userId } = useAuthentication();
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const { fetchNextPage, data, isFetchingNextPage, hasNextPage, isLoading } =
    useConversationInfiniteQuery(20, receiverId);
  // @ts-ignore
  const allMessages = data?.pages?.flatMap((page) => page?.content);

  const { allConversationsByUserData, fetchingAllConversationsByUser } =
    useAllConversationsByUserQuery();

  useEffect(() => {
    const connectWithWebSocket = () => {
      const socket = new SockJS("http://localhost:8080/ws");
      const client = Stomp.over(socket);

      client.connect({}, () => {
        setStompClient(client);

        client.subscribe(`/user/${username}/queue/messages`, (message) => {
          const receivedMessage: ConversationMessage = JSON.parse(message.body);
          setMessages((prevState) => [...prevState, receivedMessage]);
        });
      });
    };

    connectWithWebSocket();
  }, [username]);

  const sendMessage = async () => {
    if (!messageText.trim() || !receiverId || !stompClient) return;

    try {
      if (username && receiverUsername && userId && receiverId) {
        const messageToSend: ConversationRequest = {
          senderUsername: username,
          senderId: userId,
          recipientUsername: receiverUsername,
          recipientId: receiverId,
          message: messageText,
        };

        stompClient.publish({
          destination: "/app/conversation",
          body: JSON.stringify(messageToSend),
          headers: { "content-type": "application/json" },
        });

        setMessageText("");
      }
    } catch (error) {
      console.error("Błąd podczas wysyłania wiadomości:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  if (isLoading || fetchingAllConversationsByUser) {
    return <Spinner />;
  }

  if (!allMessages) {
    return (
      <Page className={"w-full flex  items-center h-full"}>
        <ConversationsSidebar
          conversationsData={allConversationsByUserData ?? []}
          selectedConversationId={receiverId}
          onSelect={() => {}}
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
        selectedConversationId={receiverId}
        onSelect={() => {}}
      />

      <main className="flex-1 flex flex-col gap-4 p-4 max-md:min-h-[90vh]  overflow-y-auto">
        <div
          className={
            "flex min-h-[76vh] w-full h-full bg-black-200 rounded-lg overflow-y-auto border-2 border-gray-600"
          }
          onScroll={onScroll}
        >
          <ChatSection messages={[...allMessages, ...messages]} />
        </div>

        <div className={"border-t-2 border-gray-600 bg-200 pt-4"}>
          <div className={"flex items-end"}>
            <div className={"flex-1 relative"}>
              <motion.textarea
                whileFocus={{ borderColor: "#14b8a6" }}
                placeholder="Type a message..."
                className="w-full border-2 text-white-100 placeholder:text-gray-400 bg-black-200 border-gray-600 rounded-lg px-4 py-2 pr-12 focus:outline-none  resize-none"
                rows={1}
                onChange={(e) => setMessageText(e.target.value)}
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
                >
                  <Smile className={"size-6"} />
                </AnimatedButton>

                <AnimatedButton
                  bgColor={"#222222"}
                  borderColorHover={"#222222"}
                  borderColor={"#222222"}
                  bgColorHover={"#222222"}
                  textColorHover={"#14b8a6"}
                  className={"p-1 rounded-full"}
                  onClick={sendMessage}
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
