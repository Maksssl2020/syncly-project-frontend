import * as yup from "yup";

export const tagCategoryValidator = yup.object().shape({
  name: yup.string().required("Name cannot be empty."),
  description: yup.string().required("Description cannot be empty."),
  color: yup.string().required("Color cannot be empty."),
});
