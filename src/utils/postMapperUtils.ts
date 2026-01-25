import type {
  LinkPost,
  PhotoPost,
  Post,
  PostUnion,
  QuotePost,
  TextPost,
  VideoPost,
} from "../types/post.ts";

export function mapToPostType(post: Post): PostUnion {
  switch (post.postType) {
    case "TEXT":
      return post as TextPost;
    case "PHOTO":
      return post as PhotoPost;
    case "VIDEO":
      return post as VideoPost;
    case "QUOTE":
      return post as QuotePost;
    case "LINK":
      return post as LinkPost;
    default:
      return post;
  }
}
