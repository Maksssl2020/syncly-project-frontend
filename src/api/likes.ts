import axiosConfig from "../config/axiosConfig.ts";

export async function handleLikePost(postId: string | number) {
  const response = await axiosConfig.post("/likes/like/post", null, {
    params: {
      postId,
    },
  });

  return response.data;
}

export async function handleLikeComment(commentId: string | number) {
  const response = await axiosConfig.post("/likes/like/comment", null, {
    params: {
      commentId,
    },
  });
  return response.data;
}

export async function handleUnlikePost(postId: string | number) {
  const response = await axiosConfig.delete("/likes/unlike/post", {
    params: {
      postId,
    },
  });

  return response.data;
}

export async function handleUnlikeComment(commentId: string | number) {
  const response = await axiosConfig.delete("/likes/unlike/comment", {
    params: {
      commentId,
    },
  });
  return response.data;
}
