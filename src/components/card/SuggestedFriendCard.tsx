import { motion } from "framer-motion";
import type { FriendSuggest } from "../../types/user.ts";
import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Briefcase, MapPin, UserPlus, X } from "lucide-react";

type SuggestedFriendCardProps = {
  user: FriendSuggest;
};

const SuggestedFriendCard = ({ user }: SuggestedFriendCardProps) => {
  const getReasonIcon = (reason?: string) => {
    if (reason?.includes("Works")) return <Briefcase className="size-4" />;
    if (reason?.includes("Lives")) return <MapPin className="size-4" />;
    return <UserPlus className="size-4" />;
  };

  return (
    <motion.div
      key={user.id}
      whileHover={{
        boxShadow: "0 8px 24px rgba(20, 184, 166, 0.25)",
      }}
      className={"p-4 border-2 border-gray-600 rounded-lg flex flex-col gap-3"}
    >
      <div className={"flex items-start justify-between "}>
        <div className={"flex items-center gap-3"}>
          <Avatar size={"size-12"} />
          <div className={"flex-1"}>
            <h4 className={"font-medium text-teal-100 truncate"}>
              {user.username}
            </h4>
            <p className="text-sm text-gray-400 truncate">{user.email}</p>
          </div>
        </div>

        <AnimatedButton
          bgColor={"#222222"}
          borderColorHover={"#393939"}
          borderColor={"#222222"}
          bgColorHover={"#393939"}
          textColorHover={"#ef4444"}
          className={"flex gap-2 items-center p-2 rounded-lg"}
        >
          <X className={"size-4"} />
        </AnimatedButton>
      </div>

      <div className={"flex flex-col gap-2"}>
        <div className={"flex items-center gap-2 text-sm text-white-100"}>
          {getReasonIcon(user?.reason)}
          <span>{user.reason}</span>
        </div>

        {user.mutualFriends > 0 && (
          <p className="text-sm text-gray-400">
            {user.mutualFriends} mutual friend
            {user.mutualFriends !== 1 ? "s" : ""}
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
