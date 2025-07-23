import Searchbar from "../input/Searchbar.tsx";
import SidebarElementBanner from "../banner/SidebarElementBanner.tsx";
import { Eye, Star, TrendingUp } from "lucide-react";
import type { MainTag, TagsStatistics } from "../../types/tags.ts";
import TagsStatisticsCard from "../card/TagsStatisticsCard.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { isThisWeek } from "date-fns";

type TagsSidebarProps = {
  tagsData: MainTag[];
  followedTags: Set<string>;
  onChange: (value: string) => void;
};

const TagsSidebar = ({
  tagsData,
  followedTags,
  onChange,
}: TagsSidebarProps) => {
  const groupedByCategory: Record<string, number> = tagsData.reduce<
    Record<string, number>
  >((acc, tag) => {
    const category = tag.tagCategory || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const topTags: TagsStatistics[] = Object.entries(groupedByCategory)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([category, count]) => ({
      label: category,
      value: `${count} tags`,
    }));

  const trendingStats: TagsStatistics[] = [
    {
      label: "Total Tags",
      value: tagsData.length,
    },
    {
      label: "Following",
      value: followedTags.size,
    },
    {
      label: "Trending Now",
      value: tagsData.filter((tag) => tag.trending).length,
    },
    {
      label: "New this week",
      value: tagsData.filter((tag) => isThisWeek(tag.createdAt)).length,
    },
  ];

  return (
    <div className={"lg:col-span-1 space-y-6"}>
      <Searchbar
        onChange={onChange}
        placeholder={"Search tags..."}
        value={""}
      />

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
