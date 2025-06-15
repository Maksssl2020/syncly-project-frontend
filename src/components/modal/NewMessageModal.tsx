import Modal from "./Modal.tsx";
import Searchbar from "../input/Searchbar.tsx";
import type { ConversationUser } from "../../types/conversation.ts";
import { useState } from "react";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Users, X } from "lucide-react";
import Avatar from "../img/Avatar.tsx";

type NewMessageModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const USERS: ConversationUser[] = [
  {
    id: "2",
    username: "jane_smith",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    username: "dev_mike",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    username: "sarah_designer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    username: "alex_marketing",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    username: "chris_product",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    username: "taylor_support",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const NewMessageModal = ({ isOpen, onClose }: NewMessageModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUsers = USERS.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={
          "max-h-[80vh] flex flex-col w-full p-4 gap-4 shadow-xl rounded-lg bg-black-200"
        }
      >
        <header
          className={
            "flex  items-center justify-between border-b-2 pb-4 border-gray-600"
          }
        >
          <h2 className="text-lg font-semibold text-white-100">New Message</h2>
          <AnimatedButton
            bgColor={"#222222"}
            bgColorHover={"#393939"}
            borderColor={"#222222"}
            borderColorHover={"#393939"}
            textColorHover={"#14b8a6"}
            className={"p-2 rounded-full"}
            onClick={onClose}
          >
            <X className={"size-5"} />
          </AnimatedButton>
        </header>

        <div className={"border-b-2 pb-4 border-gray-600"}>
          <Searchbar
            onChange={(value) => setSearchQuery(value)}
            value={searchQuery}
            placeholder={"Search users...."}
          />
        </div>

        <div className={"overflow-y-auto flex-1"}>
          {filteredUsers.length > 0 ? (
            <div className={"flex flex-col gap-2"}>
              {filteredUsers.map((user) => (
                <div
                  className={
                    "flex gap-4 hover:bg-[#393939] items-center p-2 rounded-lg cursor-pointer "
                  }
                >
                  <Avatar size={"size-10"} />
                  <p className={"font-medium text-white-100"}>
                    {user.username}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={
                "flex flex-col items-center  justify-center p-4 text-center"
              }
            >
              <div className={"bg-teal-100 p-4 rounded-full mb-4"}>
                <Users className={"size-8 text-black-100"} />
              </div>
              <p className={"text-gray-400"}>No users found</p>
              <p className={"text-gray-400"}> Try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default NewMessageModal;
