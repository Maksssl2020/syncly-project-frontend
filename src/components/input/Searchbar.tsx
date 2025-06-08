import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

type SearchbarProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

const Searchbar = ({
  value,
  onChange,
  placeholder = "Szukaj...",
}: SearchbarProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
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
      <motion.div
        animate={{
          color: isFocused ? "#14b8a6" : "#b0b0b0",
        }}
        className="flex h-full w-12 items-center justify-center select-none"
      >
        <Search className={"size-6"} />
      </motion.div>

      <input
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="text-white-100 h-full w-full bg-transparent px-1 outline-none placeholder:text-gray-300"
      />

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={handleClear}
        className="hover:text-white-100 flex h-full w-10 items-center justify-center text-gray-300"
      >
        {inputValue && <X className="h-4 w-4" />}
      </motion.button>
    </motion.div>
  );
};

export default Searchbar;
