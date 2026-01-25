import Searchbar from "../input/Searchbar.tsx";
import ConversationList from "../list/ConversationList.tsx";
import type {
  ConversationResponse,
  SelectedConversation,
} from "../../types/conversation.ts";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type ConversationsSidebarProps = {
  conversationsData: ConversationResponse[];
  onSelect: (data: SelectedConversation) => void;
  selectedConversationId?: string | number;
};

const ConversationsSidebar = ({
  conversationsData,
  onSelect,
  selectedConversationId,
}: ConversationsSidebarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredConversations = conversationsData.filter((conversationData) => {
    return conversationData.recipientUsername
      .toLowerCase()
      .includes(query.toLowerCase());
  });

  return (
    <aside
      className={
        "w-ful md:w-80 hidden overflow-y-auto md:block min-h-[91.15vh] px-2 py-4 bg-black-200 border-gray-600 border-r-2"
      }
    >
      <div className={"flex-1 flex flex-col min-h-[87.5vh] w-full gap-8"}>
        {conversationsData.length > 0 && (
          <Searchbar
            onChange={(value) => setQuery(value)}
            placeholder={"Search conversations..."}
            value={query}
          />
        )}
        <div className={"w-full h-auto overflow-y-auto"}>
          <ConversationList
            conversations={filteredConversations}
            onSelect={onSelect}
            selectedConversationId={selectedConversationId}
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
