import FormFileInput from "../input/FormFileInput.tsx";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";
import { useForm } from "react-hook-form";

const VideoPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
    },
  });

  return (
    <div className={"space-y-4"}>
      <FormFileInput
        title={"Drop your video here or click to browse"}
        description={"MP4, MOV, AVI"}
      />
      <FormTextArea
        title={"Description"}
        register={register("description")}
        error={errors?.description?.message}
      />
      <TagSelector />
    </div>
  );
};

export default VideoPostForm;
