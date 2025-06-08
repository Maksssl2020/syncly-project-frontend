import { useState } from "react";
import Searchbar from "../input/Searchbar";
import SavedPostCategoryButton from "../button/SavedPostCategoryButton.tsx";
import { Heart, MessageCircle, Tag, Trash2 } from "lucide-react";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { savedPostCategories } from "../../data/savedPosts.ts";

type SavedPostsSidebarProps = {
  selectedCategoryId: string;
  onChange: (id: string) => void;
};

const SavedPostsSidebar = ({
  selectedCategoryId,
  onChange,
}: SavedPostsSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={"lg:col-span-1 space-y-6"}>
      <Searchbar onChange={() => {}} placeholder={"Search saved posts..."} />

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
          {savedPostCategories.map((category, index) => (
            <SavedPostCategoryButton
              key={category.id + index}
              category={category}
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
            className={"w-full flex items-center gap-3 p-3 rounded-lg"}
            bgColor={"#222222"}
            bgColorHover={"#2c2c2e"}
            textColorHover={"#14b8a6"}
          >
            <Heart className={"size-4"} />
            Most Liked
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            bgColorHover={"#2c2c2e"}
            textColorHover={"#14b8a6"}
            className={"w-full flex items-center gap-3 p-3 rounded-lg"}
          >
            <MessageCircle className={"size-4"} />
            Most Commented
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            bgColorHover={"#2c2c2e"}
            textColorHover={"#ef4444"}
            className={"w-full flex items-center gap-3 p-3 rounded-lg"}
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
