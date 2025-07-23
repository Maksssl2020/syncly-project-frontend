import React from "react";
import type { MediaRequest } from "./media.ts";

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

export interface QuotePostRequest {
  quote: string;
  source?: string;
  tags?: string[];
  type?: "quote";
}

export interface PhotoPostRequest {
  caption: string;
  tags?: string[];
  photos: MediaRequest[];
  type?: "photo";
}

export interface VideoPostRequest {
  description: string;
  tags?: string[];
  videos: MediaRequest[];
  type?: "video";
}

export interface AudioPostRequest {
  songTitle: string;
  artist: string;
  yourThoughts: string;
  audio: MediaRequest;
  tags?: string[];
  type?: "audio";
}

export interface LinkPostRequest {
  title?: string;
  description: string;
  links: string[];
  tags?: string[];
  type?: "link";
}

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  postType: PostType;
  authorId: number;
  authorName: string;
  authorUsername: string;
  tags: string[];
  likesBy: number[];
  savedBy: number[];
  commentsCount: number;
}

export interface TextPost extends Post {
  postType: "text";
  title: string;
  content: string;
}

export interface QuotePost extends Post {
  postType: "quote";
  quote: string;
  source: string;
}

export interface PhotoPost extends Post {
  postType: "photo";
  caption: string;
  imageUrls: string[];
}

export interface AudioPost extends Post {
  postType: "audio";
  artist: string;
  songTitle: string;
  audioUrl: string;
  yourThoughts: string;
}

export interface VideoPost extends Post {
  postType: "video";
  description: string;
  videoUrls: string[];
}

export interface LinkPost extends Post {
  postType: "link";
  title: string;
  description: string;
  urls: string[];
}

export type PostUnion =
  | Post
  | TextPost
  | QuotePost
  | PhotoPost
  | AudioPost
  | VideoPost
  | LinkPost;

export type PostType = "text" | "quote" | "photo" | "video" | "link" | "audio";
