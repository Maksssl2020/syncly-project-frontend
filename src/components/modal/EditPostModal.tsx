import { useRef } from "react";
import type { PostByType, PostType, UpdateRequestByType } from "../../types/post.ts";
import TextPostForm from "../form/TextPostForm.tsx";
import QuotePostForm from "../form/QuotePostForm.tsx";
import PhotoPostForm from "../form/PhotoPostForm.tsx";
import VideoPostForm from "../form/VideoPostForm.tsx";
import LinkPostForm from "../form/LinkPostForm.tsx";
import { modalConfig } from "../../utils/postModalUtils.tsx";
import PostModalLayout from "./PostModalLayout.tsx";

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
  const config = modalConfig(postToEdit.postType);
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

  console.log(config);

  return (
    <PostModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={config.title}
      color={config.color}
      icon={config.icon}
      onSubmitClick={handleUpdateClick}
      submitLabel="Update"
    >
      {section()}
    </PostModalLayout>
  );
}

export default EditPostModal;
