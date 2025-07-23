import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import React, { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type FormFileInputProps = {
  title: string;
  description?: string;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  onChange?: (value: File | undefined) => void;
  onChangeMultiple?: (value: File[] | undefined) => void;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  onClick?: () => void;
};

const FormFileInput = ({
  maxFiles,
  multiple,
  onChangeMultiple,
  onChange,
  register,
  error,
  title,
  description,
  accept,
  onClick,
}: FormFileInputProps) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    let filesArray = Array.from(newFiles);

    if (multiple) {
      filesArray = filesArray.slice(0, maxFiles);
      onChangeMultiple?.(filesArray);
    } else {
      onChange?.(filesArray[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggedOver(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div className={"flex flex-col"}>
      <motion.label
        whileHover={{
          color: "#14b8a6",
          borderColor: "#14b8a6",
        }}
        animate={{
          color: isDraggedOver ? "#14b8a6" : "#e6e6e6",
          borderColor: isDraggedOver
            ? "#14b8a6"
            : error
              ? "#FB2C36"
              : "#4a4a4d",
          backgroundColor: "#171719",
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDraggedOver(true);
        }}
        onDragLeave={() => setIsDraggedOver(false)}
        onDrop={handleDrop}
        onClick={onClick}
        htmlFor={"filesInput"}
        className={
          "border-2 border-dashed rounded-lg p-8 text-center border-gray-600"
        }
      >
        <Camera className={"size-12 mx-auto mb-4 stroke-1"} />
        <p className={"mb-4"}>{title}</p>
        <p className={"text-xs mt-2 "}>{description}</p>
      </motion.label>
      <input
        id={"filesInput"}
        type={"file"}
        className={"size-0 border-none outline-none"}
        onChange={(event) => handleFiles(event.target.files)}
        multiple={multiple}
        accept={accept}
        {...register}
      />
      <p className={"h-[20px] pl-3 text-sm text-red-500 select-none"}>
        {error && error}
      </p>
    </div>
  );
};

export default FormFileInput;
