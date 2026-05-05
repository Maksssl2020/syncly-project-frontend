import { ChevronLeft, ChevronRight } from "lucide-react";

type NavigationArrows = {
  onPreviousClick: () => void;
  onNextClick: () => void;
};

const NavigationArrows = ({
  onPreviousClick,
  onNextClick,
}: NavigationArrows) => {
  return (
    <>
      <button
        onClick={onPreviousClick}
        className="absolute left-3 border-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white-100 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black-100/75"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        onClick={onNextClick}
        className="absolute right-3 border-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white-100 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black-100/75"
      >
        <ChevronRight className="size-6" />
      </button>
    </>
  );
};
export default NavigationArrows;
