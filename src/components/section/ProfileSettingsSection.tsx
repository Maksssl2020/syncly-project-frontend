import AnimatedButton from "../button/AnimatedButton.tsx";
import { Camera, Trash2, Upload } from "lucide-react";
import FormInput from "../input/FormInput.tsx";
import { useForm } from "react-hook-form";
import FormTextArea from "../input/FormTextarea.tsx";

const ProfileSettingsSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: "",
      username: "",
      email: "",
      website: "",
      location: "",
      bio: "",
    },
  });

  return (
    <div className={"space-y-12"}>
      <div className={"flex items-center gap-6"}>
        <div className={"relative"}>
          <div
            className={
              "size-24 bg-black-100 border-2 border-teal-100  rounded-full flex items-center justify-center text-2xl font-bold"
            }
          />
          <AnimatedButton
            className={"absolute -bottom-2 -right-2 p-2 rounded-full border-2"}
            bgColor={"#111111"}
            textColor={"#14b8a6"}
            borderColor={"#14b8a6"}
          >
            <Camera className={"size-5"} />
          </AnimatedButton>
        </div>
        <div>
          <h3 className={"text-lg font-semibold text-white-100"}>
            Profile Picture
          </h3>
          <p className={"text-sm text-gray-400"}>
            Upload a new avatar for your profile
          </p>
          <div className={"flex gap-2 mt-2"}>
            <AnimatedButton
              bgColor={"#222222"}
              bgColorHover={"#393939"}
              textColorHover={"#14b8a6"}
              borderColor={"#222222"}
              borderColorHover={"#393939"}
              className={"flex gap-2 items-center px-3 py-1 rounded-lg text-lg"}
            >
              <Upload className={"size-5"} />
              Upload
            </AnimatedButton>
            <AnimatedButton
              bgColor={"#222222"}
              bgColorHover={"#393939"}
              textColorHover={"#ef4444"}
              borderColor={"#222222"}
              borderColorHover={"#393939"}
              className={"flex gap-2 items-center px-3 py-1 rounded-lg text-lg"}
            >
              <Trash2 className={"size-5"} />
              Remove
            </AnimatedButton>
          </div>
        </div>
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
        <FormInput
          title={"Display Name"}
          type={"text"}
          placeholder={"Your display name"}
          register={register("displayName")}
          error={errors?.displayName?.message}
        />
        <FormInput
          title={"Username"}
          type={"text"}
          placeholder={"Your username"}
          register={register("username")}
          error={errors?.username?.message}
        />
        <FormInput
          title={"E-mail"}
          type={"email"}
          placeholder={"example@email.com"}
          register={register("email")}
          error={errors?.email?.message}
        />
        <FormInput
          title={"Website"}
          type={"url"}
          placeholder={"https://yourwebsite.com"}
          register={register("website")}
          error={errors?.website?.message}
        />
        <FormInput
          title={"Location"}
          type={"text"}
          placeholder={"Your location"}
          register={register("location")}
          error={errors?.location?.message}
        />
      </div>

      <FormTextArea
        title={"Bio"}
        placeholder={"Tell us about yourself..."}
        register={register("bio")}
        rows={4}
      />
    </div>
  );
};

export default ProfileSettingsSection;
