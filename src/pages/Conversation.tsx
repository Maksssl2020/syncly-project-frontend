import Page from "../animation/Page.tsx";
import ConversationsSidebar from "../components/sidebar/ConversationsSidebar.tsx";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { Send, Smile } from "lucide-react";
import ChatSection from "../components/section/ChatSection.tsx";
import useConversationQuery from "../hooks/queries/useConversationQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import { useState } from "react";
import { handleSendMessage } from "../config/stompClient.ts";
import useAuthentication from "../hooks/useAuthentication.ts";
import useAllConversationsByUserQuery from "../hooks/queries/useAllConversationsByUserQuery.ts";
import { useUserPresence } from "../hooks/useUserPresence.ts";

export const Conversation = () => {
  const { receiverId, receiverUsername } = useParams();
  const [messageText, setMessageText] = useState("");

  const { conversationData, fetchingConversationData } =
    useConversationQuery(receiverId);
  const { allConversationsByUserData, fetchingAllConversationsByUser } =
    useAllConversationsByUserQuery();
  const { username } = useAuthentication();

  const presence = useUserPresence(receiverId ?? -1);

  console.log("presence", presence);

  const handleSend = () => {
    if (!messageText.trim() || !receiverId) return;

    if (username && receiverUsername) {
      const messageToSend = {
        senderUsername: username,
        recipientUsername: receiverUsername,
        message: messageText,
      };

      console.log("Sending message to conversation", messageToSend);
      handleSendMessage(messageToSend);
      setMessageText("");
    }
  };

  if (fetchingConversationData || fetchingAllConversationsByUser) {
    return <Spinner />;
  }

  if (!conversationData) {
    return (
      <Page className={"w-full flex  items-center h-full"}>
        <ConversationsSidebar
          conversationsData={allConversationsByUserData ?? []}
          selectedConversationId={receiverId}
        />

        <div className="flex-1 flex flex-col items-center p-4 max-md:min-h-[90vh]  overflow-y-auto">
          <div
            className={
              "w-auto flex flex-col items-center gap-4 w-fit p-12 bg-black-200 rounded-lg border-2 border-gray-600"
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
      />

      <main className="flex-1 flex flex-col gap-4 p-4 max-md:min-h-[90vh]  overflow-y-auto">
        <div
          className={
            "flex min-h-[76vh] w-full h-full bg-black-200 rounded-lg overflow-y-auto border-2 border-gray-600"
          }
        >
          <ChatSection messages={conversationData} />
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
                  onClick={handleSend}
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
