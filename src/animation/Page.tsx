import { motion } from "framer-motion";
import React from "react";

type PageProps = {
  children: React.ReactNode;
  className?: string;
};

const Page = ({ children, className }: PageProps) => {
  return (
    <motion.div
      className={`scrollbar ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "tween" }}
    >
      {children}
    </motion.div>
  );
};

export default Page;
