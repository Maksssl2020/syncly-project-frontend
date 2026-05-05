import { motion } from "framer-motion";
import Avatar from "../img/Avatar.tsx";
import type { DropdownOption } from "../../types/types.ts";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, UserMinus } from "lucide-react";
import DropdownWithTrigger from "../dropdown/DropdownWithTrigger.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import type { FriendUser } from "../../types/friends.ts";
import MessageButton from "../button/MessageButton.tsx";
import { format } from "date-fns";

type FriendCardProps = {
  friend: FriendUser;
};

const FriendCard = ({ friend }: FriendCardProps) => {
  const navigate = useNavigate();

  const friendOptions: DropdownOption[] = [
    {
      label: "View Profile",
      onClick: () => navigate(`/blog/${friend.user.userId}`),
    },
    {
      label: "Block User",
      onClick: () => console.log("Block user", friend.user.userId),
    },
  ];

  return (
    <motion.div
      whileHover={{
        boxShadow: "0 8px 24px rgba(20, 184, 166, 0.25)",
      }}
      key={friend.user.userId + friend.user.username}
      className={"p-4 border-2 border-gray-600 flex flex-col gap-3 rounded-lg "}
    >
      <div className={"flex items-center gap-3 relative"}>
        <div className={"relative"}>
          <Avatar size={"size-12"} avatar={friend.user.userProfile.avatar} />

          {friend.user.status === "ACTIVE" && (
            <div
              className={
                "absolute -bottom-1 -right-1 size-4 bg-teal-100 rounded-full"
              }
            />
          )}
        </div>
        <div className={"flex-1 space-y-1"}>
          <h3 className={"font-medium text-teal-100 truncate"}>
            {friend.user.username}
          </h3>
          <p className={"text-sm text-gray-400"}>{friend.user.email}</p>
          {friend.user.lastActive && (
            <p className={"text-xs text-gray-400"}>
              {format(friend.user.lastActive, "dd.MM.yyyy hh:mm")}
            </p>
          )}
        </div>

        <DropdownWithTrigger
          trigger={<MoreHorizontal className={"size-5"} />}
          options={friendOptions}
          dropdownWidth={"w-[150px]"}
        />
      </div>

      <div className={"flex gap-4"}>
        <MessageButton
          onClick={() =>
            navigate(
              `/conversation/${friend.user.userId}/${friend.user.username}`,
            )
          }
        />
        <AnimatedButton
          bgColor={"#222222"}
          borderColorHover={"#393939"}
          borderColor={"#222222"}
          bgColorHover={"#393939"}
          textColorHover={"#ef4444"}
          className={
            " flex items-center px-2 justify-center gap-2 py-2 rounded-lg"
          }
        >
          <UserMinus className={"size-4"} />
          Remove Friend
        </AnimatedButton>
      </div>
      {friend.mutualFriendsCount > 0 && (
        <p className="text-xs text-gray-400">
          {friend.mutualFriendsCount} mutual friend
          {friend.mutualFriendsCount !== 1 ? "s" : ""}
        </p>
      )}
    </motion.div>
  );
};

export default FriendCard;
