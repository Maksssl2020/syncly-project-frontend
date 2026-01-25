import type { DropdownOption } from "../../types/types.ts";
import useClickOutside from "../../hooks/useClickOutside.ts";
import Dropdown from "./Dropdown.tsx";
import { MoreHorizontal } from "lucide-react";
import AnimatedButton from "../button/AnimatedButton.tsx";
import useAuthentication from "../../hooks/useAuthentication.ts";

type PostOptionsDropdownProps = {
  authorId: string | number;
  postId: string | number;
  onReportClick: () => void;
  onDeleteClick: () => void;
  onEditPostClick: () => void;
};

const PostOptionsDropdown = ({
  authorId,
  // @ts-ignore
  postId,
  onReportClick,
  onDeleteClick,
  onEditPostClick,
}: PostOptionsDropdownProps) => {
  const { userId, role } = useAuthentication();
  const { isOpen, setIsOpen, ref } = useClickOutside(false);

  const adminOptions: DropdownOption[] = [
    {
      label: "Delete Post",
      value: "deletePost",
      color: "#ef4444",
      onClick: () => onDeleteClick(),
    },
  ];

  const authorPostOptions: DropdownOption[] = [
    {
      label: "Edit Post",
      value: "editPost",
      color: "#14b8a6",
      onClick: () => onEditPostClick(),
    },
    {
      label: "Delete Post",
      value: "reportPost",
      color: "#ef4444",
      onClick: () => onDeleteClick(),
    },
  ];

  const userPostOptions: DropdownOption[] = [
    {
      label: "Report Post",
      value: "reportPost",
      color: "#f97316",
      onClick: () => onReportClick(),
    },
  ];

  return (
    <div ref={ref} className={"relative"}>
      <AnimatedButton
        onClick={() => setIsOpen(!isOpen)}
        className={"p-2 h-fit rounded-lg border-2"}
        bgColor={"#222222"}
        bgColorHover={"#393939"}
        borderColor={"#222222"}
        borderColorHover={"#393939"}
        textColorHover={"#14b8a6"}
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

export default PostOptionsDropdown;
