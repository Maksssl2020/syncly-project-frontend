import { motion } from "framer-motion";
import Page from "../animation/Page";
import AdminManagementPanelHeader from "../components/header/AdminManagementPanelHeader.tsx";
import { Hash, Save, X } from "lucide-react";
import FormInput from "../components/input/FormInput.tsx";
import { useForm } from "react-hook-form";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import Badge from "../components/badge/Badge.tsx";
import { useNavigate, useParams } from "react-router-dom";
import DropdownMenu from "../components/dropdown/DropdownMenu.tsx";
import useTagCategoriesQuery from "../hooks/queries/useTagCategoriesQuery.ts";
import { useEffect, useState } from "react";
import type { DropdownOption } from "../types/types.ts";
import type { TagCategory } from "../types/tagCategory.ts";
import useCreateMainTagMutation from "../hooks/mutations/useCreateMainTagMutation.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUpdateTagValidator } from "../validators/createUpdateTagValidator.ts";
import useTagToEditByIdQuery from "../hooks/queries/useTagToEditByIdQuery.ts";
import type { TagToEdit } from "../types/tags.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import useUpdateAdminTagRequestMutation from "../hooks/mutations/useUpdateAdminTagRequestMutation.ts";

const AdminTagForm = ({ isEdit = false }: { isEdit: boolean }) => {
  const { tagId } = useParams();
  const navigate = useNavigate();
  const [tagCategoriesToChoose, setTagCategoriesToChoose] = useState<
    DropdownOption[]
  >([]);
  const [chosenTagCategory, setChosenTagCategory] = useState<
    TagCategory | undefined
  >(undefined);
  const [tagToEditInitialData, setTagToEditInitialData] = useState<
    TagToEdit | undefined
  >(undefined);
  const { tagCategories, fetchingTagCategories } = useTagCategoriesQuery();
  const { tagToEditData, fetchingTagToEditData } = useTagToEditByIdQuery(tagId);
  const { updateTag, updatingTag } = useUpdateAdminTagRequestMutation(() =>
    navigate(-1),
  );
  const { createMainTag, creatingMainTag } = useCreateMainTagMutation(() => {
    reset({
      tagName: "",
      category: "",
    });
    setChosenTagCategory(undefined);
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      tagName: "",
      category: "",
    },
    resolver: yupResolver(createUpdateTagValidator),
  });

  useEffect(() => {
    if (isEdit && tagToEditData) {
      setTagToEditInitialData(tagToEditData);
    }
  }, [isEdit, tagToEditData]);

  useEffect(() => {
    if (tagCategories && !fetchingTagCategories) {
      const mappedTagsCategories: DropdownOption[] = tagCategories.map(
        (tagCategory) => ({
          label: tagCategory.name,
          value: tagCategory.name,
          color: tagCategory.color,
        }),
      );

      setTagCategoriesToChoose(mappedTagsCategories);
    }
  }, [fetchingTagCategories, tagCategories]);

  useEffect(() => {
    if (tagToEditInitialData) {
      setValue("tagName", tagToEditInitialData.name);
      setValue("category", tagToEditInitialData.tagCategoryName);

      const foundTagCategory = tagCategories?.find(
        (category) => category.name === tagToEditInitialData.tagCategoryName,
      );
      if (foundTagCategory) {
        setChosenTagCategory(foundTagCategory);
      }
    }
  }, [setValue, tagCategories, tagToEditInitialData]);

  const onSelectTagCategory = (tagCategoryName: string) => {
    const filteredTagCategories = tagCategories?.filter(
      (tagCategory) => tagCategory.name == tagCategoryName,
    );

    if (filteredTagCategories && filteredTagCategories.length == 1) {
      setChosenTagCategory(filteredTagCategories[0]);
      setValue("category", filteredTagCategories[0].name);
    }
  };

  const onSubmit = () => {
    const requestData = watch();

    if (isEdit && tagToEditInitialData && tagId) {
      updateTag({
        tagToUpdateId: tagId,
        tagCategoryId: chosenTagCategory?.id,
        name: requestData.tagName,
        color: chosenTagCategory?.color ?? "#14b8a6",
        initialTagData: tagToEditInitialData,
      });
    }

    if (!isEdit) {
      createMainTag({
        name: requestData.tagName,
        tagCategoryName: requestData.category,
        color: chosenTagCategory?.color ?? "#14b8a6",
      });
    }
  };

  if (fetchingTagToEditData) {
    return <Spinner />;
  }

  return (
    <Page className={"min-h-screen p-6  flex flex-col gap-8 w-full"}>
      <AdminManagementPanelHeader
        title={isEdit ? "Update Tag" : "Create New Tag"}
        content={""}
        link={"-1"}
      />

      <div className={"max-w-2xl w-full p-6 self-center"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border-2 bg-black-200 border-gray-600"
        >
          <header
            className={"p-6 border-b-2 border-gray-600 flex items-center gap-3"}
          >
            <div
              className={
                "size-12 rounded-lg flex items-center justify-center bg-teal-100"
              }
            >
              <Hash className={"size-6 text-black-100"} />
            </div>
            <div>
              <h2 className={"text-xl font-bold text-white-100"}>
                Tag Information
              </h2>
              <p className={"text-gray-400"}>
                {isEdit
                  ? "Edit chosen tag"
                  : "Create a new tag for your platform"}
              </p>
            </div>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={"p-6 flex flex-col gap-6"}
          >
            <FormInput
              title={"Tag Name*"}
              type={"text"}
              register={register("tagName")}
              placeholder={"e.g., photography, technology, art"}
              error={errors?.tagName?.message}
            />

            <div className={"w-full h-[50px]"}>
              <DropdownMenu
                className={"w-full h-full cursor-pointer"}
                options={tagCategoriesToChoose}
                onChange={(value) => onSelectTagCategory(value)}
                value={
                  chosenTagCategory?.name ??
                  tagCategoriesToChoose[0]?.value ??
                  ""
                }
              />
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
                loading={creatingMainTag}
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
                loading={creatingMainTag || updatingTag}
                type={"submit"}
              >
                <Save className={"size-5"} />
                {isEdit ? "Update Tag" : "Create Tag"}
              </AnimatedButton>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-col gap-4 rounded-lg border-2 p-6 bg-black-200 border-gray-600"
        >
          <h3 className={"text-lg font-bold text-white-100"}>Preview</h3>
          <div className={"flex items-center gap-4"}>
            <div
              className={"flex size-12 rounded-lg items-center justify-center"}
              style={{
                backgroundColor: chosenTagCategory?.color ?? "#14b8a6",
              }}
            >
              <Hash className={"size-6 text-black-100"} />
            </div>
            <div className={"flex flex-col gap-1"}>
              <div className={"flex items-center gap-3"}>
                <h4 className={"text-xl font-bold text-white-100"}>
                  #{watch("tagName") !== "" ? watch("tagName") : "tagname"}
                </h4>
                <Badge
                  className={
                    "px-2 rounded-full text-xs bg-gray-600 text-black-100"
                  }
                  bgColor={chosenTagCategory?.color ?? "#14b8a6"}
                  title={
                    watch("category") !== "" ? watch("category") : "category"
                  }
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Page>
  );
};

export default AdminTagForm;
