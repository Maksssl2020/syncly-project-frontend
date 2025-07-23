import { motion } from "framer-motion";
import type { PostOption, PostType } from "../../types/post";
import {
  AudioLines,
  Camera,
  FileText,
  LinkIcon,
  Quote,
  Video,
} from "lucide-react";

const postOptions: PostOption[] = [
  {
    type: "text",
    label: "Text",
    icon: FileText,
    color: "#14b8a6",
  },
  {
    type: "quote",
    label: "Quote",
    icon: Quote,
    color: "#22d3ee",
  },
  {
    type: "photo",
    label: "Photo",
    icon: Camera,
    color: "#0d9488",
  },
  {
    type: "video",
    label: "Video",
    icon: Video,
    color: "#06b6d4",
  },
  {
    type: "audio",
    icon: AudioLines,
    label: "Audio",
    color: "#14b8a6",
  },
  {
    type: "link",
    label: "Link",
    icon: LinkIcon,
    color: "#22d3ee",
  },
];

type CreatePostOptionListProps = {
  onCreatePost: (type: PostType) => void;
  onClose: () => void;
  className?: string;
};

const CreatePostOptionList = ({
  onCreatePost,
  onClose,
  className,
}: CreatePostOptionListProps) => {
  const handleClick = (type: PostType) => {
    onCreatePost(type);
    onClose();
  };

  return (
    <motion.ul
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
      }}
      className={`absolute space-y-3 ${className}`}
    >
      {postOptions.map((option, index) => (
        <motion.li
          key={option.type}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          whileHover={{
            backgroundColor: "#2c2c2e",
            borderColor: option.color,
            color: option.color,
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => handleClick(option.type)}
          className={`flex bg-black-200 border-gray-600 text-white-100 items-center gap-3 cursor-pointer px-4 py-3 shadow-lg border-2 min-w-[140px] rounded-lg `}
        >
          <option.icon className={"size-5"} />
          <span className={"font-medium"}>{option.label}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default CreatePostOptionList;
