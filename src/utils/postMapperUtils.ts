import type {
  AudioPost,
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
    case "text":
      return post as TextPost;
    case "photo":
      return post as PhotoPost;
    case "video":
      return post as VideoPost;
    case "audio":
      return post as AudioPost;
    case "quote":
      return post as QuotePost;
    case "link":
      return post as LinkPost;
    default:
      return post;
  }
}
