import Page from "../animation/Page.tsx";
import Searchbar from "../components/input/Searchbar.tsx";
import type { AdminUserSortConfig, DropdownOption } from "../types/types.ts";
import type { AdminUser, UserRole, UserStatus } from "../types/user.ts";
import { useEffect, useState } from "react";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import UsersTable from "../components/table/UsersTable.tsx";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import useAllUsersQuery from "../hooks/queries/useAllUsersQuery.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import { Shield, User } from "lucide-react";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import useSearch from "../hooks/useSearch.ts";
import Pagination from "../components/pagination/Pagination.tsx";

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
    value: "REGISTERED",
  },
];

const statusFilterOptions: DropdownOption[] = [
  {
    label: "ALL",
    value: "ALL",
  },
  {
    label: "ONLINE",
    value: "ONLINE",
  },
  {
    label: "BLOCKED",
    value: "BLOCKED",
  },
  {
    label: "OFFLINE",
    value: "OFFLINE",
  },
];

type FilterConfig = {
  role: UserRole | undefined;
  status: UserStatus | undefined;
  search: string;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(20);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    role: undefined,
    status: undefined,
    search: searchQuery,
  });
  const [sortConfig, setSortConfig] = useState<AdminUserSortConfig>({
    sortBy: undefined,
    sortDirection: "desc",
  });
  useSearch({
    inputValue: searchInputValue,
    setSearch: setSearchQuery,
    saveSearchEnabled: false,
  });

  const { allUsersData, fetchingAllUsersData } = useAllUsersQuery(
    currentPage,
    itemsPerPage,
    sortConfig.sortBy,
    sortConfig.sortDirection,
    filterConfig.role,
    filterConfig.status,
    filterConfig.search,
  );

  useEffect(() => {
    if (!fetchingAllUsersData && allUsersData) {
      setUsers(allUsersData.content);
    }
  }, [allUsersData, fetchingAllUsersData]);

  const handleRoleFilter = (role: UserRole | undefined) => {
    setFilterConfig((prev) => ({ ...prev, role }));
  };

  const handleStatusFilter = (status: UserStatus | undefined) => {
    setFilterConfig((prev) => ({ ...prev, status }));
  };

  const handleSearch = (search: string) => {
    setFilterConfig((prev) => ({ ...prev, search: search }));
  };

  useEffect(() => {
    const id = setTimeout(() => handleSearch(searchInputValue), 500);
    return () => clearTimeout(id);
  }, [searchInputValue]);

  if (fetchingAllUsersData || !allUsersData) {
    return <Spinner />;
  }

  return (
    <Page className={"min-h-screen p-6 flex flex-col gap-8 w-full"}>
      <AdminManagementPanelHeader
        title={"User Management"}
        content={`${allUsersData.totalElements} Users`}
      />

      <div
        className={
          "p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-black-200 border-gray-600 border-2 rounded-lg"
        }
      >
        <Searchbar
          onChange={(value) => setSearchInputValue(value)}
          value={searchInputValue}
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
          onChange={(value) => {
            if (value === "ALL") {
              handleRoleFilter(undefined);
            } else {
              handleRoleFilter(value as UserRole);
            }
          }}
          value={filterConfig.role === undefined ? "ALL" : filterConfig.role}
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
          onChange={(value) => {
            if (value === "ALL") {
              handleStatusFilter(undefined);
            } else {
              handleStatusFilter(value as UserStatus);
            }
          }}
          value={
            filterConfig.status === undefined ? "ALL" : filterConfig.status
          }
        />
        <AnimatedButton
          bgColor={"#171719"}
          borderColor={"#4a4a4d"}
          borderColorHover={"#14b8a6"}
          onClick={() =>
            setFilterConfig({ role: undefined, status: undefined, search: "" })
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
          <UsersTable
            users={users}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
          />
        </div>

        {users.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            <p>No users found matching your filters.</p>
          </div>
        )}
      </div>

      <div
        className={
          "w-full flex justify-center  bg-black-200 border-gray-600 border-2 rounded-lg"
        }
      >
        <Pagination
          totalPages={allUsersData.totalPages}
          totalItems={allUsersData.totalElements}
          currentPageValue={currentPage}
          currentPageDisplay={currentPage + 1}
          perPage={itemsPerPage}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      </div>
    </Page>
  );
};

export default AdminUsers;
