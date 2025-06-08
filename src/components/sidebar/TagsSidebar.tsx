import Searchbar from "../input/Searchbar.tsx";
import SidebarElementBanner from "../banner/SidebarElementBanner.tsx";
import { Eye, Star, TrendingUp } from "lucide-react";
import type { TagsStatistics } from "../../types/tags.ts";
import TagsStatisticsCard from "../card/TagsStatisticsCard.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";

const trendingStats: TagsStatistics[] = [
  {
    label: "Total Tags",
    value: 156,
  },
  {
    label: "Following",
    value: 29,
  },
  {
    label: "Trending Now",
    value: 12,
  },
  {
    label: "New this week",
    value: 16,
  },
];

const topTags: TagsStatistics[] = [
  {
    label: "Creative",
    value: "156 tags",
  },
  {
    label: "Visual",
    value: "29 tags",
  },
  {
    label: "Tech",
    value: "12 tags",
  },
  {
    label: "Lifestyle",
    value: "16 tags",
  },
  {
    label: "Food",
    value: "12 tags",
  },
];

type TagsSidebarProps = {
  onChange: (value: string) => void;
};

const TagsSidebar = ({ onChange }: TagsSidebarProps) => {
  return (
    <div className={"lg:col-span-1 space-y-6"}>
      <Searchbar onChange={onChange} placeholder={"Search tags..."} />

      <div
        className={
          "rounded-lg p-6 flex flex-col gap-4 border-2 bg-black-200 border-gray-600"
        }
      >
        <SidebarElementBanner
          title={"Statistics"}
          icon={<Star className={"size-5"} />}
        />

        <div className={"space-y-4"}>
          {trendingStats.map((item, index) => (
            <TagsStatisticsCard item={item} key={index} />
          ))}
        </div>
      </div>

      <div
        className={
          "rounded-lg p-6 border-2 flex flex-col gap-4 bg-black-200 border-gray-600"
        }
      >
        <SidebarElementBanner
          title={"Top Tags"}
          icon={<TrendingUp className={"size-5"} />}
        />
        <div className={"space-y-3"}>
          {topTags.map((category, index) => (
            <TagsStatisticsCard item={category} key={index} />
          ))}
        </div>
      </div>

      <div
        className={
          "rounded-lg p-6 border-2 flex flex-col gap-4 bg-black-200 border-gray-600"
        }
      >
        <h3 className="text-lg font-semibold mb-4 text-white-100">
          Quick Actions
        </h3>
        <div className={"space-y-2"}>
          <AnimatedButton
            bgColor={"#222222"}
            bgColorHover={"#2c2c2e"}
            textColorHover={"#14b8a6"}
            className={"w-full flex items-center gap-3 p-3 rounded-lg"}
          >
            <Eye className={"size-4"} />
            Manage Following
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            bgColorHover={"#2c2c2e"}
            textColorHover={"#14b8a6"}
            className={"w-full flex items-center gap-3 p-3 rounded-lg"}
          >
            <TrendingUp className={"size-4"} />
            View Trending
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default TagsSidebar;
