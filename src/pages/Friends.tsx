import Page from "../animation/Page.tsx";
import type { DropdownOption, TabData } from "../types/types.ts";
import {
  ArrowUpDown,
  Clock,
  Filter,
  UserPlus,
  Users,
  UserSearch,
} from "lucide-react";
import Tabs from "../components/tab/Tabs.tsx";
import { useState } from "react";
import Searchbar from "../components/input/Searchbar.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import FriendsList from "../components/list/FriendsList.tsx";
import FriendRequestsList from "../components/list/FriendRequestsList.tsx";
import SuggestedFriendsList from "../components/list/SuggestedFriendsList.tsx";
import useUserFriendsQuery from "../hooks/queries/useUserFriendsQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import useUserPendingFriendRequests from "../hooks/queries/useUserPendingFriendRequests.ts";
import useUserSentFriendRequestsQuery from "../hooks/queries/useUserSentFriendRequestsQuery.ts";
import useUserSuggestedFriendsQuery from "../hooks/queries/useUserSuggestedFriendsQuery.ts";

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
  const {
    userPendingFriendRequestsData,
    fetchingUserPendingFriendRequestsData,
  } = useUserPendingFriendRequests();
  const { userSentFriendRequests, fetchingUserSentFriendRequests } =
    useUserSentFriendRequestsQuery();
  const { userSuggestedFriendsData, fetchingUserSuggestedFriendsData } =
    useUserSuggestedFriendsQuery();

  if (
    fetchingUserFriendsData ||
    !userFriendsData ||
    fetchingUserPendingFriendRequestsData ||
    fetchingUserSentFriendRequests ||
    fetchingUserSuggestedFriendsData
  ) {
    return <Spinner />;
  }

  const totalRequests =
    (userSentFriendRequests?.length ?? 0) +
    (userPendingFriendRequestsData?.length ?? 0);

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
      count: totalRequests,
    },
    {
      id: "suggested",
      label: "Suggested",
      icon: <UserSearch className={"size-5"} />,
      count: userSuggestedFriendsData?.length ?? 0,
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
            <>
              {userPendingFriendRequestsData?.length == 0 &&
              userSentFriendRequests?.length == 0 ? (
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
              ) : (
                <>
                  <FriendRequestsList
                    type={"RECEIVED"}
                    requests={userPendingFriendRequestsData ?? []}
                  />
                  <FriendRequestsList
                    type={"SENT"}
                    requests={userSentFriendRequests ?? []}
                  />
                </>
              )}
            </>
          )}

          {activeTab === "suggested" && (
            <SuggestedFriendsList suggested={userSuggestedFriendsData ?? []} />
          )}
        </div>
      </div>
    </Page>
  );
};

export default Friends;
