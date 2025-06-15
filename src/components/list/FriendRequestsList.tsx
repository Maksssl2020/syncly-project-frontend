import React from "react";
import type { FriendRequest } from "../../types/user.ts";
import { Clock, Send } from "lucide-react";
import ReceivedFriendRequestCard from "../card/ReceivedFriendRequestCard.tsx";
import SentFriendRequestCard from "../card/SentFriendRequestCard.tsx";

interface FriendRequestsProps {
  requests: FriendRequest[];
}

const FriendRequestsList = ({ requests }: FriendRequestsProps) => {
  const receivedRequests = requests.filter((req) => req.type === "received");
  const sentRequests = requests.filter((req) => req.type === "sent");

  if (requests.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="size-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="size-8 text-black-100" />
        </div>
        <h3 className="text-lg font-medium text-white-100 mb-2">
          No friend requests
        </h3>
        <p className="text-gray-400">
          When you receive friend requests, they'll appear here
        </p>
      </div>
    );
  }

  return (
    <div className={"p-6 flex flex-col gap-6"}>
      {receivedRequests.length > 0 && (
        <div className={"flex flex-col gap-4"}>
          <h3
            className={
              "text-lg font-medium text-white-100 flex items-center gap-2"
            }
          >
            <Clock className={"size-5"} />
            Received Requests ({receivedRequests.length})
          </h3>

          <div className={"flex flex-col gap-3"}>
            {receivedRequests.map((request) => (
              <ReceivedFriendRequestCard request={request} />
            ))}
          </div>
        </div>
      )}

      {sentRequests.length > 0 && (
        <div className={"flex flex-col gap-4"}>
          <h3
            className={
              "text-lg font-medium text-white-100 flex items-center gap-2"
            }
          >
            <Send className={"size-5"} />
            Sent Requests ({sentRequests.length})
          </h3>

          {sentRequests.map((request) => (
            <SentFriendRequestCard request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequestsList;
