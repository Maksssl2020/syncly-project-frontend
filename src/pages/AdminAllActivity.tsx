import Page from "../animation/Page.tsx";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useEffect, useState } from "react";
import { Download, Filter } from "lucide-react";
import type { DropdownOption } from "../types/types.ts";
import { motion } from "framer-motion";
import Searchbar from "../components/input/Searchbar.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import type {
  ActivityActionType,
  ActivityStats,
  ActivityTargetType,
} from "../types/admin.ts";
import AdminActivityCardLarge from "../components/card/AdminActivityCardLarge.tsx";

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

interface ActivityFilters {
  search: string;
  type: string;
  user: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  severity: string;
}

const AdminAllActivity = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [activities, setActivities] = useState<ActivityStats[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityStats[]>(
    [],
  );
  // @ts-ignore
  const [sortBy, setSortBy] = useState<"timestamp" | "type" | "user">(
    "timestamp",
  );
  // @ts-ignore
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  // @ts-ignore
  const [filters, setFilters] = useState<ActivityFilters>({
    search: "",
    type: "",
    user: "",
    dateFrom: "",
    dateTo: "",
    status: "",
    severity: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const activityTypes: ActivityActionType[] = [
    "blocked",
    "created",
    "deleted",
    "resolved",
    "promoted",
    "rejected",
  ];
  const activityTargets: ActivityTargetType[] = [
    "tag",
    "comment",
    "report",
    "user",
  ];

  useEffect(() => {
    const mockActivities: ActivityStats[] = [
      {
        id: "1",
        action: "blocked",
        user: "admin",
        target: "spam_user123",
        timestamp: "2024-01-15T15:30:00Z",
        type: "user",
      },
      {
        id: "2",
        action: "resolved",
        user: "moderator1",
        target: "harassment report #45",
        timestamp: "2024-01-15T14:45:00Z",
        type: "report",
      },
      {
        id: "3",
        action: "created",
        user: "admin",
        target: "photography",
        timestamp: "2024-01-15T13:20:00Z",
        type: "tag",
      },
      {
        id: "4",
        action: "deleted",
        user: "moderator2",
        target: "inappropriate comment #89",
        timestamp: "2024-01-15T12:10:00Z",
        type: "comment",
      },
      {
        id: "5",
        action: "promoted",
        user: "admin",
        target: "helpful_user456",
        timestamp: "2024-01-15T11:05:00Z",
        type: "user",
      },
      {
        id: "6",
        action: "created",
        user: "admin",
        target: "Technology",
        timestamp: "2024-01-15T10:30:00Z",
        type: "comment",
      },
      // Add more mock data...
      ...Array.from({ length: 50 }, (_, i) => ({
        id: `mock-${i + 7}`,
        action: activityTypes[Math.floor(Math.random() * activityTypes.length)],
        user: ["admin", "moderator1", "moderator2", "system"][
          Math.floor(Math.random() * 4)
        ],
        target: `Target ${i + 7}`,
        timestamp: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        type: activityTargets[
          Math.floor(Math.random() * activityTargets.length)
        ],
      })),
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setFilteredActivities(mockActivities);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...activities];

    // Apply filters
    if (filters.search) {
      filtered = filtered.filter(
        (activity) =>
          activity.action
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          activity.user.toLowerCase().includes(filters.search.toLowerCase()) ||
          activity.target.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.type) {
      filtered = filtered.filter((activity) => activity.type === filters.type);
    }

    if (filters.user) {
      filtered = filtered.filter((activity) => activity.user === filters.user);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(
        (activity) =>
          new Date(activity.timestamp) >= new Date(filters.dateFrom),
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(
        (activity) => new Date(activity.timestamp) <= new Date(filters.dateTo),
      );
    }

    filtered.sort((a, b) => {
      // @ts-ignore
      let aValue: any = a[sortBy];
      // @ts-ignore
      let bValue: any = b[sortBy];

      if (sortBy === "timestamp") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredActivities(filtered);
    setCurrentPage(1);
  }, [activities, filters, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

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
              Export as CSV
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

      <motion.div
        animate={{
          opacity: showFilters ? 1 : 0,
          height: showFilters ? "auto" : 0,
        }}
        className={
          "w-full p-4 rounded-lg border-2 bg-black-200 border-gray-600"
        }
      >
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"}>
          <Searchbar onChange={() => {}} value={""} />
          <DropdownMenu options={[]} onChange={() => {}} value={""} />
          <DropdownMenu options={[]} onChange={() => {}} value={""} />
          <DropdownMenu options={[]} onChange={() => {}} value={""} />
        </div>
      </motion.div>

      <div className={"flex flex-col gap-3"}>
        {currentActivities.map((activity, index) => (
          <AdminActivityCardLarge index={index} activity={activity} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={"mt-8 flex items-center justify-between"}>
          <p className={"text-gray-400"}>
            Showing {startIndex + 1} -{" "}
            {Math.min(endIndex, filteredActivities.length)} of{" "}
            {filteredActivities.length} activities
          </p>
          <div className={"flex items-center gap-2"}>
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
              Page {currentPage} of {totalPages}
            </span>
            <AnimatedButton
              bgColor={"#222222"}
              borderColorHover={"#14b8a6"}
              disabled={currentPage === totalPages}
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
