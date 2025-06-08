import type { DropdownOption } from "../../types/types.ts";
import useClickOutside from "../../hooks/useClickOutside.ts";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";

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
    <div ref={ref} className={`relative w-full  ${className}`}>
      <motion.button
        whileTap={{ scale: 0.98 }}
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-hidden border-2 bg-black-200 border-gray-600"
          >
            <div className={"max-h-50 overflow-y-auto py-1"}>
              {options.map((option) => (
                <motion.div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  whileHover={{ backgroundColor: "#2c2c2e" }}
                  animate={{
                    color: value === option.value ? "#14b8a6" : "#e6e6e6",
                    backgroundColor:
                      value === option.value ? "#171719" : "#222222",
                  }}
                  className={"px-4 py-2 cursor-pointer"}
                >
                  {option.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
