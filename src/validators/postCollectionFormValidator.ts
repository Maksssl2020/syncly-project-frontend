import * as yup from "yup";

export const postCollectionFormValidator = yup.object().shape({
  title: yup.string().required("Title is required."),
  color: yup.string().required("Color is required."),
});
