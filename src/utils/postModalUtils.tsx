import type { PostType } from "../types/post.ts";
import { Camera, FileText, LinkIcon, Quote, Video } from "lucide-react";
import type { PostModalConfig } from "../types/types.ts";

export const modalConfig = (postType: PostType | null): PostModalConfig => {
  switch (postType) {
    case "TEXT":
      return {
        title: "Create Text Post",
        icon: FileText,
        color: "#14b8a6",
      };
    case "QUOTE":
      return {
        title: "Create Quote Post",
        icon: Quote,
        color: "#22d3ee",
      };
    case "PHOTO":
      return {
        title: "Create Photo Post",
        icon: Camera,
        color: "#0d9488",
      };
    case "VIDEO":
      return {
        title: "Create Video Post",
        icon: Video,
        color: "#06b6d4",
      };
    case "LINK":
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
