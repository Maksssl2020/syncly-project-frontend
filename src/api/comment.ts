import axiosConfig from "../config/axiosConfig.ts";
import type {
  Comment,
  PostCommentReplyRequest,
  PostCommentRequest,
} from "../types/comment.ts";

export async function fetchCommentsForPost(
  postId: number | string,
): Promise<Comment[]> {
  const response = await axiosConfig.get<Comment[]>(`/comments/${postId}`);
  return response.data;
}

export async function handleAddComment(data: PostCommentRequest) {
  const response = await axiosConfig.post<Comment>(
    "/comments/add-comment-to-post",
    data,
  );
  return response.data;
}

export async function handleAddCommentReply(data: PostCommentReplyRequest) {
  const response = await axiosConfig.post<Comment>(
    "/comments/add-comment-reply",
    data,
  );
  return response.data;
}
