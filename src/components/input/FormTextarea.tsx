import { motion } from "framer-motion";
import type { UseFormRegisterReturn } from "react-hook-form";

type FormTextAreaProps = {
  title: string;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  width?: string;
  height?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
};

const FormTextArea = ({
  title,
  error,
  register,
  onChange,
  required,
  placeholder,
  rows,
}: FormTextAreaProps) => {
  return (
    <div className={"flex flex-col gap-4 w-full h-full"}>
      {title && (
        <label className="text-white-100 ml-1 flex items-center gap-1 text-lg font-medium md:text-xl">
          {title}
          {required && <span className="text-red-200">*</span>}
        </label>
      )}
      <motion.textarea
        rows={rows}
        whileFocus={{ borderColor: "#14b8a6" }}
        animate={
          error ? { borderColor: "#FB2C36" } : { borderColor: "#4a4a4d" }
        }
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        className={`text-white-100 h-full w-full placeholder:text-gray-400 bg-black-300 resize-none rounded-xl border-2 p-2 text-lg outline-none`}
        {...register}
      />
      <p className={"h-[20px] pl-3 text-sm text-red-500 select-none"}>
        {error && error}
      </p>
    </div>
  );
};

export default FormTextArea;
