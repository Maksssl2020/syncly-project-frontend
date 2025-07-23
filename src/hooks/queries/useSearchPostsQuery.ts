import { useQuery } from "@tanstack/react-query";
import { fetchPostsByQuery } from "../../api/post.ts";

function useSearchPostsQuery(query: string) {
  const { data: searchedPosts, isLoading: searchingPosts } = useQuery({
    queryKey: ["searchedPosts", query],
    queryFn: () => {
      if (query !== "") {
        return fetchPostsByQuery(query);
      }
    },
    enabled: query !== "",
  });

  return { searchedPosts, searchingPosts };
}

export default useSearchPostsQuery;
