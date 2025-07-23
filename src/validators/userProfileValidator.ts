import * as yup from "yup";

export const userProfileUpdateValidator = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid e-mail address.")
    .required("E-mail address is required."),
  username: yup.string().required("Username is required."),
  displayName: yup.string().required("Display name is required."),
  website: yup.string(),
  location: yup.string(),
  bio: yup.string(),
});
