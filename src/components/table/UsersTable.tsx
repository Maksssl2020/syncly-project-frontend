import { useState } from "react";
import UsersTableRow from "../row/UsersTableRow.tsx";
import type { AdminUser } from "../../types/user.ts";
import Modal from "../modal/Modal.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";

type UsersTableProps = {
  users: AdminUser[];
  onBlockUser: (user: AdminUser) => void;
  onUnblockUser: (user: AdminUser) => void;
  isUnblocking: boolean;
  isBlockModalOpen: boolean;
  setIsBlockModalOpen: (value: boolean) => void;
};

const UsersTable = ({
  users,
  onBlockUser,
  onUnblockUser,
  isUnblocking,
  isBlockModalOpen,
  setIsBlockModalOpen,
}: UsersTableProps) => {
  const [userToBlock, setUserToBlock] = useState<AdminUser | undefined>(
    undefined,
  );
  const [userToUnblock, setUserToUnblock] = useState<AdminUser | undefined>(
    undefined,
  );

  return (
    <>
      <table className={"w-full"}>
        <thead>
          <tr className={"bg-black-300 text-gray-400"}>
            <th className={"px-4 py-3 text-left"}>Users</th>
            <th className={"px-4 py-3 text-left"}>
              <div className={"flex items-center"}>Role</div>
            </th>
            <th className="px-4 py-3 text-left">
              <div className="flex items-center">Status</div>
            </th>
            <th className="px-4 py-3 text-left">
              <div className="flex items-center">Posts</div>
            </th>
            <th className="px-4 py-3 text-left">
              <div className="flex items-center">Followers</div>
            </th>
            <th className="px-4 py-3 text-left">
              <div className="flex items-center">Joined</div>
            </th>
            <th className="px-4 py-3 text-left">
              <div className="flex items-center">Last Active</div>
            </th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UsersTableRow
              user={user}
              onSelectUserToBlock={(user) => {
                setIsBlockModalOpen(true);
                setUserToBlock(user);
              }}
              onUnblockUser={(user) => {
                setUserToUnblock(user);
                onUnblockUser(user);
              }}
              selectedUserToUnblock={userToUnblock}
              isUnblocking={isUnblocking}
            />
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isBlockModalOpen && userToBlock !== null}
        onClose={() => setIsBlockModalOpen(false)}
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
            onClick={() => {
              setIsBlockModalOpen(false);
              setUserToBlock(undefined);
            }}
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
            onClick={() => {
              if (userToBlock) {
                onBlockUser(userToBlock);
                setUserToBlock(undefined);
              }
            }}
          >
            Block
          </AnimatedButton>
        </div>
      </Modal>
    </>
  );
};

export default UsersTable;
