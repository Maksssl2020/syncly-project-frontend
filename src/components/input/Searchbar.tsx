import { motion } from "framer-motion";
import { useState } from "react";
import { Search, X } from "lucide-react";

type SearchbarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Searchbar = ({
  value,
  onChange,
  placeholder = "Szukaj...",
}: SearchbarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange("");
  };

  return (
    <motion.div
      animate={{
        borderColor: isFocused ? "#14b8a6" : "#4a4a4d",
        boxShadow: isFocused ? "0 0 0 2px rgba(51, 130, 255, 0.2)" : "none",
      }}
      className="bg-black-100 flex h-12 w-full overflow-hidden rounded-lg border-2"
    >
      <div className="flex h-full w-12 items-center justify-center select-none text-gray-500">
        <Search className="size-6" />
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="text-white-100 h-full w-full bg-transparent px-1 outline-none placeholder:text-gray-300"
      />

      <motion.button
        onClick={handleClear}
        className="hover:text-white-100 flex h-full w-10 items-center justify-center text-gray-300"
      >
        {value && <X className="h-4 w-4" />}
      </motion.button>
    </motion.div>
  );
};

export default Searchbar;
