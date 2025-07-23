import type {
  AudioPost,
  LinkPost,
  PhotoPost,
  PostUnion,
  QuotePost,
  TextPost,
  VideoPost,
} from "../types/post";

export function isTextPost(post: PostUnion): post is TextPost {
  return post.postType.toLowerCase() === "text";
}

export function isQuotePost(post: PostUnion): post is QuotePost {
  return post.postType.toLowerCase() === "quote";
}

export function isPhotoPost(post: PostUnion): post is PhotoPost {
  return post.postType.toLowerCase() === "photo";
}

export function isAudioPost(post: PostUnion): post is AudioPost {
  return post.postType.toLowerCase() === "audio";
}

export function isVideoPost(post: PostUnion): post is VideoPost {
  return post.postType.toLowerCase() === "video";
}

export function isLinkPost(post: PostUnion): post is LinkPost {
  return post.postType.toLowerCase() === "link";
}
