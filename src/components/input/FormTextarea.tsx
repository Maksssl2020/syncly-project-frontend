import { motion } from "framer-motion";
import type { UseFormRegisterReturn } from "react-hook-form";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Trash2 } from "lucide-react";

type FormTextAreaProps = {
  title: string;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  onChange?: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  canAdminManage?: boolean;
  onReset?: () => void;
};

const FormTextArea = ({
  title,
  error,
  register,
  onChange,
  required,
  placeholder,
  rows,
  canAdminManage,
  onReset,
}: FormTextAreaProps) => {
  return (
    <div className={"flex flex-col gap-4 w-full h-full"}>
      <div className={"flex items-center justify-between"}>
        {title && (
          <label className="text-white-100 ml-1 flex items-center gap-1 text-lg font-medium md:text-xl">
            {title}
            {required && <span className="text-red-200">*</span>}
          </label>
        )}
        {canAdminManage && (
          <AnimatedButton
            type={"button"}
            bgColor={"#222222"}
            borderColor={"#ef4444"}
            borderColorHover={"#ef4444"}
            bgColorHover={"#ef4444"}
            textColor={"#ef4444"}
            onClick={() => onReset?.()}
            className={"size-7 rounded-lg flex items-center justify-center"}
          >
            <Trash2 className={"size-4"} />
          </AnimatedButton>
        )}
      </div>
      <motion.textarea
        rows={rows}
        whileFocus={{ borderColor: "#14b8a6" }}
        animate={
          error ? { borderColor: "#ef4444" } : { borderColor: "#4a4a4d" }
        }
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        className={`text-white-100 h-full w-full placeholder:text-gray-400 bg-black-300 resize-none rounded-xl border-2 p-2 text-lg outline-none`}
        {...register}
      />
      <p className={"h-[20px] pl-3 text-sm text-red-100 select-none"}>
        {error && error}
      </p>
    </div>
  );
};

export default FormTextArea;
