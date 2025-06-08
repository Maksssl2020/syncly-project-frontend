import type React from "react";
import { useState } from "react";

import { motion } from "framer-motion";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Check } from "lucide-react";

type FormCheckboxProps = {
  title: string;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  onChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  required?: boolean;
  description?: string;
  className?: string;
};

const FormCheckbox = ({
  title,
  error,
  register,
  onChange,
  defaultChecked = false,
  required = false,
  description,
  className = "bg-black-400 flex size-10 cursor-pointer items-center justify-center rounded-md border-2",
}: FormCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-white-100 ml-1 flex items-center gap-1 text-lg font-medium md:text-xl">
        {title}
        {required && <span className="text-red-200">*</span>}
      </label>

      <div className="flex items-start gap-3">
        <label className="relative flex h-12 items-center">
          <input
            type="checkbox"
            className="peer absolute h-0 w-0 opacity-0"
            defaultChecked={defaultChecked}
            onChange={handleChange}
            {...register}
          />
          <motion.div
            whileHover={{ borderColor: "#14b8a6" }}
            animate={{
              borderColor: error
                ? "#FB2C36"
                : isChecked
                  ? "#14b8a6"
                  : "#4a4a4d",
              backgroundColor: "#171719",
            }}
            className={className}
          >
            {isChecked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check className="size-6 stroke-[3] text-teal-100" />
              </motion.div>
            )}
          </motion.div>
        </label>

        {description && (
          <p className="mt-0.5 text-sm text-gray-300">{description}</p>
        )}
      </div>

      <p className="h-[20px] pt-3 pl-3 text-lg text-red-500 select-none">
        {error && error}
      </p>
    </div>
  );
};

export default FormCheckbox;
