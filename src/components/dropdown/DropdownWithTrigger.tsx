import { type JSX } from "react";
import useClickOutside from "../../hooks/useClickOutside.ts";
import { motion } from "framer-motion";
import type { DropdownOption } from "../../types/types.ts";
import Dropdown from "./Dropdown.tsx";

type DropdownWithTriggerProps = {
  className?: string;
  trigger: JSX.Element;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  value?: string;
  dropdownWidth?: string;
};

const DropdownWithTrigger = ({
  className,
  trigger,
  value,
  options,
  onChange,
  dropdownWidth,
}: DropdownWithTriggerProps) => {
  const { isOpen, setIsOpen, ref } = useClickOutside(false);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.button
        type={"button"}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{
          color: "#14b8a6",
          backgroundColor: "#393939",
        }}
        className={
          "flex items-center cursor-pointer p-2 rounded-lg text-white-100"
        }
      >
        {trigger}
      </motion.button>

      <Dropdown
        isOpen={isOpen}
        options={options}
        value={value}
        onClose={() => setIsOpen(false)}
        onChange={(value) => onChange?.(value)}
        dropdownWidth={dropdownWidth}
      />
    </div>
  );
};

export default DropdownWithTrigger;
