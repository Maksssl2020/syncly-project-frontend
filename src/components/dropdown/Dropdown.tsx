import { AnimatePresence, motion } from "framer-motion";
import type { DropdownOption } from "../../types/types.ts";

type DropdownProps = {
  isOpen: boolean;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  onClose: () => void;
  value?: string;
  dropdownWidth?: string;
};

const Dropdown = ({
  isOpen,
  options,
  onChange,
  onClose,
  value,
  dropdownWidth,
}: DropdownProps) => {
  const getTextColor = (optionValue?: string) => {
    if (value !== undefined && optionValue) {
      return value === optionValue ? "#14b8a6" : "#e6e6e6";
    }

    return "#e6e6e6";
  };

  const getBackgroundColor = (optionValue?: string) => {
    if (value !== undefined && optionValue) {
      return value === optionValue ? "#171719" : "#222222";
    }

    return "#222222";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className={`absolute z-50 mt-1 rounded-lg shadow-lg overflow-hidden border-2 bg-black-200 border-gray-600 ${dropdownWidth ? dropdownWidth : "w-full"}`}
        >
          <div className={"max-h-50 overflow-y-auto py-1"}>
            {options.map((option) => (
              <motion.div
                key={option.value}
                onClick={() => {
                  onChange?.(option.value ?? "");
                  option.onClick?.();
                  onClose();
                }}
                whileHover={{
                  backgroundColor: "#2c2c2e",
                }}
                animate={{
                  color: getTextColor(option.value),
                  backgroundColor: getBackgroundColor(option.value),
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
  );
};

export default Dropdown;
