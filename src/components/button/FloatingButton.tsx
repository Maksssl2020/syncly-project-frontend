import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Plus, X } from "lucide-react";

type FloatingButtonProps = {
  isOpen: boolean;
  onClick: (value: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const FloatingButton = ({
  isOpen,
  onClick,
  children,
  className,
}: FloatingButtonProps) => {
  return (
    <div className={`fixed z-50  ${className}`}>
      <AnimatePresence>{isOpen && children}</AnimatePresence>

      <motion.button
        onClick={() => onClick(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className={
          "size-14 cursor-pointer rounded-full shadow-lg bg-teal-100 text-black-100 flex items-center justify-center"
        }
      >
        {isOpen ? <X className={"size-6"} /> : <Plus className={"size-6"} />}
      </motion.button>
    </div>
  );
};

export default FloatingButton;
