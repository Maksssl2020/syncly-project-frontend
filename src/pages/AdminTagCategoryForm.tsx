import { motion } from "framer-motion";
import Page from "../animation/Page.tsx";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import { useForm } from "react-hook-form";
import { Folder, Save, X } from "lucide-react";
import FormInput from "../components/input/FormInput.tsx";
import FormTextArea from "../components/input/FormTextarea.tsx";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { tagCategoryValidator } from "../validators/tagCategoryValidator.ts";
import useCreateTagCategoryMutation from "../hooks/mutations/useCreateTagCategoryMutation.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import type { TagCategoryRequest } from "../types/tagCategory.ts";

const AVAILABLE_COLORS = [
  { name: "Teal", value: "#14b8a6" },
  { name: "Cyan", value: "#22d3ee" },
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

const AdminTagCategoryForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    description: "",
    color: AVAILABLE_COLORS[0].value,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(tagCategoryValidator),
    defaultValues: initialValues,
  });

  const { createTagCategory, creatingTagCategory } =
    useCreateTagCategoryMutation(() => {
      reset(initialValues);
    });

  if (creatingTagCategory) {
    return <Spinner />;
  }

  const onSubmit = (data: TagCategoryRequest) => {
    createTagCategory(data);
  };

  return (
    <Page className={"min-h-screen p-6  flex flex-col gap-8 w-full"}>
      <AdminManagementPanelHeader
        title={"Create New Tag Category"}
        content={""}
        link={"-1"}
      />

      <div className={"max-w-2xl w-full p-6 self-center gap-6 flex flex-col"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border-2 bg-black-200 border-gray-600"
        >
          <header
            className={"p-6 border-b-2 border-gray-600 flex items-center gap-3"}
          >
            <div
              className={"size-12 rounded-lg flex items-center justify-center"}
              style={{
                backgroundColor: watch("color"),
              }}
            >
              <Folder className={"size-6 text-black-100"} />
            </div>
            <div>
              <h2 className={"text-xl font-bold text-white-100"}>
                Category Information
              </h2>
              <p className={"text-gray-400"}>
                Create a new category for organizing tags
              </p>
            </div>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={"p-6 flex flex-col gap-6"}
          >
            <FormInput
              title={"Category Name *"}
              type={"text"}
              register={register("name")}
              error={errors?.name?.message}
            />
            <FormTextArea
              title={"Description *"}
              rows={4}
              register={register("description")}
              error={errors?.description?.message}
            />

            <div className={"flex flex-col gap-3"}>
              <label className="text-white-100 ml-1 flex items-center gap-1 text-sm font-medium md:text-lg">
                Category Color *
              </label>
              <div className={"grid grid-cols-6 gap-3"}>
                {AVAILABLE_COLORS.map((color) => (
                  <motion.button
                    animate={{
                      borderColor:
                        watch("color") === color.value ? "#e6e6e6" : "#4d4d4d",
                    }}
                    key={color.value}
                    type={"button"}
                    onClick={() => setValue("color", color.value)}
                    className={"size-12 rounded-lg border-2 cursor-pointer"}
                    style={{
                      backgroundColor: color.value,
                    }}
                  ></motion.button>
                ))}
              </div>
            </div>

            <div className={"flex gap-3 mt-4"}>
              <AnimatedButton
                bgColor={"#171719"}
                bgColorHover={"#393939"}
                borderColor={"#171719"}
                borderColorHover={"#393939"}
                textColor={"#e6e6e6"}
                textColorHover={"#14b8a6"}
                className={
                  "flex gap-2 w-full justify-center items-center py-3 rounded-lg"
                }
                type={"button"}
                onClick={() => navigate(-1)}
              >
                <X className={"size-5"} />
                Cancel
              </AnimatedButton>
              <AnimatedButton
                bgColor={"#171719"}
                borderColor={"#14b8a6"}
                borderColorHover={"#14b8a6"}
                textColor={"#14b8a6"}
                textColorHover={"#111111"}
                className={
                  "flex gap-2 w-full justify-center items-center py-3 rounded-lg"
                }
                type={"submit"}
              >
                <Save className={"size-5"} />
                Create Tag Category
              </AnimatedButton>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className=" rounded-lg border-2 bg-black-200 border-gray-600"
        >
          <div
            className={"p-4 border-b-2 border-gray-600"}
            style={{ backgroundColor: watch("color") }}
          >
            <div className={"flex items-center gap-3 text-black-100"}>
              <Folder className={"size-8 "} />
              <div>
                <h3 className={"text-lg font-bold "}>
                  {watch("name") === "" ? "Category Name" : watch("name")}
                </h3>
                <p className={"text-sm"}>0 tags</p>
              </div>
            </div>
          </div>

          <div className={"p-4"}>
            <h4 className={"text-lg font-bold mt-2 text-white-100"}>Preview</h4>
            <p className={"text-gray-400"}>
              {watch("description") === ""
                ? "Tag category description will appear here..."
                : watch("description")}
            </p>
          </div>
        </motion.div>
      </div>
    </Page>
  );
};

export default AdminTagCategoryForm;
