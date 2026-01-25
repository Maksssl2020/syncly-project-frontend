import Modal from "./Modal.tsx";
import {
  getReportReasonColor,
  getReportStatusColor,
  getReportTypeColor,
} from "../../utils/colorUtils.ts";
import type {
  CommentReport,
  PostReport,
  ReportStatus,
  ReportType,
  ReportUnion,
  ResolveReportRequest,
} from "../../types/report.ts";
import {
  AlertCircle,
  CheckCircle,
  Flag,
  MessageSquare,
  User,
  XCircle,
} from "lucide-react";
import Avatar from "../img/Avatar.tsx";
import { formatDate } from "../../utils/dateUtils.ts";
import Label from "../label/Label.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { format } from "date-fns";
import ReportedPostPreview from "../preview/ReportedPostPreview.tsx";
import ReportedCommentPreview from "../preview/ReportedCommentPreview.tsx";

type ReportDetailsModalProps = {
  isOpen: boolean;
  report: ReportUnion | null;
  onClose: () => void;
  onResolveReport: (data: ResolveReportRequest) => void;
  isResolving: boolean;
};

const getReportTypeIcon = (type: ReportType) => {
  switch (type) {
    case "POST":
      return <Flag className="size-5" />;
    case "USER":
      return <User className="size-5" />;
    case "COMMENT":
      return <MessageSquare className="size-5" />;
  }
};

const getStatusIcon = (status: ReportStatus) => {
  switch (status) {
    case "PENDING":
      return <AlertCircle className="size-5" />;
    case "RESOLVED":
      return <CheckCircle className="size-5" />;
    case "REJECTED":
      return <XCircle className="size-5" />;
  }
};

const ReportedContentPreview = ({ report }: { report: ReportUnion }) => {
  if (report.reportType === "POST") {
    return <ReportedPostPreview report={report as PostReport} />;
  } else if (report.reportType === "COMMENT") {
    return <ReportedCommentPreview report={report as CommentReport} />;
  }

  return (
    <div className="bg-black-300 border border-gray-600 rounded-lg p-4">
      <p className="text-gray-400 text-sm">
        Content preview not available for this report type.
      </p>
    </div>
  );
};

const ReportDetailsModal = ({
  isOpen,
  report,
  onClose,
  onResolveReport,
  isResolving,
}: ReportDetailsModalProps) => {
  return (
    <Modal
      isOpen={isOpen && report !== null}
      onClose={() => onClose()}
      className="w-full max-w-3xl  bg-black-200 border-gray-600 rounded-lg border-2 max-h-[90vh] overflow-y-auto"
    >
      {report && (
        <>
          <div
            className={
              "w-full flex items-center gap-6 p-4 border-b-2 border-gray-600"
            }
          >
            <div
              className={
                "flex px-2 py-1 rounded gap-2 items-center text-xs font-medium"
              }
              style={{
                backgroundColor: getReportTypeColor(report.reportType),
              }}
            >
              {getReportTypeIcon(report.reportType)}
              <span>{report.reportType}</span>
            </div>
            <h2 className={"text-xl font-bold text-white-100"}>
              Report Details
            </h2>
          </div>

          <div className={"p-6 flex flex-col gap-4 "}>
            <h3 className={"text-lg font-bold text-white-100"}>
              {report.title}
            </h3>
            <div className={"flex flex-wrap gap-2"}>
              <span
                className={
                  "flex items-center px-2 py-1 rounded text-xs font-medium text-black-100"
                }
                style={{
                  backgroundColor: getReportReasonColor(
                    report.reportReasonType,
                  ),
                }}
              >
                {report.reason}
              </span>
              <span
                className={
                  "flex items-center px-2 gap-2 py-1 rounded text-xs font-medium text-black-100"
                }
                style={{
                  backgroundColor: getReportStatusColor(report.reportStatus),
                }}
              >
                {getStatusIcon(report.reportStatus)}
                {report.reportStatus}
              </span>
            </div>
            <div className={"flex items-center gap-4"}>
              <div className={"flex items-center gap-2"}>
                <Avatar size={"size-8"} />
                <span className={"text-gray-400"}>
                  Reported by{" "}
                  <span className={"text-white-100"}>
                    {report.reportedBy.username}
                  </span>
                </span>
                <span className={"text-gray-400"}>
                  {format(report.reportedAt, "dd-MM-yyyy HH:mm:ss")}
                </span>
              </div>
            </div>
            <div>
              <Label title="Report Description" data={report.reason} />
            </div>

            <div>
              <h4 className="text-white-100 font-medium mb-3">
                Reported Content
              </h4>
              <ReportedContentPreview report={report} />
            </div>
            {report.reportStatus !== "PENDING" && report.resolvedAt && (
              <div
                className="p-4 rounded-lg mb-6 bg-black-300 border-2"
                style={{
                  borderColor:
                    report.reportStatus === "RESOLVED" ? "#22c55e" : "#ef4444",
                }}
              >
                <h4 className="font-medium mb-2 text-gray-400">Resolution</h4>
                <p className={"text-white-100"}>
                  {report.reportStatus === "RESOLVED"
                    ? "This report was resolved and appropriate action was taken."
                    : "This report was rejected as it did not violate community guidelines."}
                </p>
                <div className="flex items-center mt-2">
                  <span className={"text-gray-400"}>
                    {report.reportStatus} by{" "}
                    <span className={"text-white-100"}>
                      {report.resolvedBy?.username}
                    </span>{" "}
                    on {formatDate(report.resolvedAt)}
                  </span>
                </div>
              </div>
            )}

            <div className={"flex justify-end gap-2 mt-6"}>
              <AnimatedButton
                bgColor={"#171719"}
                borderColor={"#171719"}
                borderColorHover={"#14b8a6"}
                className={"px-4 py-2 rounded-lg"}
                onClick={onClose}
              >
                Close
              </AnimatedButton>

              {report.reportStatus === "PENDING" && (
                <>
                  <AnimatedButton
                    onClick={() => {
                      onResolveReport({
                        reportId: report.id,
                        reportStatus: "RESOLVED",
                      });
                    }}
                    className={"px-4 py-2 rounded-lg items-center flex gap-2"}
                    textColor={"#22c55e"}
                    borderColor={"#22c55e"}
                    bgColor={"#171719"}
                    textColorHover={"#111111"}
                    borderColorHover={"#22c55e"}
                    bgColorHover={"#22c55e"}
                    loading={isResolving}
                  >
                    <CheckCircle className={"size-4"} />
                    Resolve Report
                  </AnimatedButton>
                  <AnimatedButton
                    onClick={() => {
                      onResolveReport({
                        reportId: report.id,
                        reportStatus: "REJECTED",
                      });
                    }}
                    className={"px-4 py-2 rounded-lg items-center flex gap-2"}
                    textColor={"#ef4444"}
                    borderColor={"#ef4444"}
                    bgColor={"#171719"}
                    textColorHover={"#111111"}
                    bgColorHover={"#ef4444"}
                    borderColorHover={"#ef4444"}
                    loading={isResolving}
                  >
                    <XCircle className={"size-4"} />
                    Reject Report
                  </AnimatedButton>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ReportDetailsModal;
