import axiosConfig from "../config/axiosConfig.ts";
import type { MainTag } from "../types/tags.ts";

export async function fetchUserFollowedTags(userId: string | number) {
  const response = await axiosConfig.get<MainTag[]>(`/users-tags/${userId}`);
  return response.data;
}

export async function handleFollowTag(
  userId: string | number,
  tagId: string | number,
) {
  const response = await axiosConfig.post(
    `/users-tags/follow/${userId}/${tagId}`,
  );
  return response.data;
}

export async function handleUnfollowTag(
  userId: string | number,
  tagId: string | number,
) {
  const response = await axiosConfig.delete(
    `/users-tags/unfollow/${userId}/${tagId}`,
  );
  return response.data;
}
