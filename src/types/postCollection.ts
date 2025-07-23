import type { Post } from "./post.ts";

export interface PostCollection {
  id: number | string;
  userId: string | number;
  title: string;
  color: string;
  isDefault: boolean;
  posts: Post[];
}

export interface PostCollectionRequest {
  title: string;
  color: string;
}
