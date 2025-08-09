import { Clock, Send } from "lucide-react";
import ReceivedFriendRequestCard from "../card/ReceivedFriendRequestCard.tsx";
import SentFriendRequestCard from "../card/SentFriendRequestCard.tsx";
import type { FriendRequest } from "../../types/friends.ts";

interface FriendRequestsProps {
  requests: FriendRequest[];
  type: "SENT" | "RECEIVED";
}

const FriendRequestsList = ({ requests, type }: FriendRequestsProps) => {
  return (
    <div className={"p-6 flex flex-col gap-6"}>
      {requests.length > 0 && type === "RECEIVED" && (
        <div className={"flex flex-col gap-4"}>
          <h3
            className={
              "text-lg font-medium text-white-100 flex items-center gap-2"
            }
          >
            <Clock className={"size-5"} />
            Received Requests ({requests.length})
          </h3>

          <div className={"flex flex-col gap-3"}>
            {requests.map((request) => (
              <ReceivedFriendRequestCard request={request} />
            ))}
          </div>
        </div>
      )}

      {requests.length > 0 && type === "SENT" && (
        <div className={"flex flex-col gap-4"}>
          <h3
            className={
              "text-lg font-medium text-white-100 flex items-center gap-2"
            }
          >
            <Send className={"size-5"} />
            Sent Requests ({requests.length})
          </h3>

          {requests.map((request) => (
            <SentFriendRequestCard request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequestsList;
