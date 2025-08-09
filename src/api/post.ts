import type {
  AudioPostRequest,
  LinkPostRequest,
  PhotoPostRequest,
  Post,
  PostType,
  QuotePostRequest,
  TextPostRequest,
  VideoPostRequest,
} from "../types/post.ts";
import axiosConfig from "../config/axiosConfig.ts";
import { mapToPostType } from "../utils/postMapperUtils.ts";

export async function fetchAllPostsByUserId(userId: string | number) {
  const response = await axiosConfig.get<Post[]>(`/posts/user/${userId}`);
  return response.data.map(mapToPostType);
}

export async function fetchPostsByQuery(query: string) {
  if (query === "") return;

  const response = await axiosConfig.get<Post[]>(`/posts/search`, {
    params: {
      query,
    },
  });

  return response.data;
}

export async function fetchPostsForUserDashboard(userId: string | number) {
  const response = await axiosConfig.get<Post[]>(
    `/posts/user/dashboard/${userId}`,
  );
  return response.data.map(mapToPostType);
}

export async function fetchPostsForUserDashboardInfinity(
  userId: number | string,
  offset: number = 0,
  limit: number = 10,
) {
  const response = await axiosConfig.get<Post[]>(
    `/posts/user/dashboard/${userId}`,
    {
      params: {
        offset,
        limit,
      },
    },
  );
  return response.data.map(mapToPostType);
}

export async function fetchFollowedFeedPosts(userId: string | number) {
  const response = await axiosConfig.get<Post[]>(
    `posts/user/${userId}/feed/following`,
  );
  return response.data.map(mapToPostType);
}

export async function fetchFollowedFeedPostsInfinity(
  userId: number | string,
  offset: number = 0,
  limit: number = 10,
) {
  const response = await axiosConfig.get<Post[]>(
    `posts/user/${userId}/feed/following`,
    {
      params: {
        offset,
        limit,
      },
    },
  );
  return response.data.map(mapToPostType);
}

export async function fetchAllSavedPostsByUser(userId: string | number) {
  const response = await axiosConfig.get<Post[]>(
    `posts/user/saved-posts/${userId}`,
  );
  return response.data.map(mapToPostType);
}

export async function handleCreatePost<
  T extends
    | TextPostRequest
    | QuotePostRequest
    | PhotoPostRequest
    | VideoPostRequest
    | AudioPostRequest
    | LinkPostRequest,
>(userId: string | number, data: T, type: PostType) {
  const formData = new FormData();

  const jsonData = {
    ...data,
    type,
  };

  formData.append("data", JSON.stringify(jsonData));

  if (type === "photo" && "photos" in data) {
    for (const media of data.photos) {
      if (media.mediaFile) {
        formData.append("files", media.mediaFile);
      }
    }
  }

  const response = await axiosConfig.post<void>(
    `/posts/create/${userId}`,
    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  console.log(response);

  return response.data;
}
