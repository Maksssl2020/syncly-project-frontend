import { useState } from "react";
import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import type { UserItem } from "../../types/user.ts";
import useFriendRequestStatusQuery from "../../hooks/queries/useFriendRequestStatusQuery.ts";
import { Check, Clock, PlusIcon, XIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";

type DashboardPeopleYouMayKnowCardProps = {
  user: UserItem;
  onNavigate: (path: string) => void;
  onSendFriendRequest: (userId: string | number) => void;
  onDeleteFriendRequest: (userId: string | number) => void;
  sendingFriendRequest: boolean;
  sendingFriendRequestUserId?: string | number;
  deletingFriendRequest: boolean;
  deletingFriendRequestUserId?: string | number;
};

const DashboardPeopleYouMayKnowCard = ({
  user,
  onNavigate,
  onDeleteFriendRequest,
  onSendFriendRequest,
  sendingFriendRequestUserId,
  sendingFriendRequest,
  deletingFriendRequestUserId,
  deletingFriendRequest,
}: DashboardPeopleYouMayKnowCardProps) => {
  const [isFriendButtonHovered, setIsFriendButtonHovered] = useState(false);
  const { friendRequestStatus } = useFriendRequestStatusQuery(user.userId);

  const onSendFriendRequestClick = () => {
    if (friendRequestStatus === "PENDING") {
      onDeleteFriendRequest(user.userId);
    } else {
      onSendFriendRequest(user.userId);
    }
  };

  const getFriendStatus = () => {
    switch (friendRequestStatus) {
      case "ACCEPTED":
        return (
          <>
            <Check className={"size-5"} />
          </>
        );
      case "PENDING":
        return (
          <>
            <Clock className={"size-5"} />
          </>
        );
      case "NONE":
        return (
          <>
            <PlusIcon className={"size-5"} />
          </>
        );
      default:
        return (
          <>
            <PlusIcon className={"size-5"} />
          </>
        );
    }
  };

  const getBorderColor = () => {
    switch (friendRequestStatus) {
      case "PENDING":
        return "#eab308";
      default:
        return "#14b8a6";
    }
  };

  const getTextColor = () => {
    switch (friendRequestStatus) {
      case "ACCEPTED":
      case "NONE":
        return "#14b8a6";
      case "PENDING":
        return "#eab308";
      default:
        return "#111111";
    }
  };

  const getTextColorHover = () => {
    switch (friendRequestStatus) {
      case "ACCEPTED":
      case "PENDING":
        return "#ef4444";
      default:
        return "#111111";
    }
  };

  const getBgColorHover = () => {
    switch (friendRequestStatus) {
      case "ACCEPTED":
      case "PENDING":
        return "#222222";
      default:
        return "#14b8a6";
    }
  };

  const getBorderColorHover = () => {
    switch (friendRequestStatus) {
      case "ACCEPTED":
      case "PENDING":
        return "#ef4444";
      default:
        return "#14b8a6";
    }
  };

  return (
    <div
      onClick={() => onNavigate(`/blog/${user.userId}`)}
      key={user.userId}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-600 transition-colors"
    >
      <Avatar avatar={user.userProfile.avatar} size={"size-10"} />

      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm truncate">
          {user.username}
        </p>
        <p className="text-gray-400 text-xs">@{user.username}</p>
        <p className="text-gray-200 text-xs">
          {user.mutualFriendsCount} mutual friends
        </p>
      </div>
      <AnimatedButton
        className={`w-auto px-1  py-1 rounded-lg flex items-center gap-2 border-2`}
        bgColor={"#222222"}
        bgColorHover={getBgColorHover()}
        textColor={getTextColor()}
        textColorHover={getTextColorHover()}
        borderColor={getBorderColor()}
        borderColorHover={getBorderColorHover()}
        loading={
          (sendingFriendRequestUserId === user.userId &&
            sendingFriendRequest) ||
          (deletingFriendRequestUserId === user.userId && deletingFriendRequest)
        }
        onClick={(event) => {
          event.stopPropagation();
          onSendFriendRequestClick();
        }}
        onMouseEnter={() => setIsFriendButtonHovered(true)}
        onMouseLeave={() => setIsFriendButtonHovered(false)}
      >
        {friendRequestStatus === "ACCEPTED" ? (
          <AnimatePresence mode={"wait"}>
            {isFriendButtonHovered ? (
              <XIcon className={"size-2"} />
            ) : (
              getFriendStatus()
            )}
          </AnimatePresence>
        ) : (
          getFriendStatus()
        )}
      </AnimatedButton>
    </div>
  );
};

export default DashboardPeopleYouMayKnowCard;
