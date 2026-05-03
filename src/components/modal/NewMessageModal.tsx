import Modal from "./Modal.tsx";
import Searchbar from "../input/Searchbar.tsx";
import { useState } from "react";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Users, X } from "lucide-react";
import Avatar from "../img/Avatar.tsx";
import useUserFriendsQuery from "../../hooks/queries/useUserFriendsQuery.ts";
import ComponentSpinner from "../spinner/ComponentSpinner.tsx";
import { useNavigate } from "react-router-dom";

type NewMessageModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NewMessageModal = ({ isOpen, onClose }: NewMessageModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { userFriendsData, fetchingUserFriendsData } = useUserFriendsQuery();
  const filteredUsers =
    userFriendsData?.filter((friend) =>
      friend.user.username.toLowerCase().includes(searchQuery.toLowerCase()),
    ) ?? [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={
          "max-h-[80vh] flex flex-col w-full p-4 gap-4 shadow-xl rounded-lg bg-black-200"
        }
      >
        {fetchingUserFriendsData ? (
          <ComponentSpinner size={50} />
        ) : (
          <>
            <header
              className={
                "flex  items-center justify-between border-b-2 pb-4 border-gray-600"
              }
            >
              <h2 className="text-lg font-semibold text-white-100">
                New Message
              </h2>
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
                  {filteredUsers.map((friend) => (
                    <div
                      key={friend.user.username}
                      className={
                        "flex gap-4 hover:bg-[#393939] items-center p-2 rounded-lg cursor-pointer "
                      }
                      onClick={() =>
                        navigate(
                          `/conversation/${friend.user.userId}/${friend.user.username}`,
                        )
                      }
                    >
                      <Avatar
                        size={"size-10"}
                        avatar={friend.user.userProfile.avatar}
                      />
                      <p className={"font-medium text-white-100"}>
                        {friend.user.username}
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
                  <p className={"text-gray-400"}>
                    {" "}
                    Try a different search term or add a new friend
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default NewMessageModal;
