import React from "react";
import type { MediaRequest } from "./media.ts";
import type { UserItem } from "./user.ts";
import type { Tag } from "./tags.ts";
import type { Image } from "./image.ts";

export interface PostOption {
  type: PostType;
  label: string;
  icon: React.ElementType;
  color: string;
}

export interface TextPostRequest {
  title?: string;
  content: string;
  tags?: string[];
  type?: "text";
}

export interface UpdateTextPostRequest {
  initialData: TextPost;
  updatedData: TextPostRequest;
}

export interface QuotePostRequest {
  quote: string;
  source?: string;
  tags?: string[];
  type?: "quote";
}

export interface UpdateQuotePostRequest {
  initialData: QuotePost;
  updatedData: QuotePostRequest;
}

export interface PhotoPostRequest {
  caption: string;
  tags?: string[];
  photos: MediaRequest[];
  type?: "photo";
}

export interface UpdatePhotoPostRequest {
  initialData: PhotoPost;
  updatedData: PhotoPostRequest;
}

export interface VideoPostRequest {
  description: string;
  tags?: string[];
  videoUrls: string[];
  type?: "video";
}

export interface UpdateVideoPostRequest {
  initialData: VideoPost;
  updatedData: VideoPostRequest;
}

export interface LinkPostRequest {
  title?: string;
  description: string;
  links: string[];
  tags?: string[];
  type?: "link";
}

export interface UpdateLinkPostRequest {
  initialData: LinkPost;
  updatedData: LinkPostRequest;
}

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  postType: PostType;
  authorId: number;
  authorName: string;
  authorUsername: string;
  authorAvatar?: Image;
  tags: Tag[];
  likesBy: number[];
  savedBy: number[];
  sharedBy: number[];
  commentsCount: number;
  likesCount: number;
}

export interface TextPost extends Post {
  postType: "TEXT";
  title: string;
  content: string;
}

export interface QuotePost extends Post {
  postType: "QUOTE";
  quote: string;
  source: string;
}

export interface PhotoPost extends Post {
  postType: "PHOTO";
  caption: string;
  imageUrls: string[];
}

export interface VideoPost extends Post {
  postType: "VIDEO";
  description: string;
  videoUrls: string[];
}

export interface LinkPost extends Post {
  postType: "LINK";
  title: string;
  description: string;
  urls: string[];
}

export type PostUnion =
  | Post
  | TextPost
  | QuotePost
  | PhotoPost
  | VideoPost
  | LinkPost;

export type PostType = "TEXT" | "QUOTE" | "PHOTO" | "VIDEO" | "LINK";

export interface SharedPost {
  id: number | string;
  sharedBy: UserItem;
  originalPost: PostUnion;
  sharedAt: string;
}

export type PostByType = {
  TEXT: TextPost;
  QUOTE: QuotePost;
  PHOTO: PhotoPost;
  VIDEO: VideoPost;
  LINK: LinkPost;
};

export type UpdateRequestByType = {
  TEXT: UpdateTextPostRequest;
  QUOTE: UpdateQuotePostRequest;
  PHOTO: UpdatePhotoPostRequest;
  VIDEO: UpdateVideoPostRequest;
  LINK: UpdateLinkPostRequest;
};
