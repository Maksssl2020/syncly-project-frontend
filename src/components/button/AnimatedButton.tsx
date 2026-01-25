import { type HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";
import ComponentSpinner from "../spinner/ComponentSpinner.tsx";

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
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isSelected?: boolean;
  children: React.ReactNode;
} & HTMLMotionProps<"button">;

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
  isSelected = false,
  ...rest
}: AnimatedCustomButtonProps) => {
  return (
    <motion.button
      whileHover={{
        color: isSelected ? textColor : textColorHover,
        backgroundColor: isSelected ? bgColor : bgColorHover,
        borderColor: isSelected ? borderColor : borderColorHover,
      }}
      style={{
        color: isSelected ? textColorHover : textColor,
        backgroundColor: isSelected ? bgColorHover : bgColor,
        borderColor: isSelected ? borderColorHover : borderColor,
      }}
      className={`cursor-pointer ${className}`}
      onClick={(event) => onClick?.(event)}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {loading ? <ComponentSpinner /> : <>{children}</>}
    </motion.button>
  );
};

export default AnimatedButton;
