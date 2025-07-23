import AnimatedButton from "./AnimatedButton.tsx";
import type { PostCollection } from "../../types/postCollection.ts";

type SavedPostCategoryButtonProps = {
  postCollection: PostCollection;
  onClick: (id: string) => void;
  selectedCategoryId: string;
};

const SavedPostCategoryButton = ({
  postCollection,
  selectedCategoryId,
  onClick,
}: SavedPostCategoryButtonProps) => {
  return (
    <AnimatedButton
      key={postCollection.title.toLowerCase()}
      bgColor={
        selectedCategoryId === postCollection.title.toLowerCase()
          ? "#2c2c2e"
          : "#222222"
      }
      bgColorHover={"#2c2c2e"}
      textColor={
        selectedCategoryId === postCollection.title.toLowerCase()
          ? postCollection.color
          : "#b0b0b0"
      }
      textColorHover={postCollection.color}
      borderColor={
        selectedCategoryId === postCollection.title.toLowerCase()
          ? postCollection.color
          : "#222222"
      }
      onClick={() => onClick(postCollection.title.toLowerCase())}
      className={
        "w-full flex items-center justify-between p-3 rounded-lg border-2"
      }
    >
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: postCollection.color }}
        />
        <span>{postCollection.title}</span>
      </div>
      <span className="text-xs px-2 py-1 rounded-full bg-gray-600 text-white-100">
        {postCollection.posts.length}
      </span>
    </AnimatedButton>
  );
};

export default SavedPostCategoryButton;
