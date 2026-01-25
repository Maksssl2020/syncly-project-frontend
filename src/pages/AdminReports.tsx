import { AlertCircle, Flag } from "lucide-react";
import Page from "../animation/Page";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import type { ReportStatus, ReportType, ReportUnion } from "../types/report.ts";
import Searchbar from "../components/input/Searchbar.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useEffect, useState } from "react";
import type { DropdownOption } from "../types/types.ts";
import ReportCardList from "../components/card/ReportCardList.tsx";
import ReportDetailsModal from "../components/modal/ReportDetailsModal.tsx";
import useReportsQuery from "../hooks/queries/useReportsQuery.ts";
import useResolveReportMutation from "../hooks/mutations/useResolveReportMutation.ts";

const typeFilterOptions: DropdownOption[] = [
  {
    label: "ALL",
    value: "ALL",
  },
  {
    label: "POST",
    value: "POST",
  },
  {
    label: "USER",
    value: "USER",
  },
  {
    label: "COMMENT",
    value: "COMMENT",
  },
];

const statusFilterOptions: DropdownOption[] = [
  {
    label: "ALL",
    value: "ALL",
  },
  {
    label: "PENDING",
    value: "PENDING",
  },
  {
    label: "RESOLVED",
    value: "RESOLVED",
  },
  {
    label: "REJECTED",
    value: "REJECTED",
  },
];

const AdminReports = () => {
  const [reports, setReports] = useState<ReportUnion[]>([]);
  const [activeTab, setActiveTab] = useState<ReportType | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<ReportUnion | null>(
    null,
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { reportsData, fetchingReportsData } = useReportsQuery();
  const { resolveReport, resolvingReport } = useResolveReportMutation(() => {
    if (isDetailModalOpen) {
      setIsDetailModalOpen(false);
    }
  });

  useEffect(() => {
    if (!fetchingReportsData && reportsData) {
      setReports(reportsData);
    }
  }, [fetchingReportsData, reportsData]);

  const filteredReports = reports.filter((report) => {
    const matchesTab = activeTab === "ALL" || report.reportType === activeTab;
    const matchesStatus =
      statusFilter === "ALL" || report.reportStatus === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedBy.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesStatus && matchesSearch;
  });

  return (
    <Page className={"min-h-screen p-6 flex flex-col gap-8 w-full"}>
      <AdminManagementPanelHeader
        title={"Reports Management"}
        content={` Reports`}
      />
      <div
        className={
          "p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-black-200 border-gray-600 border-2 rounded-lg"
        }
      >
        <Searchbar
          onChange={(value) => setSearchQuery(value)}
          value={searchQuery}
          placeholder={""}
        />
        <DropdownMenu
          className={"h-[50px]"}
          placeholderChildren={
            <div className={"flex gap-2 h-full items-center"}>
              <Flag className={"size-4"} />
              <span>Type:</span>
            </div>
          }
          options={typeFilterOptions}
          onChange={(value) => setActiveTab(value as ReportType)}
          value={activeTab}
        />
        <DropdownMenu
          className={"h-[50px]"}
          placeholderChildren={
            <div className={"flex gap-2 h-full items-center"}>
              <AlertCircle className={"size-4"} />
              <span>Status:</span>
            </div>
          }
          options={statusFilterOptions}
          onChange={(value) => setStatusFilter(value as ReportStatus)}
          value={statusFilter}
        />
        <AnimatedButton
          bgColor={"#171719"}
          borderColor={"#4a4a4d"}
          borderColorHover={"#14b8a6"}
          onClick={() => {
            setActiveTab("ALL");
            setStatusFilter("ALL");
            setSearchQuery("");
          }}
          className={
            "rounded-lg h-[50px] px-4 w-auto py-2 uppercase lg:min-w-[200px]"
          }
        >
          Clear Filters
        </AnimatedButton>
      </div>
      <div className={"grid grid-cols-1 gap-4"}>
        {filteredReports.map((report) => (
          <ReportCardList
            report={report}
            onSelectReport={(report) => {
              setSelectedReport(report);
              setIsDetailModalOpen(true);
            }}
            isResolving={resolvingReport}
            onResolveReport={(data) => resolveReport(data)}
          />
        ))}

        {filteredReports.length === 0 && (
          <div className="rounded-lg border-2 p-8 text-center bg-black-200 border-gray-600">
            <p className={"text-gray-400"}>
              No reports found matching your filters.
            </p>
          </div>
        )}
      </div>
      <ReportDetailsModal
        isOpen={isDetailModalOpen}
        report={selectedReport}
        onClose={() => setIsDetailModalOpen(false)}
        onResolveReport={(data) => resolveReport(data)}
        isResolving={resolvingReport}
      />
    </Page>
  );
};

export default AdminReports;
