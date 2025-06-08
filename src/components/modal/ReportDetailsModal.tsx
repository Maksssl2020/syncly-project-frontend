import Modal from "./Modal.tsx";
import {
  getReportReasonColor,
  getReportStatusColor,
  getReportTypeColor,
} from "../../utils/colorUtils.ts";
import type { Report, ReportStatus, ReportType } from "../../types/report.ts";
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

type ReportDetailsModalProps = {
  isOpen: boolean;
  report: Report | null;
  onClose: () => void;
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

const ReportDetailsModal = ({
  isOpen,
  report,
  onClose,
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
                backgroundColor: getReportTypeColor(report.type),
              }}
            >
              {getReportTypeIcon(report.type)}
              <span>{report.type}</span>
            </div>
            <h2 className={"text-xl font-bold text-white-100"}>
              Report Details
            </h2>
          </div>

          <div className={"p-6 flex flex-col gap-4 "}>
            <h3 className={"text-lg font-bold text-white-100"}>
              {report.targetTitle}
            </h3>
            <div className={"flex flex-wrap gap-2"}>
              <span
                className={
                  "flex items-center px-2 py-1 rounded text-xs font-medium text-black-100"
                }
                style={{
                  backgroundColor: getReportReasonColor(report.reason),
                }}
              >
                {report.reason}
              </span>
              <span
                className={
                  "flex items-center px-2 gap-2 py-1 rounded text-xs font-medium text-black-100"
                }
                style={{
                  backgroundColor: getReportStatusColor(report.status),
                }}
              >
                {getStatusIcon(report.status)}
                {report.status}
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
                  {formatDate(report.createdAt)}
                </span>
              </div>
            </div>
            <Label title={"Report Description"} data={report.description} />
            <Label title={"Reported Content"} data={report.targetContent} />
            {report.status !== "PENDING" && report.resolvedAt && (
              <div
                className="p-4 rounded-lg mb-6 bg-black-300 border-2"
                style={{
                  borderColor:
                    report.status === "RESOLVED" ? "#22c55e" : "#ef4444",
                }}
              >
                <h4 className="font-medium mb-2 text-gray-400">Resolution</h4>
                <p className={"text-white-100"}>
                  {report.status === "RESOLVED"
                    ? "This report was resolved and appropriate action was taken."
                    : "This report was rejected as it did not violate community guidelines."}
                </p>
                <div className="flex items-center mt-2">
                  <span className={"text-gray-400"}>
                    {report.status} by{" "}
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

              {report.status === "PENDING" && (
                <>
                  <AnimatedButton
                    className={"px-4 py-2 rounded-lg items-center flex gap-2"}
                    textColor={"#22c55e"}
                    borderColor={"#22c55e"}
                    bgColor={"#171719"}
                    textColorHover={"#111111"}
                    borderColorHover={"#22c55e"}
                    bgColorHover={"#22c55e"}
                  >
                    <CheckCircle className={"size-4"} />
                    Resolve Report
                  </AnimatedButton>
                  <AnimatedButton
                    className={"px-4 py-2 rounded-lg items-center flex gap-2"}
                    textColor={"#ef4444"}
                    borderColor={"#ef4444"}
                    bgColor={"#171719"}
                    textColorHover={"#111111"}
                    bgColorHover={"#ef4444"}
                    borderColorHover={"#ef4444"}
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
