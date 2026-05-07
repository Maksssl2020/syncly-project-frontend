import Page from "../animation/Page";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import {Flag, Hash, MessageSquare, Plus, TrendingUp, Users,} from "lucide-react";
import PageStatsCard from "../components/card/PageStatsCard.tsx";
import type {PageStats} from "../types/admin.ts";
import {useState} from "react";
import Searchbar from "../components/input/Searchbar.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import type {DropdownOption} from "../types/types.ts";
import {AnimatePresence} from "framer-motion";
import MainTagAdminCard from "../components/card/MainTagAdminCard.tsx";
import {useNavigate} from "react-router-dom";
import useAllTagsQuery from "../hooks/queries/useAllTagsQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import useChangeTagCategoryMutation from "../hooks/mutations/useChangeTagCategoryMutation.ts";
import ChangeTagCategoryModal from "../components/modal/ChangeTagCategoryModal.tsx";
import type {AdminTag} from "../types/tags.ts";
import useChangeTagStateMutation from "../hooks/mutations/useChangeTagStateMutation.ts";
import useSearch from "../hooks/useSearch.ts";
import useTagsAdminStatsQuery from "../hooks/queries/useTagsAdminStatsQuery.ts";
import useTagCategoriesNamesQuery from "../hooks/queries/useTagCategoriesNamesQuery.ts";
import Pagination from "../components/pagination/Pagination.tsx";

