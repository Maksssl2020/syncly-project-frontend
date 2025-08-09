import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import usePostsForUserDashboardInfiniteQuery from "../../hooks/queries/usePostsForUserDashboardInfiniteQuery.ts";
import DashboardPostCard from "../card/DashboardPostCard.tsx";
import Spinner from "../spinner/Spinner.tsx";

const DashboardForYouPostsSection = () => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostsForUserDashboardInfiniteQuery();

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

export default DashboardForYouPostsSection;
