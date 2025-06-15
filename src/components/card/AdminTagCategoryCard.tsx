import { motion } from "framer-motion";
import type { TagCategory } from "../../types/tagCategory.ts";
import { getTagColor } from "../../utils/colorUtils.ts";
import { Edit, Folder, Hash, Trash2 } from "lucide-react";
import AnimatedButton from "../button/AnimatedButton.tsx";

type AdminTagCategoryCardProps = {
  category: TagCategory;
  index: number;
};

const AdminTagCategoryCard = ({
  category,
  index,
}: AdminTagCategoryCardProps) => {
  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={
        "rounded-lg border-2 overflow-hidden bg-black-200 border-gray-600"
      }
    >
      <header
        className={
          "p-4 border-b-2 border-gray-600 text-black-100 flex items-center gap-4"
        }
        style={{
          backgroundColor: getTagColor(index),
        }}
      >
        <Folder className={"size-6 "} />
        <div>
          <h3 className={"text-lg font-bold"}>{category.name}</h3>
          <p className={"text-sm opacity-80"}>{category.tagCount} tags</p>
        </div>
      </header>

      <div className={"p-4 flex flex-col gap-4"}>
        <p className={"text-gray-400"}>{category.description}</p>
        <div className={"flex items-center justify-between"}>
          <div className={"flex items-center gap-4 text-sm"}>
            <span className={"text-gray-400 flex gap-2"}>
              <Hash className={"size-4"} />
              {category.tagCount} tags
            </span>
          </div>
          <div
            className={"size-4 rounded-full border-2 border-gray-600"}
            style={{
              backgroundColor: getTagColor(index),
            }}
          />
        </div>

        <div className={"flex gap-2"}>
          <AnimatedButton
            bgColor={"#171719"}
            borderColor={"#171719"}
            borderColorHover={"#14b8a6"}
            textColor={"#b0b0b0"}
            className={
              "flex h-[40px] w-full items-center justify-center gap-2 px-3 py-2 rounded-lg text-center text-sm "
            }
          >
            <Edit type={"size-4"} />
            Edit
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#171719"}
            bgColorHover={"#ef4444"}
            borderColor={"#171719"}
            borderColorHover={"#ef4444"}
            textColor={"#ef4444"}
            className={
              "flex   rounded-lg items-center justify-center  size-[40px]"
            }
            disabled={category.tagCount > 0}
          >
            <Trash2 className={"size-4"} />
          </AnimatedButton>
        </div>

        {category.tagCount > 0 && (
          <p className={"text-xs text-yellow-100"}>
            Cannot delete: {category.tagCount} tags using this category.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AdminTagCategoryCard;
