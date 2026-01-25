import Page from "../animation/Page";
import Searchbar from "../components/input/Searchbar.tsx";
import { useEffect, useState } from "react";
import type { TabData } from "../types/types.ts";
import { FileText, Hash, SearchIcon, Users } from "lucide-react";
import Tab from "../components/tab/Tab.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import UserSearchCard from "../components/card/UserSearchCard.tsx";
import TagCard from "../components/card/TagCard.tsx";
import useSearchUsersByQuery from "../hooks/queries/useSearchUsersByQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import useSearchTagsQuery from "../hooks/queries/useSearchTagsQuery.ts";
import useSearchPostsQuery from "../hooks/queries/useSearchPostsQuery.ts";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import useFollowedTagsQuery from "../hooks/queries/useFollowedTagsQuery.ts";
import useFollowTagMutation from "../hooks/mutations/useFollowTagMutation.ts";
import useUnfollowTagMutation from "../hooks/mutations/useUnfollowTagMutation.ts";
import useFollowedUsersQuery from "../hooks/queries/useFollowedUsersQuery.ts";
import { useNavigate } from "react-router-dom";
import useSearch from "../hooks/useSearch.ts";
import useTrendingSearchesQuery from "../hooks/queries/useTrendingSearchesQuery.ts";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [chosenTab, setChosenTab] = useState<string>("all");

  const { searchedUsers, searchingUsers } = useSearchUsersByQuery(searchQuery);
  const { searchedTags, searchingTags } = useSearchTagsQuery(searchQuery);
  const { searchedPosts, searchingPosts } = useSearchPostsQuery(searchQuery);
  const { followedTags, fetchingFollowedTags } = useFollowedTagsQuery();
  const { followedUsers, fetchingFollowedUsers } = useFollowedUsersQuery();
  const { followTag } = useFollowTagMutation();
  const { unfollowTag } = useUnfollowTagMutation();
  const [followingTags, setFollowingTags] = useState<Set<string>>(new Set([]));
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(
    new Set([]),
  );

  const { trendingSearches } = useTrendingSearchesQuery();

  useSearch({
    inputValue: searchInputValue,
    setSearch: setSearchQuery,
    saveSearchEnabled: true,
  });

  useEffect(() => {
    if (followedTags && !fetchingFollowedTags) {
      const mappedTags = followedTags.map((tag) => tag.name.toLowerCase());
      const uniqueTags = new Set(mappedTags);
      setFollowingTags(uniqueTags);

      console.log(mappedTags);
    }
  }, [fetchingFollowedTags, followedTags]);

  useEffect(() => {
    if (followedUsers && !fetchingFollowedUsers) {
      const mappedUsers = followedUsers.map((userProfile) =>
        userProfile.username.toLowerCase(),
      );
      const uniqueUsers = new Set(mappedUsers);
      setFollowingUsers(uniqueUsers);

      console.log(uniqueUsers);
    }
  }, [fetchingFollowedUsers, followedUsers]);

  if (
    searchingUsers ||
    searchingTags ||
    searchingPosts ||
    fetchingFollowedTags ||
    fetchingFollowedUsers
  ) {
    return <Spinner />;
  }

  const hasResults =
    (searchedUsers && searchedUsers.length > 0) ||
    (searchedPosts && searchedPosts.length > 0) ||
    (searchedTags && searchedTags.length > 0);

  const sum =
    (searchedUsers?.length ?? 0) +
    (searchedPosts?.length ?? 0) +
    (searchedTags?.length ?? 0);

  const filterOptions: TabData[] = [
    {
      id: "all",
      label: "All",
      icon: <SearchIcon className="size-4" />,
      count: sum,
    },
    {
      id: "users",
      label: "Users",
      icon: <Users className="size-4" />,
      count: searchedUsers?.length ?? 0,
    },
    {
      id: "posts",
      label: "Posts",
      icon: <FileText className="size-4" />,
      count: searchedPosts?.length ?? 0,
    },
    {
      id: "tags",
      label: "Tags",
      icon: <Hash className="size-4" />,
      count: searchedTags?.length ?? 0,
    },
  ];

  const onFollowToggle = (
    isFollowed: boolean,
    tagId: string | number,
    tagName: string,
  ) => {
    if (isFollowed) {
      unfollowTag(tagId);
    } else {
      followTag({ tagId, tagName });
    }
  };

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className="w-full max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
        <div className="text-center space-y-8 py-12 px-8 rounded-xl border-2 bg-black-200 border-gray-600">
          <h3 className="text-xl font-semibold mb-2 text-teal-100">
            Discover SocialSpace
          </h3>
          <p style={{ color: "var(--color-gray-400)" }}>
            Search for users, posts, and tags to find interesting content
          </p>
          <Searchbar
            value={searchInputValue}
            placeholder={"Search users, posts, tags..."}
            onChange={(value) => setSearchInputValue(value)}
          />
        </div>
        <div className=" px-6 py-8 w-full rounded-lg bg-black-200 border-gray-600 border-2">
          {searchQuery !== "" ? (
            <div
              className={
                "flex flex-col lg:flex-row  items-start lg:items-center gap-4"
              }
            >
              {filterOptions.map((option) => (
                <Tab
                  data={option}
                  onClick={() => setChosenTab(option.id)}
                  activeTabId={chosenTab}
                />
              ))}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  Results for "{searchQuery}"
                </span>
              </div>
            </div>
          ) : (
            <p
              className={"w-full text-center font-bold text-white-100 text-xl"}
            >
              Search something :)
            </p>
          )}
        </div>

        {searchQuery ? (
          hasResults ? (
            <div className={"space-y-8"}>
              {(chosenTab === "all" || chosenTab === "users") &&
                searchedUsers!.length > 0 && (
                  <div>
                    <h2
                      className="text-xl font-bold mb-4"
                      style={{ color: "var(--color-white-100)" }}
                    >
                      Users ({searchedUsers?.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {searchedUsers?.map((item, index) => (
                        <UserSearchCard
                          key={index}
                          user={item}
                          isFollowed={followingUsers.has(
                            item.username.toLowerCase(),
                          )}
                          onClick={() => navigate(`/blog/${item.userId}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}

              {(chosenTab === "all" || chosenTab === "posts") &&
                searchedPosts!.length > 0 && (
                  <div>
                    <h2
                      className="text-xl font-bold mb-4"
                      style={{ color: "var(--color-white-100)" }}
                    >
                      Posts ({searchedPosts?.length})
                    </h2>
                    <div className="space-y-6">
                      {searchedPosts?.map((post) => (
                        <DashboardPostCard key={post.id} post={post} />
                      ))}
                    </div>
                  </div>
                )}

              {(chosenTab === "all" || chosenTab === "tags") &&
                searchedTags!.length > 0 && (
                  <div>
                    <h2
                      className="text-xl font-bold mb-4"
                      style={{ color: "var(--color-white-100)" }}
                    >
                      Tags ({searchedTags?.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {searchedTags?.map((tag, index) => (
                        <TagCard
                          isFollowed={followingTags.has(tag.name.toLowerCase())}
                          index={index}
                          tag={tag}
                          key={tag.name}
                          onToggleFollow={(isFollowed, tagId, tagName) =>
                            onFollowToggle(isFollowed, tagId, tagName)
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className="text-center py-12 rounded-xl border-2 bg-black-200 text-gray-600">
              <SearchIcon className="size-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold mb-2 text-white-100">
                No results found
              </h3>
              <p className={"text-gray-400"}>
                Try different keywords or check your spelling
              </p>
            </div>
          )
        ) : (
          trendingSearches !== undefined &&
          trendingSearches.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-white-100">
                Trending Searches
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trendingSearches?.map((data) => (
                  <AnimatedButton
                    key={data.searchName}
                    borderColor={"#4d4d4d"}
                    borderColorHover={"#14b8a6"}
                    onClick={() => setSearchQuery(data.searchName)}
                    className="p-3 rounded-lg text-center border-2"
                  >
                    {data.searchName}
                  </AnimatedButton>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </Page>
  );
};

export default Search;
