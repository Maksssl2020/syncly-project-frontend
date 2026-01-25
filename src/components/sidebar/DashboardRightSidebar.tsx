import { Hash, TrendingUp, Users } from "lucide-react";
import usePopularTagsQuery from "../../hooks/queries/usePopularTagsQuery.ts";
import useTrendingTagsQuery from "../../hooks/queries/useTrendingTagsQuery.ts";
import useUserSuggestedFriendsQuery from "../../hooks/queries/useUserSuggestedFriendsQuery.ts";
import ComponentSpinner from "../spinner/ComponentSpinner.tsx";
import { useNavigate } from "react-router-dom";
import useDeleteFriendRequestMutation from "../../hooks/mutations/useDeleteFriendRequestMutation.ts";
import useSendFriendRequestMutation from "../../hooks/mutations/useSendFriendRequestMutation.ts";
import DashboardPeopleYouMayKnowCard from "../card/DashboardPeopleYouMayKnowCard.tsx";
import { useState } from "react";

const DashboardRightSidebar = () => {
  const navigate = useNavigate();
  const [sendFriendRequestUserId, setSendFriendRequestUserId] = useState<
    string | number | undefined
  >(undefined);
  const [deleteFriendRequestUserId, setDeleteFriendRequestUserId] = useState<
    string | number | undefined
  >(undefined);
  const { popularTagsData, fetchingPopularTags } = usePopularTagsQuery(6);
  const { trendingTagsData, fetchingTrendingTags } = useTrendingTagsQuery(3);
  const { userSuggestedFriendsData, fetchingUserSuggestedFriendsData } =
    useUserSuggestedFriendsQuery();
  const { deleteFriendRequest, deletingFriendRequest } =
    useDeleteFriendRequestMutation();
  const { sendFriendRequest, sendingFriendRequest } =
    useSendFriendRequestMutation();

  if (
    fetchingPopularTags ||
    fetchingTrendingTags ||
    fetchingUserSuggestedFriendsData ||
    fetchingUserSuggestedFriendsData
  ) {
    return <ComponentSpinner />;
  }

  return (
    <div className="w-92 border-l-2 border-gray-600 h-screen sticky top-0 bg-black-200 overflow-y-auto scrollbar">
      <div className="p-6 space-y-6">
        <div className="bg-gray-500 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="size-5 text-teal-100" />
            <h3 className="text-white font-semibold">Trending Now</h3>
          </div>
          <div className="space-y-3">
            {trendingTagsData?.map((tag, index) => (
              <div
                onClick={() => navigate(`/tags/${tag.name}`)}
                key={tag.id}
                className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-600 cursor-pointer transition-colors"
              >
                <span className="text-teal-100 font-bold text-sm">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{tag.name}</p>
                  <p className="text-gray-400 text-xs">
                    {tag.usageCount} posts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-500 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Hash className="size-5 text-cyan-100" />
              <h3 className="text-white font-semibold">Popular Tags</h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {popularTagsData?.map((tag) => (
              <div
                onClick={() => navigate(`/tags/${tag.name}`)}
                key={tag.name}
                className="p-2 rounded-md hover:bg-gray-600 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-1">
                  <span className="text-cyan-100 font-medium text-sm">
                    #{tag.name}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">{tag.usageCount} posts</p>
              </div>
            ))}
          </div>
        </div>

        {userSuggestedFriendsData && userSuggestedFriendsData.length > 0 && (
          <div className="bg-gray-500 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-green-500" />
              <h3 className="text-white font-semibold">People You May Know</h3>
            </div>
            <div className="space-y-3">
              {userSuggestedFriendsData.map((user) => (
                <DashboardPeopleYouMayKnowCard
                  user={user}
                  onNavigate={(path) => navigate(path)}
                  deletingFriendRequest={deletingFriendRequest}
                  sendingFriendRequest={sendingFriendRequest}
                  onDeleteFriendRequest={(userId) => {
                    setDeleteFriendRequestUserId(userId);
                    deleteFriendRequest(userId);
                  }}
                  onSendFriendRequest={(userId) => {
                    setSendFriendRequestUserId(userId);
                    sendFriendRequest(userId);
                  }}
                  deletingFriendRequestUserId={sendFriendRequestUserId}
                  sendingFriendRequestUserId={deleteFriendRequestUserId}
                />
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-600 pt-4">
          <p className="text-gray-400 text-xs text-center mb-2">
            © {new Date().getFullYear()} Social Media App
          </p>
          <div className="flex justify-center gap-4 text-xs">
            <a href="/about" className="text-gray-400 hover:text-white">
              About
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRightSidebar;
