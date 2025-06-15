import Page from "../animation/Page.tsx";
import type { Conversation, Message } from "../types/conversation.ts";
import ConversationsSidebar from "../components/sidebar/ConversationsSidebar.tsx";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { Send, Smile } from "lucide-react";
import ChatSection from "../components/section/ChatSection.tsx";

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    participants: [
      {
        id: "2",
        username: "jane_smith",
        avatar: "/placeholder.svg?height=40&width=40",
        isActive: true,
      },
    ],
    lastMessage: {
      id: "m1",
      senderId: "2",
      receiverId: "1",
      content: "Hey, have you seen the new features?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      read: false,
    },
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2",
    participants: [
      {
        id: "3",
        username: "dev_mike",
        avatar: "/placeholder.svg?height=40&width=40",
        isActive: false,
      },
    ],
    lastMessage: {
      id: "m2",
      senderId: "1",
      receiverId: "3",
      content: "I just pushed the new admin panel code",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: true,
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "3",
    participants: [
      {
        id: "4",
        username: "sarah_designer",
        avatar: "/placeholder.svg?height=40&width=40",
        isActive: true,
      },
    ],
    lastMessage: {
      id: "m3",
      senderId: "4",
      receiverId: "1",
      content: "The new mockups are ready for review",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const MESSAGES: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "2",
      receiverId: "1",
      content: "Hey, have you seen the new features?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      read: true,
    },
    {
      id: "m2",
      senderId: "1",
      receiverId: "2",
      content: "Yes, I just checked them out. The admin panel looks great!",
      timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      read: true,
    },
    {
      id: "m3",
      senderId: "2",
      receiverId: "1",
      content:
        "I especially like the new reporting system. It's much more intuitive now.",
      timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      read: true,
    },
    {
      id: "m4",
      senderId: "1",
      receiverId: "2",
      content:
        "Agreed! The tag management is also much better. Did you try the bulk operations?",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      read: true,
    },
    {
      id: "m5",
      senderId: "2",
      receiverId: "1",
      content:
        "Not yet, I'll check that out next. By the way, are we still meeting tomorrow to discuss the new features?",
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      read: true,
    },
    {
      id: "m6",
      senderId: "1",
      receiverId: "2",
      content:
        "Yes, 2 PM works for me. I'll prepare some notes on what we've implemented so far.",
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      read: true,
    },
    {
      id: "m7",
      senderId: "2",
      receiverId: "1",
      content: "Perfect! Looking forward to it.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: true,
    },
    {
      id: "m8",
      senderId: "2",
      receiverId: "1",
      content:
        "Oh, one more thing - have you seen the new 404 page? It looks amazing!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      read: false,
    },
  ],
  "2": [
    {
      id: "m1",
      senderId: "1",
      receiverId: "3",
      content: "Hey Mike, I just pushed the new admin panel code",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      read: true,
    },
    {
      id: "m2",
      senderId: "3",
      receiverId: "1",
      content: "Great! I'll review it this afternoon",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(),
      read: true,
    },
    {
      id: "m3",
      senderId: "1",
      receiverId: "3",
      content: "Thanks! Let me know if you have any questions",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: true,
    },
  ],
  "3": [
    {
      id: "m1",
      senderId: "4",
      receiverId: "1",
      content: "Hi John, the new mockups are ready for review",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
      read: true,
    },
    {
      id: "m2",
      senderId: "1",
      receiverId: "4",
      content: "Awesome! I'll take a look at them today",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
    },
  ],
};

export const Conversation = () => {
  const { conversationId } = useParams();
  const conversation = CONVERSATIONS.find((c) => c.id === conversationId);
  const messages = MESSAGES[conversationId as keyof typeof MESSAGES] || [];

  if (!conversation) {
    return (
      <Page className={"w-full flex  items-center h-full"}>
        <ConversationsSidebar selectedConversationId={conversationId} />

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

  const participant = conversation.participants[0];

  return (
    <Page className={"w-full flex  items-center h-full"}>
      <ConversationsSidebar selectedConversationId={conversationId} />

      <main className="flex-1 flex flex-col gap-4 p-4 max-md:min-h-[90vh]  overflow-y-auto">
        <div
          className={
            "flex min-h-[76vh] w-full h-full bg-black-200 rounded-lg overflow-y-auto border-2 border-gray-600"
          }
        >
          <ChatSection
            messages={messages}
            currentUserId={"1"}
            participant={participant}
          />
        </div>

        <div className={"border-t-2 border-gray-600 bg-200 pt-4"}>
          <div className={"flex items-end"}>
            <div className={"flex-1 relative"}>
              <motion.textarea
                whileFocus={{ borderColor: "#14b8a6" }}
                placeholder="Type a message..."
                className="w-full border-2 text-white-100 placeholder:text-gray-400 bg-black-200 border-gray-600 rounded-lg px-4 py-2 pr-12 focus:outline-none  resize-none"
                rows={1}
                style={{ minHeight: "65px", maxHeight: "120px" }}
              ></motion.textarea>
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
