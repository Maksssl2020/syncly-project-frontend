import FormSwitch from "../input/FormSwitch.tsx";
import { useForm } from "react-hook-form";

const PrivacySettingsSection = () => {
  const { setValue, watch } = useForm({
    defaultValues: {
      publicProfile: true,
      showEmail: false,
      showLocation: false,
      showOnlineStatus: false,
    },
  });

  return (
    <div className={"space-y-12"}>
      <FormSwitch
        label={"Public Profile"}
        description={"Make your profile visible to everyone"}
        checked={watch("publicProfile")}
        onChange={(checked) => setValue("publicProfile", checked)}
      />
      <FormSwitch
        label={"Show E-mail"}
        description={"Display your e-mail address on your profile"}
        checked={watch("showEmail")}
        onChange={(checked) => setValue("showEmail", checked)}
      />
      <FormSwitch
        label={"Show Location"}
        description={"Display your location on your profile"}
        checked={watch("showLocation")}
        onChange={(checked) => setValue("showLocation", checked)}
      />
      <FormSwitch
        label={"Show Online Status"}
        description={"Let others know when you're online"}
        checked={watch("showOnlineStatus")}
        onChange={(checked) => setValue("showOnlineStatus", checked)}
      />
    </div>
  );
};

export default PrivacySettingsSection;
