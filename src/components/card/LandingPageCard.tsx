import React from "react";

type LandingPageCardProps = {
  className?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
};

const LandingPageCard = ({
  width = "w-[200px]",
  height = "h-[150px]",
  className,
  children,
}: LandingPageCardProps) => {
  return (
    <div className={`${width} ${height} border-2 rounded-lg  ${className}`}>
      {children}
    </div>
  );
};

export default LandingPageCard;
