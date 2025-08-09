import { useState } from "react";
import Searchbar from "../input/Searchbar.tsx";
import {
  BarChart3,
  Hash,
  Plus,
  Tag,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import usePopularTagsQuery from "../../hooks/queries/usePopularTagsQuery.ts";
import useTrendingTagsQuery from "../../hooks/queries/useTrendingTagsQuery.ts";
import useUserSuggestedFriendsQuery from "../../hooks/queries/useUserSuggestedFriendsQuery.ts";

const DashboardRightSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { popularTagsData, fetchingPopularTags } = usePopularTagsQuery(6);
  const { trendingTagsData, fetchingTrendingTags } = useTrendingTagsQuery(3);
  const { userSuggestedFriendsData, fetchingUserSuggestedFriendsData } =
    useUserSuggestedFriendsQuery();

  return (
    <div className="w-92 border-l-2 border-gray-600 h-screen sticky top-0 bg-black-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        <Searchbar
          onChange={(value) => setSearchValue(value)}
          value={searchValue}
        />

        <div className="bg-gray-500 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="size-5 text-teal-100" />
            <h3 className="text-white font-semibold">Trending Now</h3>
          </div>
          <div className="space-y-3">
            {trendingTagsData?.map((tag, index) => (
              <div
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
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                      {user.username}
                    </p>
                    <p className="text-gray-400 text-xs">@{user.username}</p>
                    <p className="text-gray-500 text-xs">
                      {user.mutualFriends} mutual friends
                    </p>
                  </div>
                  <button
                    onClick={() => handleFollow(user.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      followingUsers.has(user.id)
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {followingUsers.has(user.id) ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-500 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex flex-col items-center gap-2 p-3 rounded-md border border-gray-600 hover:bg-gray-600 cursor-pointer transition-colors">
              <Plus className="w-5 h-5 text-cyan-500" />
              <span className="text-white text-xs">Create List</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-md border border-gray-600 hover:bg-gray-600 cursor-pointer transition-colors">
              <UserPlus className="w-5 h-5 text-green-500" />
              <span className="text-white text-xs">Find Friends</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-md border border-gray-600 hover:bg-gray-600 cursor-pointer transition-colors">
              <Tag className="w-5 h-5 text-purple-500" />
              <span className="text-white text-xs">Follow Tags</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-md border border-gray-600 hover:bg-gray-600 cursor-pointer transition-colors">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              <span className="text-white text-xs">Analytics</span>
            </button>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-4">
          <p className="text-gray-400 text-xs text-center mb-2">
            © 2024 Social Media App
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
