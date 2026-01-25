import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import UsersTableRow from "../row/UsersTableRow.tsx";
import type { UserItem } from "../../types/user.ts";
import Modal from "../modal/Modal.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";

type UsersTableProps = {
  users: UserItem[];
};

type SortConfig = {
  key: keyof UserItem | null;
  direction: "asc" | "desc";
};

const UsersTable = ({ users }: UsersTableProps) => {
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const sortedUsers = useMemo(() => {
    const result = [...users];

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof UserItem];
        const bValue = b[sortConfig.key as keyof UserItem];

        if (!aValue) return -1;
        if (!bValue) return 1;

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, sortConfig]);

  const handleSort = (key: keyof UserItem) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
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
                {sortConfig.key === "role" && (
                  <span className={"ml-1 "}>
                    {sortConfig.direction === "asc" ? (
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
                {sortConfig.key === "status" && (
                  <span className="ml-1">
                    {sortConfig.direction === "asc" ? (
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
                {sortConfig.key === "postCount" && (
                  <span className="ml-1">
                    {sortConfig.direction === "asc" ? (
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
              // @ts-ignore
              onClick={() => handleSort("followersCount")}
            >
              <div className="flex items-center">
                Followers
                {
                  // @ts-ignore
                  sortConfig.key === "followersCount" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </span>
                  )
                }
              </div>
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              <div className="flex items-center">
                Joined
                {sortConfig.key === "createdAt" && (
                  <span className="ml-1">
                    {sortConfig.direction === "asc" ? (
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
                {sortConfig.key === "lastActive" && (
                  <span className="ml-1">
                    {sortConfig.direction === "asc" ? (
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
          {sortedUsers.map((user) => (
            <UsersTableRow
              user={user}
              onSelectUserToDelete={(user) => {
                setIsDeleteModalOpen(true);
                setUserToDelete(user);
              }}
            />
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isDeleteModalOpen && userToDelete !== null}
        onClose={() => setIsDeleteModalOpen(false)}
        className={
          "w-full max-w-md rounded-lg border-2 p-6 border-gray-600 bg-black-200"
        }
      >
        <h2 className={"text-xl font-bold text-white-100"}>Delete User</h2>
        <p className={"text-gray-400"}>
          Are you sure you want to delete user{" "}
          <strong>{userToDelete?.username}</strong>? This action cannot be
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
            Delete
          </AnimatedButton>
        </div>
      </Modal>
    </>
  );
};

export default UsersTable;
