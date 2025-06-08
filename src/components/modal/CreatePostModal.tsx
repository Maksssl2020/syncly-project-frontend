import type { PostType } from "../../types/post.ts";
import Modal from "./Modal.tsx";
import TextPostForm from "../form/TextPostForm.tsx";
import React from "react";
import {
  Camera,
  FileText,
  LinkIcon,
  Music,
  Quote,
  Send,
  Video,
  X,
} from "lucide-react";
import AnimatedButton from "../button/AnimatedButton.tsx";
import QuotePostForm from "../form/QuotePostForm.tsx";
import PhotoPostForm from "../form/PhotoPostForm.tsx";
import VideoPostForm from "../form/VideoPostForm.tsx";
import MusicPostForm from "../form/MusicPostForm.tsx";
import LinkPostForm from "../form/LinkPostForm.tsx";

type CreatePostModalProps = {
  isOpen: boolean;
  postType: PostType | null;
  onClose: () => void;
  onSubmit: () => void;
};

type ModalConfig = {
  title: string;
  icon: React.ElementType;
  color: string;
};

const modalConfig = (postType: PostType | null): ModalConfig => {
  switch (postType) {
    case "text":
      return {
        title: "Create Text Post",
        icon: FileText,
        color: "#14b8a6",
      };
    case "quote":
      return {
        title: "Create Quote Post",
        icon: Quote,
        color: "#22d3ee",
      };
    case "photo":
      return {
        title: "Create Photo Post",
        icon: Camera,
        color: "#0d9488",
      };
    case "video":
      return {
        title: "Create Video Post",
        icon: Video,
        color: "#06b6d4",
      };
    case "music":
      return {
        title: "Create Music Post",
        icon: Music,
        color: "#14b8a6",
      };
    case "link":
      return {
        title: "Create Link Post",
        icon: LinkIcon,
        color: "#22d3ee",
      };
    default:
      return {
        title: "Create Post",
        icon: FileText,
        color: "#14b8a6",
      };
  }
};

const section = (postType: PostType | null) => {
  switch (postType) {
    case "text":
      return <TextPostForm />;
    case "quote":
      return <QuotePostForm />;
    case "photo":
      return <PhotoPostForm />;
    case "video":
      return <VideoPostForm />;
    case "music":
      return <MusicPostForm />;
    case "link":
      return <LinkPostForm />;
    default:
      return <TextPostForm />;
  }
};

const CreatePostModal = ({
  isOpen,
  onClose,
  postType,
  onSubmit,
}: CreatePostModalProps) => {
  const config = modalConfig(postType);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header
        className={
          "flex items-center justify-between p-6 border-b-2 border-gray-600"
        }
      >
        <div className={"items-center flex gap-3"}>
          <div
            className={"size-10 rounded-lg flex items-center justify-center"}
            style={{ backgroundColor: config.color }}
          >
            <config.icon className={"size-6 text-black-100"} />
          </div>
          <h2 className={"text-2xl font-bold text-white-100"}>
            {config.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className={
            "p-2 rounded-lg cursor-pointer hover:bg-white-100/10 text-gray-400"
          }
        >
          <X className={"size-5"} />
        </button>
      </header>
      <div className={"p-6 max-h-[70vh] overflow-y-auto"}>
        {section(postType)}
      </div>

      <footer
        className={
          "flex items-center justify-end p-6 border-t-2 border-gray-600"
        }
      >
        <div className={"flex gap-3"}>
          <AnimatedButton
            bgColor={"#171719"}
            bgColorHover={"#393939"}
            textColorHover={"#14b8a6"}
            borderColor={"#171719"}
            borderColorHover={"#393939"}
            className={"px-6 py-3 rounded-lg "}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#171719"}
            bgColorHover={config.color}
            borderColor={config.color}
            borderColorHover={config.color}
            textColor={config.color}
            textColorHover={"#111111"}
            className={"px-6 py-3 rounded-lg flex gap-2 items-center border-2"}
          >
            <Send className={"size-4"} />
            Post
          </AnimatedButton>
        </div>
      </footer>
    </Modal>
  );
};

export default CreatePostModal;
