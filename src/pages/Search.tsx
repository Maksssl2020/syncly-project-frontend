import Page from "../animation/Page";
import Searchbar from "../components/input/Searchbar.tsx";
import { useState } from "react";
import type { TabData } from "../types/types.ts";
import { FileText, Hash, SearchIcon, Users } from "lucide-react";
import Tab from "../components/tab/Tab.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import UserSearchCard from "../components/card/UserSearchCard.tsx";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import TagCard from "../components/card/TagCard.tsx";
import type { MainTag } from "../types/tags.ts";

const filterOptions: TabData[] = [
  {
    id: "all",
    label: "All",
    icon: <SearchIcon className="size-4" />,
    count: 156,
  },
  {
    id: "users",
    label: "Users",
    icon: <Users className="size-4" />,
    count: 45,
  },
  {
    id: "posts",
    label: "Posts",
    icon: <FileText className="size-4" />,
    count: 89,
  },
  { id: "tags", label: "Tags", icon: <Hash className="size-4" />, count: 22 },
];

const users = [
  {
    name: "Anna Kowalska",
    username: "anna_art",
    bio: "🎨 Digital artist & creative soul. Sharing my journey through colors, emotions, and imagination.",
    followers: 12500,
    posts: 127,
    avatar: "/placeholder.svg",
  },
  {
    name: "Michał Nowak",
    username: "michal_photo",
    bio: "📸 Professional photographer capturing life's beautiful moments. Nature and portrait specialist.",
    followers: 8900,
    posts: 89,
    avatar: "/placeholder.svg",
  },
  {
    name: "Kasia Music",
    username: "kasia_beats",
    bio: "🎵 Music producer and DJ. Electronic music enthusiast. Always creating new beats.",
    followers: 6700,
    posts: 156,
    avatar: "/placeholder.svg",
  },
];

const posts = [
  {
    id: 1,
    user: { name: "Anna Kowalska", username: "anna_art" },
    content:
      "Właśnie skończyłam nowy obraz! 🎨 Inspiracją były kolory jesieni w moim ogrodzie. Co myślicie?",
    image: "/placeholder.svg?height=400&width=600",
    likes: 156,
    comments: 23,
    shares: 12,
    timestamp: "2 godz. temu",
    tags: ["sztuka", "digital-art", "autumn"],
  },
  {
    id: 2,
    user: { name: "Michał Nowak", username: "michal_photo" },
    content: "Wschód słońca nad Tatrami. Warto było wstać o 4 rano! 🏔️",
    image: "/placeholder.svg?height=400&width=600",
    likes: 234,
    comments: 45,
    shares: 28,
    timestamp: "4 godz. temu",
    tags: ["fotografia", "nature", "mountains"],
  },
];

const tags: MainTag[] = [
  {
    name: "sztuka",
    trending: false,
    description:
      "Digital art, traditional painting, sculptures and creative expressions",
    postsCount: 2847,
    followersCount: 12500,
    category: "Creative",
  },
  {
    name: "fotografia",
    trending: true,
    description: "Photography tips, techniques, and stunning visual captures",
    postsCount: 1923,
    followersCount: 8900,
    category: "Visual",
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chosenTab, setChosenTab] = useState<string>("all");
  const [followingUsers, setFollowingUsers] = useState<Set<string>>(
    new Set(["anna_art", "michal_photo"]),
  );

  const getFilteredResults = () => {
    if (!searchQuery.trim()) return { users: [], posts: [], tags: [] };

    const query = searchQuery.toLowerCase();
    return {
      users: users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query) ||
          user.bio.toLowerCase().includes(query),
      ),
      posts: posts.filter(
        (post) =>
          post.content.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query)),
      ),
      tags: tags.filter(
        (tag) =>
          tag.name.toLowerCase().includes(query) ||
          tag.description.toLowerCase().includes(query) ||
          tag.category.toLowerCase().includes(query),
      ),
    };
  };

  const results = getFilteredResults();
  const hasResults =
    results.users.length > 0 ||
    results.posts.length > 0 ||
    results.tags.length > 0;

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
            value={searchQuery}
            placeholder={"Search users, posts, tags..."}
            onChange={(value) => setSearchQuery(value)}
          />
        </div>
        <div className=" px-6 py-8 w-full rounded-lg bg-black-200 border-gray-600 border-2">
          {searchQuery !== "" ? (
            <div
              className={
                "flex flex-col lg:flex-row  items-start lg:items-center gap-4"
              }
            >
              {filterOptions.map((option, index) => (
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
                results.users.length > 0 && (
                  <div>
                    <h2
                      className="text-xl font-bold mb-4"
                      style={{ color: "var(--color-white-100)" }}
                    >
                      Users ({results.users.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {results.users.map((item, index) => (
                        <UserSearchCard isFollowed={index % 2 === 0} />
                      ))}
                    </div>
                  </div>
                )}

              {(chosenTab === "all" || chosenTab === "posts") &&
                results.posts.length > 0 && (
                  <div>
                    <h2
                      className="text-xl font-bold mb-4"
                      style={{ color: "var(--color-white-100)" }}
                    >
                      Posts ({results.posts.length})
                    </h2>
                    <div className="space-y-6">
                      {results.posts.map((post) => (
                        <DashboardPostCard key={post.id} />
                      ))}
                    </div>
                  </div>
                )}

              {(chosenTab === "all" || chosenTab === "tags") &&
                results.tags.length > 0 && (
                  <div>
                    <h2
                      className="text-xl font-bold mb-4"
                      style={{ color: "var(--color-white-100)" }}
                    >
                      Tags ({results.tags.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {results.tags.map((tag, index) => (
                        <TagCard
                          isFollowed={false}
                          index={index}
                          tag={tag}
                          key={tag.name}
                          onToggleFollow={() => {}}
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
          <div>
            <h2 className="text-xl font-bold mb-4 text-white-100">
              Trending Searches
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "#sztuka",
                "#fotografia",
                "#muzyka",
                "#podróże",
                "@anna_art",
                "@michal_photo",
                "digital art",
                "nature",
              ].map((term) => (
                <AnimatedButton
                  key={term}
                  borderColor={"#4d4d4d"}
                  borderColorHover={"#14b8a6"}
                  onClick={() => setSearchQuery(term)}
                  className="p-3 rounded-lg text-center border-2"
                >
                  {term}
                </AnimatedButton>
              ))}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Search;
