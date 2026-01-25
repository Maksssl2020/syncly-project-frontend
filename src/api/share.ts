import axiosConfig from "../config/axiosConfig.ts";
import type { SharedPost } from "../types/post.ts";
import { mapToPostType } from "../utils/postMapperUtils.ts";

export async function fetchSharedPostsByUserId(userId: string | number) {
  const response = await axiosConfig.get<SharedPost[]>(
    `/shared-posts/by-user/${userId}`,
  );
  return response.data.map((data) => ({
    ...data,
    originalPost: mapToPostType(data.originalPost),
  }));
}

export async function handleSharePost(postId: string | number) {
  const response = await axiosConfig.post(`/shared-posts/share/${postId}`);
  return response.data;
}

export async function handleUnsharePost(postId: string | number) {
  const response = await axiosConfig.delete(`/shared-posts/unshare/${postId}`);
  return response.data;
}
