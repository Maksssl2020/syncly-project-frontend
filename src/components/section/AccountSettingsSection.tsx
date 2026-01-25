import { useForm } from "react-hook-form";
import FormInput from "../input/FormInput.tsx";
import FormSwitch from "../input/FormSwitch.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Trash2 } from "lucide-react";
import useChangePasswordMutation from "../../hooks/mutations/useChangePasswordMutation.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordValidator } from "../../validators/changePasswordValidator.ts";
import { useEffect, useState } from "react";
import useUpdateUserSettingsMutation from "../../hooks/mutations/useUpdateUserSettingsMutation.ts";
import type { UserSettings } from "../../types/userSettings.ts";

type AccountSettingsSectionProps = {
  userSettings: UserSettings;
};

const AccountSettingsSection = ({
  userSettings,
}: AccountSettingsSectionProps) => {
  const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);
  const { changePassword, changingPassword } = useChangePasswordMutation();
  const { updateUserSettings, updatingUserSettings } =
    useUpdateUserSettingsMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorAuthentication: userSettings.twoFactorAuthentication,
    },
    resolver: yupResolver(changePasswordValidator),
  });

  const watchedValues = watch();
  const twoFactorAuthenticationValue = watch("twoFactorAuthentication");
  const isChange =
    twoFactorAuthenticationValue !== userSettings.twoFactorAuthentication;

  useEffect(() => {
    const isChangePassword =
      watchedValues.currentPassword !== "" ||
      watchedValues.newPassword !== "" ||
      watchedValues.confirmPassword !== "";

    setIsChangePasswordActive(isChangePassword);
  }, [watchedValues]);

  const onUpdate = () => {
    updateUserSettings({
      ...userSettings,
      twoFactorAuthentication: twoFactorAuthenticationValue,
    });
  };

  return (
    <div className={"space-y-12"}>
      <div>
        <h3 className={"text-xl font-semibold mb-4 text-white-100"}>
          Change Password
        </h3>
        <div className={"space-y-4 mt-8"}>
          <FormInput
            title={"Current password"}
            type={"password"}
            register={register("currentPassword")}
            error={errors?.currentPassword?.message}
          />
          <FormInput
            title={"New password"}
            type={"password"}
            register={register("newPassword")}
            error={errors?.newPassword?.message}
          />
          <FormInput
            title={"Confirm new password"}
            type={"password"}
            register={register("confirmPassword")}
            error={errors?.confirmPassword?.message}
          />
        </div>
      </div>

      {isChangePasswordActive && (
        <AnimatedButton
          onClick={handleSubmit((data) =>
            changePassword({
              oldPassword: data.currentPassword,
              newPassword: data.newPassword,
            }),
          )}
          bgColor={"#222222"}
          bgColorHover={"#222222"}
          borderColor={"#4a4a4d"}
          borderColorHover={"#22c55e"}
          textColorHover={"#22c55e"}
          loading={changingPassword}
          className={
            "w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2"
          }
        >
          Change Password
        </AnimatedButton>
      )}

      <div>
        <h3 className={"text-xl font-semibold mb-4 text-white-100"}>
          Security
        </h3>
        <FormSwitch
          label={"Two-Factor Authentication"}
          description={"Add an extra layer of security to your account"}
          onChange={(checked) => setValue("twoFactorAuthentication", checked)}
          checked={twoFactorAuthenticationValue}
        />
        {isChange && (
          <div className={"flex gap-4 w-full mt-4"}>
            <AnimatedButton
              bgColor={"#222222"}
              borderColor={"#4a4a4d"}
              borderColorHover={"#14b8a6"}
              onClick={() =>
                setValue(
                  "twoFactorAuthentication",
                  userSettings.twoFactorAuthentication,
                )
              }
              className={"w-full h-[50px] rounded-lg uppercase border-2"}
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              bgColor={"#222222"}
              borderColor={"#4a4a4d"}
              borderColorHover={"#14b8a6"}
              onClick={onUpdate}
              loading={updatingUserSettings}
              className={"w-full h-[50px] rounded-lg uppercase border-2"}
            >
              Update
            </AnimatedButton>
          </div>
        )}
      </div>

      <div>
        <h3 className={"text-xl font-semibold mb-4 text-white-100"}>
          Data & Privacy
        </h3>
        <div className={"space-y-4"}>
          <AnimatedButton
            bgColor={"#222222"}
            bgColorHover={"#222222"}
            borderColor={"#4a4a4d"}
            borderColorHover={"#ef4444"}
            textColorHover={"#ef4444"}
            className={
              "w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2"
            }
          >
            <Trash2 className={"size-4"} />
            Delete Account
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsSection;
