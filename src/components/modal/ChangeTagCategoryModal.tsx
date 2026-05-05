import { useState } from "react";
import Modal from "./Modal.tsx";
import useTagCategoriesQuery from "../../hooks/queries/useTagCategoriesQuery.ts";
import Spinner from "../spinner/Spinner.tsx";
import { CheckIcon, Folder } from "lucide-react";
import { motion } from "framer-motion";
import type { TagCategory } from "../../types/tagCategory.ts";
import AnimatedButton from "../button/AnimatedButton.tsx";
import type { AdminTag } from "../../types/tags.ts";

type ChangeTagCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedTag?: AdminTag;
  onChangeCategory: (
    tagId: string | number,
    categoryId: string | number,
  ) => void;
};

const ChangeTagCategoryModal = ({
  isOpen,
  onClose,
  selectedTag,
  onChangeCategory,
}: ChangeTagCategoryModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    TagCategory | undefined
  >(undefined);
  const { tagCategories, fetchingTagCategories } = useTagCategoriesQuery();

  if (fetchingTagCategories) {
    return <Spinner />;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-4xl rounded-lg border-2 bg-black-200 border-gray-600"
    >
      <div className="px-6 max-h-[75vh] overflow-y-auto py-6 flex flex-col gap-8">
        <div className={"grid grid-cols-4 gap-4"}>
          {tagCategories?.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{
                backgroundColor: `${category.color}`,
              }}
              style={{
                backgroundColor: `${category.color}80`,
                borderColor: `${category.color}`,
              }}
              onClick={() => setSelectedCategory(category)}
              className={
                "rounded-lg border-2 overflow-hidden bg-black-200 flex items-center justify-between px-2 py-4 cursor-pointer"
              }
            >
              <div className={"flex gap-4 items-center"}>
                <Folder className={"size-6 "} />
                <div>
                  <h3 className={"text-lg font-bold"}>{category.name}</h3>
                  <p className={"text-sm opacity-80"}>
                    {category.tagCount} tags
                  </p>
                </div>
              </div>

              {selectedCategory?.id === category.id && <CheckIcon />}
            </motion.div>
          ))}
        </div>

        <div className={"flex gap-4"}>
          <AnimatedButton
            onClick={() => onClose()}
            bgColor={"#171719"}
            bgColorHover={"#393939"}
            borderColor={"#171719"}
            borderColorHover={"#393939"}
            textColor={"#e6e6e6"}
            textColorHover={"#14b8a6"}
            className={"w-full h-[40px] border-2 rounded-lg uppercase"}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#171719"}
            borderColor={"#14b8a6"}
            borderColorHover={"#14b8a6"}
            textColor={"#14b8a6"}
            textColorHover={"#111111"}
            className={"w-full h-[40px] border-2 rounded-lg uppercase"}
            disabled={
              selectedCategory === undefined || selectedTag === undefined
            }
            onClick={() => {
              if (selectedCategory && selectedTag) {
                onChangeCategory(selectedTag.id, selectedCategory.id);
                onClose();
              }
            }}
          >
            Change tag Category
          </AnimatedButton>
        </div>
      </div>
    </Modal>
  );
};
export default ChangeTagCategoryModal;
