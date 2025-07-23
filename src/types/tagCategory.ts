export interface TagCategory {
  id: string;
  name: string;
  description: string;
  tagCount: number;
  color: string;
}

export interface TagCategoryRequest {
  name: string;
  description: string;
  color: string;
}
