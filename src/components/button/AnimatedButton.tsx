import { motion } from "framer-motion";
import * as React from "react";

type AnimatedCustomButtonProps = {
  bgColorHover?: string;
  textColorHover?: string;
  borderColorHover?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

const AnimatedButton = ({
  textColorHover = "#0a0a0c",
  bgColor = "#0a0a0c",
  bgColorHover = "#14b8a6",
  textColor = "#E6E6E6",
  borderColor,
  borderColorHover,
  className,
  children,
  onClick,
  type,
  loading,
  disabled,
}: AnimatedCustomButtonProps) => {
  return (
    <motion.button
      whileHover={{
        color: textColorHover,
        backgroundColor: bgColorHover,
        borderColor: borderColorHover,
      }}
      style={{
        color: textColor,
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
      className={`cursor-pointer border-2 ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
