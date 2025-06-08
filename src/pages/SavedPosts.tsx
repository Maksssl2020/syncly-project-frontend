import Page from "../animation/Page";
import SavedPostsSidebar from "../components/sidebar/SavedPostsSidebar.tsx";
import { useState } from "react";
import { savedPostCategories } from "../data/savedPosts.ts";
import { Grid3X3, List, SortDesc } from "lucide-react";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import type { DropdownOption, ToggleOption } from "../types/types.ts";
import ViewToggle from "../components/toggle/ViewToggle.tsx";
import { motion } from "framer-motion";
import DashboardPostCard from "../components/card/DashboardPostCard.tsx";
import DashboardPostGridCard from "../components/card/DashboardPostGridCard.tsx";
import PageHeaderContainer from "../components/header/PageHeaderContainer.tsx";

const sortOptions: DropdownOption[] = [
  {
    value: "recent",
    label: "Recently Saved",
  },
  {
    value: "oldest",
    label: "Oldest Saved",
  },
  {
    value: "popular",
    label: "Most Popular",
  },
];

type SortOption = "recent" | "oldest" | "popular";

const viewOptions: ToggleOption[] = [
  { value: "list", icon: <List className="size-5" /> },
  { value: "grid", icon: <Grid3X3 className="size-5" /> },
];

type ViewMode = "list" | "grid";

const SavedPosts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [chosenSortOption, setChosenSortOption] =
    useState<SortOption>("recent");

  return (
    <Page className={"w-full mt-8 flex flex-col items-center"}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className={"grid grid-cols-1 lg:grid-cols-4 gap-8"}>
          <SavedPostsSidebar
            selectedCategoryId={selectedCategory}
            onChange={setSelectedCategory}
          />

          <div className={"lg:col-span-3 space-y-6"}>
            <PageHeaderContainer>
              <div className={"flex items-center gap-4"}>
                <h2 className={"text-xl font-semibold text-white-100"}>
                  {
                    savedPostCategories.find(
                      (category) => category.id === selectedCategory,
                    )?.name
                  }
                  <span className={"text-gray-400 ml-2"}>
                    {
                      savedPostCategories.find(
                        (category) => category.id === selectedCategory,
                      )?.count
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
                <ViewToggle
                  options={viewOptions}
                  value={viewMode}
                  onChange={(value) => setViewMode(value as ViewMode)}
                />
              </div>
            </PageHeaderContainer>
            <motion.div
              layout
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                  : "space-y-6"
              }
            >
              {viewMode === "list" ? (
                <>
                  <DashboardPostCard isSavedPost={true} />
                  <DashboardPostCard isSavedPost={true} />
                </>
              ) : (
                <>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <motion.div
                      layout
                      whileHover={{ y: -5 }}
                      key={item}
                      className="rounded-lg  bg-black-200 border-gray-600 overflow-hidden group cursor-pointer border-2"
                    >
                      <DashboardPostGridCard isSavedPost={true} />
                    </motion.div>
                  ))}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SavedPosts;
