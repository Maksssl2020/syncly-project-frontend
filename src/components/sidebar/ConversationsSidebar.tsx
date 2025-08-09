import Searchbar from "../input/Searchbar.tsx";
import ConversationList from "../list/ConversationList.tsx";
import type { ConversationResponse } from "../../types/conversation.ts";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";

type ConversationsSidebarProps = {
  conversationsData: ConversationResponse[];
  selectedConversationId?: string;
};

const ConversationsSidebar = ({
  conversationsData,
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
            conversations={conversationsData}
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
