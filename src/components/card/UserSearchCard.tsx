import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import {
  Check,
  Clock,
  FileText,
  Send,
  UserPlus,
  Users,
  XIcon,
} from "lucide-react";
import type { UserItem } from "../../types/user.ts";
import useFollowUserMutation from "../../hooks/mutations/useFollowUserMutation.ts";
import useUnfollowUserMutation from "../../hooks/mutations/useUnfollowUserMutation.ts";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useSendFriendRequestMutation from "../../hooks/mutations/useSendFriendRequestMutation.ts";
import useDeleteFriendMutation from "../../hooks/mutations/useDeleteFriendMutation.ts";
import useFriendRequestStatusQuery from "../../hooks/queries/useFriendRequestStatusQuery.ts";
import ComponentSpinner from "../spinner/ComponentSpinner.tsx";
import useDeleteFriendRequestMutation from "../../hooks/mutations/useDeleteFriendRequestMutation.ts";

type UserSearchCardProps = {
  user: UserItem;
  isFollowed: boolean;
  onClick?: () => void;
};

const UserSearchCard = ({
  user,
  isFollowed = false,
  onClick,
}: UserSearchCardProps) => {
  const [isFriendButtonHovered, setIsFriendButtonHovered] = useState(false);
  const { followUser, followingUser } = useFollowUserMutation();
  const { unfollowUser, unfollowingUser } = useUnfollowUserMutation();
  const { sendFriendRequest, sendingFriendRequest } =
    useSendFriendRequestMutation();
  const { deleteFriend, deletingFriend } = useDeleteFriendMutation();
  const { deleteFriendRequest, deletingFriendRequest } =
    useDeleteFriendRequestMutation();
  const { friendRequestStatus, fetchingFriendRequestStatus } =
    useFriendRequestStatusQuery(user.userId);
  console.log(user);

  const onFollowUserClick = () => {
    if (isFollowed) {
      unfollowUser(user.userId);
    } else {
      followUser(user.userId);
    }
  };

  if (fetchingFriendRequestStatus) {
    return <ComponentSpinner />;
  }

  const isFriend = friendRequestStatus === "ACCEPTED";

  const onSendFriendRequest = () => {
    if (friendRequestStatus === "ACCEPTED") {
      deleteFriend(user.userId);
    } else if (friendRequestStatus === "PENDING") {
      deleteFriendRequest(user.userId);
    } else {
      sendFriendRequest(user.userId);
    }
  };

  const getFriendStatus = () => {
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

  // PENDING,
  //   ACCEPTED,
  //   BLOCKED,
  //   DECLINED,
  //   NONE

  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        borderColor: "#14b8a6",
        boxShadow: "0 8px 24px rgba(20, 184, 166, 0.25)",
      }}
      className="rounded-xl cursor-pointer p-6 border-2 bg-black-200 border-gray-600"
    >
      <header className={"flex items-start  mb-4"}>
        <div className={"flex items-center gap-4"}>
          <Avatar avatar={user.userProfile.avatar} />
          <div>
            <h3 className={"text-lg font-bold text-white-100"}>
              {user.userProfile.displayName}
            </h3>
            <p className={"text-gray-400"}>@{user.username}</p>
          </div>
        </div>
      </header>

      <p className={"mb-4 text-white-100"}>{user.userProfile.bio}</p>

      <footer className={"flex flex-col gap-6"}>
        <div className={"flex items-center gap-6"}>
          <div className={"flex items-center gap-2 text-gray-400"}>
            <FileText className={"size-5 "} />
            <span className={"text-sm"}>0posts</span>
          </div>
          <div className={"flex items-center gap-2 text-gray-400"}>
            <Users className={"size-5 "} />
            <span className={"text-sm"}>
              {user.userProfile.followersCount} followers
            </span>
          </div>
        </div>

        <div className={"flex gap-2 w-full"}>
          <AnimatedButton
            className={`w-full px-4 py-2 rounded-lg flex items-center gap-2 border-2`}
            bgColor={isFollowed ? "#14b8a6" : "#222222"}
            bgColorHover={isFollowed ? "#0d9488" : "#14b8a6"}
            textColor={isFollowed ? "#111111" : "#14b8a6"}
            textColorHover={"#111111"}
            borderColor={"#14b8a6"}
            borderColorHover={isFollowed ? "#0d9488" : "#14b8a6"}
            loading={followingUser || unfollowingUser}
            onClick={(event) => {
              event.stopPropagation();
              onFollowUserClick();
            }}
          >
            {isFollowed ? (
              <Check className={"size-5"} />
            ) : (
              <UserPlus className={"size-5"} />
            )}
            {isFollowed ? "Followed" : "Follow"}
          </AnimatedButton>
          <AnimatedButton
            className={`w-full px-4  py-2 rounded-lg flex items-center gap-2 border-2`}
            bgColor={isFriend ? "#14b8a6" : "#222222"}
            bgColorHover={getBgColorHover()}
            textColor={getTextColor()}
            textColorHover={getTextColorHover()}
            borderColor={getBorderColor()}
            borderColorHover={getBorderColorHover()}
            loading={
              sendingFriendRequest || deletingFriend || deletingFriendRequest
            }
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
                  getFriendStatus()
                )}
              </AnimatePresence>
            ) : (
              getFriendStatus()
            )}
            {friendRequestStatus === "ACCEPTED" && isFriendButtonHovered && (
              <p>Delete Friend</p>
            )}
          </AnimatedButton>
        </div>
      </footer>
    </motion.div>
  );
};

export default UserSearchCard;
