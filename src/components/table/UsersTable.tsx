import { type Dispatch, type SetStateAction, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import UsersTableRow from "../row/UsersTableRow.tsx";
import type { AdminUser } from "../../types/user.ts";
import Modal from "../modal/Modal.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import type { AdminUserSortConfig } from "../../types/types.ts";

type UsersTableProps = {
  users: AdminUser[];
  sortConfig: AdminUserSortConfig;
  setSortConfig: Dispatch<SetStateAction<AdminUserSortConfig>>;
};

const UsersTable = ({ users, sortConfig, setSortConfig }: UsersTableProps) => {
  const [userToBlock, setUserToBlock] = useState<AdminUser | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSort = (key: keyof AdminUser) => {
    setSortConfig((prevConfig: AdminUserSortConfig) => ({
      sortBy: key,
      sortDirection:
        prevConfig.sortBy === key && prevConfig.sortDirection === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <>
      <table className={"w-full"}>
        <thead>
          <tr className={"bg-black-300 text-gray-400"}>
            <th className={"px-4 py-3 text-left"}>Users</th>
            <th
              onClick={() => handleSort("role")}
              className={"px-4 py-3 text-left cursor-pointer"}
            >
              <div className={"flex items-center"}>
                Role
                {sortConfig.sortBy === "role" && (
                  <span className={"ml-1 "}>
                    {sortConfig.sortDirection === "asc" ? (
                      <ChevronUp className={"size-4"} />
                    ) : (
                      <ChevronDown className={"size-4"} />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status
                {sortConfig.sortBy === "status" && (
                  <span className="ml-1">
                    {sortConfig.sortDirection === "asc" ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={() => handleSort("postCount")}
            >
              <div className="flex items-center">
                Posts
                {sortConfig.sortBy === "postCount" && (
                  <span className="ml-1">
                    {sortConfig.sortDirection === "asc" ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={() => handleSort("followersCount")}
            >
              <div className="flex items-center">
                Followers
                {sortConfig.sortBy === "followersCount" && (
                  <span className="ml-1">
                    {sortConfig.sortDirection === "asc" ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              <div className="flex items-center">
                Joined
                {sortConfig.sortBy === "createdAt" && (
                  <span className="ml-1">
                    {sortConfig.sortDirection === "asc" ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={() => handleSort("lastActive")}
            >
              <div className="flex items-center">
                Last Active
                {sortConfig.sortBy === "lastActive" && (
                  <span className="ml-1">
                    {sortConfig.sortDirection === "asc" ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UsersTableRow
              user={user}
              onSelectUserToBlock={(user) => {
                setIsDeleteModalOpen(true);
                setUserToBlock(user);
              }}
            />
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isDeleteModalOpen && userToBlock !== null}
        onClose={() => setIsDeleteModalOpen(false)}
        className={
          "w-full max-w-md rounded-lg border-2 p-6 border-gray-600 bg-black-200"
        }
      >
        <h2 className={"text-xl font-bold text-white-100"}>Delete User</h2>
        <p className={"text-gray-400"}>
          Are you sure you want to block user{" "}
          <strong>{userToBlock?.username}</strong>? This action cannot be
          undone.
        </p>
        <div className={"flex justify-end gap-2 mt-6"}>
          <AnimatedButton
            bgColor={"#222222"}
            borderColor={"#222222"}
            borderColorHover={"#14b8a6"}
            textColor={"#14b8a6"}
            textColorHover={"#222222"}
            className={"px-4 py-2 rounded-lg"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            bgColor={"#222222"}
            borderColor={"#222222"}
            bgColorHover={"#ef4444"}
            borderColorHover={"#ef4444"}
            textColor={"#ef4444"}
            textColorHover={"#e6e6e6"}
            className={"px-4 py-2 rounded-lg"}
          >
            Block
          </AnimatedButton>
        </div>
      </Modal>
    </>
  );
};

export default UsersTable;
