import AnimatedButton from "../button/AnimatedButton.tsx";
import { Edit, Trash2 } from "lucide-react";
import type { UserItem } from "../../types/user.ts";
import Avatar from "../img/Avatar.tsx";
import { getUserRoleBadgeColor, getUserStatusBadgeColor } from "../../utils/colorUtils.ts";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

type UsersTableRowProps = {
  user: UserItem;
  onSelectUserToDelete?: (value: UserItem) => void;
};

const UsersTableRow = ({ user, onSelectUserToDelete }: UsersTableRowProps) => {
  const navigate = useNavigate();

  console.log(user.lastActive);

  return (
    <tr key={user.userId} className={"border-t border-gray-600 bg-black-300"}>
      <td className={"px-4 py-3"}>
        <div className={"flex items-center gap-3"}>
          <Avatar size={"size-10"} />
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
      <td className={"px-4 py-3 text-white-100"}>
        {user.userProfile.followersCount}
      </td>
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
          <AnimatedButton
            bgColor={"#171719"}
            bgColorHover={"#ef4444"}
            borderColor={"#171719"}
            borderColorHover={"171719"}
            textColor={"#ef4444"}
            className={"p-1 rounded"}
            onClick={() => onSelectUserToDelete?.(user)}
          >
            <Trash2 />
          </AnimatedButton>
        </div>
      </td>
    </tr>
  );
};

export default UsersTableRow;
