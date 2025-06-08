import type { MainTag } from "../../types/tags";
import { motion } from "framer-motion";
import { Check, Flame, Hash, MessageCircle, Plus, Users } from "lucide-react";
import { getTagColor } from "../../utils/tagsUtils";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";
import Badge from "../badge/Badge.tsx";

type TagCardProps = {
  tag: MainTag;
  index: number;
  isFollowed: boolean;
  onToggleFollow: () => void;
};

const TagCard = ({ tag, onToggleFollow, isFollowed, index }: TagCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={
        "rounded-lg p-6 border-2 group cursor-pointer bg-black-200 border-gray-600"
      }
    >
      <div className="flex items-start justify-between mb-4 w-full">
        <div className="flex items-center gap-3 w-full">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: getTagColor(index) }}
          >
            <Hash className="size-6 text-black-100" />
          </div>
          <div className={"flex-row flex"}>
            <div className={"flex flex-col items-start gap-2"}>
              <h3 className="text-lg font-bold text-white-100">#{tag.name}</h3>
              <p className={"text-sm text-gray-400"}>{tag.category}</p>
            </div>
          </div>
        </div>
        {tag.trending && (
          <Badge bgColor={getTagColor(index)}>
            <Flame className={"size-3 text-color-black-100"} />
            <span className={"text-xs font-medium text-color-black-100"}>
              Trending
            </span>
          </Badge>
        )}
      </div>

      <p className={"mb-4 text-white-100"}>{tag.description}</p>

      <div className={"flex items-center justify-between"}>
        <div className={"flex items-center gap-6"}>
          <div className={"flex items-center gap-2"}>
            <MessageCircle className={"size-4 text-gray-400"} />
            <span className={"text-sm text-gray-400"}>
              {tag.postsCount} posts
            </span>
          </div>
          <div className={"flex items-center gap-2"}>
            <Users className={"size-4 text-gray-400"} />
            <span className={"text-sm text-gray-400"}>
              {tag.followersCount} followers
            </span>
          </div>
        </div>

        <AnimatedButton
          onClick={() => navigate(`/tags/${tag.name}`)}
          className={"px-3 py-2 rounded-lg text-sm"}
          bgColor={"#222222"}
          bgColorHover={"#393939"}
          textColorHover={"#14b8a6"}
          borderColor={"#222222"}
          borderColorHover={"#393939"}
        >
          {"View Posts"}
        </AnimatedButton>
      </div>

      <AnimatedButton
        onClick={onToggleFollow}
        className={
          "px-4 py-2 rounded-lg w-full mt-4 flex items-center gap-2 border-2"
        }
        bgColor={isFollowed ? "#14b8a6" : "#222222"}
        bgColorHover={isFollowed ? "#0d9488" : "#14b8a6"}
        textColor={isFollowed ? "#111111" : "#14b8a6"}
        textColorHover={"#111111"}
        borderColor={"#14b8a6"}
      >
        {isFollowed ? (
          <Check className="size-4" />
        ) : (
          <Plus className="size-4" />
        )}
        {isFollowed ? "Following" : "Follow"}
      </AnimatedButton>
    </motion.div>
  );
};

export default TagCard;
