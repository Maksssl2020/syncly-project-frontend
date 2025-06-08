import { motion } from "framer-motion";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type FormInputProps = {
  title: string;
  type: "text" | "email" | "password" | "url";
  error?: string;
  register?: UseFormRegisterReturn<string>;
  onChange?: (value: string) => void;
  inputWidth?: string;
  inputHeight?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  canShowPassword?: boolean;
};

const FormInput = ({
  title,
  type,
  error,
  register,
  onChange,
  defaultValue,
  required = false,
  canShowPassword = true,
  placeholder,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleButtonClick = () => {
    if (type === "password" && showPassword) {
      setShowPassword(false);
      setInputType("password");
    } else if (type === "password" && !showPassword) {
      setShowPassword(true);
      setInputType("text");
    }
  };

  return (
    <div className={"flex flex-col gap-3"}>
      <label className="text-white-100 ml-1 flex items-center gap-1 text-sm font-medium md:text-lg">
        {title}
        {required && <span className="text-red-200">*</span>}
      </label>

      <div className={"w-full flex items-center h-[50px] relative"}>
        <motion.input
          whileFocus={{ borderColor: "#14b8a6" }}
          animate={{ borderColor: error ? "#FB2C36" : "#4a4a4d" }}
          type={inputType}
          placeholder={placeholder}
          autoFocus={false}
          className={`bg-black-300 placeholder:text-gray-400 text-white-100 h-12 w-full rounded-lg border-2 px-3 outline-none md:h-14 md:text-lg`}
          onChange={(e) => onChange?.(e.target.value)}
          defaultValue={defaultValue}
          {...register}
        />

        {type === "password" && canShowPassword && (
          <button
            type={"button"}
            onClick={handleButtonClick}
            className={
              "absolute right-0 size-10 cursor-pointer flex items-center justify-center text-gray-400"
            }
          >
            {showPassword ? (
              <EyeOff className={"size-7"} />
            ) : (
              <Eye className={"size-7"} />
            )}
          </button>
        )}
      </div>
      <p className={"h-[20px] pl-3 text-sm text-red-500 select-none"}>
        {error && error}
      </p>
    </div>
  );
};

export default FormInput;
