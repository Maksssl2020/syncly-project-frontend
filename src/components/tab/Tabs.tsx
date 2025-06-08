import type { TabData } from "../../types/types.ts";
import Tab from "./Tab.tsx";

type TabsProps = {
  data: TabData[];
  activeTabId: string;
  onClick: (id: string) => void;
  className?: string;
};

const Tabs = ({ data, activeTabId, onClick, className = "" }: TabsProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {data.map((tab) => (
        <Tab
          key={tab.id}
          data={tab}
          activeTabId={activeTabId}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default Tabs;
