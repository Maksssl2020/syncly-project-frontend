import { AlertCircle, Flag } from "lucide-react";
import Page from "../animation/Page";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import type { Report, ReportStatus, ReportType } from "../types/report.ts";
import Searchbar from "../components/input/Searchbar.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useState } from "react";
import type { DropdownOption } from "../types/types.ts";
import ReportCardList from "../components/card/ReportCardList.tsx";
import ReportDetailsModal from "../components/modal/ReportDetailsModal.tsx";

const MOCK_REPORTS: Report[] = [
  {
    id: "1",
    type: "POST",
    targetId: "post123",
    targetTitle: "Inappropriate content",
    targetContent:
      "This post contains content that violates community guidelines...",
    targetImage: "/placeholder.svg?height=200&width=300",
    reportedBy: {
      id: "user1",
      username: "concerned_user",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "INAPPROPRIATE",
    description: "This post contains explicit content that should be removed.",
    status: "PENDING",
    createdAt: "2023-06-03T14:25:00Z",
  },
  {
    id: "2",
    type: "USER",
    targetId: "user456",
    targetTitle: "Spammer account",
    targetContent: "This user is posting spam across multiple threads...",
    reportedBy: {
      id: "user2",
      username: "moderator_helper",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "SPAM",
    description:
      "This account is posting the same promotional content across multiple threads.",
    status: "RESOLVED",
    createdAt: "2023-06-02T10:15:00Z",
    resolvedAt: "2023-06-02T15:30:00Z",
    resolvedBy: {
      id: "admin1",
      username: "admin",
    },
  },
  {
    id: "3",
    type: "COMMENT",
    targetId: "comment789",
    targetTitle: "Harassment in comments",
    targetContent: "You're an idiot and nobody likes your content...",
    reportedBy: {
      id: "user3",
      username: "victim_user",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "HARASSMENT",
    description: "This user is targeting me with insulting comments.",
    status: "PENDING",
    createdAt: "2023-06-04T09:45:00Z",
  },
  {
    id: "4",
    type: "POST",
    targetId: "post234",
    targetTitle: "Violent content",
    targetContent: "How to harm others tutorial...",
    targetImage: "/placeholder.svg?height=200&width=300",
    reportedBy: {
      id: "user4",
      username: "safety_first",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "VIOLENCE",
    description: "This post contains instructions for harming others.",
    status: "RESOLVED",
    createdAt: "2023-06-01T16:20:00Z",
    resolvedAt: "2023-06-01T18:45:00Z",
    resolvedBy: {
      id: "admin1",
      username: "admin",
    },
  },
  {
    id: "5",
    type: "COMMENT",
    targetId: "comment345",
    targetTitle: "Spam in comments",
    targetContent:
      "Check out my website at www.spam-site.com for amazing deals...",
    reportedBy: {
      id: "user5",
      username: "thread_owner",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "SPAM",
    description: "This comment is just spam advertising.",
    status: "REJECTED",
    createdAt: "2023-06-02T11:30:00Z",
    resolvedAt: "2023-06-02T14:15:00Z",
    resolvedBy: {
      id: "admin1",
      username: "admin",
    },
  },
  {
    id: "6",
    type: "USER",
    targetId: "user567",
    targetTitle: "Impersonation account",
    targetContent: "This user is pretending to be a famous person...",
    reportedBy: {
      id: "user6",
      username: "real_celebrity",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "OTHER",
    description:
      "This account is impersonating me and trying to scam my followers.",
    status: "PENDING",
    createdAt: "2023-06-03T20:10:00Z",
  },
  {
    id: "7",
    type: "POST",
    targetId: "post456",
    targetTitle: "Copyright infringement",
    targetContent: "Here's the full movie download...",
    targetImage: "/placeholder.svg?height=200&width=300",
    reportedBy: {
      id: "user7",
      username: "rights_holder",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "OTHER",
    description: "This post is sharing copyrighted content without permission.",
    status: "PENDING",
    createdAt: "2023-06-04T08:30:00Z",
  },
  {
    id: "8",
    type: "COMMENT",
    targetId: "comment567",
    targetTitle: "Inappropriate language",
    targetContent: "This comment contains offensive language...",
    reportedBy: {
      id: "user8",
      username: "parent_user",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    reason: "INAPPROPRIATE",
    description:
      "This comment uses extremely offensive language in a thread marked as family-friendly.",
    status: "RESOLVED",
    createdAt: "2023-06-03T15:40:00Z",
    resolvedAt: "2023-06-03T17:20:00Z",
    resolvedBy: {
      id: "admin1",
      username: "admin",
    },
  },
];

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
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [activeTab, setActiveTab] = useState<ReportType | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredReports = reports.filter((report) => {
    const matchesTab = activeTab === "ALL" || report.type === activeTab;
    const matchesStatus =
      statusFilter === "ALL" || report.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      report.targetTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedBy.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());

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
      />
    </Page>
  );
};

export default AdminReports;
