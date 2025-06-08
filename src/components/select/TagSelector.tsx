import useClickOutside from "../../hooks/useClickOutside.ts";
import useTagSelection from "../../hooks/useTagSelection.ts";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TagSelectionCard from "../card/TagSelectionCard.tsx";
import { Hash, Plus, Search, Trash2 } from "lucide-react";
import { getTagColor } from "../../utils/tagsUtils.ts";
import AnimatedButton from "../button/AnimatedButton.tsx";

const TagSelector = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref, isOpen, setIsOpen } = useClickOutside(false);
  const {
    removeTag,
    resetTags,
    availableTags,
    selectedTags,
    selectTag,
    filteredTags,
    setSearchQuery,
    searchQuery,
  } = useTagSelection();

  return (
    <div ref={ref} className={"relative"}>
      <div className={"w-full flex items-center mb-3"}>
        <h3 className={"text-white-100 font-medium ml-3 "}>
          Tags (help people discover your post)
        </h3>
        {selectedTags.length > 0 && (
          <AnimatedButton
            bgColor={"#222222"}
            bgColorHover={"#393939"}
            textColorHover={"#ef4444"}
            onClick={resetTags}
            className={"px-4 py-1 flex gap-2 items-center ml-auto rounded-lg"}
          >
            <Trash2 className={"size-4"} /> Clear Tags
          </AnimatedButton>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className={"flex flex-wrap gap-2 mb-3"}>
          <AnimatePresence>
            {selectedTags.map((tag, index) => (
              <TagSelectionCard
                key={tag.name}
                tag={tag}
                index={index}
                onRemoveTag={removeTag}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className={"relative"}>
        <motion.div
          animate={{
            borderColor: isOpen ? "#14b8a6" : "#4a4a4d",
          }}
          className={
            "flex items-center gap-3 px-4 py-3 rounded-lg border-2 bg-black-300"
          }
        >
          <Search className={"size-5 text-gray-400"} />
          <input
            ref={inputRef}
            type={"text"}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className={
              "flex-1 bg-transparent outline-none text-sm text-white-100"
            }
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={
              "absolute top-full left-0 right-0 mt-2 bg-black-200 border-gray-600 rounded-lg border-2 overflow-hidden z-50"
            }
          >
            {searchQuery.trim() &&
              filteredTags.length <= 0 &&
              !selectedTags.some((t) => t.name === searchQuery) && (
                <button
                  className={
                    "w-full flex items-center gap-3 px-4 py-3 border-b border-gray-600"
                  }
                >
                  <div
                    className={
                      "size-6 rounded-full flex items-center justify-center bg-teal-100 text-black-100"
                    }
                  >
                    <Plus className={"size-3"} />
                  </div>
                  <div className={"flex-1 text-left"}>
                    <div className={"text-sm font-medium text-white-100"}>
                      Create
                    </div>
                    <div className={"text-xs text-gray-400"}>
                      Press Enter to create a new tag
                    </div>
                  </div>
                </button>
              )}

            {filteredTags.length > 0 ? (
              <div className={"max-h-48 overflow-y-auto"}>
                {filteredTags.map((tag, index) => (
                  <button
                    key={tag.name}
                    onClick={() => selectTag(tag)}
                    className={"w-full flex items-center gap-3 px-4 py-3"}
                  >
                    <div
                      className="size-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: getTagColor(index) }}
                    >
                      <Hash
                        className="size-3"
                        style={{ color: "var(--color-black-400)" }}
                      />
                    </div>
                    <div className={"flex-1 text-left"}>
                      <div className={"text-sm font-medium text-white-100"}>
                        {tag.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              searchQuery.trim() &&
              !selectedTags.some((t) => t.name === searchQuery) && (
                <div className="px-4 py-6 text-center text-gray-400">
                  <div className="text-sm">
                    No tags found for "{searchQuery}"
                  </div>
                  <div className="text-xs mt-1 ">
                    Press Enter to create a new tag
                  </div>
                </div>
              )
            )}

            {!searchQuery && (
              <div className="px-4 py-2 text-xs border-t text-gray-400 bg-black-300 border-gray-600">
                Type to search tags or create new ones • Press Enter to add •
                Backspace to remove
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TagSelector;
