import React from "react";
import FormInput from "../input/FormInput.tsx";
import { useForm } from "react-hook-form";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";

const LinkPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: "",
      title: "",
      description: "",
    },
  });

  return (
    <div className={"space-y-4"}>
      <FormInput
        title={"URL"}
        type={"url"}
        register={register("url")}
        error={errors?.url?.message}
        placeholder={"https://example.com"}
      />
      <FormInput
        title={"Title (optional)"}
        type={"text"}
        placeholder={"Link title"}
        register={register("title")}
        error={errors?.title?.message}
      />
      <FormTextArea
        title={"Description"}
        rows={3}
        register={register("description")}
        error={errors?.description?.message}
        placeholder={"Why are you sharing this link?"}
      />
      <TagSelector />
    </div>
  );
};

export default LinkPostForm;
