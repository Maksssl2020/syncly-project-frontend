import FormInput from "../input/FormInput.tsx";
import { useForm } from "react-hook-form";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";

const TextPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  return (
    <div className={"space-y-4"}>
      <FormInput
        title={"Title (optional)"}
        type={"text"}
        placeholder={"Add a title..."}
        register={register("title")}
        error={errors?.title?.message}
      />
      <FormTextArea
        title={"Content"}
        placeholder={"What's on your mind?"}
        rows={6}
        register={register("content")}
        error={errors?.content?.message}
      />
      <TagSelector />
    </div>
  );
};

export default TextPostForm;
