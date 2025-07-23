import Page from "../animation/Page.tsx";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { BarChart3, Folder, Hash, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PageStats } from "../types/admin.ts";
import PageStatsCard from "../components/card/PageStatsCard.tsx";
import Searchbar from "../components/input/Searchbar.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import type { DropdownOption } from "../types/types.ts";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AdminTagCategoryCard from "../components/card/AdminTagCategoryCard.tsx";
import { getRandomTagColor } from "../utils/colorUtils.ts";
import useTagCategoriesQuery from "../hooks/queries/useTagCategoriesQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";

const dropdownSortingOptions: DropdownOption[] = [
  {
    label: "Sort by Name",
    value: "name",
  },
  {
    label: "Sort by Tag Count",
    value: "tagCount",
  },
  {
    label: "Sort by Recent",
    value: "recent",
  },
];

const AdminCategories = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");

  const { tagCategories, fetchingTagCategories } = useTagCategoriesQuery();

  if (!tagCategories || fetchingTagCategories) {
    return <Spinner />;
  }

  const totalTagsCount = tagCategories.reduce(
    (sum, cat) => sum + cat.tagCount,
    0,
  );
  const avgTagsPerCategory = Math.round(totalTagsCount / tagCategories.length);

  const categoriesStats: PageStats[] = [
    {
      title: "Total Categories",
      value: tagCategories.length,
      change: "",
      icon: <Folder className={"size-6 "} />,
      color: "#14b8a6",
    },
    {
      title: "Total Tags",
      value: totalTagsCount,
      change: "",
      icon: <Hash className={"size-6 "} />,
      color: "#22d3ee",
    },
    {
      title: "Avg Tags / Category",
      value: avgTagsPerCategory,
      change: "",
      icon: <BarChart3 className={"size-6 "} />,
      color: "#0d9488",
    },
    {
      title: "Avg Tags / Category",
      value: 5,
      change: "",
      icon: <BarChart3 className={"size-6 "} />,
      color: "#06b6d4",
    },
  ];

  const filteredCategories = tagCategories
    .filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "tagCount":
          return b.tagCount - a.tagCount;
        case "recent":
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

  const totalTags = tagCategories.reduce((sum, cat) => sum + cat.tagCount, 0);

  return (
    <Page className={"min-h-screen p-6 flex flex-col gap-8 w-full"}>
      <AdminManagementPanelHeader
        title={"Category Management"}
        content={
          <AnimatedButton
            bgColor={"#222222"}
            borderColor={"#222222"}
            textColor={"#14b8a6"}
            borderColorHover={"#14b8a6"}
            textColorHover={"#111111"}
            onClick={() => navigate("/admin/panel/categories/create")}
            className={"flex gap-2 items-center text-lg px-4 py-2 rounded-lg"}
          >
            <Plus className={"size-6"} />
            Create Category
          </AnimatedButton>
        }
      />

      <div className={"p-6 flex flex-col gap-6"}>
        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4"}>
          {categoriesStats.map((data, index) => (
            <PageStatsCard data={data} index={index} />
          ))}
        </div>

        <div
          className={
            "rounded-lg p-4 border-2 flex flex-col md:flex-row gap-4 bg-black-200 border-gray-600"
          }
        >
          <Searchbar
            onChange={(value) => setSearchTerm(value)}
            value={searchTerm}
            placeholder={"Search categories..."}
          />

          <div className={"md:w-[250px] flex"}>
            <DropdownMenu
              options={dropdownSortingOptions}
              onChange={(value) => setSortBy(value)}
              value={sortBy}
            />
          </div>
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
          <AnimatePresence>
            {filteredCategories.map((category, index) => (
              <AdminTagCategoryCard category={category} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredCategories.length === 0 && (
          <div className={"text-center py-12"}>
            <Folder className={"size-16 mx-auto mb-4 text-gray-400"} />
            <h3 className={"text-xl font-semibold mb-2 text-white-100"}>
              No categories found
            </h3>
            <p className={"text-gray-400"}>
              Try adjusting your search or create a new category
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={
            "rounded-lg border-2 p-6 bg-black-200 border-gray-600 flex flex-col gap-4"
          }
        >
          <h3 className={"text-lg font-bold text-white-100"}>
            Category Distribution
          </h3>
          <div className={"space-y-3"}>
            {tagCategories
              .sort((a, b) => b.tagCount - a.tagCount)
              .map((category) => {
                const precentage = (category.tagCount / totalTags) * 100;

                return (
                  <div key={category.id} className={"flex items-center gap-3"}>
                    <div
                      className={"size-4 rounded-full"}
                      style={{
                        backgroundColor: getRandomTagColor(),
                      }}
                    />
                    <div className={"flex-1"}>
                      <div className={"flex justify-between items-center mb-1"}>
                        <span className={"text-sm font-medium text-white-100"}>
                          {category.name}
                        </span>
                        <span className={"text-sm text-gray-400"}>
                          {category.tagCount} ({precentage.toFixed(2)}%)
                        </span>
                      </div>
                      <div className={"h-2 rounded-full bg-black-300"}>
                        <div
                          className={"h-full rounded-full"}
                          style={{
                            backgroundColor: getRandomTagColor(),
                            width: `${precentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>
    </Page>
  );
};

export default AdminCategories;
