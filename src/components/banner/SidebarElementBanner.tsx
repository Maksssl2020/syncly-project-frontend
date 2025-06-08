import type { JSX } from "react";

type SidebarElementBannerProps = {
  icon: JSX.Element;
  title: string;
};

const SidebarElementBanner = ({ icon, title }: SidebarElementBannerProps) => {
  return (
    <h3
      className={"text-lg text-white-100 font-semibold flex items-center gap-2"}
    >
      {icon}
      {title}
    </h3>
  );
};

export default SidebarElementBanner;
