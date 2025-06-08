import { useForm } from "react-hook-form";
import FormFileInput from "../input/FormFileInput.tsx";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";

const PhotoPostForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      caption: "",
    },
  });

  return (
    <div className={"space-y-4"}>
      <FormFileInput
        title={"Drop your photos here of click to browse"}
        description={"PNG, JPG, GIF"}
        accept=".jpg,.jpeg,.png,.gif"
      />
      <FormTextArea
        title={"Caption"}
        placeholder={"Write a caption for your photos..."}
        rows={3}
        register={register("caption")}
        error={errors?.caption?.message}
      />
      <TagSelector />
    </div>
  );
};

export default PhotoPostForm;
