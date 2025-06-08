import AnimatedGoBackButton from "../button/AnimatedGoBackButton.tsx";
import React from "react";

type AdminManagementPanelHeaderProps = {
  title: string;
  content: string | React.ReactNode;
  link?: string;
};

const AdminManagementPanelHeader = ({
  title,
  content,
  link = "/admin/panel",
}: AdminManagementPanelHeaderProps) => {
  return (
    <div
      className={
        "border-b-2 px-6 py-4 flex items-center justify-between bg-black-200 rounded-t-lg text-gray-600"
      }
    >
      <div className={"flex items-center gap-4"}>
        <AnimatedGoBackButton
          title={link !== "/admin/panel" ? "" : "Back To Panel"}
          link={link}
        />
        <h1 className={"text-xl font-bold text-white-100"}>{title}</h1>
      </div>
      <div className={"flex items-center gap-2 text-gray-400"}>{content}</div>
    </div>
  );
};

export default AdminManagementPanelHeader;
