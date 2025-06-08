import Page from "../animation/Page.tsx";
import TagsSidebar from "../components/sidebar/TagsSidebar.tsx";
import PageHeaderContainer from "../components/header/PageHeaderContainer.tsx";
import type { TabData } from "../types/types.ts";
import { Clock, Eye, Hash, TrendingUp } from "lucide-react";
import Tabs from "../components/tab/Tabs.tsx";
import { useState } from "react";
import type { MainTag } from "../types/tags.ts";
import { motion } from "framer-motion";
import TagCard from "../components/card/TagCard.tsx";

const tabsData: TabData[] = [
  {
    id: "all",
    label: "All Tags",
    icon: <Hash className="size-4" />,
    count: 156,
    color: "#14b8a6",
  },
  {
    id: "following",
    label: "Following",
    icon: <Eye className="size-4" />,
    count: 22,
    color: "#22d3ee",
  },
  {
    id: "trending",
    label: "Trending",
    icon: <TrendingUp className="size-4" />,
    count: 12,
    color: "#0d9488",
  },
  {
    id: "recent",
    label: "Recent",
    icon: <Clock className="size-4" />,
    count: 24,
    color: "#06b6d4",
  },
];

const allTags: MainTag[] = [
  {
    name: "Art",
    description:
      "Digital art, traditional painting, sculptures and creative expressions",
    postsCount: 2847,
    followersCount: 12500,
    trending: true,
    category: "Creative",
  },
  {
    name: "Photography",
    description: "Photography tips, techniques, and stunning visual captures",
    postsCount: 1923,
    followersCount: 8900,
    trending: true,
    category: "Visual",
  },
  {
    name: "Music",
    description: "Music production, reviews, and audio experiences",
    postsCount: 1456,
    followersCount: 6700,
    trending: false,
    category: "Audio",
  },
  {
    name: "Travels",
    description: "Travel experiences, destinations, and adventure stories",
    postsCount: 1234,
    followersCount: 5400,
    trending: true,
    category: "Lifestyle",
  },
  {
    name: "Technology",
    description: "Latest tech trends, gadgets, and digital innovations",
    postsCount: 987,
    followersCount: 4200,
    trending: false,
    category: "Tech",
  },
  {
    name: "Cooking",
    description: "Recipes, cooking tips, and food photography",
    postsCount: 876,
    followersCount: 3800,
    trending: false,
    category: "Food",
  },
  {
    name: "sport",
    description: "Fitness, sports events, and healthy lifestyle content",
    postsCount: 654,
    followersCount: 2900,
    trending: false,
    category: "Health",
  },
  {
    name: "moda",
    description: "Fashion trends, style tips, and outfit inspirations",
    postsCount: 543,
    followersCount: 2100,
    trending: true,
    category: "Style",
  },
];

const Tags = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [chosenTab, setChosenTab] = useState<string>("all");
  const [followingTags, setFollowingTags] = useState<Set<string>>(
    new Set(["art", "photography", "music", "travelling"]),
  );

  const filteredTags = allTags.filter((tag) => {
    const matchesSearch = tag.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      chosenTab === "all" ||
      (chosenTab === "following" && followingTags.has(tag.name)) ||
      (chosenTab === "trending" && tag.trending) ||
      chosenTab === "recent";

    return matchesSearch && matchesFilter;
  });

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className={"grid grid-cols-1 lg:grid-cols-4 gap-8"}>
          <TagsSidebar onChange={(value) => setSearchQuery(value)} />
          <div className={"lg:col-span-3 space-y-6"}>
            <PageHeaderContainer>
              <Tabs
                data={tabsData}
                activeTabId={chosenTab}
                onClick={(id) => setChosenTab(id)}
              />
              <div className={"flex items-center gap-2"}>
                <span className={"text-sm text-gray-400"}>
                  {filteredTags.length} tags found
                </span>
              </div>
            </PageHeaderContainer>

            <motion.div
              layout
              className={"grid grid-cols-1 md:grid-cols-2 gap-6"}
            >
              {filteredTags.map((tag, index) => (
                <TagCard
                  tag={tag}
                  index={index}
                  isFollowed={followingTags.has(tag.name.toLowerCase())}
                  onToggleFollow={() => {}}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Tags;
