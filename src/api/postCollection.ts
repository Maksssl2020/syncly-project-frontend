import axiosConfig from "../config/axiosConfig.ts";
import type {
  PostCollection,
  PostCollectionRequest,
} from "../types/postCollection.ts";
import { mapToPostType } from "../utils/postMapperUtils.ts";

export async function fetchAllPostCollectionsByUserId(
  userId: string | number,
): Promise<PostCollection[]> {
  const response = await axiosConfig.get<PostCollection[]>(
    `/post-collections/all-by-user/${userId}`,
  );

  return response.data.map((collection) => ({
    ...collection,
    posts: collection.posts.map(mapToPostType),
  }));
}

export async function handleCheckPostCollectionExists(
  userId: string | number,
  title: string,
): Promise<boolean> {
  const response = await axiosConfig.get<boolean>(
    `/post-collections/exists/${userId}`,
    {
      params: {
        title,
      },
    },
  );
  return response.data;
}

export async function handleCreatePostCollection(
  userId: string | number,
  data: PostCollectionRequest,
) {
  const response = await axiosConfig.post(
    `/post-collections/create/${userId}`,
    data,
  );
  return response.data;
}

export async function handleSavePostByPostCollection(
  postCollectionId: string | number,
  postId: string | number,
) {
  const response = await axiosConfig.post(
    `/post-collections/save-post/${postCollectionId}`,
    null,
    {
      params: {
        postId,
      },
    },
  );
  return response.data;
}

export async function handleUnsavePostByPostCollection(
  postCollectionId: string | number,
  postId: string | number,
) {
  const response = await axiosConfig.delete(
    `/post-collections/unsave-post/${postCollectionId}/${postId}`,
  );
  return response.data;
}
