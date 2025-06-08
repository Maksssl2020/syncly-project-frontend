import Page from "../animation/Page.tsx";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Avatar from "../components/img/Avatar.tsx";
import {
  getUserRoleBadgeColor,
  getUserStatusBadgeColor,
} from "../utils/colorUtils.ts";

const AdminUserForm = () => {
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
      <div className={"max-w-4xl p-6 mx-auto"}>
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
            </div>
          </motion.div>
        </div>
      </div>
    </Page>
  );
};

export default AdminUserForm;
