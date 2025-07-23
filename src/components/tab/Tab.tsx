import { motion } from "framer-motion";
import type { TabData } from "../../types/types.ts";

type TabProps = {
  data: TabData;
  onClick: (id: string) => void;
  activeTabId: string;
  className?: string;
};

const Tab = ({ data, activeTabId, onClick, className }: TabProps) => {
  return (
    <motion.button
      key={data.id}
      onClick={() => onClick(data.id)}
      whileHover={{
        backgroundColor: "#2c2c2e",
      }}
      whileTap={{
        scale: 0.98,
      }}
      animate={{
        backgroundColor: data.id === activeTabId ? "#2c2c2e" : "#222222",
        color: data.id === activeTabId ? "#14b8a6" : "#b0b0b0",
        borderColor: data.id === activeTabId ? "#14b8a6" : "#4a4a4d",
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer ${className}`}
    >
      {data.icon}
      {data.label}
      {data.count !== undefined && (
        <span
          className={
            "text-xs px-2 py-1 rounded-full bg-gray-600 text-white-100"
          }
        >
          {data.count}
        </span>
      )}
    </motion.button>
  );
};

export default Tab;
