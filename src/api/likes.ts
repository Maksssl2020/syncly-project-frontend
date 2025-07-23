import axiosConfig from "../config/axiosConfig.ts";

export async function handleLikePost(
  userId: string | number,
  postId: string | number,
) {
  const response = await axiosConfig.post("/likes/like/post", null, {
    params: {
      userId,
      postId,
    },
  });

  return response.data;
}

export async function handleLikeComment(
  userId: string | number,
  commentId: string | number,
) {
  const response = await axiosConfig.post("/likes/like/comment", null, {
    params: {
      userId,
      commentId,
    },
  });
  return response.data;
}
