type LabelProps = {
  title: string;
  data?: string | number;
};

const Label = ({ title, data }: LabelProps) => {
  return (
    <div className={"flex flex-col gap-3 select-none w-full"}>
      <label className="text-white-100 select-text ml-1 flex items-center gap-1 text-lg font-medium ">
        {title}
      </label>
      <div
        className={
          "p-4 w-auto h-auto select-text text-white-100 flex items-center bg-black-300  rounded-lg"
        }
      >
        {data}
      </div>
    </div>
  );
};

export default Label;