const AdminTags = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);
  const [selectedTag, setSelectedTag] = useState<AdminTag | undefined>(
    undefined,
  );
  const [isChangeCategoryModalOpen, setIsChangeCategoryModalOpen] =
    useState(false);
  const { changeTagCategory, changingTagCategory } =
    useChangeTagCategoryMutation();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useSearch({
    inputValue: inputValue,
    setSearch: setSearchTerm,
    saveSearchEnabled: false,
  });

  const { allTagsData, fetchingAllTagsData } = useAllTagsQuery(
    currentPage,
    20,
    "RECENT",
    selectedCategory,
    showTrendingOnly,
    searchTerm,
  );
  const { tagsAdminStatsData, fetchingTagsAdminStats } =
    useTagsAdminStatsQuery();
  const { changeTagState, changingTagState } = useChangeTagStateMutation();
  const { tagCategoriesNamesData, fetchingTagCategoriesNamesData } =
    useTagCategoriesNamesQuery();

  const tagsStats: PageStats[] = [
    {
      title: "Total Tags",
      icon: <Hash className={"size-6"} />,
      color: "#14b8a6",
      change: "",
      value: tagsAdminStatsData?.totalTags ?? 0,
    },
    {
      title: "Trending",
      icon: <TrendingUp className={"size-6"} />,
      color: "#22d3ee",
      change: "",
      value: tagsAdminStatsData?.totalTrendingTags ?? 0,
    },
    {
      title: "Total Posts",
      icon: <MessageSquare className={"size-6"} />,
      color: "#0d9488",
      change: "",
      value: tagsAdminStatsData?.totalPosts ?? 0,
    },
    {
      title: "Total Followers",
      icon: <Users className={"size-6"} />,
      color: "#06b6d4",
      change: "",
      value: tagsAdminStatsData?.totalFollowers ?? 0,
    },
  ];

  if (
    fetchingAllTagsData ||
    !allTagsData ||
    fetchingTagsAdminStats ||
    fetchingTagCategoriesNamesData
  ) {
    return <Spinner />;
  }

  const mappedCategoriesNames = (tagCategoriesNamesData ?? []).map(
    (category) => ({
      value: category,
      label: category,
    }),
  );

  console.log(mappedCategoriesNames);
  console.log(tagCategoriesNamesData);

  const filters: DropdownOption[] = [
    { label: "All", value: "All" },
    ...mappedCategoriesNames,
  ];

  return (
    <Page className={"min-h-screen p-6 flex flex-col gap-8 w-full"}>
      <AdminManagementPanelHeader
        title={"Tag Management"}
        content={
          <AnimatedButton
            bgColor={"#222222"}
            borderColor={"#222222"}
            textColor={"#14b8a6"}
            borderColorHover={"#14b8a6"}
            textColorHover={"#111111"}
            onClick={() => navigate("/admin/panel/tags/create")}
            className={"flex gap-2 items-center text-lg px-4 py-2 rounded-lg"}
          >
            <Plus className={"size-6"} />
            Create Tag
          </AnimatedButton>
        }
      />

      <div className={"p-6 flex flex-col gap-6"}>
        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4"}>
          {tagsStats.map((data, index) => (
            <PageStatsCard data={data} index={index} />
          ))}
        </div>

        <div className={"rounded-lg p-4 border-2 bg-black-200 border-gray-600"}>
          <div className="flex flex-col md:flex-row gap-4">
            <Searchbar
              onChange={(value) => setInputValue(value)}
              value={inputValue}
              placeholder={"Search tags..."}
            />
            <DropdownMenu
              className={"h-[50px]"}
              placeholderChildren={
                <div className={"flex gap-2 h-full items-center"}>
                  <Flag className={"size-4"} />
                  <span>Category:</span>
                </div>
              }
              options={filters}
              onChange={(value) => {
                if (value === "All") {
                  setSelectedCategory(undefined);
                } else {
                  setSelectedCategory(value);
                }
              }}
              value={selectedCategory || "All"}
            />

            <AnimatedButton
              borderColor={showTrendingOnly ? "#14b8a6" : "#4d4d4d"}
              borderColorHover={showTrendingOnly ? "#14b8a6" : "#4d4d4d"}
              bgColor={showTrendingOnly ? "#14b8a6" : "#222222"}
              bgColorHover={showTrendingOnly ? "#14b8a6" : "#222222"}
              textColor={showTrendingOnly ? "#111111" : "#e6e6e6"}
              textColorHover={showTrendingOnly ? "#111111" : "#14b8a6"}
              onClick={() => setShowTrendingOnly(!showTrendingOnly)}
              className={
                "w-auto flex gap-2 px-4 py-2 rounded-lg items-center md:min-w-[175px]"
              }
            >
              <TrendingUp className={"size-4"} />
              Trending Only
            </AnimatedButton>
          </div>
        </div>

        <div className={"flex flex-col gap-4"}>
          <AnimatePresence>
            {allTagsData.content.map((tag, index) => (
              <MainTagAdminCard
                tag={tag}
                index={index}
                onChangeCategory={(data) => {
                  setSelectedTag(data);
                  setIsChangeCategoryModalOpen(true);
                }}
                onChangeTagState={(tagId) => changeTagState(tagId)}
                isChangingCategory={
                  changingTagCategory && selectedTag?.id === tag.id
                }
                isChangingState={changingTagState}
              />
            ))}
          </AnimatePresence>

          {allTagsData.totalElements === 0 && (
            <div className="text-center py-12">
              <Hash className="size-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2 text-white-100">
                No tags found
              </h3>
              <p className={"text-gray-400"}>
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        <div className={"w-full flex justify-center"}>
          <Pagination
            totalPages={allTagsData.totalPages}
            totalItems={allTagsData.totalElements}
            currentPageValue={currentPage}
            currentPageDisplay={currentPage + 1}
            perPage={allTagsData.size}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      </div>

      <ChangeTagCategoryModal
        isOpen={isChangeCategoryModalOpen}
        onClose={() => setIsChangeCategoryModalOpen(false)}
        selectedTag={selectedTag}
        onChangeCategory={(tagId, categoryId) => {
          changeTagCategory({ tagId: tagId, categoryId: categoryId });
          setSelectedTag(undefined);
        }}
      />
    </Page>
  );
};

export default AdminTags;
