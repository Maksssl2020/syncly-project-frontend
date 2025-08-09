import { motion } from "framer-motion";
import Avatar from "../img/Avatar.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import type { FriendRequest } from "../../types/friends.ts";
import { format } from "date-fns";
import useDeleteFriendRequestMutation from "../../hooks/mutations/useDeleteFriendRequestMutation.ts";

type SentFriendRequestCardProps = {
  request: FriendRequest;
};

const SentFriendRequestCard = ({ request }: SentFriendRequestCardProps) => {
  const { deleteFriendRequest, deletingFriendRequest } =
    useDeleteFriendRequestMutation();

  return (
    <motion.div
      key={request.id}
      whileHover={{
        boxShadow: "0 8px 24px rgba(20, 184, 166, 0.25)",
      }}
      className={"p-4 border-2 border-gray-600 rounded-lg"}
    >
      <div className={"flex items-center gap-3"}>
        <Avatar size={"size-12"} avatar={request.receiver.userProfile.avatar} />
        <div className={"flex-1 flex flex-col gap-1"}>
          <h4 className={"font-medium text-teal-100"}>
            {request.receiver.username}
          </h4>
          <p className={"text-sm text-gray-400"}>{request.receiver.email}</p>
          <p className={"text-xs text-gray-400"}>
            Sent {format(request.createdAt, "dd-MM-yyyy")}
          </p>
        </div>

        <div className={"flex items-center gap-2"}>
          <span className="text-sm text-black-100 bg-yellow-300 px-3 h-[35px] flex items-center justify-center rounded-lg uppercase">
            Pending
          </span>

          <AnimatedButton
            bgColor={"#222222"}
            borderColorHover={"#393939"}
            q
            borderColor={"#222222"}
            bgColorHover={"#393939"}
            textColorHover={"#ef4444"}
            loading={deletingFriendRequest}
            onClick={() => deleteFriendRequest(request.receiver.userId)}
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
