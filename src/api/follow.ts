import axiosConfig from "../config/axiosConfig.ts";
import type { MainTag } from "../types/tags.ts";
import type { UserProfile } from "../types/userProfile.ts";

export async function fetchUserFollowedTags(userId: string | number) {
  const response = await axiosConfig.get<MainTag[]>(`/follows/tags/${userId}`);
  return response.data;
}

export async function fetchUserFollowedUsers(userId: string | number) {
  const response = await axiosConfig.get<UserProfile[]>(
    `/follows/users/${userId}`,
  );
  return response.data;
}

export async function fetchFollowedUsersIds(userId: string | number) {
  const response = await axiosConfig.get<number[]>(
    `/follows/users/ids/${userId}`,
  );
  return response.data;
}

export async function handleFollowTag(
  userId: string | number,
  tagId: string | number,
) {
  const response = await axiosConfig.post(
    `/follows/follow/tag/${userId}/${tagId}`,
  );
  return response.data;
}

export async function handleFollowUser(followedUserId: string | number) {
  const response = await axiosConfig.post(
    `/follows/follow/user/${followedUserId}`,
  );
  return response.data;
}

export async function handleUnfollowTag(
  userId: string | number,
  tagId: string | number,
) {
  const response = await axiosConfig.delete(
    `/follows/unfollow/tag/${userId}/${tagId}`,
  );
  return response.data;
}

export async function handleUnfollowUser(followedUserId: string | number) {
  const response = await axiosConfig.delete(
    `/follows/unfollow/user/${followedUserId}`,
  );
  return response.data;
}
