import AnimatedButton from "../button/AnimatedButton.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Pagination = {
  totalPages: number;
  totalItems: number;
  currentPageValue: number;
  currentPageDisplay: number;
  perPage: number;
  onPageChange: (newPage: number) => void;
};

const Pagination = ({
  perPage,
  currentPageValue,
  currentPageDisplay,
  totalPages,
  totalItems,
  onPageChange,
}: Pagination) => {
  const startItem = (currentPageDisplay - 1) * perPage + 1;
  const endItem = Math.min(currentPageDisplay * perPage, totalItems);

  return (
    <div className={"w-fit px-12 py-8 flex items-center gap-8"}>
      <AnimatedButton
        className={
          "size-12 rounded-lg flex items-center justify-center border-2"
        }
        disabled={currentPageValue === 0}
        onClick={() => onPageChange(currentPageValue - 1)}
        borderColor={"#4a4a4d"}
        borderColorHover={"#14b8a6"}
      >
        <ChevronLeft className={"size-8"} />
      </AnimatedButton>
      <div className="text-sm text-white-100">
        {startItem}–{endItem} z {totalItems} (site {currentPageDisplay} of{" "}
        {totalPages})
      </div>
      <AnimatedButton
        className={
          "size-12 rounded-lg flex items-center justify-center border-2"
        }
        disabled={currentPageValue === totalPages}
        onClick={() => onPageChange(currentPageValue + 1)}
        borderColor={"#4a4a4d"}
        borderColorHover={"#14b8a6"}
      >
        <ChevronRight className={"size-8"} />
      </AnimatedButton>
    </div>
  );
};

export default Pagination;
