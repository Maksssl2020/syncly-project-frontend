import { useForm } from "react-hook-form";
import FormInput from "../input/FormInput.tsx";
import FormTextArea from "../input/FormTextarea.tsx";
import TagSelector from "../select/TagSelector.tsx";

const MusicPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      songTitle: "",
      songName: "",
      artist: "",
      album: "",
      thoughts: "",
    },
  });

  return (
    <div className={"space-y-4"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <FormInput
          title={"Song Title"}
          type={"text"}
          register={register("songTitle")}
          error={errors?.songTitle?.message}
          placeholder={"Song name"}
        />
        <FormInput
          title={"Artist"}
          type={"text"}
          register={register("artist")}
          error={errors?.artist?.message}
          placeholder={"Artist name"}
        />
      </div>
      <FormInput
        title={"Album (optional)"}
        type={"text"}
        placeholder={"Album name"}
        register={register("artist")}
        error={errors?.album?.message}
      />
      <FormTextArea
        title={"Your thoughts"}
        placeholder={"What do you think about this song?"}
        rows={3}
        register={register("thoughts")}
        error={errors?.thoughts?.message}
      />
      <TagSelector />
    </div>
  );
};

export default MusicPostForm;
