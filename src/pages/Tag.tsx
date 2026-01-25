import Page from "../animation/Page";
import { Link, useParams } from "react-router-dom";
import { Flame, SortDesc } from "lucide-react";
import Badge from "../components/badge/Badge.tsx";
import PageHeaderContainer from "../components/header/PageHeaderContainer.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import type { DropdownOption } from "../types/types.ts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import { getRandomTagColor } from "../utils/colorUtils.ts";
import usePostsByTagInfiniteQuery from "../hooks/queries/usePostsByTagInfiniteQuery.ts";
import { useInView } from "react-intersection-observer";
import useTagByTagNameQuery from "../hooks/queries/useTagByTagNameQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import useRelatedTagsByCategoryQuery from "../hooks/queries/useRelatedTagsByCategoryQuery.ts";

const options: DropdownOption[] = [
  {
    value: "recent",
    label: "Recent",
  },
  {
    value: "oldest",
    label: "Oldest",
  },
];

const trendingColor = getRandomTagColor();

export const Tag = () => {
  const { tag } = useParams();
  const { ref, inView } = useInView();
  const [selectedOption, setSelectedOption] = useState<string>("recent");

  const { tagDataByTagName, fetchingTagDataByTagName } =
    useTagByTagNameQuery(tag);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostsByTagInfiniteQuery(tag);
  const { relatedTagsByCategory, fetchingRelatedTagsByCategory } =
    useRelatedTagsByCategoryQuery(tagDataByTagName?.tagCategory);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (
    fetchingTagDataByTagName ||
    fetchingRelatedTagsByCategory ||
    !relatedTagsByCategory ||
    !tagDataByTagName
  ) {
    return <Spinner />;
  }

  const filteredRelatedTags = relatedTagsByCategory.filter(
    (tagDetails) => tagDetails.name !== tag,
  );

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className="w-full max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
        <div
          className={"rounded-lg p-8  border-2 bg-black-200 border-gray-600"}
        >
          <div className={"grid grid-cols-1 lg:grid-cols-3 gap-8"}>
            <div className={"lg:col-span-2"}>
              <div className={"flex items-center gap-3 mb-4"}>
                <h2 className={"text-3xl font-bold text-white-100"}>
                  #{tagDataByTagName?.name}
                </h2>
                {tagDataByTagName?.trending && (
                  <Badge bgColor={trendingColor}>
                    <Flame className="size-4 text-black-400" />
                    <span className="text-sm font-medium text-black-400">
                      Trending
                    </span>
                  </Badge>
                )}
              </div>
              <p className={"text-lg mb-6 text-white-100"}>
                {tagDataByTagName?.description}
              </p>
              <div className={"flex flex-wrap gap-2 items-center"}>
                <span className={"text-sm text-gray-400"}>Related tags:</span>
                {filteredRelatedTags.map((tag) => (
                  <Link key={tag.name + tag.id} to={`/tags/${tag.name}`}>
                    <span
                      className={
                        "text-sm px-2 py-1 bg-gray-600 text-white-100 rounded-full hover:opacity-80 transition-opacity cursor-pointer "
                      }
                    >
                      #{tag.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className={"grid grid-cols-2 gap-2"}>
              <div className={"text-center"}>
                <div className={"text-2xl font-bold text-white-100"}>
                  {tagDataByTagName?.postsCount}
                </div>
                <div className={"text-gray-400"}>Posts</div>
              </div>
              <div className={"text-center"}>
                <div className={"text-2xl font-bold text-white-100"}>
                  {tagDataByTagName?.followersCount}
                </div>
                <div className={"text-gray-400"}>Followers</div>
              </div>
              <div className={"text-center"}>
                <div className={"text-2xl font-bold text-cyan-100"}>#3</div>
                <div className={"text-gray-400"}>Trending</div>
              </div>
              <div className={"text-center"}>
                <div className={"text-2xl font-bold text-teal-100"}>223</div>
                <div className={"text-gray-400"}>New Posts This Week</div>
              </div>
            </div>
          </div>
        </div>

        <PageHeaderContainer>
          <div className={"flex items-center gap-4"}>
            <h3 className={"text-xl font-semibold text-white-100"}>
              Posts with #{tagDataByTagName?.name}
            </h3>
            <span className={"text-xl text-gray-400"}>
              {tagDataByTagName?.postsCount} posts
            </span>
          </div>
          <div className={"flex items-center gap-3"}>
            <div className={"flex items-center gap-2"}>
              <SortDesc className={"size-5 text-gray-400"} />
              <div className={"w-[150px]"}>
                <DropdownMenu
                  options={options}
                  onChange={(value) => setSelectedOption(value)}
                  value={selectedOption}
                />
              </div>
            </div>
          </div>
        </PageHeaderContainer>

        <motion.div layout className={"space-y-6"}>
          {data?.pages.map((page) =>
            page.map((post) => <DashboardPostCard key={post.id} post={post} />),
          )}
        </motion.div>
        <div ref={ref} className="h-8" />
        {isFetchingNextPage && <Spinner />}
      </div>
    </Page>
  );
};
