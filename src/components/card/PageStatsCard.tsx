import { motion } from "framer-motion";
import type { PageStats } from "../../types/admin.ts";
import { TrendingDown, TrendingUp } from "lucide-react";

type PageStatsCardProps = {
  data: PageStats;
  index: number;
};

const PageStatsCard = ({ data, index }: PageStatsCardProps) => {
  return (
    <motion.div
      key={data.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-lg border-2 p-6 bg-black-200 border-gray-600 "
    >
      <div className={"flex  items-start justify-between mb-4"}>
        <div
          className={"p-3 rounded-lg text-black-200"}
          style={{
            backgroundColor: data.color,
          }}
        >
          {data.icon}
        </div>
        {data.change !== "" && (
          <div
            className={`flex items-center ${Number(data.change) >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {Number(data.change) >= 0 ? (
              <TrendingUp className={"size-5 mr-1"} />
            ) : (
              <TrendingDown className={"size-5 mr-1"} />
            )}
            <span>+{Math.abs(Number(data.change))}</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold mb-1 text-white-100">
        {data.value.toLocaleString()}
      </h3>
      <p className={"text-gray-400"}>{data.title}</p>
    </motion.div>
  );
};

export default PageStatsCard;
