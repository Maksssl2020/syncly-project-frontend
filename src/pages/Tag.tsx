import Page from "../animation/Page";
import { Link, useParams } from "react-router-dom";
import type { MainTag } from "../types/tags.ts";
import { Flame, Grid3X3, List, SortDesc } from "lucide-react";
import Badge from "../components/badge/Badge.tsx";
import PageHeaderContainer from "../components/header/PageHeaderContainer.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import type { DropdownOption, ToggleOption } from "../types/types.ts";
import { useState } from "react";
import ViewToggle from "../components/toggle/ViewToggle.tsx";
import { motion } from "framer-motion";
import DashboardPostGridCard from "../components/card/DashboardPostGridCard.tsx";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import { getRandomTagColor } from "../utils/colorUtils.ts";

const options: DropdownOption[] = [
  {
    value: "recent",
    label: "Recent",
  },
  {
    value: "popular",
    label: "Popular",
  },
  {
    value: "oldest",
    label: "Oldest",
  },
];

const relatedTags = [
  "digital-art",
  "painting",
  "illustration",
  "design",
  "creative",
  "visual-art",
];

const viewOptions: ToggleOption[] = [
  { value: "list", icon: <List className="size-5" /> },
  { value: "grid", icon: <Grid3X3 className="size-5" /> },
];

const trendingColor = getRandomTagColor();

export const Tag = () => {
  const { tag } = useParams();
  const [selectedOption, setSelectedOption] = useState<string>("recent");
  const [viewMode, setViewMode] = useState<string>("list");

  const tagInfo: MainTag = {
    name: tag ?? "",
    description:
      "Digital art, traditional painting, sculptures and creative expressions from talented artists worldwide",
    postsCount: 2847,
    followersCount: 12500,
    trending: true,
    category: "Creative",
  };

  const posts = [
    {
      id: 1,
      user: {
        name: "Anna Kowalska",
        username: "@anna_art",
        avatar: "/placeholder.svg",
      },
      content:
        "Właśnie skończyłam nowy obraz! 🎨 Inspiracją były kolory jesieni w moim ogrodzie. Co myślicie?",
      image: "/placeholder.svg?height=400&width=600",
      likes: 156,
      comments: 23,
      shares: 12,
      timestamp: "2 godz. temu",
      tags: [tag, "digital-art", "autumn"],
    },
    {
      id: 2,
      user: {
        name: "Michał Nowak",
        username: "@michal_photo",
        avatar: "/placeholder.svg",
      },
      content:
        "Nowa seria abstrakcyjnych kompozycji. Eksperymentuję z kolorami i formami.",
      image: "/placeholder.svg?height=400&width=600",
      likes: 89,
      comments: 15,
      shares: 7,
      timestamp: "4 godz. temu",
      tags: [tag, "abstract", "composition"],
    },
    {
      id: 3,
      user: {
        name: "Kasia Art",
        username: "@kasia_creative",
        avatar: "/placeholder.svg",
      },
      content:
        "Tutorial: Jak mieszać kolory w malarstwie cyfrowym. Podstawowe techniki dla początkujących.",
      image: "/placeholder.svg?height=400&width=600",
      likes: 234,
      comments: 45,
      shares: 28,
      timestamp: "6 godz. temu",
      tags: [tag, "tutorial", "digital-painting"],
    },
  ];

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className="w-full max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
        <div
          className={"rounded-lg p-8  border-2 bg-black-200 border-gray-600"}
        >
          <div className={"grid grid-cols-1 lg:grid-cols-3 gap-8"}>
            <div className={"lg:col-span-2"}>
              <div className={"flex items-center gap-3 mb-4"}>
                <h2 className={"text-3xl font-bold text-white-100"}>
                  #{tagInfo.name}
                </h2>
                {tagInfo.trending && (
                  <Badge bgColor={trendingColor}>
                    <Flame className="size-4 text-black-400" />
                    <span className="text-sm font-medium text-black-400">
                      Trending
                    </span>
                  </Badge>
                )}
              </div>
              <p className={"text-lg mb-6 text-white-100"}>
                {tagInfo.description}
              </p>
              <div className={"flex flex-wrap gap-2 items-center"}>
                <span className={"text-sm text-gray-400"}>Related tags:</span>
                {relatedTags.map((tag) => (
                  <Link key={tag} to={`/tags/${tag}`}>
                    <span
                      className={
                        "text-sm px-2 py-1 bg-gray-600 text-white-100 rounded-full hover:opacity-80 transition-opacity cursor-pointer "
                      }
                    >
                      #{tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className={"grid grid-cols-2 gap-2"}>
              <div className={"text-center"}>
                <div className={"text-2xl font-bold text-white-100"}>
                  {tagInfo.postsCount}
                </div>
                <div className={"text-gray-400"}>Posts</div>
              </div>
              <div className={"text-center"}>
                <div className={"text-2xl font-bold text-white-100"}>
                  {tagInfo.followersCount}
                </div>
                <div className={"text-gray-400"}>Followers</div>
              </div>
              <div className={"text-center"}>
                <div className={"text-2xl font-bold text-cyan-100"}>#3</div>
                <div className={"text-gray-400"}>Trending</div>
              </div>
              <div className={"text-center"}>
                <div className={"text-2xl font-bold text-teal-100"}>223</div>
                <div className={"text-gray-400"}>New Posts This Week</div>
              </div>
            </div>
          </div>
        </div>

        <PageHeaderContainer>
          <div className={"flex items-center gap-4"}>
            <h3 className={"text-xl font-semibold text-white-100"}>
              Posts with #{tagInfo.name}
            </h3>
            <span className={"text-xl text-gray-400"}>
              {posts.length} posts
            </span>
          </div>
          <div className={"flex items-center gap-3"}>
            <div className={"flex items-center gap-2"}>
              <SortDesc className={"size-4 text-gray-400"} />
              <div className={"w-[150px]"}>
                <DropdownMenu
                  options={options}
                  onChange={(value) => setSelectedOption(value)}
                  value={selectedOption}
                />
              </div>
            </div>
            <ViewToggle
              options={viewOptions}
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          </div>
        </PageHeaderContainer>

        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {viewMode === "list" ? (
            <>
              <DashboardPostCard />
              <DashboardPostCard />
              <DashboardPostCard />
            </>
          ) : (
            <>
              <DashboardPostGridCard />
              <DashboardPostGridCard />
              <DashboardPostGridCard />
              <DashboardPostGridCard />
              <DashboardPostGridCard />
            </>
          )}
        </motion.div>
      </div>
    </Page>
  );
};
