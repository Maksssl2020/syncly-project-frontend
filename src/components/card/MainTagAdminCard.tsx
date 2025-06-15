import { motion } from "framer-motion";
import type { MainTag } from "../../types/tags.ts";
import {
  Edit,
  Hash,
  MessageSquare,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import Badge from "../badge/Badge.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { getTagColor } from "../../utils/colorUtils.ts";

type MainTagAdminCardProps = {
  tag: MainTag;
  index: number;
};

const MainTagAdminCard = ({ tag, index }: MainTagAdminCardProps) => {
  return (
    <motion.div
      key={tag.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={"rounded-lg p-6 border-2 bg-black-200 border-gray-600"}
    >
      <div className={"flex items-center justify-between"}>
        <div className={"flex items-center gap-4"}>
          <div
            className={"size-12 rounded-lg flex items-center justify-center"}
            style={{
              backgroundColor: getTagColor(index),
            }}
          >
            <Hash className={"size-6 text-black-100"} />
          </div>
          <div className={"flex flex-col gap-2"}>
            <div className={"flex items-center gap-3"}>
              <h3 className={"text-xl font-bold text-white-100"}>
                #{tag.name}
              </h3>
              {tag.trending && (
                <Badge
                  className={
                    "flex gap-2 text-xs font-medium items-center rounded-full bg-teal-100 text-black-100"
                  }
                >
                  <TrendingUp className={"size-3"} />
                  Trending
                </Badge>
              )}
              <Badge
                className={
                  "px-2 py-1 rounded-full text-xs bg-gray-600 text-gray-300"
                }
                title={tag.category}
              />
            </div>
            <p className={"text-gray-400"}>{tag.description}</p>
            <div className={"flex items-center gap-6 text-sm"}>
              <span className={"text-gray-400 items-center flex gap-2"}>
                <MessageSquare className={"size-4"} />
                {tag.postsCount}
              </span>
              <span className={"text-gray-400 items-center flex gap-2"}>
                <Users className={"size-4"} />
                {tag.followersCount}
              </span>
            </div>
          </div>
        </div>
        <div className={"flex items-center gap-2"}>
          <AnimatedButton
            textColor={tag.trending ? "#22c55e" : "#b0b0b0"}
            bgColor={"#222222"}
            borderColor={"#222222"}
            bgColorHover={"#393939"}
            borderColorHover={"#393939"}
            textColorHover={tag.trending ? "#b0b0b0" : "#22c55e"}
            className={`p-2 rounded-lg `}
          >
            {tag.trending ? (
              <TrendingUp className={"size-5"} />
            ) : (
              <TrendingDown className={"size-5"} />
            )}
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            borderColor={"#222222"}
            bgColorHover={"#393939"}
            borderColorHover={"#393939"}
            textColor={"#b0b0b0"}
            textColorHover={"#b0b0b0"}
            className={"p-2 rounded-lg"}
          >
            <Edit className={"size-5"} />
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            borderColor={"#222222"}
            bgColorHover={"#393939"}
            borderColorHover={"#393939"}
            textColor={"#ef4444"}
            textColorHover={"#ef4444"}
            className={"p-2 rounded-lg"}
          >
            <Trash2 className={"size-5"} />
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
};

export default MainTagAdminCard;
