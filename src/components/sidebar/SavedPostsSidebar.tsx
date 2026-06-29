import SavedPostCategoryButton from "../button/SavedPostCategoryButton.tsx";
import { Heart, MessageCircle, Tag, Trash2 } from "lucide-react";
import AnimatedButton from "../button/AnimatedButton.tsx";
import type { PostCollection } from "../../types/postCollection.ts";

type SavedPostsSidebarProps = {
  userPostCollections: PostCollection[];
  selectedCategoryId: string;
  onChange: (id: string) => void;
  onMostLikedClick: () => void;
  onMostCommentedClick: () => void;
  onClearAllClick: () => void;
  selectedQuickAction: "MOST_LIKED" | "MOST_COMMENTED" | "";
};

const SavedPostsSidebar = ({
  userPostCollections,
  selectedCategoryId,
  onChange,
  onMostLikedClick,
  onMostCommentedClick,
  onClearAllClick,
  selectedQuickAction,
}: SavedPostsSidebarProps) => {
  const isMostLikedSelected = selectedQuickAction === "MOST_LIKED";
  const isMostCommentedSelected = selectedQuickAction === "MOST_COMMENTED";

  return (
    <div className={"lg:col-span-1 space-y-6"}>
      <div
        className={
          "rounded-lg p-6 border-2 flex flex-col gap-4 bg-black-200 border-gray-600"
        }
      >
        <h3
          className={
            "text-lg text-white-100 font-semibold flex items-center gap-2"
          }
        >
          <Tag className={"size-5 text-teal-100"} />
          Collections
        </h3>
        <div className={"space-y-2"}>
          {userPostCollections.map((postCollection, index) => (
            <SavedPostCategoryButton
              key={`${postCollection.id}${index}`}
              postCollection={postCollection}
              onClick={(id) => onChange(id)}
              selectedCategoryId={selectedCategoryId}
            />
          ))}
        </div>
      </div>

      <div className={"rounded-lg p-6 border-2 bg-black-200 text-gray-600"}>
        <h3 className="text-lg font-semibold mb-4 text-white-100">
          Quick Actions
        </h3>
        <div className={"space-y-2"}>
          <AnimatedButton
            className="w-full flex items-center gap-3 p-3 rounded-lg"
            bgColor={
              isMostLikedSelected ? "rgba(20, 184, 166, 0.16)" : "#222222"
            }
            bgColorHover={
              isMostLikedSelected ? "rgba(20, 184, 166, 0.24)" : "#2c2c2e"
            }
            borderColor={isMostLikedSelected ? "#14b8a6" : "#222222"}
            borderColorHover={isMostLikedSelected ? "#2dd4bf" : "#222222"}
            textColor={isMostLikedSelected ? "#14b8a6" : "#E6E6E6"}
            textColorHover={isMostLikedSelected ? "#2dd4bf" : "#14b8a6"}
            onClick={onMostLikedClick}
          >
            <Heart className="size-4" />
            Most Liked
          </AnimatedButton>
          <AnimatedButton
            className="w-full flex items-center gap-3 p-3 rounded-lg"
            bgColor={
              isMostCommentedSelected ? "rgba(20, 184, 166, 0.16)" : "#222222"
            }
            bgColorHover={
              isMostCommentedSelected ? "rgba(20, 184, 166, 0.24)" : "#2c2c2e"
            }
            borderColor={isMostCommentedSelected ? "#14b8a6" : "#222222"}
            borderColorHover={isMostCommentedSelected ? "#2dd4bf" : "#222222"}
            textColor={isMostCommentedSelected ? "#14b8a6" : "#E6E6E6"}
            textColorHover={isMostCommentedSelected ? "#2dd4bf" : "#14b8a6"}
            onClick={onMostCommentedClick}
          >
            <MessageCircle className="size-4" />
            Most Commented
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            bgColorHover={"#2c2c2e"}
            borderColor={"#222222"}
            textColorHover={"#ef4444"}
            className={"w-full flex items-center gap-3 p-3 rounded-lg"}
            onClick={onClearAllClick}
          >
            <Trash2 className={"size-4"} />
            Clear All
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default SavedPostsSidebar;
