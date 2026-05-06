import {motion} from "framer-motion";
import type {AdminTag} from "../../types/tags.ts";
import {BanIcon, CirclePlusIcon, Edit, Hash, MessageSquare, TrendingUp, Users,} from "lucide-react";
import Badge from "../badge/Badge.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import useAuthentication from "../../hooks/useAuthentication.ts";
import {useNavigate} from "react-router-dom";

type MainTagAdminCardProps = {
  tag: AdminTag;
  index: number;
  onChangeCategory: (data: AdminTag) => void;
  onChangeTagState: (tagId: string | number) => void;
  isChanging?: boolean;
};

const MainTagAdminCard = ({
  tag,
  onChangeCategory,
  onChangeTagState,
  isChanging,
}: MainTagAdminCardProps) => {
  const navigate = useNavigate();
  const { role } = useAuthentication();

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
              backgroundColor: tag.color,
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
                  "px-2 py-1 rounded-full text-xs bg-gray-600 text-black-100 font-bold"
                }
                bgColor={tag.color}
                title={tag.tagCategory}
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
            bgColor={"#222222"}
            borderColor={"#b0b0b0"}
            bgColorHover={"#393939"}
            borderColorHover={"#393939"}
            textColor={"#b0b0b0"}
            textColorHover={"#b0b0b0"}
            className={"p-2 rounded-lg border-2 mr-4"}
            onClick={() => onChangeCategory(tag)}
            loading={isChanging}
          >
            Change Category
          </AnimatedButton>

          {role === "ADMIN" && (
            <>
              <AnimatedButton
                bgColor={"#222222"}
                borderColor={"#222222"}
                bgColorHover={"#393939"}
                borderColorHover={"#393939"}
                textColor={"#b0b0b0"}
                textColorHover={"#b0b0b0"}
                className={"p-2 rounded-lg"}
                onClick={() => navigate(`/admin/panel/tags/edit/${tag.id}`)}
              >
                <Edit className={"size-5"} />
              </AnimatedButton>
              <AnimatedButton
                bgColor={"#222222"}
                borderColor={"#222222"}
                bgColorHover={"#393939"}
                borderColorHover={"#393939"}
                textColor={tag.enabled ? "#ef4444" : "#22c55e"}
                textColorHover={tag.enabled ? "#ef4444" : "#22c55e"}
                className={"p-2 rounded-lg"}
                onClick={() => onChangeTagState(tag.id)}
              >
                {tag.enabled ? (
                  <BanIcon className={"size-5"} />
                ) : (
                  <CirclePlusIcon className={"size-5"} />
                )}
              </AnimatedButton>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MainTagAdminCard;
