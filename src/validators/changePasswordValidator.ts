import * as yup from "yup";

export const changePasswordValidator = yup.object().shape({
  currentPassword: yup.string().required("Current password is required."),
  newPassword: yup
    .string()
    .required("New password is required.")
    .min(8, "New password must be at least 8 characters long."),
  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match."),
  twoFactorAuthentication: yup.boolean().required(),
});
