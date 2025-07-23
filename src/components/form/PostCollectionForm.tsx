import { motion } from "framer-motion";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Check, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postCollectionFormValidator } from "../../validators/postCollectionFormValidator.ts";
import FormInput from "../input/FormInput.tsx";
import useCreatePostCollectionMutation from "../../hooks/mutations/useCreatePostCollectionMutation.ts";
import useCheckPostCollectionExistsMutation from "../../hooks/mutations/useCheckPostCollectionExistsMutation.ts";
import toast from "react-hot-toast";

const AVAILABLE_COLORS = [
  { name: "Teal Dark", value: "#0d9488" },
  { name: "Cyan Dark", value: "#06b6d4" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
  { name: "Orange", value: "#f97316" },
  { name: "Red", value: "#ef4444" },
  { name: "Yellow", value: "#eab308" },
  { name: "Indigo", value: "#6366f1" },
];

type PostCollectionFormProps = {
  onClose: () => void;
};

const PostCollectionForm = ({ onClose }: PostCollectionFormProps) => {
  const { register, setValue, handleSubmit, watch } = useForm({
    resolver: yupResolver(postCollectionFormValidator),
  });

  const { createPostCollection, creatingPostCollection } =
    useCreatePostCollectionMutation();
  const { checkPostCollectionExists } = useCheckPostCollectionExistsMutation();

  const onSubmit = async ({
    title,
    color,
  }: {
    title: string;
    color: string;
  }) => {
    const result = await checkPostCollectionExists(title);

    if (result) {
      toast.error("Post collection already exists.");
    } else {
      createPostCollection({
        title: title,
        color: color,
      });
    }
  };

  return (
    <motion.div
      key="create-form"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <FormInput
        title={"Collection title"}
        type={"text"}
        register={register("title")}
      />

      {/* Color Selection */}
      <div>
        <label className="block text-white-100 font-medium mb-3">
          Collection Color
        </label>
        <div className="grid grid-cols-4 gap-3">
          {AVAILABLE_COLORS.map((color) => (
            <motion.button
              key={color.value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setValue("color", color.value)}
              className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                watch("color") === color.value
                  ? "border-white-100 shadow-lg"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {watch("color") === color.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="size-5 text-white drop-shadow-lg" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-black-300 border-2 border-gray-600 rounded-lg">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: watch("color") }}
          />
          <span className="text-white-100 font-medium">
            {watch("title") || "Collection Name"}
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-1">0 posts</p>
      </div>

      <div className="flex gap-3">
        <AnimatedButton
          onClick={onClose}
          className="flex-1 px-4 py-3 rounded-lg"
          bgColor="#222222"
          bgColorHover="#393939"
          textColor="#b0b0b0"
        >
          Back
        </AnimatedButton>
        <AnimatedButton
          onClick={handleSubmit((data) =>
            onSubmit({
              title: data.title,
              color: data.color,
            }),
          )}
          disabled={creatingPostCollection}
          className="flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2"
          bgColor="#14b8a6"
          bgColorHover="#0d9488"
          textColor="#0a0a0c"
        >
          {creatingPostCollection ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-4 h-4 border-2 border-black-400 border-t-transparent rounded-full"
              />
              Creating...
            </>
          ) : (
            <>
              <Plus className="size-4" />
              Create & Save
            </>
          )}
        </AnimatedButton>
      </div>
    </motion.div>
  );
};

export default PostCollectionForm;
