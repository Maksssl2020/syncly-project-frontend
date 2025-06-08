import React from "react";

type PageHeaderContainerProps = {
  children: React.ReactNode;
};

const PageHeaderContainer = ({ children }: PageHeaderContainerProps) => {
  return (
    <div className={"rounded-lg p-6 border-2 bg-black-200 border-gray-600"}>
      <div
        className={
          "flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default PageHeaderContainer;
