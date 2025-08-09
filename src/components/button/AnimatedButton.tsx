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
  ...rest
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
