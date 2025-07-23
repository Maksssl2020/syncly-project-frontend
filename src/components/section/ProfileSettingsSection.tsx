import AnimatedButton from "../button/AnimatedButton.tsx";
import { Camera, Trash2, Upload } from "lucide-react";
import FormInput from "../input/FormInput.tsx";
import { useForm } from "react-hook-form";
import FormTextArea from "../input/FormTextarea.tsx";
import type {
  UserProfile,
  UserProfileDataToUpdate,
} from "../../types/userProfile.ts";
import { useEffect, useMemo, useState } from "react";
import UploadAvatarModal from "../modal/UploadAvatarModal.tsx";
import Avatar from "../img/Avatar.tsx";
import useUpdateUserProfileMutation from "../../hooks/mutations/useUpdateUserProfileMutation.ts";
import useUsernameExistsMutation from "../../hooks/mutations/useUsernameExistsMutation.ts";
import useEmailExistsMutation from "../../hooks/mutations/useEmailExistsMutation.ts";
import toast from "react-hot-toast";
import useAuthentication from "../../hooks/useAuthentication.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { userProfileUpdateValidator } from "../../validators/userProfileValidator.ts";

type ProfileSettingsSectionProps = {
  data: UserProfile;
};

const ProfileSettingsSection = ({ data }: ProfileSettingsSectionProps) => {
  const { userId } = useAuthentication();
  const [isUploadAvatarModalOpen, setIsUploadAvatarModalOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const { updateUserProfile, updatingUserProfile } =
    useUpdateUserProfileMutation();
  const { usernameExists, checkingUsernameExists } =
    useUsernameExistsMutation();
  const { emailExists, checkingEmailExists } = useEmailExistsMutation();

  const { username, displayName, email, website, location, bio, avatar } = data;
  const initialUserProfileData = useMemo(
    () => ({
      bio: bio ?? "",
      username: username,
      displayName: displayName,
      email: email,
      website: website ?? "",
      location: location ?? "",
    }),
    [bio, username, displayName, email, website, location],
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: displayName,
      username: username,
      email: email,
      website: website ?? "",
      location: location ?? "",
      bio: bio ?? "",
    },
    resolver: yupResolver(userProfileUpdateValidator),
  });
  const watchedValues = watch();

  useEffect(() => {
    const hasChanges =
      watchedValues.email !== initialUserProfileData.email ||
      watchedValues.displayName !== initialUserProfileData.displayName ||
      watchedValues.website !== initialUserProfileData.website ||
      watchedValues.location !== initialUserProfileData.location ||
      watchedValues.bio !== initialUserProfileData.bio ||
      watchedValues.username !== initialUserProfileData.username;

    setIsChange(hasChanges);
  }, [watchedValues, initialUserProfileData]);

  const onUpdateClick = async (data: UserProfileDataToUpdate) => {
    let isUsernameAvailable = true;
    let isEmailAvailable = true;

    if (data.username !== initialUserProfileData.username) {
      isUsernameAvailable = await usernameExists(data.username);
    }
    if (data.email !== initialUserProfileData.email) {
      isEmailAvailable = await emailExists(data.email);
    }

    if (!isUsernameAvailable) {
      toast.error(`Username ${data.username} already exists!`);
    }
    if (!isEmailAvailable) {
      toast.error(`Email ${data.email} already exists!`);
    }

    if (isEmailAvailable && isUsernameAvailable && userId) {
      updateUserProfile({
        userId: userId,
        initialData: initialUserProfileData,
        dataToUpdate: data,
      });
    }
  };

  return (
    <div className={"space-y-12"}>
      <div className={"flex items-center gap-6"}>
        <div className={"relative"}>
          <Avatar
            size={"size-24"}
            avatar={avatar}
            className={"border-teal-100"}
          />
          <AnimatedButton
            className={"absolute -bottom-2 -right-2 p-2 rounded-full border-2"}
            bgColor={"#111111"}
            textColor={"#14b8a6"}
            borderColor={"#14b8a6"}
            onClick={() => setIsUploadAvatarModalOpen(true)}
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
              onClick={() => setIsUploadAvatarModalOpen(true)}
              className={"flex gap-2 items-center px-3 py-1 rounded-lg text-lg"}
            >
              <Upload className={"size-5"} />
              Upload
            </AnimatedButton>
            {avatar && (
              <AnimatedButton
                bgColor={"#222222"}
                bgColorHover={"#393939"}
                textColorHover={"#ef4444"}
                borderColor={"#222222"}
                borderColorHover={"#393939"}
                className={
                  "flex gap-2 items-center px-3 py-1 rounded-lg text-lg"
                }
              >
                <Trash2 className={"size-5"} />
                Remove
              </AnimatedButton>
            )}
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

      {isChange && (
        <AnimatedButton
          loading={
            checkingEmailExists || checkingUsernameExists || updatingUserProfile
          }
          onClick={handleSubmit(onUpdateClick)}
          className={"w-full rounded-lg h-[50px]"}
        >
          Save Changes
        </AnimatedButton>
      )}

      <UploadAvatarModal
        isOpen={isUploadAvatarModalOpen}
        onClose={() => setIsUploadAvatarModalOpen(false)}
      />
    </div>
  );
};

export default ProfileSettingsSection;
