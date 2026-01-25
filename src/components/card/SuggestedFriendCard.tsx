import { motion } from "framer-motion";
import type { UserItem } from "../../types/user.ts";
import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { UserPlus } from "lucide-react";

type SuggestedFriendCardProps = {
  user: UserItem;
  onAddFriend: (userId: string | number) => void;
  addingFriend: boolean;
  addingFriendId?: string | number;
};

const SuggestedFriendCard = ({
  user,
  onAddFriend,
  addingFriendId,
  addingFriend,
}: SuggestedFriendCardProps) => {
  return (
    <motion.div
      key={user.userId}
      whileHover={{
        boxShadow: "0 8px 24px rgba(20, 184, 166, 0.25)",
      }}
      className={"p-4 border-2 border-gray-600 rounded-lg flex flex-col gap-3"}
    >
      <div className={"flex items-start justify-between "}>
        <div className={"flex items-center gap-3"}>
          <Avatar avatar={user.userProfile.avatar} size={"size-12"} />
          <div className={"flex-1"}>
            <h4 className={"font-medium text-teal-100 truncate"}>
              {user.userProfile.displayName}
            </h4>
            <p className="text-sm text-gray-400 truncate">{user.username}</p>
          </div>
        </div>
      </div>

      <div className={"flex flex-col gap-2"}>
        {user.mutualFriendsCount > 0 && (
          <p className="text-sm text-gray-400">
            {user.mutualFriendsCount} mutual friend
            {user.mutualFriendsCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <AnimatedButton
        bgColor={"#14b8a6"}
        bgColorHover={"#0d9488"}
        borderColor={"#14b8a6"}
        borderColorHover={"#0d9488"}
        textColor={"#111111"}
        textColorHover={"#111111"}
        loading={addingFriend && addingFriendId === user.userId}
        onClick={() => onAddFriend(user.userId)}
        className={
          "flex gap-2 items-center justify-center px-4 py-2 rounded-lg"
        }
      >
        <UserPlus className={"size-4"} />
        Add Friend
      </AnimatedButton>
    </motion.div>
  );
};

export default SuggestedFriendCard;
