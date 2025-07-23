import { useQuery } from "@tanstack/react-query";
import { fetchCommentsForPost } from "../../api/comment.ts";

function usePostCommentsQuery(postId: string | number) {
  const { data: postComments, isLoading: fetchingPostComments } = useQuery({
    queryKey: ["postComments", postId],
    queryFn: () => fetchCommentsForPost(postId),
  });

  return { postComments, fetchingPostComments };
}

export default usePostCommentsQuery;
