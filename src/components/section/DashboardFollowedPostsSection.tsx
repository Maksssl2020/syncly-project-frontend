import { useEffect } from "react";
import usePostsForDashboardByFollowedInfiniteQuery from "../../hooks/queries/usePostsForDashboardByFollowedInfiniteQuery.ts";
import { useInView } from "react-intersection-observer";
import DashboardPostCard from "../card/DashboardPostCard.tsx";
import Spinner from "../spinner/Spinner.tsx";

const DashboardFollowedPostsSection = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePostsForDashboardByFollowedInfiniteQuery();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages.map((page) =>
        page.map((post) => <DashboardPostCard key={post.id} post={post} />),
      )}{" "}
      <div ref={ref} className="h-8" />
      {isFetchingNextPage && <Spinner />}
    </>
  );
};

export default DashboardFollowedPostsSection;
