import React, { type ReactNode } from "react";
import Modal from "./Modal.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Send, XIcon } from "lucide-react";

type PostModalLayoutProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  color: string;
  icon: React.ElementType;
  submitLabel?: string;
  onSubmitClick: () => void;
  children: ReactNode;
};

const PostModalLayout = ({
  isOpen,
  onClose,
  title,
  color,
  icon: Icon,
  submitLabel = "Post",
  onSubmitClick,
  children,
}: PostModalLayoutProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="flex items-center justify-between p-6 border-b-2 border-gray-600">
        <div className="items-center flex gap-3">
          <div
            className="size-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <Icon className="size-6 text-black-100" />
          </div>

          <h2 className="text-2xl font-bold text-white-100">{title}</h2>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg cursor-pointer hover:bg-white-100/10 text-gray-400"
        >
          <XIcon className="size-5" />
        </button>
      </header>

      <div className="px-6 max-h-[75vh] overflow-y-auto py-6">{children}</div>

      <footer className="flex items-center justify-end p-6 border-t-2 border-gray-600 mt-2">
        <div className="flex gap-3">
          <AnimatedButton
            bgColor="#171719"
            bgColorHover="#393939"
            textColorHover="#14b8a6"
            borderColor="#171719"
            borderColorHover="#393939"
            className="px-6 py-3 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </AnimatedButton>

          <AnimatedButton
            bgColor="#171719"
            bgColorHover={color}
            borderColor={color}
            borderColorHover={color}
            textColor={color}
            textColorHover="#111111"
            onClick={onSubmitClick}
            type="button"
            className="px-6 py-3 rounded-lg flex gap-2 items-center border-2"
          >
            <Send className="size-4" />
            {submitLabel}
          </AnimatedButton>
        </div>
      </footer>
    </Modal>
  );
};
export default PostModalLayout;
