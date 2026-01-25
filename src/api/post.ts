import type {
  LinkPostRequest,
  PhotoPostRequest,
  Post,
  PostType,
  QuotePostRequest,
  TextPostRequest,
  UpdateRequestByType,
  VideoPostRequest,
} from "../types/post.ts";
import axiosConfig from "../config/axiosConfig.ts";
import { mapToPostType } from "../utils/postMapperUtils.ts";
import { isTextArrayEqual } from "../utils/arrUtils.ts";

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

export async function fetchPostsByTagInfinity(
  tag: string,
  offset: number = 0,
  limit: number = 10,
) {
  const response = await axiosConfig.get<Post[]>(`posts/by-tag`, {
    params: {
      tag,
      offset,
      limit,
    },
  });

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
    | LinkPostRequest,
>(userId: string | number, data: T, type: PostType) {
  const formData = new FormData();

  const jsonData = {
    ...data,
    type,
  };

  formData.append("data", JSON.stringify(jsonData));

  if (type === "PHOTO" && "photos" in data) {
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

export async function handleUpdatePost<K extends PostType>(
  type: K,
  data: UpdateRequestByType[K],
) {
  console.log(type);
  const formData = new FormData();
  let updatedDataDto: any = { type };

  const appendTagsIfChanged = (
    initialTags: string[],
    updatedTags?: string[],
  ) => {
    if (!updatedTags) return;
    if (!isTextArrayEqual(initialTags, updatedTags)) {
      for (const tag of updatedTags) formData.append("tags", tag);
      updatedDataDto.tags = updatedTags;
    }
  };

  switch (type) {
    case "TEXT": {
      const { initialData, updatedData } = data as UpdateRequestByType["TEXT"];

      if (initialData.title !== updatedData.title && updatedData.title) {
        updatedDataDto.title = updatedData.title;
      }
      if (initialData.content !== updatedData.content && updatedData.content) {
        updatedDataDto.content = updatedData.content;
      }

      appendTagsIfChanged(
        initialData.tags.map((t) => t.name),
        updatedData.tags,
      );
      break;
    }

    case "QUOTE": {
      const { initialData, updatedData } = data as UpdateRequestByType["QUOTE"];

      if (initialData.quote !== updatedData.quote) {
        updatedDataDto.quote = updatedData.quote;
      }
      if (initialData.source !== updatedData.source && updatedData.source) {
        updatedDataDto.source = updatedData.source;
      }

      appendTagsIfChanged(
        initialData.tags.map((t) => t.name),
        updatedData.tags,
      );
      break;
    }

    case "PHOTO": {
      const { initialData, updatedData } = data as UpdateRequestByType["PHOTO"];

      if (initialData.caption !== updatedData.caption) {
        updatedDataDto.caption = updatedData.caption;
      }

      const photoUrls: string[] = [];
      if (updatedData.photos?.length) {
        for (const media of updatedData.photos) {
          if (media.url) photoUrls.push(media.url);
          if (media.mediaFile) formData.append("photoFiles", media.mediaFile);
        }
      }
      if (photoUrls.length) updatedDataDto.photoUrls = photoUrls;

      appendTagsIfChanged(
        initialData.tags.map((t) => t.name),
        updatedData.tags,
      );
      break;
    }

    case "VIDEO": {
      const { initialData, updatedData } = data as UpdateRequestByType["VIDEO"];

      if (initialData.description !== updatedData.description) {
        updatedDataDto.description = updatedData.description;
      }

      if (!isTextArrayEqual(initialData.videoUrls, updatedData.videoUrls)) {
        updatedDataDto.videoUrls = updatedData.videoUrls;
      }

      appendTagsIfChanged(
        initialData.tags.map((t) => t.name),
        updatedData.tags,
      );
      break;
    }

    case "LINK": {
      const { initialData, updatedData } = data as UpdateRequestByType["LINK"];

      if (initialData.title !== updatedData.title && updatedData.title) {
        updatedDataDto.title = updatedData.title;
      }
      if (
        initialData.description !== updatedData.description &&
        updatedData.description
      ) {
        updatedDataDto.description = updatedData.description;
      }

      if (!isTextArrayEqual(initialData.urls, updatedData.links)) {
        updatedDataDto.links = updatedData.links;
      }

      appendTagsIfChanged(
        initialData.tags.map((t) => t.name),
        updatedData.tags,
      );
      break;
    }
  }

  const dto = {
    postId: data.initialData.id,
    updatedData: updatedDataDto,
  };

  formData.append(
    "data",
    new Blob([JSON.stringify(dto)], { type: "application/json" }),
  );

  const response = await axiosConfig.patch("/posts/update", formData);
  console.log(response);
  return response.data;
}

export async function handleDeletePost(postId: string | number) {
  const response = await axiosConfig.delete(`/posts/delete`, {
    params: {
      postId,
    },
  });
  return response.data;
}
