import type { ToggleOption } from "../../types/types.ts";
import { motion } from "framer-motion";

type ViewToggleProps = {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const ViewToggle = ({
  options,
  onChange,
  value,
  className,
}: ViewToggleProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {options.map((option, index) => (
        <motion.button
          key={option.value + index}
          onClick={() => onChange(option.value)}
          whileHover={{
            backgroundColor: value === option.value ? "#0d9488" : "#2c2c2e",
          }}
          whileTap={{
            scale: 0.95,
          }}
          animate={{
            backgroundColor: value === option.value ? "#14b8a6" : "#222222",
            color: value === option.value ? "#111111" : "#b0b0b0",
          }}
          className={"p-2 rounded-lg cursor-pointer"}
        >
          {option.icon}
        </motion.button>
      ))}
    </div>
  );
};

export default ViewToggle;
