import { useRef } from "react";
import Modal from "./Modal.tsx";
import { Send, X } from "lucide-react";
import AnimatedButton from "../button/AnimatedButton.tsx";
import type { PostByType, PostType, UpdateRequestByType } from "../../types/post.ts";
import TextPostForm from "../form/TextPostForm.tsx";
import QuotePostForm from "../form/QuotePostForm.tsx";
import PhotoPostForm from "../form/PhotoPostForm.tsx";
import VideoPostForm from "../form/VideoPostForm.tsx";
import LinkPostForm from "../form/LinkPostForm.tsx";

type EditPostModalProps<T extends PostType> = {
  isOpen: boolean;
  onClose: () => void;
  postToEdit: PostByType[T];
  onSubmit: (data: UpdateRequestByType[T]) => void;
};

function EditPostModal<T extends PostType>({
  isOpen,
  postToEdit,
  onClose,
  onSubmit,
}: EditPostModalProps<T>) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleUpdateClick = () => {
    formRef.current?.requestSubmit();
  };

  const section = () => {
    switch (postToEdit.postType) {
      case "TEXT":
        return (
          <TextPostForm
            ref={formRef}
            isEdit={true}
            postToEdit={postToEdit}
            // @ts-ignore
            onSubmit={(data) => onSubmit(data)}
          />
        );
      case "QUOTE":
        return (
          <QuotePostForm
            ref={formRef}
            isEdit={true}
            postToEdit={postToEdit}
            // @ts-ignore
            onSubmit={(data) => onSubmit(data)}
          />
        );
      case "PHOTO":
        return (
          <PhotoPostForm
            isEdit={true}
            postToEdit={postToEdit}
            ref={formRef}
            // @ts-ignore
            onSubmit={(data) => onSubmit(data)}
          />
        );
      case "VIDEO":
        return (
          <VideoPostForm
            isEdit={true}
            postToEdit={postToEdit}
            ref={formRef}
            // @ts-ignore
            onSubmit={(data) => onSubmit(data)}
          />
        );
      case "LINK":
        return (
          <LinkPostForm
            isEdit={true}
            postToEdit={postToEdit}
            ref={formRef}
            // @ts-ignore
            onSubmit={(data) => onSubmit(data)}
          />
        );
      default:
        return (
          <TextPostForm
            isEdit={true}
            postToEdit={postToEdit}
            ref={formRef}
            // @ts-ignore
            onSubmit={(data) => onSubmit(data)}
          />
        );
    }
  };

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
            // style={{ backgroundColor: config.color }}
          >
            {/*<config.icon className={"size-6 text-black-100"} />*/}
          </div>
          <h2 className={"text-2xl font-bold text-white-100"}>
            {/*{config.title}*/}
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
      <div className={"p-6 max-h-[70vh] overflow-y-auto"}>{section()}</div>

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
            // bgColorHover={config.color}
            // borderColor={config.color}
            // borderColorHover={config.color}
            // textColor={config.color}
            textColorHover={"#111111"}
            onClick={handleUpdateClick}
            className={"px-6 py-3 rounded-lg flex gap-2 items-center border-2"}
          >
            <Send className={"size-4"} />
            Post
          </AnimatedButton>
        </div>
      </footer>
    </Modal>
  );
}

export default EditPostModal;
