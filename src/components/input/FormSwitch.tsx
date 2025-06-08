import { motion } from "framer-motion";

type FormSwitchProps = {
  label: string;
  onChange: (checked: boolean) => void;
  description?: string;
  checked?: boolean;
};

const FormSwitch = ({
  checked,
  onChange,
  description,
  label,
}: FormSwitchProps) => {
  return (
    <div className={"flex items-center justify-between"}>
      <div>
        <div className={"font-medium text-white-100"}>{label}</div>
        {description && (
          <div className={"text-gray-400 text-sm"}>{description}</div>
        )}
      </div>
      <motion.button
        onClick={() => onChange(!checked)}
        animate={{
          backgroundColor: checked ? "#14b8a6" : "#4a4a4d",
          borderColor: checked ? "#14b8a6" : "#4a4a4d",
        }}
        whileTap={{ scale: 0.95 }}
        className={"relative w-12 h-6 rounded-full border-2"}
      >
        <motion.div
          animate={{
            x: checked ? 22 : 2,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={"absolute size-4 rounded-full top-0.5 bg-white-100"}
        />
      </motion.button>
    </div>
  );
};

export default FormSwitch;
