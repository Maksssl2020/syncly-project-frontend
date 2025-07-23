import { MessageCircle } from "lucide-react";
import FriendCard from "../card/FriendCard.tsx";
import type { FriendUser } from "../../types/friends.ts";

interface FriendsListProps {
  friends: FriendUser[];
  searchQuery: string;
  filterStatus: string;
  sortBy: string;
}

const FriendsList = ({
  friends,
  filterStatus,
  sortBy,
  searchQuery,
}: FriendsListProps) => {
  const filteredFriends = friends.filter((friend) => {
    const matchesSearch = friend.user.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || friend.user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedFriends = [...filteredFriends].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.user.username.localeCompare(b.user.username);
      case "activity":
        return a.user.status === "ACTIVE" ? -1 : 1;
      case "mutual":
        return b.mutualFriendsCount - a.mutualFriendsCount;
      default:
        return 0;
    }
  });

  if (sortedFriends.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="size-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="size-8 text-black-100" />
        </div>
        <h3 className="text-lg font-medium text-white-100 mb-2">
          No friends found
        </h3>
        <p className="text-gray-400">
          {searchQuery
            ? "Try adjusting your search terms"
            : "Start connecting with people!"}
        </p>
      </div>
    );
  }

  return (
    <div className={"p-6"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
        {sortedFriends.map((friend) => (
          <FriendCard friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
