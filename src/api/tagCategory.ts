import type { TagCategory, TagCategoryRequest } from "../types/tagCategory.ts";
import axiosConfig from "../config/axiosConfig.ts";

export async function fetchTagCategories() {
  const response = await axiosConfig.get<TagCategory[]>("/tag-categories");
  return response.data;
}

export async function handleCreateTagCategory(data: TagCategoryRequest) {
  const response = await axiosConfig.post<void>("/tag-categories/create", data);
  return response.data;
}
