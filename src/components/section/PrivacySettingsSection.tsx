import FormSwitch from "../input/FormSwitch.tsx";
import { useForm } from "react-hook-form";
import type { UserSettings } from "../../types/userSettings.ts";
import useUpdateUserSettingsMutation from "../../hooks/mutations/useUpdateUserSettingsMutation.ts";
import { useEffect, useState } from "react";
import AnimatedButton from "../button/AnimatedButton.tsx";

type PrivacySettingsSectionProps = {
  userSettings: UserSettings;
};

const PrivacySettingsSection = ({
  userSettings,
}: PrivacySettingsSectionProps) => {
  const [isChange, setIsChange] = useState<boolean>(false);
  const { updateUserSettings, updatingUserSettings } =
    useUpdateUserSettingsMutation();
  const { showEmail, publicProfile, showLocation, showOnlineStatus } =
    userSettings;

  const { setValue, watch, reset } = useForm({
    defaultValues: {
      publicProfile: publicProfile,
      showEmail: showEmail,
      showLocation: showLocation,
      showOnlineStatus: showOnlineStatus,
    },
  });

  const publicProfileValue = watch("publicProfile");
  const showEmailValue = watch("showEmail");
  const showLocationValue = watch("showLocation");
  const showOnlineStatusValue = watch("showOnlineStatus");

  useEffect(() => {
    const isChange =
      publicProfileValue !== publicProfile ||
      showEmailValue !== showEmail ||
      showLocationValue !== showLocation ||
      showOnlineStatusValue !== showOnlineStatus;

    setIsChange(isChange);
    console.log(isChange);
  }, [
    publicProfile,
    publicProfileValue,
    showEmail,
    showEmailValue,
    showLocation,
    showLocationValue,
    showOnlineStatus,
    showOnlineStatusValue,
  ]);

  const onUpdate = () => {
    updateUserSettings({
      userSettingsId: userSettings.userSettingsId,
      publicProfile: publicProfileValue,
      showEmail: showEmailValue,
      showLocation: showLocationValue,
      showOnlineStatus: showOnlineStatusValue,
      twoFactorAuthentication: userSettings.twoFactorAuthentication,
    });
  };
  const onCancel = () => {
    reset({
      ...userSettings,
    });
  };

  return (
    <div className={"space-y-12"}>
      <FormSwitch
        label={"Public Profile"}
        description={"Make your profile visible to everyone"}
        checked={publicProfileValue}
        onChange={(checked) => setValue("publicProfile", checked)}
      />
      <FormSwitch
        label={"Show E-mail"}
        description={"Display your e-mail address on your profile"}
        checked={showEmailValue}
        onChange={(checked) => setValue("showEmail", checked)}
      />
      <FormSwitch
        label={"Show Location"}
        description={"Display your location on your profile"}
        checked={showLocationValue}
        onChange={(checked) => setValue("showLocation", checked)}
      />
      <FormSwitch
        label={"Show Online Status"}
        description={"Let others know when you're online"}
        checked={showOnlineStatusValue}
        onChange={(checked) => setValue("showOnlineStatus", checked)}
      />

      {isChange && (
        <div className={"flex gap-4 w-full"}>
          <AnimatedButton
            onClick={onCancel}
            className={"w-full h-[50px] rounded-lg uppercase"}
          >
            Cancel
          </AnimatedButton>
          <AnimatedButton
            onClick={onUpdate}
            loading={updatingUserSettings}
            className={"w-full h-[50px] rounded-lg uppercase"}
          >
            Update
          </AnimatedButton>
        </div>
      )}
    </div>
  );
};

export default PrivacySettingsSection;
