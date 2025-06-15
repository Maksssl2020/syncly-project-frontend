import { DotLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className={"fixed inset-0 z-20 flex items-center justify-center"}>
      <div className={"fixed inset-0 z-20 backdrop-blur-lg"} />
      <DotLoader color={"#14b8a6"} size={36} />
    </div>
  );
};

export default Spinner;
