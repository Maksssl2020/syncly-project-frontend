import Page from "../animation/Page.tsx";
import Searchbar from "../components/input/Searchbar.tsx";
import type { DropdownOption } from "../types/types.ts";
import type { UserItem, UserRole, UserStatus } from "../types/user.ts";
import { useEffect, useMemo, useState } from "react";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import UsersTable from "../components/table/UsersTable.tsx";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import useAllUsersQuery from "../hooks/queries/useAllUsersQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import { Shield, User } from "lucide-react";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";

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
  const [users, setUsers] = useState<UserItem[]>([]);

  const { allUsersData, fetchingAllUsersData } = useAllUsersQuery();
  const [inputValue, setInputValue] = useState("");

  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    role: "ALL",
    status: "ALL",
    search: "",
  });

  useEffect(() => {
    if (!fetchingAllUsersData && allUsersData) {
      setUsers(allUsersData);
    }
  }, [allUsersData, fetchingAllUsersData]);

  const filteredUsers = useMemo(() => {
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

    return result;
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

  useEffect(() => {
    const id = setTimeout(() => handleSearch(inputValue), 500);
    return () => clearTimeout(id);
  }, [inputValue]);

  if (fetchingAllUsersData || !allUsersData) {
    return <Spinner />;
  }

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
          onChange={(value) => setInputValue(value)}
          value={inputValue}
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
