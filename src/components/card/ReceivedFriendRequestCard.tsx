import type { FriendRequest } from "../../types/user.ts";
import { motion } from "framer-motion";
import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Check, X } from "lucide-react";

type ReceivedFriendRequestCardProps = {
  request: FriendRequest;
};

const ReceivedFriendRequestCard = ({
  request,
}: ReceivedFriendRequestCardProps) => {
  return (
    <motion.div
      key={request.id}
      whileHover={{
        boxShadow: "0 8px 24px rgba(20, 184, 166, 0.25)",
      }}
      className={"p-4 border-2 border-gray-600 rounded-lg"}
    >
      <div className={"flex items-center gap-4"}>
        <Avatar size={"size-12"} />

        <div className={"flex-1 flex flex-col gap-1"}>
          <h4 className={"font-medium text-teal-100"}>
            {request.user.username}
          </h4>
          <p className={"text-sm text-gray-400"}>{request.user.email}</p>
          {request.user.mutualFriends > 0 && (
            <p className={"text-xs text-gray-400"}>
              {request.user.mutualFriends} mutual friend
              {request.user.mutualFriends !== 1 ? "s" : ""}
            </p>
          )}
          <p className={"text-xs text-gray-400"}>{request.createdAt}</p>
        </div>

        <div className={"flex gap-2"}>
          <AnimatedButton
            bgColor={"#14b8a6"}
            bgColorHover={"#0d9488"}
            borderColor={"#14b8a6"}
            borderColorHover={"#0d9488"}
            textColor={"#111111"}
            textColorHover={"#111111"}
            className={"flex gap-2 items-center px-4 py-2 rounded-lg"}
          >
            <Check className={"size-4"} />
            Accept
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            borderColorHover={"#393939"}
            borderColor={"#222222"}
            bgColorHover={"#393939"}
            textColorHover={"#ef4444"}
            className={"flex gap-2 items-center px-4 py-2 rounded-lg"}
          >
            <X className={"size-4"} />
            Decline
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
};

export default ReceivedFriendRequestCard;
