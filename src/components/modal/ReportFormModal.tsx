import { useState } from "react";
import type { ReportReason, ReportType } from "../../types/report.ts";
import Modal from "./Modal.tsx";
import FormTextArea from "../input/FormTextarea.tsx";
import useCreateReportMutation from "../../hooks/mutations/useCreateReportMutation.ts";
import AnimatedButton from "../button/AnimatedButton.tsx";
import DropdownMenu from "../dropdown/DropdownMenu.tsx";
import type { DropdownOption } from "../../types/types.ts";
import FormInput from "../input/FormInput.tsx";
import { useForm } from "react-hook-form";

type ReportFormModalProps = {
  entityId: string | number;
  authorName: string;
  type: ReportType;
  isOpen: boolean;
  onClose: () => void;
};

const dropdownOptions: DropdownOption[] = [
  {
    label: "Spam",
    value: "SPAM",
  },
  {
    label: "Harassment",
    value: "HARASSMENT",
  },
  {
    label: "Inappropriate",
    value: "INAPPROPRIATE",
  },
  {
    label: "Violence",
    value: "VIOLENCE",
  },
  {
    label: "Other",
    value: "OTHER",
  },
];

const ReportFormModal = ({
  entityId,
  type,
  isOpen,
  onClose,
  authorName,
}: ReportFormModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      reason: "",
    },
  });

  const [selectedReasonType, setSelectedReasonType] =
    useState<ReportReason>("OTHER");
  const { createReport, creatingReport } = useCreateReportMutation(() => {
    reset({
      title: "",
      reason: "",
    });
    onClose();
  });

  const onSubmit = (title: string, reason: string) => {
    createReport({
      entityId: entityId,
      reportReasonType: selectedReasonType,
      title: title,
      reason: reason,
      reportType: type,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={
          "max-h-[80vh] flex flex-col w-full p-4 gap-4 shadow-xl rounded-lg bg-black-200"
        }
      >
        <h2 className={"text-2xl text-white-100 text-center"}>
          Report for {authorName}'s {type === "POST" ? "post" : "comment"}
        </h2>
        <div className={"flex flex-col gap-3"}>
          <p className={"text-lg font-medium text-white-100"}>
            Select Reason Type
          </p>
          <DropdownMenu
            options={dropdownOptions}
            value={selectedReasonType}
            onChange={(value) => setSelectedReasonType(value as ReportReason)}
            className={"h-[50px]"}
          />
        </div>
        <FormInput
          title={"Title"}
          required={true}
          type={"text"}
          register={register("title", {
            required: {
              value: true,
              message: "Title cannot be empty.",
            },
          })}
          error={errors?.title?.message}
        />
        <div className={"h-[350px]"}>
          <FormTextArea
            title={"Reason"}
            required={true}
            register={register("reason", {
              required: {
                value: true,
                message: "Reason cannot be empty.",
              },
              min: {
                value: 10,
                message: "Reason must be greater than 10 characters length.",
              },
            })}
            error={errors?.reason?.message}
          />
        </div>
        <div className={"w-full flex gap-4"}>
          <AnimatedButton
            borderColor={"#2c2c2c"}
            className={"w-full h-[50px] rounded-lg"}
            onClick={onClose}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            onClick={handleSubmit((data) => onSubmit(data.title, data.reason))}
            borderColor={"#2c2c2c"}
            loading={creatingReport}
            className={"w-full h-[50px] rounded-lg"}
          >
            Send Report
          </AnimatedButton>
        </div>
      </div>
    </Modal>
  );
};

export default ReportFormModal;
