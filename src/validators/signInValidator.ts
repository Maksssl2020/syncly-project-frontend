import * as yup from "yup";

export const signInValidator = yup.object().shape({
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

export const verifyCodeValidator = yup.object().shape({
  code: yup
    .string()
    .required("Code is required.")
    .min(6, "Code must be at least 6 characters long."),
});
