import Searchbar from "../input/Searchbar.tsx";
import ConversationList from "../list/ConversationList.tsx";
import type { Conversation } from "../../types/conversation.ts";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";

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
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
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
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
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
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      read: true,
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "4",
    participants: [
      {
        id: "5",
        username: "alex_marketing",
        avatar: "/placeholder.svg?height=40&width=40",
        isActive: false,
      },
    ],
    lastMessage: {
      id: "m4",
      senderId: "5",
      receiverId: "1",
      content: "Can we discuss the campaign metrics tomorrow?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      read: true,
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

type ConversationsSidebarProps = {
  selectedConversationId?: string;
};

const ConversationsSidebar = ({
  selectedConversationId,
}: ConversationsSidebarProps) => {
  const navigate = useNavigate();

  return (
    <aside
      className={
        "w-ful md:w-80 hidden overflow-y-auto md:block min-h-[91.15vh] px-2 py-4 bg-black-200 border-gray-600 border-r-2"
      }
    >
      <div className={"flex-1 flex flex-col min-h-[87.5vh] w-full gap-8"}>
        <Searchbar
          onChange={() => {}}
          value={""}
          placeholder={"Search conversations..."}
        />
        <div className={"w-full h-auto overflow-y-auto"}>
          <ConversationList
            conversations={CONVERSATIONS}
            currentUserId={"1"}
            activeConversationId={selectedConversationId}
          />
        </div>
        <AnimatedButton
          bgColor={"#222222"}
          bgColorHover={"#393939"}
          borderColor={"#222222"}
          borderColorHover={"#393939"}
          textColorHover={"#14b8a6"}
          className={"mt-auto py-2 rounded-lg"}
          onClick={() => navigate("/dashboard")}
        >
          Back To Dashboard
        </AnimatedButton>
      </div>
    </aside>
  );
};

export default ConversationsSidebar;
