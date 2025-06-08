import Page from "../animation/Page.tsx";
import Searchbar from "../components/input/Searchbar.tsx";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import type { DropdownOption } from "../types/types.ts";
import { Shield, User } from "lucide-react";
import type { UserItem, UserRole, UserStatus } from "../types/user.ts";
import { useEffect, useState } from "react";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import UsersTable from "../components/table/UsersTable.tsx";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";

const MOCK_USERS: UserItem[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    role: "ADMIN",
    status: "ACTIVE",
    postCount: 45,
    followersCount: 1250,
    joinedAt: "2023-01-15T10:30:00Z",
    lastActive: "2023-06-04T15:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    username: "moderator1",
    email: "mod1@example.com",
    role: "MODERATOR",
    status: "ACTIVE",
    postCount: 32,
    followersCount: 850,
    joinedAt: "2023-02-10T14:20:00Z",
    lastActive: "2023-06-03T18:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    username: "john_doe",
    email: "john@example.com",
    role: "USER",
    status: "ACTIVE",
    postCount: 87,
    followersCount: 2340,
    joinedAt: "2023-01-20T09:15:00Z",
    lastActive: "2023-06-04T12:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    username: "jane_smith",
    email: "jane@example.com",
    role: "USER",
    status: "ACTIVE",
    postCount: 65,
    followersCount: 1890,
    joinedAt: "2023-02-05T11:45:00Z",
    lastActive: "2023-06-02T20:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    username: "blocked_user",
    email: "blocked@example.com",
    role: "USER",
    status: "BLOCKED",
    postCount: 12,
    followersCount: 230,
    joinedAt: "2023-03-10T16:20:00Z",
    lastActive: "2023-05-15T10:10:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    username: "new_user",
    email: "new@example.com",
    role: "USER",
    status: "ACTIVE",
    postCount: 3,
    followersCount: 45,
    joinedAt: "2023-05-28T08:30:00Z",
    lastActive: "2023-06-04T09:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    username: "inactive_user",
    email: "inactive@example.com",
    role: "USER",
    status: "INACTIVE",
    postCount: 28,
    followersCount: 760,
    joinedAt: "2023-02-18T13:40:00Z",
    lastActive: "2023-04-10T14:25:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    username: "popular_creator",
    email: "creator@example.com",
    role: "USER",
    status: "ACTIVE",
    postCount: 156,
    followersCount: 12500,
    joinedAt: "2023-01-05T10:10:00Z",
    lastActive: "2023-06-04T16:50:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const roleFilterOptions: DropdownOption[] = [
  {
    label: "ALL",
    value: "ALL",
  },
  {
    label: "ADMIN",
    value: "ADMIN",
  },
  {
    label: "MODERATOR",
    value: "MODERATOR",
  },
  {
    label: "USER",
    value: "USER",
  },
];

const statusFilterOptions: DropdownOption[] = [
  {
    label: "ALL",
    value: "ALL",
  },
  {
    label: "ACTIVE",
    value: "ACTIVE",
  },
  {
    label: "BLOCKED",
    value: "BLOCKED",
  },
  {
    label: "INACTIVE",
    value: "INACTIVE",
  },
];

type FilterConfig = {
  role: UserRole | "ALL";
  status: UserStatus | "ALL";
  search: string;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<UserItem[]>(MOCK_USERS);
  const [filteredUsers, setFilteredUsers] = useState<UserItem[]>(MOCK_USERS);

  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    role: "ALL",
    status: "ALL",
    search: "",
  });

  useEffect(() => {
    let result = [...users];

    if (filterConfig.role !== "ALL") {
      result = result.filter((user) => user.role === filterConfig.role);
    }

    if (filterConfig.status !== "ALL") {
      result = result.filter((user) => user.status === filterConfig.status);
    }

    if (filterConfig.search) {
      const searchLower = filterConfig.search.toLowerCase();
      result = result.filter(
        (user) =>
          user.username.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }

    setFilteredUsers(result);
  }, [users, filterConfig]);

  const handleRoleFilter = (role: UserRole | "ALL") => {
    setFilterConfig((prev) => ({ ...prev, role }));
  };

  const handleStatusFilter = (status: UserStatus | "ALL") => {
    setFilterConfig((prev) => ({ ...prev, status }));
  };

  const handleSearch = (search: string) => {
    setFilterConfig((prev) => ({ ...prev, search: search }));
  };

  return (
    <Page className={"min-h-screen p-6 flex flex-col gap-8 w-full"}>
      <AdminManagementPanelHeader
        title={"User Management"}
        content={`${filteredUsers.length} Users`}
      />

      <div
        className={
          "p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-black-200 border-gray-600 border-2 rounded-lg"
        }
      >
        <Searchbar
          onChange={(value) => handleSearch(value)}
          value={filterConfig.search}
          placeholder={""}
        />
        <DropdownMenu
          className={"h-[50px]"}
          placeholderChildren={
            <div className={"flex gap-2 h-full items-center"}>
              <Shield className={"size-4"} />
              <span>Role:</span>
            </div>
          }
          options={roleFilterOptions}
          onChange={(value) => handleRoleFilter(value as UserRole)}
          value={filterConfig.role}
        />
        <DropdownMenu
          className={"h-[50px]"}
          placeholderChildren={
            <div className={"flex gap-2 h-full items-center"}>
              <User className={"size-4"} />
              <span>Status:</span>
            </div>
          }
          options={statusFilterOptions}
          onChange={(value) => handleStatusFilter(value as UserStatus)}
          value={filterConfig.status}
        />
        <AnimatedButton
          bgColor={"#171719"}
          borderColor={"#4a4a4d"}
          borderColorHover={"#14b8a6"}
          onClick={() =>
            setFilterConfig({ role: "ALL", status: "ALL", search: "" })
          }
          className={
            "rounded-lg h-[50px] px-4 w-auto py-2 uppercase lg:min-w-[200px]"
          }
        >
          Clear Filters
        </AnimatedButton>
      </div>

      <div
        className={
          "rounded-lg border-2 overflow-hidden bg-black-200 border-gray-600"
        }
      >
        <div className={"overflow-x-auto"}>
          <UsersTable users={filteredUsers} />
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            <p>No users found matching your filters.</p>
          </div>
        )}
      </div>
    </Page>
  );
};

export default AdminUsers;
