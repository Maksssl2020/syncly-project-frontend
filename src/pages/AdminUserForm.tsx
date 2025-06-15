import Page from "../animation/Page.tsx";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import {
  Activity,
  Calendar,
  Save,
  Shield,
  Trash2,
  User,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import Avatar from "../components/img/Avatar.tsx";
import {
  getUserRoleBadgeColor,
  getUserStatusBadgeColor,
} from "../utils/colorUtils.ts";
import type { DropdownOption } from "../types/types.ts";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import FormTextArea from "../components/input/FormTextarea.tsx";
import { useNavigate } from "react-router-dom";

const userRolesDropdownOptions: DropdownOption[] = [
  {
    label: "USER",
    value: "USER",
  },
  {
    label: "MODERATOR",
    value: "MODERATOR",
  },
  {
    label: "ADMIN",
    value: "ADMIN",
  },
];

const userStatusesDropdownOptions: DropdownOption[] = [
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Blocked",
    value: "BLOCKED",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },
];

const AdminUserForm = () => {
  const navigate = useNavigate();

  return (
    <Page className={"min-h-screen p-6 flex flex-col gap-8 w-full"}>
      <AdminManagementPanelHeader
        title={"Edit User"}
        content={
          <AnimatedButton
            bgColor={"#222222"}
            borderColorHover={"#ef4444"}
            bgColorHover={"#ef4444"}
            borderColor={"#222222"}
            textColor={"#ef4444"}
            textColorHover={"#222222"}
            className={"flex gap-2 px-4 py-2 rounded-lg items-center"}
          >
            <Trash2 className={"size-4"} />
            Delete User
          </AnimatedButton>
        }
        link={"-1"}
      />
      <div className={"w-full max-w-4xl p-6 mx-auto"}>
        <div className={"grid grid-cols-1 lg:grid-cols-3 gap-6"}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div
              className={
                "rounded-lg flex flex-col gap-6 border-2 p-6 bg-black-200 border-gray-600"
              }
            >
              <div className={"flex justify-center"}>
                <Avatar size={"size-20"} />
              </div>
              <div className={"flex flex-col gap-2"}>
                <p className={"text-xl font-bold text-center text-white-100"}>
                  john_doe
                </p>
                <h3 className={"text-sm  text-center text-white-100"}>
                  john@example.com
                </h3>
              </div>
              <div className={"flex justify-center gap-2"}>
                <span
                  className={
                    "px-2 py-1 rounded text-xs font-medium text-black-100"
                  }
                  style={{
                    backgroundColor: getUserRoleBadgeColor("USER"),
                  }}
                >
                  USER
                </span>
                <span
                  className="px-2 py-1 rounded text-xs font-medium text-black-100"
                  style={{
                    backgroundColor: getUserStatusBadgeColor("ACTIVE"),
                  }}
                >
                  ACTIVE
                </span>
              </div>

              <div className={"space-y-4"}>
                <div className={"flex items-center gap-3"}>
                  <Activity className={"size-5 text-teal-100"} />
                  <div>
                    <p className={"text-sm text-gray-400"}>Posts</p>
                    <p className={"font-semibold text-white-100"}>2344</p>
                  </div>
                </div>
                <div className={"flex items-center gap-3"}>
                  <User className={"size-5 text-cyan-100"} />
                  <div>
                    <p className={"text-sm text-gray-400"}>Followers</p>
                    <p className={"font-semibold text-white-100"}>2344</p>
                  </div>
                </div>
                <div className={"flex items-center gap-3"}>
                  <Calendar className={"size-5 text-teal-100"} />
                  <div>
                    <p className={"text-sm text-gray-400"}>Joined</p>
                    <p className={"font-semibold text-white-100"}>
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={
              "lg:col-span-2 rounded-lg border-2 bg-black-200 border-gray-600"
            }
          >
            <header
              className={
                "p-6 border-b-2 border-gray-600 flex items-center gap-3"
              }
            >
              <Shield className={"size-6 text-teal-100"} />
              <div>
                <h2 className={"text-xl font-bold text-white-100"}>
                  User Settings
                </h2>
                <p className={"text-gray-400"}>
                  Manage user account and permissions
                </p>
              </div>
            </header>

            <form className={"p-6 flex flex-col gap-6"}>
              <DropdownMenu
                options={userRolesDropdownOptions}
                onChange={() => {}}
                value={"USER"}
                placeholderChildren={<div>ROLE:</div>}
              />
              <DropdownMenu
                options={userStatusesDropdownOptions}
                onChange={() => {}}
                value={"ACTIVE"}
                placeholderChildren={<div>STATUS:</div>}
              />
              <FormTextArea title={"Bio"} rows={4} canAdminManage={true} />

              <div className={"w-full flex gap-6"}>
                <AnimatedButton
                  bgColor={"#171719"}
                  borderColor={"#171719"}
                  borderColorHover={"#14b8a6"}
                  textColor={"#b0b0b0"}
                  type={"button"}
                  onClick={() => navigate(-1)}
                  className={
                    "w-full h-[50px] rounded-lg flex items-center justify-center gap-2"
                  }
                >
                  <X className={"size-5"} /> Cancel
                </AnimatedButton>
                <AnimatedButton
                  bgColor={"#171719"}
                  textColor={"#14b8a6"}
                  borderColor={"#14b8a6"}
                  borderColorHover={"#14b8a6"}
                  type={"submit"}
                  className={
                    "w-full h-[50px] rounded-lg flex items-center justify-center gap-2"
                  }
                >
                  <Save className={"size-5"} /> Save Changes
                </AnimatedButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </Page>
  );
};

export default AdminUserForm;
