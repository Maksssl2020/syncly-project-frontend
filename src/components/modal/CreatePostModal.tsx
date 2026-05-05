import type {
  LinkPostRequest,
  PhotoPostRequest,
  PostType,
  QuotePostRequest,
  TextPostRequest,
  VideoPostRequest
} from "../../types/post.ts";
import TextPostForm from "../form/TextPostForm.tsx";
import { useRef } from "react";
import QuotePostForm from "../form/QuotePostForm.tsx";
import PhotoPostForm from "../form/PhotoPostForm.tsx";
import VideoPostForm from "../form/VideoPostForm.tsx";
import LinkPostForm from "../form/LinkPostForm.tsx";
import { modalConfig } from "../../utils/postModalUtils.tsx";
import PostModalLayout from "./PostModalLayout.tsx";

type CreatePostModalProps = {
  isOpen: boolean;
  postType: PostType | null;
  onClose: () => void;
  onSubmit: (
    data:
      | TextPostRequest
      | QuotePostRequest
      | PhotoPostRequest
      | VideoPostRequest
      | LinkPostRequest,
  ) => void;
};

const CreatePostModal = ({
  isOpen,
  onClose,
  postType,
  onSubmit,
}: CreatePostModalProps) => {
  const config = modalConfig(postType);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handlePostClick = () => {
    formRef.current?.requestSubmit();
  };

  const handleFormSubmit = (
    data:
      | TextPostRequest
      | QuotePostRequest
      | PhotoPostRequest
      | VideoPostRequest
      | LinkPostRequest,
  ) => {
    onSubmit(data);
  };

  const section = (postType: PostType | null) => {
    switch (postType) {
      case "TEXT":
        return (
          <TextPostForm
            ref={formRef}
            onSubmit={(data) => handleFormSubmit(data)}
          />
        );
      case "QUOTE":
        return (
          <QuotePostForm
            ref={formRef}
            onSubmit={(data) => handleFormSubmit(data)}
          />
        );
      case "PHOTO":
        return (
          <PhotoPostForm
            ref={formRef}
            onSubmit={(data) => handleFormSubmit(data)}
          />
        );
      case "VIDEO":
        return (
          <VideoPostForm
            ref={formRef}
            onSubmit={(data) => handleFormSubmit(data)}
          />
        );
      case "LINK":
        return (
          <LinkPostForm
            ref={formRef}
            onSubmit={(data) => handleFormSubmit(data)}
          />
        );
      default:
        return (
          <TextPostForm
            ref={formRef}
            onSubmit={(data) => handleFormSubmit(data)}
          />
        );
    }
  };

  return (
    <PostModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={config.title}
      color={config.color}
      icon={config.icon}
      onSubmitClick={handlePostClick}
      submitLabel="Post"
    >
      {section(postType)}
    </PostModalLayout>
  );
};

export default CreatePostModal;
