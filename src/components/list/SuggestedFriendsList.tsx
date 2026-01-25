import type { UserItem } from "../../types/user.ts";
import { UserPlus } from "lucide-react";
import SuggestedFriendCard from "../card/SuggestedFriendCard.tsx";
import useSendFriendRequestMutation from "../../hooks/mutations/useSendFriendRequestMutation.ts";
import { useState } from "react";

interface SuggestedFriendsProps {
  suggested: UserItem[];
}

const SuggestedFriendsList = ({ suggested }: SuggestedFriendsProps) => {
  const [sentFriendRequestUserId, setSentFriendRequestUserId] = useState<
    string | number | undefined
  >(undefined);
  const { sendFriendRequest, sendingFriendRequest } =
    useSendFriendRequestMutation();

  if (suggested.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="size-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="size-8 text-black-100" />
        </div>
        <h3 className="text-lg font-medium text-white-100 mb-2">
          No suggestions available
        </h3>
        <p className="text-gray-400">
          Check back later for new friend suggestions
        </p>
      </div>
    );
  }

  return (
    <div className={"p-6 "}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggested.map((user) => (
          <SuggestedFriendCard
            onAddFriend={(userId) => {
              setSentFriendRequestUserId(userId);
              sendFriendRequest(userId);
            }}
            addingFriend={sendingFriendRequest}
            addingFriendId={sentFriendRequestUserId}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedFriendsList;
