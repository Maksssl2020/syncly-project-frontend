import { motion } from "framer-motion";
import type { FriendRequest } from "../../types/user.ts";
import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";

type SentFriendRequestCardProps = {
  request: FriendRequest;
};

const SentFriendRequestCard = ({ request }: SentFriendRequestCardProps) => {
  return (
    <motion.div
      key={request.id}
      whileHover={{
        boxShadow: "0 8px 24px rgba(20, 184, 166, 0.25)",
      }}
      className={"p-4 border-2 border-gray-600 rounded-lg"}
    >
      <div className={"flex items-center gap-3"}>
        <Avatar size={"size-12"} />
        <div className={"flex-1 flex flex-col gap-1"}>
          <h4 className={"font-medium text-teal-100"}>
            {request.user.username}
          </h4>
          <p className={"text-sm text-gray-400"}>{request.user.email}</p>
          <p className={"text-xs text-gray-400"}>Sent {request.createdAt}</p>
        </div>

        <div className={"flex items-center gap-2"}>
          <span className="text-sm text-black-100 bg-yellow-300 px-3 h-[35px] flex items-center justify-center rounded-lg uppercase">
            Pending
          </span>

          <AnimatedButton
            bgColor={"#222222"}
            borderColorHover={"#393939"}
            borderColor={"#222222"}
            bgColorHover={"#393939"}
            textColorHover={"#ef4444"}
            className={"flex gap-2 items-center px-4 py-2 rounded-lg"}
          >
            Cancel
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
};

export default SentFriendRequestCard;
