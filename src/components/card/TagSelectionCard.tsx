import { motion } from "framer-motion";
import type { Tag } from "../../types/tags.ts";
import { X } from "lucide-react";
import { getTagColor } from "../../utils/tagsUtils.ts";

type TagSelectionCardProps = {
  tag: Tag;
  index: number;
  onRemoveTag: (tag: Tag) => void;
};

const TagSelectionCard = ({
  tag,
  index,
  onRemoveTag,
}: TagSelectionCardProps) => {
  return (
    <motion.div
      key={tag.id + tag.name}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={
        "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-black-100"
      }
      style={{
        backgroundColor: getTagColor(index),
      }}
    >
      <span>#{tag.name}</span>
      <button
        onClick={() => onRemoveTag(tag)}
        className={"ml-1 rounded-full p-0.5 hover:bg-black-100/20"}
      >
        <X className={"size-3"} />
      </button>
    </motion.div>
  );
};

export default TagSelectionCard;
