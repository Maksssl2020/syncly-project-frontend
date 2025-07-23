import * as yup from "yup";

export const tagValidator = yup.object().shape({
  tagName: yup.string().required("Tag name cannot be empty."),
  description: yup.string().required("Description cannot be empty."),
  category: yup.string().required("Category cannot be empty."),
});
