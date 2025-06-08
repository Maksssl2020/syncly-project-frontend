import type { SavedPostCategory } from "../../types/savedPosts.ts";
import AnimatedButton from "./AnimatedButton.tsx";

type SavedPostCategoryButtonProps = {
  category: SavedPostCategory;
  onClick: (id: string) => void;
  selectedCategoryId: string;
};

const SavedPostCategoryButton = ({
  category,
  selectedCategoryId,
  onClick,
}: SavedPostCategoryButtonProps) => {
  return (
    <AnimatedButton
      key={category.id}
      bgColor={selectedCategoryId === category.id ? "#2c2c2e" : "#222222"}
      bgColorHover={"#2c2c2e"}
      textColor={selectedCategoryId === category.id ? "#14b8a6" : "#b0b0b0"}
      textColorHover={"#14b8a6"}
      borderColor={selectedCategoryId === category.id ? "#14b8a6" : "#222222"}
      onClick={() => onClick(category.id)}
      className={
        "w-full flex items-center justify-between p-3 rounded-lg border-2"
      }
    >
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <span>{category.name}</span>
      </div>
      <span className="text-xs px-2 py-1 rounded-full bg-gray-600 text-white-100">
        {category.count}
      </span>
    </AnimatedButton>
  );
};

export default SavedPostCategoryButton;
