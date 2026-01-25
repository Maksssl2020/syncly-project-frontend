import Page from "../animation/Page";
import SavedPostsSidebar from "../components/sidebar/SavedPostsSidebar.tsx";
import { useState } from "react";
import { SortDesc } from "lucide-react";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import type { DropdownOption } from "../types/types.ts";
import { motion } from "framer-motion";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import PageHeaderContainer from "../components/header/PageHeaderContainer.tsx";
import Spinner from "../components/spinner/Spinner.tsx";
import useUserPostCollectionsQuery from "../hooks/queries/useUserPostCollectionsQuery.ts";

const sortOptions: DropdownOption[] = [
  {
    value: "recent",
    label: "Recently Saved",
  },
  {
    value: "oldest",
    label: "Oldest Saved",
  },
];

type SortOption = "recent" | "oldest";

const SavedPosts = () => {
  const [selectedQuickActionOption, setSelectedQuickActionOptions] = useState<
    "MOST_LIKED" | "MOST_COMMENTED" | ""
  >("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [chosenSortOption, setChosenSortOption] =
    useState<SortOption>("recent");

  const { userPostCollections, fetchingUserPostCollections } =
    useUserPostCollectionsQuery();

  if (!userPostCollections || fetchingUserPostCollections) {
    return <Spinner />;
  }

  const selectedCollection = userPostCollections.find(
    (postCollection) => postCollection.title.toLowerCase() === selectedCategory,
  );

  console.log("selectedCollection", selectedCollection?.posts);

  const sortedPosts = [...(selectedCollection?.posts || [])].sort((a, b) => {
    if (selectedQuickActionOption === "MOST_LIKED") {
      return b.likesCount - a.likesCount;
    }
    if (selectedQuickActionOption === "MOST_COMMENTED") {
      return b.commentsCount - a.commentsCount;
    }
    if (chosenSortOption === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (chosenSortOption === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className={"grid grid-cols-1 lg:grid-cols-4 gap-8"}>
          <SavedPostsSidebar
            userPostCollections={userPostCollections}
            selectedCategoryId={selectedCategory}
            onChange={setSelectedCategory}
            onMostCommentedClick={() => {
              if (selectedQuickActionOption === "MOST_COMMENTED") {
                setSelectedQuickActionOptions("");
              } else {
                setSelectedQuickActionOptions("MOST_COMMENTED");
              }
            }}
            onMostLikedClick={() => {
              if (selectedQuickActionOption === "MOST_LIKED") {
                setSelectedQuickActionOptions("");
              } else {
                setSelectedQuickActionOptions("MOST_LIKED");
              }
            }}
            onClearAllClick={() => {}}
            selectedQuickAction={selectedQuickActionOption}
          />

          <div className={"lg:col-span-3 space-y-6"}>
            <PageHeaderContainer>
              <div className={"flex items-center gap-4"}>
                <h2 className={"text-xl font-semibold text-white-100"}>
                  {
                    userPostCollections.find(
                      (postCollection) =>
                        postCollection.title.toLowerCase() === selectedCategory,
                    )?.title
                  }
                  <span className={"text-gray-400 ml-2"}>
                    {
                      userPostCollections.find(
                        (postCollection) =>
                          postCollection.title.toLowerCase() ===
                          selectedCategory,
                      )?.posts.length
                    }
                  </span>
                </h2>
              </div>

              <div className={"flex items-center gap-4"}>
                <div className={"flex items-center gap-2 "}>
                  <SortDesc className={"size-4 text-gray-400"} />
                  <div className={"w-[175px]"}>
                    <DropdownMenu
                      options={sortOptions}
                      onChange={(value) =>
                        setChosenSortOption(value as SortOption)
                      }
                      value={chosenSortOption}
                    />
                  </div>
                </div>
              </div>
            </PageHeaderContainer>
            <motion.div layout className={"space-y-6"}>
              {sortedPosts.map((post) => (
                <DashboardPostCard
                  key={post.id}
                  post={post}
                  isSavedPost={true}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SavedPosts;
