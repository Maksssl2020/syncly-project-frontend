import type { Image } from "./image.ts";

export interface Comment {
  id: number;
  authorId: number;
  postId: number;
  parentId?: number;
  content: string;
  updatedAt: string;
  createdAt: string;
  authorName: string;
  authorUsername: string;
  authorImage?: Image;
  likesBy: number[];
  replies: Comment[];
}

export interface PostCommentRequest {
  userId: number | string;
  postId: number | string;
  content: string;
}

export interface PostCommentReplyRequest {
  userId: number | string;
  parentCommentId: number | string;
  content: string;
}
