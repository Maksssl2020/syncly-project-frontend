import { useState } from "react";
import {
  getBgColorHover,
  getBorderColor,
  getBorderColorHover,
  getTextColor,
  getTextColorHover,
} from "../../utils/friendStatusUtils.ts";
import { AnimatePresence } from "framer-motion";
import { Check, Clock, Send, XIcon } from "lucide-react";
import AnimatedButton from "./AnimatedButton.tsx";
import type { FriendStatus } from "../../types/friends.ts";
import useSendFriendRequestMutation from "../../hooks/mutations/useSendFriendRequestMutation.ts";
import useDeleteFriendMutation from "../../hooks/mutations/useDeleteFriendMutation.ts";
import useDeleteFriendRequestMutation from "../../hooks/mutations/useDeleteFriendRequestMutation.ts";

type FriendButton = {
  isFriend: boolean;
  friendRequestStatus?: FriendStatus;
  receiverId?: string | number;
};

const getFriendStatus = (friendRequestStatus?: FriendStatus) => {
  switch (friendRequestStatus) {
    case "ACCEPTED":
      return (
        <>
          <Check className={"size-5"} />
          <p>Friends</p>
        </>
      );
    case "PENDING":
      return (
        <>
          <Clock className={"size-5"} />
          <p>Waiting</p>
        </>
      );
    case "NONE":
      return (
        <>
          <Send className={"size-5"} />
          <p>Send Friend Request</p>
        </>
      );
    default:
      return (
        <>
          <Send className={"size-5"} />
          <p>Send Friend Request</p>
        </>
      );
  }
};

const FriendButton = ({
  isFriend,
  friendRequestStatus,
  receiverId,
}: FriendButton) => {
  const [isFriendButtonHovered, setIsFriendButtonHovered] = useState(false);
  const { sendFriendRequest, sendingFriendRequest } =
    useSendFriendRequestMutation();
  const { deleteFriend, deletingFriend } = useDeleteFriendMutation();
  const { deleteFriendRequest, deletingFriendRequest } =
    useDeleteFriendRequestMutation();

  const onSendFriendRequest = () => {
    if (receiverId) {
      if (friendRequestStatus === "ACCEPTED") {
        deleteFriend(receiverId);
      } else if (friendRequestStatus === "PENDING") {
        deleteFriendRequest(receiverId);
      } else {
        sendFriendRequest(receiverId);
      }
    }
  };

  const isLoading =
    sendingFriendRequest || deletingFriend || deletingFriendRequest;

  return (
    <AnimatedButton
      className={`w-full px-4 py-2 rounded-lg flex items-center gap-2 border-2`}
      bgColor={isFriend ? "#14b8a6" : "#222222"}
      bgColorHover={getBgColorHover(friendRequestStatus)}
      textColor={getTextColor(friendRequestStatus)}
      textColorHover={getTextColorHover(friendRequestStatus)}
      borderColor={getBorderColor(friendRequestStatus)}
      borderColorHover={getBorderColorHover(friendRequestStatus)}
      loading={isLoading}
      onClick={(event) => {
        event.stopPropagation();
        onSendFriendRequest();
      }}
      onMouseEnter={() => setIsFriendButtonHovered(true)}
      onMouseLeave={() => setIsFriendButtonHovered(false)}
    >
      {friendRequestStatus === "ACCEPTED" ? (
        <AnimatePresence mode={"wait"}>
          {isFriendButtonHovered ? (
            <XIcon className={"size-5"} />
          ) : (
            getFriendStatus(friendRequestStatus)
          )}
        </AnimatePresence>
      ) : (
        getFriendStatus(friendRequestStatus)
      )}
      {friendRequestStatus === "ACCEPTED" && isFriendButtonHovered && (
        <p>Delete Friend</p>
      )}
    </AnimatedButton>
  );
};
export default FriendButton;
