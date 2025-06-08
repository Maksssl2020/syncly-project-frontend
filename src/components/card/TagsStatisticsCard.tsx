import type { TagsStatistics } from "../../types/tags.ts";

type TagsStatisticsCardProps = {
  item: TagsStatistics;
};

const TagsStatisticsCard = ({ item }: TagsStatisticsCardProps) => {
  return (
    <div className={"flex items-center justify-between"}>
      <span className={"text-gray-400"}>{item.label}</span>
      <span className={"font-bold text-teal-100"}>{item.value}</span>
    </div>
  );
};

export default TagsStatisticsCard;
