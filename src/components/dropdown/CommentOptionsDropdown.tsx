import useAuthentication from "../../hooks/useAuthentication.ts";
import useClickOutside from "../../hooks/useClickOutside.ts";
import type { DropdownOption } from "../../types/types.ts";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { MoreHorizontal } from "lucide-react";
import Dropdown from "./Dropdown.tsx";

type CommentOptionsDropdownProps = {
  authorId: string | number;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onReportClick: () => void;
  textColor?: string;
  textHoverColor?: string;
  bgColor?: string;
  bgColorHover?: string;
  borderColor?: string;
  borderColorHover?: string;
};

const CommentOptionsDropdown = ({
  authorId,
  onDeleteClick,
  onEditClick,
  onReportClick,
  textHoverColor = "#14b8a6",
  textColor = "#9ca3af",
  bgColor = "transparent",
  bgColorHover = "transparent",
  borderColor = "transparent",
  borderColorHover = "transparent",
}: CommentOptionsDropdownProps) => {
  const { userId, role } = useAuthentication();
  const { isOpen, setIsOpen, ref } = useClickOutside(false);

  const adminOptions: DropdownOption[] = [
    {
      label: "Delete Comment",
      value: "deleteComment",
      color: "#ef4444",
      onClick: () => onDeleteClick(),
    },
  ];

  const authorPostOptions: DropdownOption[] = [
    {
      label: "Edit Comment",
      value: "editComment",
      color: "#14b8a6",
      onClick: () => onEditClick(),
    },
    {
      label: "Delete Comment",
      value: "deleteComment",
      color: "#ef4444",
      onClick: () => onDeleteClick(),
    },
  ];

  const userPostOptions: DropdownOption[] = [
    {
      label: "Report Comment",
      value: "reportComment",
      color: "#f97316",
      onClick: () => onReportClick(),
    },
  ];

  return (
    <div ref={ref} className={"relative"}>
      <AnimatedButton
        onClick={() => setIsOpen(!isOpen)}
        className={"p-2 h-fit rounded-lg border-2"}
        bgColor={bgColor}
        bgColorHover={bgColorHover}
        borderColor={borderColor}
        borderColorHover={borderColorHover}
        textColorHover={textHoverColor}
        textColor={textColor}
      >
        <MoreHorizontal className={"size-4"} />
      </AnimatedButton>

      <div className={"absolute right-[550%] top-10"}>
        <Dropdown
          isOpen={isOpen}
          options={
            role === "ADMIN"
              ? adminOptions
              : authorId === userId
                ? authorPostOptions
                : userPostOptions
          }
          onClose={() => setIsOpen(false)}
          dropdownWidth={"w-[200px]"}
        />
      </div>
    </div>
  );
};

export default CommentOptionsDropdown;
