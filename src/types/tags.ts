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
  enabled: boolean;
}

export interface TagToEdit {
  id: string | number;
  tagCategoryId: string | number;
  tagCategoryName: string;
  name: string;
  color: string;
}

export interface TagUsage {
  id: string | number;
  name: string;
  usageCount: number;
}

export type TagType = "MAIN" | "COMMON";

export interface AdminTagCreateRequest {
  name: string;
  tagCategoryName: string;
  color: string;
}

export interface AdminTagUpdateRequest {
  tagToUpdateId: string | number;
  name?: string;
  tagCategoryId?: string | number;
  color?: string;
  initialTagData: TagToEdit;
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
