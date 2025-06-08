import { useForm } from "react-hook-form";
import FormInput from "../input/FormInput.tsx";
import FormSwitch from "../input/FormSwitch.tsx";
import AnimatedButton from "../button/AnimatedButton.tsx";
import { Trash2 } from "lucide-react";

const AccountSettingsSection = () => {
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
      twoFactorAuthentication: false,
    },
  });

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

      <div>
        <h3 className={"text-xl font-semibold mb-4 text-white-100"}>
          Security
        </h3>
        <FormSwitch
          label={"Two-Factor Authentication"}
          description={"Add an extra layer of security to your account"}
          onChange={(checked) => setValue("twoFactorAuthentication", checked)}
          checked={watch("twoFactorAuthentication")}
        />
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
