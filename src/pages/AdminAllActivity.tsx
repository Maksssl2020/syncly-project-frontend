import Page from "../animation/Page.tsx";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useState } from "react";
import { Download, Filter, SortDesc } from "lucide-react";
import type { DropdownOption } from "../types/types.ts";
import { AnimatePresence, motion } from "framer-motion";
import Searchbar from "../components/input/Searchbar.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import type { ActivityActionType, ActivityTargetType } from "../types/admin.ts";
import AdminActivityCardLarge from "../components/card/AdminActivityCardLarge.tsx";
import useAdminActivityDataQuery from "../hooks/queries/useAdminActivityDataQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import Pagination from "../components/pagination/Pagination.tsx";
import useSearch from "../hooks/useSearch.ts";
import { CSVLink } from "react-csv";
import { mapActivityToCsv } from "../utils/xlsxUtils.ts";
import { activityCsvColumns } from "../utils/csvData.ts";

// @ts-ignore
const exportDropdownOptions: DropdownOption[] = [
  {
    label: "Export as CSV",
    value: "exportCsv",
  },
  {
    label: "Export as JSON",
    value: "exportJson",
  },
];

const activityTypes: DropdownOption[] = [
  { value: "ALL", label: "All" },
  { value: "BLOCKED", label: "Blocked" },
  { value: "CREATED", label: "Created" },
  { value: "DELETED", label: "Deleted" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "PROMOTED", label: "Promoted" },
  { value: "REJECTED", label: "Rejected" },
  { value: "UPDATED", label: "Updated" },
];

const activityTargets: DropdownOption[] = [
  { value: "ALL", label: "All" },
  { value: "TAG", label: "Tag" },
  { value: "COMMENT", label: "Comment" },
  { value: "REPORT", label: "Report" },
  { value: "USER", label: "User" },
  { value: "TAG_CATEGORY", label: "Tag Category" },
];

const sortOptions: DropdownOption[] = [
  { value: "RECENT", label: "Recent" },
  { value: "OLDEST", label: "Oldest" },
];

const AdminAllActivity = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(20);
  const [activityActionType, setActivityActionType] = useState<
    ActivityActionType | undefined
  >(undefined);
  const [activityTargetType, setActivityTargetType] = useState<
    ActivityTargetType | undefined
  >(undefined);
  const [sortBy, setSortBy] = useState<"RECENT" | "OLDEST">("RECENT");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryValue, setSearchQueryValue] = useState<string>("");

  const { adminActivityData, fetchingAdminActivityData } =
    useAdminActivityDataQuery(
      0,
      itemsPerPage,
      sortBy,
      activityActionType,
      activityTargetType,
      searchQuery,
    );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useSearch({
    inputValue: searchQueryValue,
    setSearch: setSearchQuery,
    saveSearchEnabled: false,
  });

  if (fetchingAdminActivityData || !adminActivityData) {
    return <Spinner />;
  }

  return (
    <Page className={"min-h-screen p-6 flex flex-col gap-8 w-full"}>
      <AdminManagementPanelHeader title={"All Activity"} content={""} />
      <div className={"flex items-center gap-3 justify-end"}>
        <AnimatedButton
          onClick={() => setShowFilters(!showFilters)}
          bgColor={showFilters ? "#14b8a6" : "#222222"}
          textColor={showFilters ? "#222222" : "#e6e6e6"}
          borderColor={"#222222"}
          className={"flex gap-2 px-8 py-3 rounded-lg items-center text-xl"}
        >
          <Filter className={"size-5"} /> Filters
        </AnimatedButton>
        <div className={"relative"}>
          <AnimatedButton
            onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
            bgColor={"#222222"}
            textColor={"#e6e6e6"}
            borderColor={"#222222"}
            className={"flex gap-2 px-8 py-3 rounded-lg items-center text-xl"}
          >
            <Download className={"size-5"} />
            Export
          </AnimatedButton>

          <motion.div
            animate={{
              opacity: isExportDropdownOpen ? 1 : 0,
              height: isExportDropdownOpen ? 115 : 0,
            }}
            className={
              "py-2 bg-black-200 flex flex-col gap-2 border-gray-600 absolute right-0 mt-4 w-48 rounded-lg border-2 z-10"
            }
          >
            <motion.button
              whileHover={{
                color: "#14b8a6",
                backgroundColor: "#393939",
              }}
              className={"w-full h-[50px] text-white-100  cursor-pointer"}
            >
              <CSVLink
                data={mapActivityToCsv(adminActivityData.content)}
                headers={activityCsvColumns}
              >
                Export as CSV
              </CSVLink>
            </motion.button>
            <motion.button
              whileHover={{
                color: "#14b8a6",
                backgroundColor: "#393939",
              }}
              className={"w-full h-[50px] text-white-100  cursor-pointer"}
            >
              Export as JSON
            </motion.button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full overflow-hidden rounded-lg border-2 bg-black-200 border-gray-600"
          >
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Searchbar
                  value={searchQueryValue}
                  onChange={(value) => setSearchQueryValue(value)}
                />

                <DropdownMenu
                  options={activityTypes}
                  onChange={(value) => {
                    setActivityActionType(
                      value === "ALL"
                        ? undefined
                        : (value as ActivityActionType),
                    );
                  }}
                  value={activityActionType ?? "ALL"}
                />

                <DropdownMenu
                  options={activityTargets}
                  onChange={(value) => {
                    setActivityTargetType(
                      value === "ALL"
                        ? undefined
                        : (value as ActivityTargetType),
                    );
                  }}
                  value={activityTargetType ?? "ALL"}
                />

                <div className="flex items-center gap-2">
                  <SortDesc className="size-5 text-gray-400" />
                  <div className="w-full">
                    <DropdownMenu
                      options={sortOptions}
                      onChange={(value) =>
                        setSortBy(value as "RECENT" | "OLDEST")
                      }
                      value={sortBy}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={"flex flex-col gap-3"}>
        {adminActivityData.content.map((activity, index) => (
          <AdminActivityCardLarge index={index} activity={activity} />
        ))}
      </div>

      {adminActivityData.totalPages > 1 && (
        <div className={"mt-8 flex items-center justify-between"}>
          <p className={"text-gray-400"}>
            Showing {startIndex + 1} -{" "}
            {Math.min(endIndex, adminActivityData.size)} of{" "}
            {adminActivityData.totalElements} activities
          </p>
          <div className={"flex items-center gap-2"}>
            <Pagination
              totalPages={adminActivityData.totalPages}
              totalItems={adminActivityData.totalElements}
              currentPageValue={currentPage}
              currentPageDisplay={currentPage}
              perPage={itemsPerPage}
              onPageChange={() => {}}
            />
            <AnimatedButton
              bgColor={"#222222"}
              borderColorHover={"#14b8a6"}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={"px-4 py-2 rounded-lg disabled:opacity-65"}
            >
              Previous
            </AnimatedButton>
            <span className={"text-white-100"}>
              Page {currentPage} of {adminActivityData.totalPages}
            </span>
            <AnimatedButton
              bgColor={"#222222"}
              borderColorHover={"#14b8a6"}
              disabled={currentPage === adminActivityData.totalPages}
              onClick={() => setCurrentPage(Math.max(1, currentPage + 1))}
              className={"px-4 py-2 rounded-lg disabled:opacity-65"}
            >
              Next
            </AnimatedButton>
          </div>
        </div>
      )}
    </Page>
  );
};

export default AdminAllActivity;
