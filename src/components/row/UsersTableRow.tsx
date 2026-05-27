import AnimatedButton from "../button/AnimatedButton.tsx";
import { BanIcon, Edit, UnlockIcon } from "lucide-react";
import type { AdminUser } from "../../types/user.ts";
import Avatar from "../img/Avatar.tsx";
import {
  getUserRoleBadgeColor,
  getUserStatusBadgeColor,
} from "../../utils/colorUtils.ts";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

type UsersTableRowProps = {
  user: AdminUser;
  onSelectUserToBlock?: (value: AdminUser) => void;
  selectedUserToUnblock?: AdminUser;
  onUnblockUser: (value: AdminUser) => void;
  isUnblocking?: boolean;
};

const UsersTableRow = ({
  user,
  onSelectUserToBlock,
  onUnblockUser,
  isUnblocking,
  selectedUserToUnblock,
}: UsersTableRowProps) => {
  const navigate = useNavigate();

  return (
    <tr key={user.userId} className={"border-t border-gray-600 bg-black-300"}>
      <td className={"px-4 py-3"}>
        <div className={"flex items-center gap-3"}>
          <Avatar size={"size-10"} avatar={user.avatar} />
          <div className={"text-white-100"}>
            <div className={"font-medium "}>{user.username}</div>
            <div className={"text-sm"}>{user.email}</div>
          </div>
        </div>
      </td>
      <td className={"px-4 py-3"}>
        <span
          className={"inline-block px-2 py-1  rounded text-xs font-medium"}
          style={{
            color: user.role === "REGISTERED" ? "#e6e6e6" : "#111111",
            backgroundColor: getUserRoleBadgeColor(user.role),
          }}
        >
          {user.role}
        </span>
      </td>
      <td className={"px-4 py-3"}>
        <span
          className={
            "inline-block px-2 py-1 rounded text-sm font-medium text-black-100"
          }
          style={{
            backgroundColor: getUserStatusBadgeColor(user.status),
          }}
        >
          {user.status}
        </span>
      </td>
      <td className={"px-4 py-3 text-white-100"}>{user.postCount}</td>
      <td className={"px-4 py-3 text-white-100"}>{user.followersCount}</td>
      <td className={"px-4 py-3 text-gray-400"}>
        {format(user.createdAt, "dd-MM-yyyy")}
      </td>
      <td className={"px-4 py-3 text-gray-400"}>
        {user.lastActive !== undefined && user.lastActive !== ""
          ? format(user!.lastActive, "dd-MM-yyyy")
          : ""}
      </td>
      <td className={"px-4 py-3"}>
        <div className={"flex gap-2"}>
          <AnimatedButton
            bgColor={"#171719"}
            borderColor={"#171719"}
            borderColorHover={"171719"}
            textColor={"#14b8a6"}
            className={"p-1 rounded"}
            onClick={() => navigate(`/admin/panel/users/edit/${user.userId}`)}
          >
            <Edit />
          </AnimatedButton>
          {user.accountNonLocked ? (
            <AnimatedButton
              bgColor={"#171719"}
              bgColorHover={"#ef4444"}
              borderColor={"#171719"}
              borderColorHover={"171719"}
              textColor={"#ef4444"}
              className={"p-1 rounded"}
              onClick={() => onSelectUserToBlock?.(user)}
            >
              <BanIcon />
            </AnimatedButton>
          ) : (
            <AnimatedButton
              bgColor={"#171719"}
              bgColorHover={"#22c55e"}
              borderColor={"#171719"}
              borderColorHover={"171719"}
              textColor={"#22c55e"}
              className={"p-1 rounded"}
              onClick={() => onUnblockUser(user)}
              loading={
                isUnblocking && selectedUserToUnblock?.userId === user.userId
              }
            >
              <UnlockIcon />
            </AnimatedButton>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UsersTableRow;
