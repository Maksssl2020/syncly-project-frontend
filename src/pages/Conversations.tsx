import Page from "../animation/Page.tsx";
import { MessageCircle, Plus, Search } from "lucide-react";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useState } from "react";
import NewMessageModal from "../components/modal/NewMessageModal.tsx";
import ConversationsSidebar from "../components/sidebar/ConversationsSidebar.tsx";

const Conversations = () => {
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);

  return (
    <Page className={"w-full flex overflow-hidden items-center"}>
      <ConversationsSidebar />

      <main className="flex-1 flex flex-col max-md:min-h-[90vh]  items-center justify-center ">
        <div
          className={
            "bg-black-200 max-w-md text-center items-center p-4 rounded-lg flex flex-col gap-4"
          }
        >
          <div
            className={
              "p-6 rounded-full  items-center bg-teal-100/20 justify-center flex"
            }
          >
            <MessageCircle className={"size-12 text-teal-100"} />
          </div>
          <h2 className="text-2xl font-bold text-white-100">Your Messages</h2>
          <p className="text-gray-400 mb-6">
            Select a conversation from the sidebar or start a new one to begin
            messaging
          </p>
          <AnimatedButton
            bgColor={"#14b8a6"}
            bgColorHover={"#0d9488"}
            borderColor={"#14b8a6"}
            borderColorHover={"#0d9488"}
            textColor={"#111111"}
            textColorHover={"#111111"}
            onClick={() => setIsNewMessageModalOpen(!isNewMessageModalOpen)}
            className={
              "flex gap-3 rounded-lg h-[50px] items-center justify-center px-6"
            }
          >
            <Plus className={"size-6"} />
            New Message
          </AnimatedButton>
        </div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black-200 border-t-2 border-gray-600 p-3 flex justify-around">
        <button className="flex flex-col items-center justify-center text-teal-100">
          <MessageCircle className="size-6" />
          <span className="text-xs mt-1">Messages</span>
        </button>
        <button className="flex flex-col items-center justify-center text-gray-400">
          <Search className="size-6" />
          <span className="text-xs mt-1">Search</span>
        </button>
        <button className="flex flex-col items-center justify-center text-gray-400">
          <Plus className="size-6" />
          <span className="text-xs mt-1">New</span>
        </button>
      </div>

      <NewMessageModal
        isOpen={isNewMessageModalOpen}
        onClose={() => setIsNewMessageModalOpen(false)}
      />
    </Page>
  );
};

export default Conversations;
