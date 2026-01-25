import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsByTagInfinity } from "../../api/post.ts";

function usePostsByTagInfiniteQuery(tag?: string) {
  return useInfiniteQuery({
    queryKey: ["postsByTagData", tag],
    queryFn: ({ pageParam = 0 }) => {
      if (!tag) return Promise.resolve([]);
      return fetchPostsByTagInfinity(tag, pageParam, 10);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 10 ? undefined : allPages.length;
    },
    initialPageParam: 0,
    enabled: !!tag,
    staleTime: 1000 * 60 * 5,
  });
}

export default usePostsByTagInfiniteQuery;
