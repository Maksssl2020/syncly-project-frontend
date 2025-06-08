import React from "react";
import { motion } from "framer-motion";

type AnimatedAElementProps = {
  title: string;
  href: string;
  className?: string;
  textColor?: string;
  hoverTextColor?: string;
};

const AnimatedAElement = ({
  title,
  className,
  hoverTextColor = "#14b8a6",
  textColor = "#0d9488",
  href,
}: AnimatedAElementProps) => {
  return (
    <motion.a
      whileHover={{
        color: hoverTextColor,
      }}
      style={{
        color: textColor,
      }}
      className={className}
      href={href}
    >
      {title}
    </motion.a>
  );
};

export default AnimatedAElement;
