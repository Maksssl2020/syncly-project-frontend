import * as yup from "yup";

export const createUpdateTagValidator = yup.object().shape({
  tagName: yup.string().required("Tag name cannot be empty."),
  category: yup.string().required("Category cannot be empty."),
});
