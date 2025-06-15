import * as yup from "yup";

export const signUpValidator = yup.object().shape({
  firstName: yup.string().required("First name is required."),
  lastName: yup.string().required("Last name is required."),
  username: yup.string().required("Username is required."),
  email: yup
    .string()
    .email("Enter a valid e-mail.")
    .required("E-mail is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters long."),
  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("password"), ""], "Passwords must match."),
});
