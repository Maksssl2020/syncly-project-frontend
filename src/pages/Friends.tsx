import Page from "../animation/Page.tsx";
import type { DropdownOption, TabData } from "../types/types.ts";
import { ArrowUpDown, Filter, UserPlus, Users, UserSearch } from "lucide-react";
import Tabs from "../components/tab/Tabs.tsx";
import { useState } from "react";
import Searchbar from "../components/input/Searchbar.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import FriendsList from "../components/list/FriendsList.tsx";
import type { Friend, FriendRequest, FriendSuggest } from "../types/user.ts";
import FriendRequestsList from "../components/list/FriendRequestsList.tsx";
import SuggestedFriendsList from "../components/list/SuggestedFriendsList.tsx";
import useUserFriendsQuery from "../hooks/queries/useUserFriendsQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";

const mockFriends: Friend[] = [
  {
    id: "1",
    username: "alice_wonder",
    email: "alice@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=AW",
    status: "online" as const,
    lastSeen: "2 minutes ago",
    mutualFriends: 5,
  },
  {
    id: "2",
    username: "bob_builder",
    email: "bob@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=BB",
    status: "offline" as const,
    lastSeen: "1 hour ago",
    mutualFriends: 3,
  },
  {
    id: "3",
    username: "charlie_brown",
    email: "charlie@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=CB",
    status: "online" as const,
    lastSeen: "Just now",
    mutualFriends: 8,
  },
  {
    id: "4",
    username: "diana_prince",
    email: "diana@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=DP",
    status: "away" as const,
    lastSeen: "30 minutes ago",
    mutualFriends: 2,
  },
];

const mockRequests: FriendRequest[] = [
  {
    id: "1",
    type: "received" as const,
    user: {
      id: "5",
      username: "eve_online",
      email: "eve@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=EO",
      mutualFriends: 4,
    },
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    type: "sent" as const,
    user: {
      id: "6",
      username: "frank_castle",
      email: "frank@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=FC",
      mutualFriends: 1,
    },
    createdAt: "1 day ago",
  },
];

const mockSuggested: FriendSuggest[] = [
  {
    id: "7",
    username: "grace_hopper",
    email: "grace@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=GH",
    mutualFriends: 6,
    reason: "Works at TechCorp",
  },
  {
    id: "8",
    username: "henry_ford",
    email: "henry@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=HF",
    mutualFriends: 3,
    reason: "Lives in New York",
  },
];

const filterOptions: DropdownOption[] = [
  { value: "all", label: "All Friends" },
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];

const sortOptions: DropdownOption[] = [
  { value: "alphabetical", label: "Alphabetical" },
  { value: "activity", label: "Last Activity" },
  { value: "mutual", label: "Mutual Friends" },
];

const Friends = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("alphabetical");

  const { userFriendsData, fetchingUserFriendsData } = useUserFriendsQuery();

  if (fetchingUserFriendsData || !userFriendsData) {
    return <Spinner />;
  }

  const tabs: TabData[] = [
    {
      id: "friends",
      label: "Friends",
      icon: <Users className={"size-5"} />,
      count: userFriendsData.length,
    },
    {
      id: "requests",
      label: "Requests",
      icon: <UserPlus className={"size-5"} />,
      count: 2,
    },
    {
      id: "suggested",
      label: "Suggested",
      icon: <UserSearch className={"size-5"} />,
      count: 2,
    },
  ];

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className={"w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-4"}>
        <Tabs
          data={tabs}
          activeTabId={activeTab}
          onClick={(id) => setActiveTab(id)}
        />

        <div className={"flex flex-col sm:flex-row gap-4"}>
          <Searchbar
            onChange={(value) => setSearchQuery(value)}
            value={searchQuery}
          />

          {activeTab === "friends" && (
            <div className={"flex gap-4 w-[75%]"}>
              <DropdownMenu
                options={filterOptions}
                onChange={(value) => setFilterStatus(value)}
                value={filterStatus}
                placeholderChildren={
                  <Filter className={"size-4 self-center"} />
                }
              />
              <DropdownMenu
                options={sortOptions}
                onChange={(value) => setSortBy(value)}
                value={sortBy}
                placeholderChildren={
                  <ArrowUpDown className={"size-4 self-center"} />
                }
              />
            </div>
          )}
        </div>

        <div
          className={
            "bg-black-200 rounded-lg shadow-sm border-2 border-gray-600"
          }
        >
          {activeTab === "friends" && (
            <FriendsList
              friends={userFriendsData}
              searchQuery={searchQuery}
              filterStatus={filterStatus}
              sortBy={sortBy}
            />
          )}

          {activeTab === "requests" && (
            <FriendRequestsList requests={mockRequests} />
          )}

          {activeTab === "suggested" && (
            <SuggestedFriendsList suggested={mockSuggested} />
          )}
        </div>
      </div>
    </Page>
  );
};

export default Friends;
