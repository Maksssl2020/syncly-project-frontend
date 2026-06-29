import Avatar from "../img/Avatar.tsx";
import { FileText, Users } from "lucide-react";
import type { UserItem } from "../../types/user.ts";
import { motion } from "framer-motion";
import useFriendRequestStatusQuery from "../../hooks/queries/useFriendRequestStatusQuery.ts";
import ComponentSpinner from "../spinner/ComponentSpinner.tsx";
import FriendButton from "../button/FriendButton.tsx";
import FollowButton from "../button/FollowButton.tsx";

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
  const { friendRequestStatus, fetchingFriendRequestStatus } =
    useFriendRequestStatusQuery(user.userId);

  if (fetchingFriendRequestStatus) {
    return <ComponentSpinner />;
  }

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
            <span className={"text-sm"}>0 posts</span>
          </div>
          <div className={"flex items-center gap-2 text-gray-400"}>
            <Users className={"size-5 "} />
            <span className={"text-sm"}>
              {user.userProfile.followersCount} followers
            </span>
          </div>
        </div>

        <div className={"flex gap-2 w-full"}>
          <FollowButton isFollowed={isFollowed} userId={user.userId} />
          <FriendButton
            friendRequestStatus={friendRequestStatus?.friendStatus}
            receiverId={user.userId}
          />
        </div>
      </footer>
    </motion.div>
  );
};

export default UserSearchCard;
