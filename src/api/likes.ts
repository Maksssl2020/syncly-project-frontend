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
