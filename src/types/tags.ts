export interface AdminTag {
  id: string | number;
  name: string;
  description: string;
  postsCount: number;
  postsThisWeek: number;
  followersCount: number;
  trending: boolean;
  tagCategory: string;
  type: TagType;
  color: string;
  createdAt: string;
}

export interface TagUsage {
  id: string | number;
  name: string;
  usageCount: number;
}

export type TagType = "MAIN" | "COMMON";

export interface AdminTagRequest {
  name: string;
  tagCategoryName: string;
  color: string;
}

export interface CommonTagRequest {
  name: string;
}

export interface Tag {
  id: string | number;
  name: string;
  color: string;
}

export interface TagsStatistics {
  label: string;
  value: string | number;
}
