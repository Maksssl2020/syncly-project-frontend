import type {
  AdminTag,
  AdminTagCreateRequest,
  AdminTagUpdateRequest,
  CommonTagRequest,
  Tag,
  TagsAdminStats,
  TagToEdit,
  TagUsage
} from "../types/tags.ts";
import axiosConfig from "../config/axiosConfig.ts";
import type { PageResponse } from "../types/types.ts";

export async function handleCreateMainTag(data: AdminTagCreateRequest) {
  const response = await axiosConfig.post<void>("/tags/create/main", data);
  return response.data;
}

export async function handleCreateCommonTag(data: CommonTagRequest) {
  const response = await axiosConfig.post<Tag>("/tags/create/common", data);
  return response.data;
}

export async function fetchAllTags(
  page: number = 0,
  size: number = 10,
  sortOption: "RECENT" | "OLDEST" = "RECENT",
  tagCategoryName?: string,
  trendingOnly?: boolean,
  searchQuery?: string,
) {
  const response = await axiosConfig.get<PageResponse<AdminTag>>("/tags", {
    params: {
      page,
      size,
      sortOption,
      tagCategoryName,
      trendingOnly,
      searchQuery,
    },
  });
  return response.data;
}

export async function fetchTagsAdminStats() {
  const response = await axiosConfig.get<TagsAdminStats>("/tags/admin-stats");
  return response.data;
}

export async function fetchAllEnabledTags() {
  const response = await axiosConfig.get<AdminTag[]>("/tags/enabled");
  return response.data;
}

export async function fetchTagByName(tagName: string) {
  const response = await axiosConfig.get<AdminTag>("/tags/tag/by-name", {
    params: {
      tagName,
    },
  });
  return response.data;
}

export async function fetchTagToEditById(tagId: string | number) {
  const response = await axiosConfig.get<TagToEdit>("/tags/tag/by-id/to-edit", {
    params: {
      tagId,
    },
  });

  return response.data;
}

export async function fetchRelatedTagsByTagCategory(category: string) {
  const response = await axiosConfig.get<AdminTag[]>(
    "/tags/related/by-category",
    {
      params: {
        category,
      },
    },
  );
  return response.data;
}

export async function fetchPopularTags(limit: number) {
  const response = await axiosConfig.get<TagUsage[]>("/tags/popular", {
    params: {
      limit,
    },
  });
  return response.data;
}

export async function fetchTrendingTags(limit: number) {
  const response = await axiosConfig.get<TagUsage[]>("/tags/trending", {
    params: {
      limit,
    },
  });
  return response.data;
}

export async function fetchTagsByQuery(query: string) {
  if (query === "") return;

  const response = await axiosConfig.get<AdminTag[]>(`/tags/search`, {
    params: {
      query,
    },
  });
  return response.data;
}

export async function handleChangeTagCategory(
  tagId: string | number,
  categoryId: string | number,
) {
  const response = await axiosConfig.patch("/tags/change/category", {
    tagId,
    categoryId,
  });
  return response.data;
}

export async function handleChangeTagState(tagId: string | number) {
  const response = await axiosConfig.patch("/tags/change-state", {
    tagId,
  });
  return response.data;
}

export async function handleUpdateTag(data: AdminTagUpdateRequest) {
  const form = new FormData();
  const { tagToUpdateId, tagCategoryId, initialTagData, name, color } = data;

  form.append("tagId", tagToUpdateId.toString());

  if (name && name !== initialTagData.name) {
    form.append("tagName", name);
  }

  if (tagCategoryId && tagCategoryId !== initialTagData.tagCategoryId) {
    form.append("tagCategoryId", tagCategoryId.toString());
  }

  if (color && initialTagData.color !== color) {
    form.append("color", color);
  }

  const response = await axiosConfig.patch<void>("/tags/update", form);
  return response.data;
}
