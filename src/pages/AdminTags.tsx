import Page from "../animation/Page";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import {
  Flag,
  Hash,
  MessageSquare,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import PageStatsCard from "../components/card/PageStatsCard.tsx";
import type { PageStats } from "../types/admin.ts";
import type { MainTag } from "../types/tags.ts";
import { useState } from "react";
import Searchbar from "../components/input/Searchbar.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import type { DropdownOption } from "../types/types.ts";
import { AnimatePresence } from "framer-motion";
import MainTagAdminCard from "../components/card/MainTagAdminCard.tsx";
import { useNavigate } from "react-router-dom";

const MAIN_TAGS: MainTag[] = [
  {
    id: "1",
    name: "photography",
    description: "Share your best photos and photography tips",
    postsCount: 12450,
    followersCount: 8920,
    trending: true,
    category: "Creative",
  },
  {
    id: "2",
    name: "art",
    description: "Digital and traditional art showcase",
    postsCount: 9870,
    followersCount: 7650,
    trending: true,
    category: "Creative",
  },
  {
    id: "3",
    name: "technology",
    description: "Latest tech news and innovations",
    postsCount: 7560,
    followersCount: 6540,
    trending: false,
    category: "Technology",
  },
  {
    id: "4",
    name: "travel",
    description: "Travel experiences and destination guides",
    postsCount: 6540,
    followersCount: 5430,
    trending: true,
    category: "Lifestyle",
  },
  {
    id: "5",
    name: "music",
    description: "Music discovery and artist discussions",
    postsCount: 5430,
    followersCount: 4320,
    trending: false,
    category: "Entertainment",
  },
];

const AdminTags = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<MainTag[]>(MAIN_TAGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);

  const tagsStats: PageStats[] = [
    {
      title: "Total Tags",
      icon: <Hash className={"size-6"} />,
      color: "#14b8a6",
      change: "",
      value: tags.length,
    },
    {
      title: "Trending",
      icon: <TrendingUp className={"size-6"} />,
      color: "#22d3ee",
      change: "",
      value: tags.filter((tag) => tag.trending).length,
    },
    {
      title: "Total Posts",
      icon: <MessageSquare className={"size-6"} />,
      color: "#0d9488",
      change: "",
      value: tags
        .reduce((sum, tag) => sum + tag.postsCount, 0)
        .toLocaleString(),
    },
    {
      title: "Total Followers",
      icon: <Users className={"size-6"} />,
      color: "#06b6d4",
      change: "",
      value: tags
        .reduce((sum, tag) => sum + tag.followersCount, 0)
        .toLocaleString(),
    },
  ];

  const filteredTags = tags.filter((tag) => {
    const matchesSearch =
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || tag.category === selectedCategory;
    const matchesTrending = !showTrendingOnly || tag.trending;

    return matchesSearch && matchesCategory && matchesTrending;
  });

  const tagsCategories = new Set(tags.map((tag) => tag.category));
  const filters: DropdownOption[] = [
    { label: "All", value: "all" },
    ...Array.from(tagsCategories.values()).map((category) => ({
      value: category,
      label: category,
    })),
  ];

  return (
    <Page className={"min-h-screen p-6 flex flex-col gap-8 w-full"}>
      <AdminManagementPanelHeader
        title={"Tag Management"}
        content={
          <AnimatedButton
            bgColor={"#222222"}
            borderColor={"#222222"}
            textColor={"#14b8a6"}
            borderColorHover={"#14b8a6"}
            textColorHover={"#111111"}
            onClick={() => navigate("/admin/panel/tags/create")}
            className={"flex gap-2 items-center text-lg px-4 py-2 rounded-lg"}
          >
            <Plus className={"size-6"} />
            Create Tag
          </AnimatedButton>
        }
      />

      <div className={"p-6 flex flex-col gap-6"}>
        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4"}>
          {tagsStats.map((data, index) => (
            <PageStatsCard data={data} index={index} />
          ))}
        </div>

        <div className={"rounded-lg p-4 border-2 bg-black-200 border-gray-600"}>
          <div className="flex flex-col md:flex-row gap-4">
            <Searchbar
              onChange={(value) => setSearchTerm(value)}
              value={searchTerm}
              placeholder={"Search tags..."}
            />
            <DropdownMenu
              className={"h-[50px]"}
              placeholderChildren={
                <div className={"flex gap-2 h-full items-center"}>
                  <Flag className={"size-4"} />
                  <span>Category:</span>
                </div>
              }
              options={filters}
              onChange={(value) => setSelectedCategory(value)}
              value={selectedCategory}
            />

            <AnimatedButton
              borderColor={showTrendingOnly ? "#14b8a6" : "#4d4d4d"}
              borderColorHover={showTrendingOnly ? "#14b8a6" : "#4d4d4d"}
              bgColor={showTrendingOnly ? "#14b8a6" : "#222222"}
              bgColorHover={showTrendingOnly ? "#14b8a6" : "#222222"}
              textColor={showTrendingOnly ? "#111111" : "#e6e6e6"}
              textColorHover={showTrendingOnly ? "#111111" : "#14b8a6"}
              onClick={() => setShowTrendingOnly(!showTrendingOnly)}
              className={
                "w-auto flex gap-2 px-4 py-2 rounded-lg items-center md:min-w-[175px]"
              }
            >
              <TrendingUp className={"size-4"} />
              Trending Only
            </AnimatedButton>
          </div>
        </div>

        <div className={"flex flex-col gap-4"}>
          <AnimatePresence>
            {filteredTags.map((tag, index) => (
              <MainTagAdminCard tag={tag} index={index} />
            ))}
          </AnimatePresence>

          {filteredTags.length === 0 && (
            <div className="text-center py-12">
              <Hash className="size-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2 text-white-100">
                No tags found
              </h3>
              <p className={"text-gray-400"}>
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default AdminTags;
