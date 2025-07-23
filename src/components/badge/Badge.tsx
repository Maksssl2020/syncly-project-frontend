import React from "react";

type BadgeProps = {
  title?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
  children?: React.ReactNode;
};

const Badge = ({
  title,
  borderColor,
  bgColor,
  textColor,
  className,
  children,
}: BadgeProps) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
      }}
      className={`w-fit h-fit px-4 py-1 rounded-full flex text-center ${className}`}
    >
      {title ?? children}
    </div>
  );
};

export default Badge;
