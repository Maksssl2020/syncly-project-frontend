import type { DropdownOption } from "../../types/types.ts";
import useClickOutside from "../../hooks/useClickOutside.ts";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";
import Dropdown from "./Dropdown.tsx";

type DropdownMenuProps = {
  options: DropdownOption[];
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  placeholderChildren?: React.ReactNode;
  className?: string;
};

const DropdownMenu = ({
  options,
  className,
  placeholder,
  placeholderChildren,
  onChange,
  value,
}: DropdownMenuProps) => {
  const selectedOption = options.find((option) => option.value === value);
  const { isOpen, setIsOpen, ref } = useClickOutside(false);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <motion.button
        type={"button"}
        onClick={() => setIsOpen(!isOpen)}
        className={
          "flex items-center h-full justify-between w-full  px-4 py-2 rounded-lg focus:outline-none border-2 bg-black-300 border-gray-600 text-white-100"
        }
      >
        <motion.div
          className={"flex gap-4"}
          animate={{
            color: selectedOption ? "#e6e6e6" : "#b0b0b0",
          }}
        >
          {placeholderChildren}
          {selectedOption ? selectedOption.label : placeholder}
        </motion.div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-4 text-gray-400" />
        </motion.div>
      </motion.button>

      <Dropdown
        isOpen={isOpen}
        options={options}
        value={value}
        onClose={() => setIsOpen(false)}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};

export default DropdownMenu;
