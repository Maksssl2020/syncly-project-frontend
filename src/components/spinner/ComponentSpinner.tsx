import { DotLoader } from "react-spinners";

const ComponentSpinner = ({
  size = 20,
  color = "#14b8a6",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <div className="flex items-center justify-center">
      <DotLoader color={color} size={size} className={"z-60"} />
    </div>
  );
};

export default ComponentSpinner;
